import styled from 'styled-components'

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
export const StyledInputWeightEdit = styled.input`
display: block;
`
export const StyledInputHeightEdit = styled.input`
display: block;
`

export const StyledButtonEdit = styled.button`
  display: block;
`
export const StyledButtonSave = styled.button`
  display: block;
`

export const StyledSectionEdit = styled.div`
  display: block;
`
export const StyledInputName = styled.input`
  
`