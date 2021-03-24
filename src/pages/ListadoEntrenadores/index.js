import React from 'react'
import axios from 'axios'
import qs from 'qs'
import {CoachesList} from '../../components/CoachesList'
import FilterContainer from '../../components/FilterContainer/index'
import {StyledMain, ContainerSection, StyledSection, StyledDescription} from './styles'
import banner from './BannerCoachesList.png'

async function getCoaches(params) {
  try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches',
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" })
        }
      })
      return data
    } catch (error) {
      console.log(`Hubo un error en el req: ${error}`)
    }
}

export class ListadoEntrenadores extends React.Component {
  state = {
    coaches: [],
    checkDisciplines: [],
    checkSpecializations: [],
    minFee: 0,
    maxFee: 1000000,
    loading: false,
    specializations: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    })
    const {minFee, maxFee, checkDisciplines, checkSpecializations} = this.state
    const dataCoaches = await getCoaches({
      minFee,
      maxFee,
      checkDisciplines,
      checkSpecializations,
    })
    const specializations = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/specializations'
    })
    const disciplines = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/disciplines'
    })
    this.setState({
      coaches: dataCoaches,
      specializations: specializations.data,
      disciplines: disciplines.data,
      loading: false,
    })
  }

  

  handleSubmit = async e => {
    e.preventDefault()
    const {checkDisciplines, checkSpecializations, minFee, maxFee} = this.state
    const dataCoaches = await getCoaches({
      minFee,
      maxFee,
      checkSpecializations,
      checkDisciplines,
    })
    this.setState({
      coaches: dataCoaches
    })
  }

  handleChange = e => {
    const { name, id, type, value } = e.target
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
    const {loading, coaches, specializations, disciplines, checkDisciplines, checkSpecializations, minFee, maxFee} = this.state
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
          {loading && <p>Cargando entrenadores disponibles...</p>}
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