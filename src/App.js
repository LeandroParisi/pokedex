import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  Pokedex, PokemonDetails, Header, FavoritePokemons
} from './components'
import {
  NotFound, About, CrudPage, Loading
} from './pages'
import pokedexLogo from './images/Pokedex.webp'
import * as api from './services/api';

class App extends React.Component {
  constructor() {
    super();

    this.handleStateChange = this.handleStateChange.bind(this);
    this.getFavPokemonsFromLocalStorage = this.getFavPokemonsFromLocalStorage.bind(this);
    this.injectPokemonIntoList = this.injectPokemonIntoList.bind(this);
    this.allowPageRendering = this.allowPageRendering.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.addPokemon = this.addPokemon.bind(this);


    this.state = {
      favoritePokemons: [],
      pokemonList: [],
      shouldRender: false,
    }
  }

  handleStateChange(pokemonId, booleanCheck) {
    if(booleanCheck) {
      this.setState((currentState) => (
        { 
          favoritePokemons: [
            ...currentState.favoritePokemons,
            pokemonId
          ]
        })
      )
    } else {
      const favoritePokemonsState = this.state.favoritePokemons;
      const indexToBeRemoved = favoritePokemonsState.indexOf(pokemonId);
      favoritePokemonsState.splice(indexToBeRemoved, 1);

      this.setState({ favoritePokemons: favoritePokemonsState })
    }
  }

  treatStoredData(dataToBeTreated) {
    const stringArray = dataToBeTreated.split(',')
    const numberArray = stringArray.map(number => parseInt(number, 10));
    return numberArray
  }

  getFavPokemonsFromLocalStorage () {
    const storedFavoritePokemons = localStorage.getItem('favoritePokemons');
    
    if ( storedFavoritePokemons ) {
      const treatedData = this.treatStoredData(storedFavoritePokemons);
      this.setState({ favoritePokemons: treatedData })
    }
  }

  injectPokemonIntoList(pokemon) {
    const type = pokemon.types[0].type.name;
    const treatedType = type.charAt(0).toUpperCase() + type.slice(1);

    const name = pokemon.name;
    const treatedName = name.charAt(0).toUpperCase() + name.slice(1);

    const stats = pokemon.stats.map(ability => {
      return {
        stat: ability.stat.name,
        value: ability.base_stat,
      }
    })

    const pokemonObject = {
      id: pokemon.id,
      name: treatedName,
      type: treatedType,
      stats: stats,
      averageWeight: {
        value: pokemon.weight / 10,
        measurementUnit: 'kg',
      },
      image: pokemon.sprites.versions["generation-v"]['black-white'].animated.front_default,
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

    this.setState ((currentState) => ({
      pokemonList: [
        ...currentState.pokemonList,
        pokemonObject,
      ]
    }), () => {
      this.allowPageRendering()
    })
  }

  fetchPokemonStatus (pokemonNames) {
      const endpoint = 'https://pokeapi.co/api/v2/pokemon/'
    
      pokemonNames.forEach(pokemon => {
        const fetchUrl = `${endpoint}${pokemon}`;

        fetch(fetchUrl)
          .then(response => response.json())
          .then(pokemonObject => this.injectPokemonIntoList(pokemonObject))
      })
    }

  async componentDidMount() {
    await this.getFavPokemonsFromLocalStorage();

    const pokemonNames = await api.treatPokemonList(2);
    
    await this.setState ({pokemonNames: pokemonNames});

    this.fetchPokemonStatus(pokemonNames);
  }

  allowPageRendering() {
    const { pokemonList, pokemonNames } = this.state;
    
    if(pokemonList.length === pokemonNames.length) {
      this.setState({ shouldRender: true})
    } else {}
  }

  componentDidUpdate() {
    const { favoritePokemons } = this.state;
    localStorage.setItem('favoritePokemons', favoritePokemons)
  }

  deletePokemon(pokemonToDelete) {
    console.log(`'Delete' ${pokemonToDelete}`);
    const { pokemonList } = this.state;

    const newPokemonList = pokemonList.filter(pokemon => pokemon.id !== pokemonToDelete.id);
    
    this.setState({ pokemonList: newPokemonList});
  }

  addPokemon(pokemonToAdd) {
    console.log('addPokemon')
    const { pokemonList } = this.state;

    pokemonList.push(pokemonToAdd);
    
    this.setState({ pokemonList: pokemonList});
  }



  render() {

    const { favoritePokemons, pokemonList, shouldRender } = this.state;

    return (
      <div>
        {shouldRender === false ? <Loading /> : (
          <BrowserRouter>
            <div className="App">
              <img src={pokedexLogo} alt="Pokedex Logo" width="200px"/>
              <Header />
              <Switch>
                <Route exact path="/" render={(props) => <Pokedex {...props} pokemons={pokemonList} newPokemons={pokemonList} favoritePokemons={favoritePokemons} />} />

                <Route exact path="/pokemon/:id" render={(props) => <PokemonDetails {...props} handleStateChange={this.handleStateChange} favoritePokemons={favoritePokemons} />}/>

                <Route exact path="/about" component={About} />

                <Route exact path="/edit-pokedex" render={(props) => <CrudPage {...props} pokemonList={pokemonList} deletePokemon={this.deletePokemon} addPokemon={this.addPokemon} />}/>

                <Route exact path='/favorite-pokemons' render={(props) => <FavoritePokemons {...props} pokemonList={pokemonList} favoritePokemons={favoritePokemons} />}/>

                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;