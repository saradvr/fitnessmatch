import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNav = styled.nav`
  background-color: #0B1517;
  flex-direction: column;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const LogoSection = styled.section`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const NavSection = styled.section`
  grid-column: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #FBFCF9;
  margin: 20px;
  margin-top: 20px;
  font-family: 'Roboto';
  font-size: 16px;

  &:hover{
    cursor: pointer;
    color: #69B32D;
  }
`

export const HeaderButton = styled.button`
  color: #FBFCF9;
  margin: 20px;
  border: none;
  background-color: transparent;
  font-family: 'Roboto';
  font-size: 16px;

  &:hover{
    cursor: pointer;
    color: #69B32D;
  }
`

export const StyledImage = styled.img`
  align-self: left;
  width: 100px;
  margin: 5px 0 5px 10px;
  vertical-align: middle;
`