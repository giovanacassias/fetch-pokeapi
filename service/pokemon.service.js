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

  heartIcon = document.getElementById("icon-heart");
  currentState = this.heartIcon.getAttribute("data-state");

  switchToDark() {
    this.heartIcon.src = "icons/heart-dark.png";
    this.heartIcon.setAttribute("data-state", "dark");
  }

  switchToLight() {
    this.heartIcon.src = "icons/heart-light.png";
    this.heartIcon.setAttribute("data-state", "light");
  }

  /*   switchHeartColor(pokemon) {
    if (this.currentState === "light") {
      //adicionar aos favoritos
      this.switchToDark();
      this.saveOnLocalStorage(pokemon);
    } else {
      //remover dos favoritos
      this.switchToLight();
      this.removeFromLocalStorage(pokemon);
    }
  } */

  LOCAL_STORAGE_KEY = "myPokemons";

  //getAndParse() pega array do local Storage e converte de string para objeto

  getAndParse() {
    //Obtendo pokemons do armazenamento local
    let myPokemons = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    //Convertendo de string para objeto
    myPokemons = myPokemons ? JSON.parse(myPokemons) : [];

    //Retornando array de objetos
    return myPokemons;
  }

  setAndStringify() {
    let myPokemons = this.getAndParse();
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(myPokemons));
  }

  saveOnLocalStorage(pokemon) {
    let myPokemons = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    myPokemons = myPokemons ? JSON.parse(myPokemons) : [];
    myPokemons.push(pokemon);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(myPokemons));
  }

  removeFromLocalStorage(pokemon) {
    let myPokemons = this.getAndParse();
    myPokemons = myPokemons.filter((item) => item.name !== pokemon.name);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(myPokemons));
  }

  isInLocalStorage(pokemon) {
    let myPokemons = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    myPokemons = myPokemons ? JSON.parse(myPokemons) : [];
    let result = myPokemons.some(
      (obj) => obj.id === pokemon.id && obj.name === pokemon.name
    ); //está funcionando

    if (result === true) {
      console.log("Pokemón já está nos favoritos!");
      this.switchToDark();
      return true;
    } else {
      console.log("Pokemón não está nos favoritos!");
      this.switchToLight();
      return false;
    }
  }

  clicarHeartIcon(pokemon) {
    if (this.isInLocalStorage(pokemon)) {
      this.removeFromLocalStorage(pokemon);
      this.switchToLight();
      console.log("Pokémon removido dos favoritos");
    } else {
      this.saveOnLocalStorage(pokemon);
      this.switchToDark();
      console.log("Pokémon adicionado aos favoritos");
    }
  }

  async fetchData(pokemonInput) {
    try {
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
