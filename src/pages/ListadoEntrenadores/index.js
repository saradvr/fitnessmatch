import React from 'react'
import {CoachesList} from '../../components/CoachesList'
import FilterContainer from '../../components/FilterContainer/index'
import {StyledMain, ContainerSection, StyledSection, StyledDescription} from './styles'
import banner from './BannerCoachesList.png'

export function ListadoEntrenadores() {
  return (
    <StyledMain>
      <img 
          src={banner} 
          alt="Grupo de ejercicio"
          width="100%"
        />
      <StyledDescription>
        <p>Desde Fitness Match queremos contribuir a tu bienestar, por eso:</p>
        <p>¡Es momento de definir tu <strong>MATCH</strong>!
          A continuación, encontrarás los perfiles de los entrenadores que se encuentran disponibles según tus objetivos y preferencias. Para encontrar el entrenador ideal, selecciona los filtros de acuerdo a lo que más se ajuste a tus necesidades. Además, puedes entrar a su perfil para ver su información completa y reservar tu cita de valoración.</p>
      </StyledDescription>
      <ContainerSection>
        <StyledSection primerColumna>
          <FilterContainer />
        </StyledSection>
        <StyledSection>
          <CoachesList />
        </StyledSection>
      </ContainerSection>
    </StyledMain>
  )
}
