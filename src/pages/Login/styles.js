import styled from "styled-components"
import backimg from '../../components/Images/fondoOscuro.webp'
import { Link } from "react-router-dom"

export const StyledMain = styled.main`
  background-image: url(${backimg});
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 100%;
  position: absolute;
  align-content: center;
`

export const StyledSection = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  display: flex;
  flex-direction: column;
`

export const StyledImage = styled.img`
  align-self: center;
  width: 35%;
  margin-top: 20px;
`

export const StyledBackImg = styled.img`
  position: relative;
  height: 578px;
  width: auto;
  z-index: 1;
`

export const StyledLink = styled(Link)`
  text-align: center;
`
