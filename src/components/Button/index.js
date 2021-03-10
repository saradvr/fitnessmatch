import React from 'react'
import { StyledButton } from './styles';


function Button ({type, children, handleClick, isGreen}){

  return (
    <StyledButton green={isGreen}
      type={type}
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  )
    
}



export default Button;
