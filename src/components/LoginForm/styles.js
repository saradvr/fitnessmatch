import styled from "styled-components"

export const StyledForm = styled.form`
  background-color: #69B32D;
  box-sizing: border-box;
  margin: auto;
  width: 690px;
  border-radius: 20px;
  display: grid;
  padding: 35px;
  grid-template-columns: 1fr 1fr;
`
export const StyledSection = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  border-left: ${props => props.primerColumna ? "" : "1px solid white"};
  text-align: ${props => props.primerColumna ? "left" : "center"};
  display: ${props => props.primerColumna ? "": "flex"};
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`