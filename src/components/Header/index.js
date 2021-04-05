import { HeaderLink, StyledNav, StyledImage, HeaderButton, NavSection, LogoSection } from './styles'
import logo from '../../components/Images/Logo-fondoOscuro.png'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


export function Header() {
  const history = useHistory()

  function handleClick() {
    localStorage.clear()
    history.push('login')
  }
  const token = localStorage.getItem('token')
  return (
    <StyledNav>
      <LogoSection logo>
        <Link to="/"><StyledImage src={logo} alt="Logo FitnessMatch" /></Link>
      </LogoSection>
      <NavSection>
        <HeaderLink to="/">Inicio</HeaderLink>
        
        {!token && <HeaderLink to="/signup">Registrarse</HeaderLink>}
        {!token && <HeaderLink to="/login">Iniciar Sesión</HeaderLink>}
        {token && <HeaderLink to="/coacheslist">Entrenadores</HeaderLink>}
        {token && <HeaderButton type="button" onClick={handleClick}>Cerrar sesión</HeaderButton>}
      </NavSection>
    </StyledNav>
  )
}
