<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'photo' => 'nullable|image|max:2048',
        ]);

        $userData = [
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];
        
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('usersUploads', 'public');
            $userData['photo'] = $path;
        }

        $user = User::create($userData);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations de connexion sont incorrectes.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function show()
    {
        return response()->json(Auth::user());
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        
        \Log::info('Données de mise à jour reçues:', $request->all());
        
        $request->validate([
            'lastname' => 'sometimes|required|string|max:255',
            'firstname' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'sometimes|required|string|min:8|confirmed',
            'photo' => 'sometimes|required|image|max:2048',
        ]);

        \Log::info('Validation passée');
        
        if ($request->has('lastname')) {
            $user->lastname = $request->lastname;
            \Log::info('Lastname updated:', ['lastname' => $request->lastname]);
        }
        
        if ($request->has('firstname')) {
            $user->firstname = $request->firstname;
            \Log::info('Firstname updated:', ['firstname' => $request->firstname]);
        }
        
        if ($request->has('email')) {
            $user->email = $request->email;
            \Log::info('Email updated:', ['email' => $request->email]);
        }
        
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
            \Log::info('Password updated');
        }
        
        if ($request->hasFile('photo')) {
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }
            
            $path = $request->file('photo')->store('usersUploads', 'public');
            $user->photo = $path;
            \Log::info('Photo updated:', ['photo' => $path]);
        }

        $user->save();
        
        \Log::info('Utilisateur après mise à jour:', $user->toArray());
        
        return response()->json([
            'message' => 'Profil mis à jour', 
            'user' => $user
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();
        
        if ($user->photo) {
            Storage::disk('public')->delete($user->photo);
        }
        
        $user->tokens()->delete();
        $user->delete();
        
        return response()->json(['message' => 'Compte supprimé avec succès']);
    }
}