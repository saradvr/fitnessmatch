import React from 'react'
import { StyledButton } from './styles';


function Button ({type, children, handleClick, isGreen, isWhite, customWidth}){

  return (
    <StyledButton 
      customWidth={customWidth}
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
