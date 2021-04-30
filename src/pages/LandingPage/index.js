import { Header } from "../../components/Header";
import { DivButtons, ImgBienvenidaSection, LogoFM, StyledMain, Text, TextSection } from "./styles";
import logo from '../../components/Images/Logo-fondoOscuro.png'
import { LinkButton } from '../../components/LinkButton'

export function LandingPage() {
  const token = localStorage.getItem('token')
  return (
    <>
      <Header />
      <StyledMain>
        <ImgBienvenidaSection>
          <TextSection>
            <LogoFM src={logo} alt="Logo FitnessMatch" />
            <Text>En <strong>FitnessMatch</strong> queremos que cumplas todos tus objetivos, por eso, 
              en esta plataforma queremos conectar entrenadores especialistas en 
              diferentes objetivos y disciplinas que brinden entrenamiento personalizado con
              aquellas personas que quieren tener una vida más saludable a través del ejercicio. 
              <br />
              <br />
              Ten presente que para acceder a nuestros servicios debes tener un perfil en la plataforma.
            </Text>
            {!token ?
              <DivButtons>
                <LinkButton to={'/login'} green={true}>Iniciar Sesión</LinkButton>
                <LinkButton to={'/signup'} green={true}>Registrarme</LinkButton>
              </DivButtons>
              :
              <DivButtons>
                <LinkButton to={'/profile'} green={true}>Mi perfil</LinkButton>
                <LinkButton to={'/coacheslist'} green={true}>Entrenadores</LinkButton>
              </DivButtons>
            }
          </TextSection>
        </ImgBienvenidaSection>
      </StyledMain>
    </>
  )
}