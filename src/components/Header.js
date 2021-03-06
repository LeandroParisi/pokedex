import React from 'react';
import './style_sheets/Header.css'
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return(
      <header>
        <nav>
          <div className='navigation-item'><Link to='/'>Home</Link></div>
          <div className='navigation-item'><Link to='/about'>About</Link></div>
          <div className='navigation-item'><Link to='/favorite-pokemons'>Favorite Pokemons</Link></div>
          <div className='navigation-item'><Link to='/edit-pokedex'>Edit your pokedex</Link></div>

        </nav>
      </header>
    )
  }
}

export default Header;
