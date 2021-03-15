import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
`

export const StyledArticle = styled.article`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(251,252,249,0.5);
  width: auto;
  font-family: "Roboto";
  color: #0B1517;
`

export const StyledH2 = styled.h2`
  margin: 0;
  font-size: 22px;
  color: #FBFCF9;
`

export const StyledTd = styled.td`
  text-align: ${props => props.alignCenter ? 'center' : props.alignRight ? 'right' : 'left'};
  padding: 0 10px 0 10px;
  font-size: 14px;
`

export const StyledImg = styled.img`
  width: 100%;

  @media screen and (min-width: 540px) {
    width: 180px;
  }

  @media screen and (min-width: 1024px) {
    width: 200px;
  }
`