import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './style_sheets/sass_hands_on/pokedex.css';
// import './style_sheets/sass_hands_on/pokedex.scss';
import'./style_sheets/TypeBackgroundColors.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemonIndex: 0, filteredType: 'all'};
  }

  filterPokemons(filteredType) {
    this.setState({filteredType, pokemonIndex: 0});
  }

  nextPokemon(numberOfPokemons) {
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
    }));
  }

  fetchFilteredPokemons() {
    const {pokemons} = this.props;
    const {filteredType} = this.state;

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const {pokemons} = this.props;

    return [...new Set(pokemons.reduce((types, {type}) => [...types, type], []))];
  }

  // change the way it is checked
  isPokemonFavorite( { id } ) {
    const { favoritePokemons } = this.props;
    
    const checkFavorite = favoritePokemons.find(idInArray => idInArray === id);

    const returned = checkFavorite !== undefined ? true : false;

    return returned
  }

  render() {
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    const pokemon = filteredPokemons[this.state.pokemonIndex];
    const isFavorite = this.isPokemonFavorite(pokemon);
    return (
      <div className="pokedex">
        <Pokemon pokemon={pokemon} isFavorite={isFavorite} />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filterPokemons('all')}
            className="filter-button">
            All
          </Button>
          {pokemonTypes.map(type => (
            <Button
              key={type}
              onClick={() => this.filterPokemons(type)}
              className="filter-button"
              id={type}>
              {type}
            </Button>
          ))}
        </div>
        <Button
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={filteredPokemons.length <= 1}>
          Next pokemon
        </Button>
      </div>
    );
  }
}

export default Pokedex;