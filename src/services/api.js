export function getPokemonNames (pokedexNumber) {
  const endpoint = `https://pokeapi.co/api/v2/pokedex/${pokedexNumber}/`;

  return fetch(endpoint)
    .then((response) => response.json())
    .then((object) => object.pokemon_entries)
}

export async function treatPokemonList (pokedexNumber) {
  const rawPokemonList = await getPokemonNames(pokedexNumber);
  const treatedPokemonList = await rawPokemonList
    .map(pokemon => pokemon.pokemon_species.name);
  const orderedPokemonList = treatedPokemonList.sort()
  return orderedPokemonList;
}

