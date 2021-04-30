import React from 'react'
import { StyledButton } from './styles';


function Button ({
  type, 
  children, 
  handleClick, 
  isGreen, 
  isWhite,
  fondoClaro, 
  customWidth, 
  disabled}){

  return (
    <StyledButton 
      customWidth={customWidth}
      green={isGreen}
      white={isWhite}
      fondoClaro={fondoClaro}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
    
}



export default Button;
