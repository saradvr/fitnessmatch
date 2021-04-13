import styled from 'styled-components'
import DatePicker from 'react-date-picker'
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

export const StyledDatePicker = styled(DatePicker)`
  font-family: 'Roboto';
  display: block;
  text-align: center;
  margin-top: 30px;

  & button {
    font-family: 'Roboto';
  }
  & .react-calendar__tile--active, .react-calendar__tile--active:enabled:focus{
    background: #69B32D;
  }
  & .react-calendar__tile--active:hover{
    background: #396118;
  }
  & .react-calendar__tile--now{
    background: rgba(105, 179, 45, 0.4);
    color: black;
    font-weight: 500;
  }

  & .react-calendar {
    font-family: 'Roboto';
    border-radius: 10px;
    border-color: #69B32D;
  }

  & .react-calendar__navigation__label__labelText {
    font-family: 'Roboto';
    color: #FBFCF9;
    font-weight: 500;
  }

  & .react-calendar__navigation, .react-calendar__navigation button {
    background: #69B32D;
    border-radius: 10px 10px 0 0;
    color: #FBFCF9;
  } 

  & .react-date-picker__inputGroup{
    text-align: center;
  }

  & .react-date-picker__button:enabled:hover .react-date-picker__button__icon, .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
    stroke: red;
  }

  & .react-date-picker__clear-button__icon {
    stroke: #FBFCF9;
  }

  & .react-date-picker__calendar-button__icon {
    stroke: #69B32D !important;
  }

  & .react-date-picker__calendar-button__icon:hover {
    stroke: #396118 !important;
  }

  & .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus{
    background: rgba(57, 97, 24, 0.6);
  }

  & .react-date-picker__wrapper {
    display: inline-flex;
    border: 1px #69B32D solid;
    border-radius: 5px;
    color: #FBFCF9;
  }

  & .react-date-picker__wrapper input {
    color: #FBFCF9;
  }

  & .react-date-picker__calendar{
    position: unset !important;
    margin: 10px auto;
    align-self: center;
  }

  & .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus{
    background: #396118;
  }

  & .react-date-picker__calendar--closed {
    display: block;
  }
`