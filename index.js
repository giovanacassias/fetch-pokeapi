/* fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => {
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return response.json();
    } 
    )
    .then(data => console.log(data.id))
    .catch(error => console.error(error)); */

    
    async function fetchData(){

        try{

            const pokemonInput = document.getElementById('input-pokemon-name').value.toLowerCase();

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);

            if(!response.ok){
                throw new Error("Could not fetch resource!");
            }
            
            const data = await response.json();
            
            
            //SPRITE
            const pokemonSprite = data.sprites.front_default;
            const imgElement = document.getElementById("pokemonSprite");
            imgElement.src = pokemonSprite;
            imgElement.style.display = "block";

            //NAME
            const pokemonName = data.name;
            const h1 = document.getElementById("pokemon-name");
            h1.innerHTML = pokemonName;

            //ID
            const pokemonID = data.id;
            const h2 = document.getElementById("index-num");
            h2.innerHTML = `#${pokemonID}`;

            //TYPE 1
            const pokemonType1 = data.types[0].type.name;
            const type1 = document.getElementById("type-1");
            type1.innerHTML = pokemonType1;

            if(data.types.length > 1){
                const pokemonType2 = data.types[1].type.name;
                const type2 = document.getElementById("type-2");
                type2.innerHTML = pokemonType2;
                document.getElementById("type-container-2").style.display = "flex";
            }else{
                document.getElementById("type-container-2").style.display = "none";
            };

            document.getElementById('input-pokemon-name').value = '';
             
        }
        catch(error){
            console.log(error);
        }
    }