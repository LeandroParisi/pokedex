import React from 'react';
import loadingImage from '../images/loading-page.gif'
import './style_sheets/Loading.css'

class Loading extends React.Component {
  render() {
    return (
      <img className="loading-image" src={loadingImage} alt="Loading page" />
    )
  }
}

export default Loading;