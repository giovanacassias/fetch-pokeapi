export class PokemonService {
  constructor() {}

  //métodos aqui

  rolarParaFim() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Adiciona um efeito de rolagem suave
    });

    return this;
  }

  restartAnimation() {
    const barraScore = document.getElementsByClassName("slider-bar");
    Array.from(barraScore).forEach((barra) => {
      barra.classList.remove("slider-bar");
      void barra.offsetWidth; //força a reinicialização da animação
      barra.classList.add("slider-bar");
    });

    return this;
  }

  switchLightColor() {
    heartIcon.src = "icons/heart-dark.png";
    heartIcon.setAttribute("data-state", "dark");
  }

  switchDarkColor() {
    heartIcon.src = "icons/heart-light.png";
    heartIcon.setAttribute("data-state", "light");
  }

  switchHeartColor() {
    let heartIcon = document.getElementById("icon-heart");
    let currentState = heartIcon.getAttribute("data-state");

    if (currentState == "light") {
      //adicionar aos favoritos
      switchLightColor();
    } else {
      //remover dos favoritos
      switchDarkColor();
    }
  }

  addPokemonLocalStorage() {
    if (localStorage.myPokemonsArray) {
      myPokemons = JSON.parse(localStorage.getItem("myPokemonsArray"));
    }

    let newPokemon = document.getElementById("pokemon-name").innerHTML;
    myPokemons.push(newPokemon);
    localStorage.myPokemonsArray = JSON.stringify(myPokemons);

    switchHeartColor();
  }

  async fetchData() {
    try {
      const pokemonInput = document
        .getElementById("input-pokemon-name")
        .value.toLowerCase();

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  updatePokemonStats(pokemon) {
    //SPRITE
    const imgElement = document.getElementById("pokemonSprite");
    imgElement.src = pokemon.sprite;
    imgElement.style.display = "block";

    //NAME
    const h1 = document.getElementById("pokemon-name");
    h1.innerHTML = pokemon.name;

    //ID
    const h2 = document.getElementById("index-num");
    h2.innerHTML = `#${pokemon.ID}`;

    //TYPE 1
    const type1 = document.getElementById("type-1");
    type1.innerHTML = pokemon.type1;

    if (pokemon.type2 != null) {
      const type2 = document.getElementById("type-2");
      type2.innerHTML = pokemon.type2;
      document.getElementById("type-container-2").style.display = "flex";
    } else {
      document.getElementById("type-container-2").style.display = "none";
    }

    //ATTACK
    const scoreAttack = document.getElementById("attack-score");
    scoreAttack.innerHTML = pokemon.attack;

    const sliderAttack = document.getElementById("slider-attack");
    let pokemonAttack = parseInt(pokemon.attack);
    let pokemonAttackBar = pokemonAttack / 1.5;
    sliderAttack.setAttribute("style", `width:${pokemonAttackBar}px`);

    //DEFENSE
    const scoreDefense = document.getElementById("defense-score");
    scoreDefense.innerHTML = pokemon.defense;

    const sliderDefense = document.getElementById("slider-defense");
    let pokemonDefenseBar = parseInt(pokemon.defense) / 1.5;
    sliderDefense.setAttribute("style", `width:${pokemonDefenseBar}px`);

    //SP. ATTACK
    const scoreSpAttack = document.getElementById("special-attack-score");
    scoreSpAttack.innerHTML = pokemon.spAttack;

    const sliderSpAttack = document.getElementById("slider-sp-attack");
    let pokemonSpecialAttackBar = parseInt(pokemon.spAttack) / 1.5;
    sliderSpAttack.setAttribute("style", `width:${pokemonSpecialAttackBar}px`);

    //SP. DEFENSE
    let scoreSpDefense = document.getElementById("special-defense-score");
    scoreSpDefense.innerHTML = pokemon.spDefense;

    const sliderSpDefense = document.getElementById("slider-sp-defense");
    let pokemonSpecialDefenseBar = parseInt(pokemon.spDefense) / 1.5;
    sliderSpDefense.setAttribute(
      "style",
      `width:${pokemonSpecialDefenseBar}px`
    );
  }

  cleanSearchBar() {
    document.getElementById("input-pokemon-name").value = "";
    return this;
  }
}
