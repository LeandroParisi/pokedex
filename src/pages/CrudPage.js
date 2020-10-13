import React from 'react';
import {
  CreatePokemonForm, DeletePokemonForm
} from '../components'
import './style_sheets/CrudPage.css'

class CrudPage extends React.Component {
  constructor() {
    super();

    this.setEditMode = this.setEditMode.bind(this);

    this.state = {
      editMode: '',
    }
  }

  setEditMode({target}) {
    const editMode = target.id;

    this.setState ({editMode: editMode})
  }

  render() {

    const { pokemonList, deletePokemon, addPokemon } = this.props;
    const { editMode } = this.state;
    return(
      <main>
        <h1>What do you want to do?</h1>
        <div className="create-delete-opt-menu">
        <input type="radio" id="create-pokemon" name="opt-menu-radio" onClick={this.setEditMode}/>
        <label htmlFor="create-pokemon">Regiter a Pokemon</label>

        <input type="radio" id="delete-pokemon" name="opt-menu-radio" onClick={this.setEditMode}/>
        <label htmlFor="delete-pokemon">Remove a Pokemon</label>
        </div>

        {editMode === "create-pokemon" ? <CreatePokemonForm currentPokemonList={ pokemonList} addPokemon={addPokemon} /> : null }

        {editMode === "delete-pokemon" ? <DeletePokemonForm pokemonList={ pokemonList } deletePokemon={deletePokemon}/> : null }

      </main>
    )
  }
}

export default CrudPage;
