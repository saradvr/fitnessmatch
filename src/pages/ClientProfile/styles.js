import styled from 'styled-components'
import background from '../../components/Images/fondoOscuro.webp'

export const StyledImg = styled.img`
  display: block;
  height: 140px;
  margin: 0px 0px 0px 30px;
`

export const StyledForm = styled.form`
  background-color: rgba(105,179,45,0.4);
  box-sizing: border-box;
  margin: auto;
  width: 50%;
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  
  @media screen and (min-width:768px){
    background-color: rgba(105,179,45,0.4);
    box-sizing: border-box;
    margin: auto;
    width: 50%;
    display: grid;
    padding: 20px;
    grid-template-columns: 1fr 1fr;
  }
`

export const StyledSection = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  border-left: ${props => props.primerColumna ? "" : "1px solid white"};
  text-align: ${props => props.primerColumna ? "left" : "center"};
  display: ${props => props.primerColumna ? "": "flex"};
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.primerColumna ? "15px 30px 15px 15px" : "15px"};
  font-family: Roboto;
  color: #FBFCF9;
`
export const StyledSection1 = styled.section`
  grid-column: ${props => props.primerColumna ? "1" : "2"};
  border-left: ${props => props.primerColumna ? "" : "1px solid white"};
  text-align: ${props => props.primerColumna ? "left" : "center"};
  display: ${props => props.primerColumna ? "": "flex"};
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.primerColumna ? "15px 30px 15px 15px" : "15px"};
  font-family: Roboto;
  color: #FBFCF9;
`
export const StyledSection2 = styled.section`
  grid-column: 3
`

export const StyledParagraph = styled.p`
  font-size: 14px;
  font-family: Roboto;
  color: #FBFCF9;
  border: 1px solid white;
`
export const StyledMain = styled.main`
  background-image: url(${background});
  position: absolute;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding-top: 60px
`
export const StyledLabel = styled.label`
  border: 1px solid white;
  border-radius: 30px;
  padding: 0px 30px 0px 30px;

  @media screen and (max-width:1760px){
    display: inline-block;
    margin: 0;
  }
`
export const StyledLabelEdit = styled.label`
  display: block;

`