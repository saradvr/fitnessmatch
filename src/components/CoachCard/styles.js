import styled from 'styled-components';

export const StyledArticle = styled.article`
  border-radius: 20px;
  margin: 20px;
  padding: 20px;
  background-color: #FBFCF9;
  width: auto;
  font-family: "Roboto";
  color: #0B1517;
`

export const StyledH2 = styled.h2`
  margin: 10px 0 10px 0;
`

export const StyledTd = styled.td`
  text-align: ${props => props.alignCenter ? 'center' : props.alignRight ? 'right' : 'left'};
  padding: 0 10px 0 10px;
`