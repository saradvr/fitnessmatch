import styled from 'styled-components'
import backimg from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
  /* background-color: #396118; */
  background-image: url(${backimg});
  color: #FBFCF9;
  font-size: 18px;
  font-weight: 300;
`

export const ContainerSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width:768px){
    grid-template-columns: 2fr 5fr;
    margin: 0 50px;
  }
`

export const StyledSection = styled.section`
  margin: 20px;
`

export const StyledDescription = styled.section`
  margin: 0 20px;

  @media screen and (min-width: 769px){
    margin: 0 70px;
  }
`
