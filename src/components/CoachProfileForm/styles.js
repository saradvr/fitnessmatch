import styled from "styled-components"

export const StyledForm = styled.form`
  background-color: rgba(105, 179, 45, 0.4);
  box-sizing: content-box;
  margin: 30px auto;
  width: 90%;
  border-radius: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
   
`

export const StyledSection1 = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  border-left: ${props => props.primerColumna ? "" : "1px solid white"};
  padding: ${props => props.primerColumna ? "15px 30px 30px 15px" : "15px 15px 15px 30px"};
  
`

export const StyledSection2 = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : props.segundaColumna ? "2" : "3"};
  border-left: ${props => props.primerColumna ? "" : props.segundaColumna ? "1px solid white" : "1px solid white" };
  border-top: ${props => props.primerColumna ? "1px solid white" : props.segundaColumna ? "1px solid white" : "1px solid white" };
  padding: ${props => props.primerColumna ? "15px 30px 30px 15px" : props.segundaColumna ? "15px 30px 15px 30px" : "15px 30px 15px 30px"};
  
  
`
export const StyledLabel = styled.label`
  font-family: Roboto;
  font-weight: 700;
  font-size: 16px;
  color: #FBFCF9;
  display: block;
  margin: 10px auto 10px auto;
`

export const StyledTextArea = styled.textarea`
  width: 755px;
  height: 242px;
  margin: 0px;
`

export const StyledTop = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
`
export const StyledMid = styled.div`
  align-items: center;
  display: flex;
  width: 50%;
  label:first-child {
    margin-right: 0.5em;
  }
  
`

export const StyledTopContainer = styled.div`
  text-align: ${props => props.align || "left" };
  width: 50%;

  button:first-child {
    margin-right: 0.5em;
  }
`

export const StyledSpan = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 16px;
  color: #FBFCF9;
  display: block;
  margin: ${props => props.textArea ? "0px" : "10px auto 10px auto"};
  width: ${props => props.textArea ? "755px" : ""};
  height: ${props => props.textArea ? "242px" : ""};
`

