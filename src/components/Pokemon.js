import React from 'react';
import './style_sheets/pokemon.css';
import { Link } from 'react-router-dom';
import favStar from './style_sheets/images/star3.gif'
import'./style_sheets/TypeBackgroundColors.css';

class Pokemon extends React.Component {
  render() {
    const {name, type, averageWeight, image, id} = this.props.pokemon;
    const { isFavorite } = this.props;

    console.log(this.props.pokemon);

    return (
      <div className='pokemon' id={type}>
        <div>
          <p><b>{name}</b></p>
          <p>{type}</p>
          <p>
            Average weight: {`${averageWeight.value} ${averageWeight.measurementUnit}`}
          </p>
          <Link to={{
            pathname:`/pokemon/${id}`,
            state: { ...this.props.pokemon }
          }}>
            DETAILS
          </Link>
        </div>
        <div className="pokemon-gif-container">
          <img src={image} alt={`${name} sprite`} id='pokemon-gif' />
        </div>
        {isFavorite === true ? <img src={favStar} className='star' alt='favorite-star'/> : <span />}
      </div>
    );
  }
}

export default Pokemon;