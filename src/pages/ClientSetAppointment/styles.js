import styled from 'styled-components'
import backimg from '../../components/Images/fondoOscuro.webp'

export const StyledMain = styled.main`
  background-image: url(${backimg});
  font-size: 18px;
  font-weight: 300;
  /* position: absolute; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`

export const CalendarHorasSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  height: 380px;
  margin: 30px 0px;

  @media screen and (min-width:870px){
    grid-template-columns: 1fr 1fr;
  }
`

export const CalendarSection = styled.section`
  grid-column: 1;
  border-right: 1px solid white;
`

export const HoursMessageSection = styled.section`
  padding: 20px;
  grid-column: 2;
`

export const HoursSection = styled.section`
  max-width: 310px;
  margin: 35px auto 0 auto;
`

export const MessagesSection = styled.section`
  text-align: center;
`

export const StyledDiv = styled.div`
  display: inline-flex;
  margin: 5px;
`

export const StyledText = styled.p`
  color: #FBFCF9;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 500;
`