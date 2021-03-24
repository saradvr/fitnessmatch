import styled from 'styled-components'

export const StyledForm = styled.form`
    border-radius: 20px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: rgba(105, 179, 45, 0.4);
    margin: 30px auto;
    width: 730px;
    padding: 20px;

`
export const StyledSection = styled.section`
    grid-column: ${props => props.primerColumna ? "1" : "2"};
    border-left: ${props => props.primerColumna ? "" : "1px solid white"};
    flex-direction: column;
    padding: ${props => props.primerColumna ? "15px 30px 30px 15px" : "15px 15px 15px 30px"};
`
export const StyledSelect = styled.select`
    border-radius: 5.5px;
    color: #0B1517;
    font-size: 14px;
    font-family: Roboto;
    font-weight: 300;
    padding: 10px;
    display: block;
    width: 100%;
    border: none;

`
export const StyledP = styled.p`
    font-family: Roboto;
    font-weight: 300;
    color: #FBFCF9;
    font-size: 14px;
`