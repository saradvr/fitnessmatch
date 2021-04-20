import React from 'react'
import Button from '../Button'
import FormInputs from '../FormInputs'
import Filter from '../Filter'
import { useHistory } from 'react-router'
import { StyledForm, StyledSection1, StyledSection2, StyledLabel, StyledTextArea, StyledTopContainer, StyledTop, StyledMid, StyledSpan } from './styles'
import { changeDescription, changeExperience, changeName, changePrice, editProfile, changeError, GET_COACH } from '../../store/coachesProfileReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getDisciplines } from '../../store/disciplinesReducer'
import { getSpecializations } from '../../store/specializationsReducer'
import { toggleSpecialization, toggleDiscipline } from '../../store/coachesProfileReducer'
import axios from 'axios'



function CoachProfileForm (){


  const history = useHistory()
  const {
    name,
    description,
    experience,
    price,
    specializations, 
    checkSpecializations, 
    disciplines,
    checkDisciplines,
    edit,
    error,
    coach,
    } = useSelector(({
      coachesProfileReducer,
      specializationReducer,
      disciplineReducer,
    })=>({
    name: coachesProfileReducer.name,
    description: coachesProfileReducer.description,
    experience: coachesProfileReducer.experience,
    price: coachesProfileReducer.price,
    specializations: specializationReducer.specializations,
    checkSpecializations: coachesProfileReducer.checkSpecializations,
    disciplines: disciplineReducer.disciplines,
    checkDisciplines: coachesProfileReducer.checkDisciplines,
    edit: coachesProfileReducer.edit,
    error: coachesProfileReducer.error,
    coach: coachesProfileReducer.coach,
  }))


  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
  }, [])
  const dispatch = useDispatch()

  async function handleSubmit (e){
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios ({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches/profile',
        data: {
          name,
          description,
          experienceYears: experience,
          appointmentFee: price,
          disciplines: checkDisciplines,
          specializations: checkSpecializations,
        },
        headers:{
          Authorization: `bearer ${token}`
        }
      })
      dispatch({type: GET_COACH, payload: data.coach})
      dispatch(editProfile(!edit))
    } catch(error) {
        dispatch(changeError(error.response.data.message))
    }
  }
  return(

    <StyledForm>
      
      <StyledSection1 primerColumna>
        
        {edit === false ? (
          <Button
            type="button"
            handleClick={() => dispatch(editProfile(!edit))}
          >
            Editar perfil
          </Button>
          ) : ("")
        }

        {edit === true ? (
          <Button
            type="button"
            handleClick={handleSubmit}
          >
            Guardar cambios
          </Button>
          ) : ("")
        }

        {edit === true ? (
          <Button
            type="button"
            handleClick={() => dispatch(editProfile(!edit))}
          >
            Cancelar
          </Button>
          ) : ("")
        }

        {error && <p> {error} </p>}
        {edit === true ? (
          <FormInputs
            id="name"
            type="text"
            name="name"
            onChange={(e)=> dispatch(changeName(e.target.value))}
            value={name}
          >
            Nombre
          </FormInputs>) :
          (<StyledSpan>{coach.name}</StyledSpan>)
        }
      </StyledSection1>
      <StyledSection1>
        <StyledTop>
          <StyledTopContainer align="right">
            <Button
              type="button"
              >
              Ver transacciones
            </Button>
            <Button
              type="button"
              >
              Ver agenda
            </Button>
          </StyledTopContainer>
            
          <StyledTopContainer>
            <StyledLabel for="description">Descripción</StyledLabel>
          </StyledTopContainer>
        </StyledTop>
      
        {edit === true ? (
          <StyledTextArea
            id="description"
            name="description"
            onChange={(e)=> dispatch(changeDescription(e.target.value))}
            value={description}
          >
            Esta es una breve descripción acerca del entrenador
          </StyledTextArea>
          ) : 
          (<StyledSpan textArea>{coach.description}</StyledSpan>)
        }
      </StyledSection1>

      <StyledSection2 primerColumna>
        <StyledLabel>Especializaciones</StyledLabel>
        {edit === true ? (
          <Filter
            filterName={specializations}
            nameCheckbox='checkSpecializations'
            checks = {checkSpecializations}
            handleChange = {(e) => dispatch(toggleSpecialization(checkSpecializations.includes(e.target.id), e.target.id))}
          />
         ) : 
         (<StyledSpan>{coach.specializations ? coach.specializations
          .map((el)=> <li>{el.name}</li>) : "" }
          </StyledSpan>)
        }
      </StyledSection2>

      <StyledSection2 segundaColumna>
        <StyledMid>
          <StyledLabel>Años de experiencia</StyledLabel>
          {edit === true ? (
            <FormInputs
              id="experience"
              type="text"
              name="experience"
              onChange={(e)=> dispatch(changeExperience(e.target.value))}
              value={experience}
            />) : 
            (<StyledSpan>{coach.experienceYears}</StyledSpan>)
          }
          <StyledLabel>Precio cita</StyledLabel>
          {edit === true ? (
            <FormInputs
              id="price"
              type="text"
              name="price"
              onChange={(e)=> dispatch(changePrice(e.target.value))}
              value={price}
            />) : 
            (<StyledSpan>{coach.appointmentFee}</StyledSpan>)
          }
        </StyledMid>
        <StyledMid>
          <StyledLabel>Redes sociales</StyledLabel>
        </StyledMid>
        
      </StyledSection2>

      <StyledSection2>
        <StyledLabel>Disciplinas</StyledLabel>
        {edit === true ? (
          <Filter
          filterName={disciplines}
          nameCheckbox='checkDisciplines'
          checks = {checkDisciplines}
          handleChange = {(e) => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
        />
        ) : (
          <StyledSpan>{coach.disciplines ? coach.disciplines.map((el)=> <li>{el.name}</li> ) : "" }</StyledSpan>
        )}
      </StyledSection2>
    </StyledForm> 

  )
}

export default CoachProfileForm

