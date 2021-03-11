import styled from 'styled-components'

export const StyledForm = styled.form`
    color: #69B32D;
    opacity: 70%;
    border-radius: 20px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #0B1517;
    margin: 215px auto 300px auto;
    width: 730px;
    height: 330px;
    
`
export const StyledSection = styled.section`
    grid-column: ${props => props.primerColumna ? "1" : "2"};
    border-left: ${props => props.primerColumna ? "" : "1px solid white"};
    text-align:  ${props => props.primerColumna ? "left" : "center"};
    display: ${props => props.primerColumna ? "" : "flex"};
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`