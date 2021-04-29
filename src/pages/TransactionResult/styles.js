import styled from 'styled-components'
import backimg from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
  background-image: url(${backimg});
  font-size: 18px;
  font-weight: 300;
  padding: 30px;
  font-family: 'Roboto';
  position: absolute;
  height: 100%;
  width: 100%;
  align-content: center;
`

export const ResultContainer = styled.section`
  background-color: rgba(105, 179, 45, 0.5);
  width: 50%;
  margin: auto;
  color: #FBFCF9;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export const StyledText = styled.p`
  color: #FBFCF9;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 300;
`

export const AppointmentDate = styled.p`
  font-size: 18px;
  font-weight: 500;
`