export class PokedexService {
  constructor() {}

  //código REPETIDO de pokemonService - entretanto, se utilizar aquele controlador, mistura o código que controla a página de buscas dos pokémons. Qual é a boa prática, separar cada página em arquivos js diferentes, ou ter apenas um?

  LOCAL_STORAGE_KEY = "myPokemons";

  getPokemonsLocalStorage() {
    let myPokemons = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    myPokemons = myPokemons ? JSON.parse(myPokemons) : [];
    return myPokemons;
  }

  generateCard() {
    const favorites = this.getPokemonsLocalStorage();
    console.log(favorites);

    favorites.map((favorite) => {
      let card = document.createElement("div");
      card.classList.add("card-container");
      card.innerHTML = `
          <div id="pokemon-attributes">
            <h2 id="pokemon-name">${favorite.name}</h2>
            <div id="pokemon-type">
              <div class="type">
                <p id="type-1">${favorite.type1}</p>
              </div>
              <div class="type" class="type-container-2">
                <p id="type-2">${favorite.type2}</p>
              </div>
            </div>
          </div>
          <div id="pokemon-img-container">
            <img id="pokemon-img" src="${favorite.sprite}" alt="" />
          </div>
      `;

      const listaPokedex = document.querySelector(".lista-pokedex");
      listaPokedex.appendChild(card);

    });

    return this;
  }
}
