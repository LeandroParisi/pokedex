import React from "react";
import './style_sheets/CreatePokemonForm.css';
import * as api from '../services/api';
import Pokemon from "./Pokemon";
import Button from './Button';




class CreatePokemonForm extends React.Component {
  constructor() {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchSelectedPokemon = this.fetchSelectedPokemon.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);

    this.state = {
      pokemonNames: undefined,
      inicialRequest: false,
      selectedPokemon: undefined,
      selectedPokemonName: undefined,
    }

  }

  treatFetchedPokemon(pokemonObject) {
    const type = pokemonObject.types[0].type.name;
    const treatedType = type.charAt(0).toUpperCase() + type.slice(1);

    const name = pokemonObject.name;
    const treatedName = name.charAt(0).toUpperCase() + name.slice(1);

    const stats = pokemonObject.stats.map(ability => {
      return {
        stat: ability.stat.name,
        value: ability.base_stat,
      }
    })

    const treatedPokemonObject = {
      id: pokemonObject.id,
      name: treatedName,
      type: treatedType,
      stats: stats,
      averageWeight: {
        value: pokemonObject.weight / 10,
        measurementUnit: 'kg',
      },
      image: pokemonObject.sprites.versions["generation-v"]['black-white'].animated.front_default,
      moreInfo: "??more info",
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
      ],
      summary: "??summary"
    }

    return treatedPokemonObject;
  }

  fetchSelectedPokemon(pokemon) {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/'
  
    const fetchUrl = `${endpoint}${pokemon}`;

    fetch(fetchUrl)
      .then(response => response.json())
      .then(pokemonObject => this.treatFetchedPokemon(pokemonObject))
      .then(treatedPokemon => this.setState({ selectedPokemon: treatedPokemon }))
  }

  handleSelectChange( {target} ) {
    const selectedPokemonName = target.value;

    this.setState ({
      selectedPokemonName: selectedPokemonName,
    }, () => {
      const { selectedPokemonName } = this.state;
      this.fetchSelectedPokemon(selectedPokemonName);
    })
  }

  diffPokemonNameList(newNameList, currentNameList) {
    const treatedCurrentNameList = currentNameList.map(pokemon => pokemon.name.toLowerCase());

    const diffNameList = newNameList.filter(name => !treatedCurrentNameList.includes(name));

    return diffNameList;
  }

  handleAddButton() {
    const { addPokemon } = this.props;
    const { selectedPokemon, pokemonNames, selectedPokemonName } = this.state;
    addPokemon(selectedPokemon);

    const newPokemonNames = pokemonNames.filter(name => name !== selectedPokemonName);

    this.setState({ 
      pokemonNames: newPokemonNames,
      selectedPokemon: undefined,
      selectedPokemonName: undefined,
    });
  }

  async componentDidMount() {
    const newPokemonsNameList = await api.treatPokemonList(1);
    const { currentPokemonList } = this.props;

    const diffPokemonNameList = this.diffPokemonNameList(newPokemonsNameList, currentPokemonList)

    this.setState({ pokemonNames: diffPokemonNameList, inicialRequest: true })

  }

  render() {
    const { inicialRequest, pokemonNames, selectedPokemon } = this.state;
    return(
      <section className="select-pokemon-container">
        <form className="crud-form">
          {inicialRequest && (
            <select name="pokemon-name" placeholder="Choose your pokemon" onChange={this.handleSelectChange}>
              {pokemonNames.map(pokemon => <option key={pokemon.id} value={pokemon}> {pokemon} </option>)}
            </select>
          )}
        </form>

        {selectedPokemon !== undefined ? <Pokemon pokemon={selectedPokemon}/> : null}

        {selectedPokemon !== undefined ? (
          <Button
          className="submit-button"
          onClick={this.handleAddButton}
          >
          ADD POKEMON
        </Button>
        ) : null}  
      </section>
    )
  }
}

export default CreatePokemonForm;