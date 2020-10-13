import React from "react";
import './style_sheets/CreatePokemonForm.css';
import Pokemon from "./Pokemon";
import Button from './Button';



class DeletePokemonForm extends React.Component {
  constructor(props) {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);

    this.state = {
      selectedPokemon: undefined,
      pokemonList: props.pokemonList,
    }

  }

  handleSelectChange( {target} ) {
    const { pokemonList } = this.props;

    const chosenPokemon = pokemonList.find(pokemon => pokemon.name === target.value);
    console.log(chosenPokemon);

    this.setState({ selectedPokemon: chosenPokemon });
  }

  handleDeleteButton () {
    const { deletePokemon } = this.props;
    const { selectedPokemon, pokemonList } = this.state;
    deletePokemon(selectedPokemon);

    const newPokemonList = pokemonList.filter(pokemon => pokemon.id !== selectedPokemon.id);
    
    this.setState({ 
      pokemonList: newPokemonList,
      selectedPokemon: undefined,
    });
  }

  render() {
    const { selectedPokemon, pokemonList } = this.state;
    return(
      <section className="select-pokemon-container">
        <form className="crud-form">
          <label htmlFor="pokemon-name">Which pokemon you want to delete?</label>
          <select name="pokemon-name" id="pokemon-name" placeholder="Choose your pokemon" onChange={this.handleSelectChange}>
            {pokemonList.map(pokemon => <option key={pokemon.id} value={pokemon.name}> {pokemon.name} </option>)}
          </select>
        </form>

        {selectedPokemon !== undefined ? <Pokemon pokemon={selectedPokemon}/> : null}      

        {selectedPokemon !== undefined ? (
            <Button
            className="submit-button"
            onClick={this.handleDeleteButton}
            >
            DELETE POKEMON
          </Button>
          ) : null}

      </section>
    )
  }
}

export default DeletePokemonForm;