import React from 'react';
import styled from 'styled-components';

const CaretWrapper = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: papayawhip;
z-index: 1000;
font-size: 50px;
cursor: pointer;
`
const caret = ({children}) => (<CaretWrapper>{children}</CaretWrapper>)


export default caret;