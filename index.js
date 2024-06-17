/*fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(response =>{ 
    if(!response.ok)
        {
            throw new Error("wrong");
        }
       return response.json();
    }
,then(data =>console.log(data))
.catch(console.error());*/

/*

async function fetchData(){

try{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    if(!response.ok)
        {
            throw new Error("Not fetched");
        }   
     const data = await response.json();
        console.log(data);
}
catch(error)
{
    console.error("error");
}
}*/

async function fetchData() {
    const loadingIndicator = document.getElementById("loading");
    const pokemonInfo = document.getElementById("pokemonInfo");

    loadingIndicator.style.display = "block";
    pokemonInfo.style.display = "none";

    try {
        const pokemonName = document.getElementById("pokiName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await response.json();

        // Get Pokémon details
        const pokemonSprite = data.sprites.front_default;
        const name = data.name;
        const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
        const height = data.height;
        const weight = data.weight;
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ");
        const stats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(", ");

        // Display Pokémon details
        const img = document.getElementById("pokemonSprite");
        img.src = pokemonSprite;

        document.getElementById("pokemonName").textContent = `Name: ${name}`;
        document.getElementById("pokemonType").textContent = `Type: ${types}`;
        document.getElementById("pokemonHeight").textContent = `Height: ${height}`;
        document.getElementById("pokemonWeight").textContent = `Weight: ${weight}`;
        document.getElementById("pokemonAbilities").textContent = `Abilities: ${abilities}`;
        document.getElementById("pokemonStats").textContent = `Stats: ${stats}`;

        // Display Pokémon info
        loadingIndicator.style.display = "none";
        pokemonInfo.style.display = "block";

    } catch (error) {
        console.error(error);
        loadingIndicator.textContent = "Error: Could not fetch Pokémon data.";
    }
}

