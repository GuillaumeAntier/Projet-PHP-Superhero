<div class ="box">
  <style>
      body, html {

    font-family: 'Roboto', sans-serif;
  }

/* Header */
  header {
    background-color: #0f3e70;
    color: rgb(255, 255, 255);
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  
  .logo {
    display: flex;
    font-size: 24px;
    font-weight: bold;
    margin-left: 18%;
  }
  
  .dropdown {
    display: flex;
    margin-right: 42%;

    padding: 10px 0;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    background-color: rgb(113, 165, 233);
    color: black;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
  }
  
  
  .dropdown option {
    background-color: rgb(113,165,233);
    color: black;
    padding: 15px;
  }
  </style>
     <header>
          <div class = "logo">
            <img src="{{url('/code_bridge_logo.png')}}" width = "80px" height = "80px" alt = "logo">
          </div>
          <select class = "dropdown" wire:model = "selectedValue" wire:change="changePage($event.target.value)">
            <option value = "" disabled selected>Fonctionnalités</option>
            <option value = "converter" >Convertisseur</option>
            <option value = "text-generator" >Générateur de texte</option>
            <option value = "random-number" >Générateur de nombre aléatoire</option>
          </select>
      </header>
</div>