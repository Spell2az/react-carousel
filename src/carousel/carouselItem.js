import React from 'react'
import styled from 'styled-components';

const ItemBody = styled.div`
background-color: ${({color}) => color};
text-align: center;
line-height: 100%;
vertical-align: middle;
min-width: ${({width}) => width}px;

`;


const carouselItem = ({color,width, title}) => {
  return (<ItemBody width={width} color={color}>
    {title}
    </ItemBody>)
}


export default carouselItem;