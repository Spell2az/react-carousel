import React from 'react';
import styled from 'styled-components';
import CarouselItem from './carouselItem';
import sizeMe from 'react-sizeme';
import Caret from './caret';
import { CSSTransition } from 'react-transition-group';

const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

const items = [...Array(12)].reduce((acc, _,idx) =>{
return acc.concat({ title: idx.toString(), color: randomColor()})
}, [])

const CarouselBody = styled.div`
height: 180px;
width: 800px;

overflow: hidden;
position: relative;`


const ItemWrapper = styled.div`
height: 100%;
display: flex;
position: relative;
left: 0;
transform: translateX(0);

&.move-items-right-enter {
  transform: translateX(-100%);
  transition: transform .25s;

}

/* &.move-items-right-active-enter {
  transform: translateX(0);
} */

&.move-items-right-enter-done{
  transform: translateX(0);
  transition: transform .25s;
}

&.move-items-left-enter {
  left: -100%;
  transform: translateX(100%);
  transition: transform .25s;
}

/* &.move-items-left-active-enter {
  transform: translateX(0);
  left: 0;
  transition: transform .25s;
} */

&.move-items-right-exit-done {
  transform: translateX(0);
}

` 

const CaretLeft = styled.div`
position: absolute;
top: 65px;
left: -60px;
`
const CaretRight = styled.div`
position: absolute;
top: 65px;
left: 815px;
`
// {items.map(item => (<CarouselItem title={item.content} color={item.color} />))}

class Carousel extends React.Component {

  constructor() {
    super();
    this.state ={
      itemWidth: 0,
      move: false,
      direction: '',
      itemCount: 1,
      position: 0,
      items: [ { title: '0', color: '#a9b2d0' },
      { title: '1', color: '#56a81e' },
      { title: '2', color: '#cf155d' },
      { title: '3', color: '#78c469' },
      { title: '4', color: '#8dbdd3' },
      { title: '5', color: '#4c9253' },
      { title: '6', color: '#9b9c22' },
      { title: '7', color: '#d89062' },
      { title: '8', color: '#c59daa' },
      { title: '9', color: '#4fb272' },
      { title: '10', color: '#1c5df4' },
      { title: '11', color: '#8eb718' } ]
    }
    this.updateItemCount = this.updateItemCount.bind(this);
  }
  
  componentDidMount() {
    this.updateItemCount();
    window.addEventListener('resize', this.updateItemCount);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateItemCount);
  }

  updateItemCount = () => {
    console.log('resized')
    if(window.innerWidth < 700) this.setState({itemCount: 2});
    if(window.innerWidth >= 701 && window.innerWidth <= 1010) this.setState({itemCount: 3});
    if(window.innerWidth >= 1011) this.setState({itemCount: 4});
    
    
  }

  moveForward =() => {
    this.setState({ direction: 'right'}, () => this.setState({move: true}))
    // this.setState({move: true})
  }

  moveBackward =() => {
    this.setState({ direction: 'left'},() => this.setState({move: true}))
    
  }

  shiftItemsForward = () => {
    const {items, itemCount} = this.state;
    const newItems =  [...items.slice((itemCount - items.length)),...items.slice(0, itemCount)];
    this.setState({items: newItems,move: false})
  }

  shiftItemsBackward = () => {
    const {items,itemCount} = this.state;
    const newItems =  [...items.slice(-itemCount),...items.slice(0, -itemCount),];
    
    this.setState({items: newItems})
  }

 

  render () {
    return (
    <div>
      
    <CarouselBody>
      <CSSTransition in={this.state.move} onEnter={() => {
        if(this.state.direction === 'left') this.shiftItemsBackward()
      }}  onEntered={()=> {
      if(this.state.direction === 'right') this.shiftItemsForward()
      if(this.state.direction === 'left') this.setState({move: false})
      } }
      classNames={`move-items-${this.state.direction}`} timeout={{enter: 250, exit:0}}>
      <ItemWrapper direction={this.state.direction} className={`move-items-${this.state.direction}`}>
    {this.state.items.map(({color, title}) => <CarouselItem width={this.props.size.width/this.state.itemCount} key={title} title={title} color={color}></CarouselItem>)}
    </ItemWrapper>
    </CSSTransition>
    </CarouselBody>
    <CaretLeft onClick={()=> this.moveBackward()}>
      <Caret>&lt;</Caret>
      </CaretLeft>
      <CaretRight onClick={()=> this.moveForward()}>
      <Caret>&gt;</Caret>
      </CaretRight>
    </div>)
  }
}

export default sizeMe()(Carousel);