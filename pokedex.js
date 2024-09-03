import { PokedexService } from "./service/pokedex.service.js";

let pokedexService = new PokedexService();

document.addEventListener('DOMContentLoaded', () => {
    pokedexService.generateCard();
});