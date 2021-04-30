import { Link } from "react-router-dom"
import styled from "styled-components"
import backimg from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
    background-image: url(${backimg});
    display: grid;
    grid-template-columns: 3fr 1fr;
    height: 100%;
    position: absolute;
    align-content: center;
    width: 100%;
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
    margin: auto 0 auto auto;
`

export const StyledLink = styled(Link)`
  text-align: center;
`