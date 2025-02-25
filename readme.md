# 🦸‍♂️ Superhero Project

This project is a superhero management application built with a PHP backend and a React frontend. It allows users to manage superheroes, their powers, gadgets, and other related entities.

## Prerequisites

- 🐘 PHP 7.4 or higher
- 📦 Composer
- 🟢 Node.js and npm
- 🗄️ MySQL or any other supported database

## Installation

### Backend

1. 📂 Clone the repository:
    ```bash
    git clone https://github.com/GuillaumeAntier/Projet-PHP-Superhero.git
    cd superhero
    ```

2. 📁 Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. 📥 Install PHP dependencies:
    ```bash
    composer install
    ```

4. 🗄️ Create a new database for the project.

5. 📝 Copy the `.env.example` file to `.env` and configure your database settings:
    ```bash
    cp .env.example .env
    ```

    Update the following lines in the `.env` file with your database configuration:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    ```

6. 🔑 Generate the application key:
    ```bash
    php artisan key:generate
    ```

7. 📜 Run the database migrations:
    ```bash
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_users_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_planets_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_cities_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_teams_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_vehicles_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_superpowers_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_gadgets_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_superheroes_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143214_create_superhero_gadget_table.php
    php artisan migrate --path=/database/migrations/2025_02_07_143215_create_superhero_superpower_table.php
    php artisan migrate --path=/database/migrations/2025_02_23_150502_create_personal_access_tokens_table.php
    ```

8. 🔗 Generate a Link for your pictures:
    ```bash
    php artisan storage:link
    ```

9. 🚀 Start the backend server:
    ```bash
    php artisan serve
    ```

### Frontend

1. 📁 Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. 📥 Install Node.js dependencies:
    ```bash
    npm install
    ```

3. 🚀 Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

1. 🌐 Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. The backend API will be running at `http://localhost:8000`.
