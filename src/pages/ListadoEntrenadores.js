import React from 'react'
import {dataCoaches} from '../dataCoaches'
import {CoachesList} from '../components/CoachesList'
import {disciplines} from '../dataDisciplines'
import {specializations} from '../dataSpecializations'
import FilterContainer from '../components/FilterContainer'

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
            return checkDisciplines.includes(item.toLowerCase().replace(/ /g, ""))
              
          })
          const specialization = element.specializations.some(item => {
            return checkSpecializations.includes(item.toLowerCase().replace(/ /g, ""))
          })
          return (discipline || specialization) && element.appointmentFee <= maxFee && element.appointmentFee >= minFee
        })
      })
    }
  }

  handleChange = e => {
    const { name, value, type } = e.target
    
    if ( type === 'checkbox' ) {
      this.setState((prevState) => ({
        [name]: prevState[name].includes(value) ? prevState[name].filter(item => item !== value) : [...prevState[name], value],
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
      <main className="mainPage">
        <section className="explanation">
          <img 
            src="data:image/png;base64,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" 
            alt="Grupo de ejercicio"
            width="100%"
          />
          <p className="explanation__descriptionParagraph">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </section>
        <section>     
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
        </section>
        <section className="coachesResults">
          <h1>Listado de entrenadores</h1>
          <CoachesList
            coaches={coaches}
          />
        </section>
      </main>
    );
  };
};