import React, { Component } from 'react';
import Carousel from './carousel/carousel'
import './App.css';
import styled from 'styled-components';

const CarouselWrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);`

class App extends Component {
  render() {
    return (
      <div className="App">
        <CarouselWrapper><Carousel /></CarouselWrapper>
      </div>
    );
  }
}

export default App;
