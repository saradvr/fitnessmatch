import styled from 'styled-components';

export const StyledButton = styled.button`
  border: #FBFCF9;
  background-color: ${props => props.green ? "#69B32D" : "none"};
  color: #FBFCF9;
  text-decoration: none;
  padding: 10px;
  width: 145px;
  display: inline-block;
  max-width: 100%;
  font-size: 18px;
  font-family: "Roboto";
  font-weight: 700;
  border-radius: 5.5px;
  text-align: center;
`