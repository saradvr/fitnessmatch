import React from 'react'
import { StyledButton } from './styles';


function Button ({type, children, handleClick, isGreen, isWhite}){

  return (
    <StyledButton 
      green={isGreen}
      white={isWhite}
      type={type}
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  )
    
}



export default Button;
