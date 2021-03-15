import styled from "styled-components"

export const StyledForm = styled.form`
  background-color: rgba(105,179,45,0.4);
  box-sizing: border-box;
  margin: 30px auto;
  width: 580px;
  border-radius: 20px;
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
`
export const StyledSection = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  border-left: ${props => props.primerColumna ? "" : "1px solid white"};
  text-align: ${props => props.primerColumna ? "left" : "center"};
  display: ${props => props.primerColumna ? "": "flex"};
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.primerColumna ? "15px 30px 15px 15px" : "15px"};
`