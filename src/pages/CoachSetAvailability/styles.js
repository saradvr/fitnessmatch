import styled from 'styled-components'
import backimg from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
  background-image: url(${backimg});
  font-size: 18px;
  font-weight: 300;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width:870px){
    grid-template-columns: 1fr 2fr 1fr;
  }
`
export const AvailabilitySection = styled.section`
  background-color: rgba(105,179,45,0.5);
  padding: 15px;
  border-radius: 20px;
  grid-column: 1;
  text-align: center;
  margin: 26px;
  min-width: 213px;
`
export const AppointmentsSection = styled.section`
  background-color: rgba(251, 252, 249, 0.5);
  padding: 15px;
  border-radius: 20px;
  grid-column: 1;
  text-align: center;
  margin: 26px;
  min-width: 213px;

  @media screen and (min-width:870px){
    grid-column: 3;
  }
`

export const StyledParagraph = styled.p`
  color: #FBFCF9;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 500;
`

export const StyledH2 = styled.h2`
  color: #FBFCF9;
  font-size: 18px;
  font-family: 'Roboto';
`

export const CalendarSection = styled.section`
  grid-column: 1;
  margin-top: 26px;
  
  @media screen and (min-width:870px){
    grid-column: 2;
  }
`