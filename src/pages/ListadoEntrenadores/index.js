import React from 'react'
import {dataCoaches} from '../../dataCoaches'
import {CoachesList} from '../../components/CoachesList'
import {disciplines} from '../../dataDisciplines'
import {specializations} from '../../dataSpecializations'
import FilterContainer from '../../components/FilterContainer/index'
import {StyledMain, ContainerSection, StyledSection, StyledDescription} from './styles'
import banner from './BannerCoachesList.png'

export class ListadoEntrenadores extends React.Component {
  state = {
    coaches: dataCoaches,
    checkDisciplines: [],
    checkSpecializations: [],
    minFee: 0,
    maxFee: 1000000,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {checkDisciplines, checkSpecializations, minFee, maxFee} = this.state
    if (checkDisciplines.length === 0 && checkSpecializations.length === 0 ) {
      this.setState({
        coaches: dataCoaches,
      })
    } else {
      this.setState({
        coaches: dataCoaches.filter( element => {
          const discipline = element.disciplines.some(item => {
            return checkDisciplines.includes(item)
              
          })
          const specialization = element.specializations.some(item => {
            return checkSpecializations.includes(item)
          })
          return (discipline || specialization) && element.appointmentFee <= maxFee && element.appointmentFee >= minFee
        })
      })
    }
  }

  handleChange = e => {
    const { name, id, type, value } = e.target
    console.dir(e.target)
    if ( type === 'checkbox' ) {
      this.setState((prevState) => ({
        [name]: prevState[name].includes(id) ? prevState[name].filter(item => item !== id) : [...prevState[name], id],
      })) 
    } else {
      this.setState({
        [name]: value,
      })
    }
  }


  render(){
    const {coaches, checkDisciplines, checkSpecializations, minFee, maxFee} = this.state;
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
            <FilterContainer
              disciplines = {disciplines}
              checkDisciplines = {checkDisciplines}
              specializations = {specializations}
              checkSpecializations = {checkSpecializations}
              minFee = {minFee}
              maxFee = {maxFee}
              handleChange = {this.handleChange}
              handleSubmit = {this.handleSubmit}
            />          
          </StyledSection>
          <StyledSection>
            <CoachesList
              coaches={coaches}
            />
          </StyledSection>
        </ContainerSection>
      </StyledMain>
    );
  };
};