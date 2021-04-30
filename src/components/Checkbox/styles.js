import styled from 'styled-components';

export const StyledInputCheckbox = styled.div`
  display: block;
  font-size: 14px;
  color: ${props => props.black ? '#0B1517' : '#FBFCF9'};
  font-family: 'Roboto';
  font-weight: 300;
`

export const StyledInput = styled.input `
  margin: ${props => props.marginLeft ? `10px 10px 10px ${props.marginLeft}` : '10px 10px 10px 0px'};
`
