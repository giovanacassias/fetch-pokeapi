import { Pokemon } from "./model/pokemon.js";
import { PokemonService } from "./service/pokemon.service.js";

let pokemonService = new PokemonService();

async function submitHandler() {
  try {
    const data = await pokemonService.fetchData();

    //Armazenando dentro de variáveis os dados do objeto retornado da função assíncrona
    let pokemonName = data.name;
    let pokemonID = data.id;
    let pokemonSprite = data.sprites.front_default;
    let pokemonAttack = data.stats[1].base_stat;
    let pokemonDefense = data.stats[2].base_stat;
    let pokemonSpecialAttack = data.stats[3].base_stat;
    let pokemonSpecialDefense = data.stats[4].base_stat;
    let pokemonType1 = data.types[0].type.name;
    let pokemonType2 = null;

    if (data.types.length > 1) {
      pokemonType2 = data.types[1].type.name;
    }

    /*  console.log(pokemonName);
    console.log(pokemonID);
    console.log(pokemonSprite);
    console.log(pokemonType1);
    console.log(pokemonType2);
    console.log(pokemonAttack);
    console.log(pokemonDefense);
    console.log(pokemonSpecialAttack);
    console.log(pokemonSpecialDefense); */

    //Instanciando a classe Pokemon com os dados obtidos da API
    let pokemon = new Pokemon(
      pokemonName,
      pokemonID,
      pokemonSprite,
      pokemonType1,
      pokemonType2,
      pokemonAttack,
      pokemonDefense,
      pokemonSpecialAttack,
      pokemonSpecialDefense
    );

    /*console.log(pokemon.name);
    console.log(pokemon.ID);
    console.log(pokemon.sprite);
    console.log(pokemon.type1);
    console.log(pokemon.type2);
    console.log(pokemon.attack);
    console.log(pokemon.defense);
    console.log(pokemon.spAttack);
    console.log(pokemon.spDefense); */

    //Atualizando os dados via DOM
    pokemonService.updatePokemonStats(pokemon);

    //Reiniciando animação, limpando a barra de pesquisa e rolando automaticamente para fim da page via method chaining
    pokemonService.restartAnimation().cleanSearchBar().rolarParaFim();
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

addEventListener("DOMContentLoaded", pokemonService.rolarParaFim());
addEventListener("DOMContentLoaded", () => {
  document.getElementById("lupa").addEventListener("click", submitHandler); //tirar () para fazer referência à função e não chamar imediatamente o resultado/retorno da função
});
