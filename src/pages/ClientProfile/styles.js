import styled from 'styled-components'
import logo from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
  background-image: url(${logo});
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