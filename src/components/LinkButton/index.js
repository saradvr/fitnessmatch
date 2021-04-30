import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkButton = styled(Link)`
  border: 1px solid ${props => props.green ? "none" : "#FBFCF9"};
  background-color: ${props => props.green ? "#69B32D" : "none"};
  color: #FBFCF9;
  text-decoration: none;
  padding: 10px;
  width: auto;
  display: block;
  margin: 0 0 0 auto;
  max-width: 100%;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 700;
  border-radius: 5.5px;
  text-align: center;
  align-self: center;

  @media screen and (min-width:768px){
    display: inline-block;
    width: 125px;
    margin: 0;
  }

  &:hover {
    background-color: ${props => props.green ? "rgba(105,179,45,0.5)" : "rgba(251,251,249,0.7)"};
    border: 1px solid #FBFCF9;
    color: ${props => props.green ? "#FBFCF9" : "#396118"};
    text-decoration: none;
  }
`
