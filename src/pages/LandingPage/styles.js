import styled from 'styled-components'
import backimg from '../../components/Images/fondoOscuro.webp'
import imgBienvenida from './bienvenida.png'

export const StyledMain = styled.main`
  background-image: url(${backimg});
  position: absolute;
  height: 100%;
`

export const ImgBienvenidaSection = styled.section`
  background-image: url(${imgBienvenida});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`

export const TextSection = styled.section`
  display: grid;
  grid-column: 2;
  padding: 30px 30px 0 30px;
  text-align: center;
`

export const LogoFM = styled.img`
  width: 75%;
  margin: 0 auto;
`

export const Text = styled.p`
  color: #FBFCF9;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 300;
  margin: 20px;
`

export const DivButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  justify-items: center;
  margin-bottom: 30px;
`