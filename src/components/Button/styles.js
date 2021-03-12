import styled from 'styled-components';

export const StyledButton = styled.button`
  border: 1px solid #FBFCF9;
  background-color: ${props => props.green ? "#69B32D" : "transparent"};
  color: #FBFCF9;
  text-decoration: none;
  padding: 10px;
  width: 145px;
  display: inline-block;
  max-width: 100%;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 700;
  border-radius: 5.5px;
  text-align: center;
  margin: 10px 0;
`