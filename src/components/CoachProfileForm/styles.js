import styled from "styled-components"

export const StyledForm = styled.form`
  background-color: rgba(105, 179, 45, 0.4);
  box-sizing: content-box;
  margin: 30px auto;
  width: 90%;
  border-radius: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;


  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

export const StyledSection = styled.section`
  border-top: 1px solid white;
  padding: 15px 30px;

  @media screen and (max-width: 1100px) {
    order: ${props => props.order};
  }

  &:nth-child(3n + 1) {
    border-right: 1px solid white;
    padding: 15px 30px 30px 15px;

    @media screen and (max-width: 1100px) {
      border-right: 0;
    }
  }

  &:nth-child(3n) {
    border-left: 1px solid white;

    @media screen and (max-width: 1100px) {
      border-left: 0;
    }
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    border-top: 0;
  }
`

export const StyledLabel = styled.label`
  font-family: Roboto;
  font-weight: 700;
  font-size: 16px;
  color: #FBFCF9;
  display: block;
  margin: 10px;
`

export const StyledTextArea = styled.textarea`
  width: 100%;
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
  justify-content: center;
  padding: ${props => props.expYears ? "10px" : ""}
  
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
  font-weight: 300;
  font-size: 16px;
  color: #FBFCF9;
  display: block;
  margin: ${props => props.textArea ? "0px" : "10px auto"};
  width: 100%;
  height: ${props => props.textArea ? "242px" : ""};
`

export const StyledRedes = styled.div`
  flex-wrap: wrap;
  color: #FBFCF9;
  display: flex;
  justify-content: center;
  
`
export const StyledRed = styled.div`
  padding: 5px;
  font-size: 32px;
  
`
export const StyledPicture = styled.div`
  display: ${props => props.picture ? "grid" : "flex"};
  justify-content: center;
`