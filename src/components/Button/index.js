import React from 'react'
import { StyledButton } from './styles';


function Button ({type, children, handleClick, isGreen, isWhite, customWidth, disabled}){

  return (
    <StyledButton 
      customWidth={customWidth}
      green={isGreen}
      white={isWhite}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
    
}



export default Button;
