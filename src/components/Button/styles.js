import styled from 'styled-components';

export const StyledButton = styled.button`
  border: 1px solid #FBFCF9;
  background-color: 
    ${props => 
      props.green ? "#69B32D" : 
      props.white ? "#FBFCF9" : 
      "transparent"
    };
  color:
    ${props => 
      props.white ? "#396118" : 
      "#FBFCF9"
    };
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
  margin: ${props => props.registrarme ? "40px 10px 10px 0px" : "10px auto" };

  &:hover {
    cursor: pointer;
    background-color: rgba(251,251,249,0.7);
    color: #396118;
  }
`