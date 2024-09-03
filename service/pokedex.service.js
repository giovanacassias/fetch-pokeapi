export class PokedexService {
  constructor() {}

  //código REPETIDO de pokemonService - entretanto, se utilizar aquele controlador, mistura o código que controla a página de buscas dos pokémons. Qual é a boa prática, separar cada página em arquivos js diferentes, ou ter apenas um?

  LOCAL_STORAGE_KEY = "myPokemons";

  getPokemonsLocalStorage() {
    let myPokemons = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    myPokemons = myPokemons ? JSON.parse(myPokemons) : [];
    return myPokemons;
  }

  changeBackgroundColor(favorite){
    switch(favorite.type1){
      case 'ice': return "#96D9D6";
      case 'fairy': return "#EFAFC0";
      case 'fire': return "#E76F51";
      case 'water': return "#59A5D8";
      case 'electric': return "#ffc243";
      case 'grass': return "#9cc5a1";
      case 'fighting': return "#C22E28";
      case 'poison': return "#9739c8";
      case 'ground': return "#E2BF65";
      case 'flying': return "#A98FF3";
      case 'psychic': return "#BA4470";
      case 'bug': return "#718355";
      case 'rock': return "#ab947e";
      case 'ghost': return "#735797";
      case 'dragon': return "#1e6091";
      case 'dark': return "#564E58";
      case 'steel': return "#B7B7CE";
      case 'normal': return "#e3d0c1";
    };
  }

  generateCard() {
    const favorites = this.getPokemonsLocalStorage();
    console.log(favorites);
  
    favorites.forEach((favorite) => {
      let card = document.createElement("div");
      card.classList.add("card-container");
      card.innerHTML = `
          <div class="pokemon-attributes">
            <h2 class="pokemon-name">${favorite.name}</h2>
            <div class="pokemon-type">
              <div class="type">
                <p class="type-1">${favorite.type1}</p>
              </div>
            </div>
          </div>
          <div class="pokemon-img-container">
            <img class="pokemon-img" src="${favorite.sprite}" alt="" />
          </div>
      `;
  
      if (favorite.type2 != null) {
        let type2Part = document.createElement("div");
        type2Part.classList.add("type");
        type2Part.innerHTML = `
        <p class="type-2">${favorite.type2}</p>
        `;
  
        // Adiciona o novo tipo à parte correta do card
        const pokemonType = card.querySelector(".pokemon-type");
        pokemonType.appendChild(type2Part);
      }

      //MUDAR BACKGROUND COLOR DE ACORDO COM TIPO DO POKÉMON
      let typeColor = this.changeBackgroundColor(favorite);
      card.style.backgroundColor = typeColor;

      const listaPokedex = document.querySelector(".lista-pokedex");
      listaPokedex.appendChild(card);
    });
  
    return this;
  }
  
}
