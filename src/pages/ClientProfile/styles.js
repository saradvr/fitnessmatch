import styled from 'styled-components'
import logo from '../../components/Images/fondoOscuro.webp'

/*Renders if edit === false*/

export const StyledMain = styled.main`
  
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 94%;
`

export const StyledSection = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  display: flex;
  flex-direction: column;
`
export const StyledImage = styled.img`
  height: 110px;
  width: 110px;
`
export const StyledParagraph = styled.p`
  display: inline;
`
export const StyledLabel = styled.label`

`

/*Renders if edit === true*/

export const StyledInputWeightEdit = styled.input`
display: ${props => props.edit === true ? 'block' : 'none'}
`
export const StyledInputHeightEdit = styled.input`
display: ${props => props.edit === true ? 'block' : 'none'}
`

export const StyledButtonEdit = styled.button`
  display: ${props => props.edit === false ? 'block' : 'none'}
`
export const StyledButtonSave = styled.button`
  display: ${props => props.edit === true ? 'block' : 'none'}
`

export const StyledSectionEdit = styled.div`
  display: ${props => props.edit === true ? 'block' : 'none'} 
`
