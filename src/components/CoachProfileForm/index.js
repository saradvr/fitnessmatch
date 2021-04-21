import axios from 'axios'
import React from 'react'
import Button from '../Button'
import FormInputs from '../FormInputs'
import { LinkButton } from '../LinkButton'
import Filter from '../Filter'
import { StyledForm, StyledSection1, StyledSection2, StyledLabel, StyledTextArea, StyledTopContainer, StyledTop, StyledMid, StyledSpan, StyledRedes, StyledRed, StyledPicture } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDisciplines, toggleDiscipline, addDiscipline } from '../../store/disciplinesReducer'
import { addSpecialization, getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FileUploader } from '../FileUploader'
import { getCoach, SAVE_COACH, COACHES_ERROR } from '../../store/coachesReducer'



function CoachProfileForm (){

  const [edit,setEdit] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
    dispatch(getCoach())
  }, [])

  const {
    checkSpecializations,
    specializations, 
    disciplines,
    checkDisciplines,
    coach,
    } = useSelector(({
      specializationReducer,
      disciplineReducer,
      coachReducer,
    })=>({
    checkSpecializations: specializationReducer.checkSpecializations,
    specializations: specializationReducer.specializations,
    disciplines: disciplineReducer.disciplines,
    checkDisciplines: disciplineReducer.checkDisciplines,
    coach: coachReducer.coach,
  }))


  async function handleSubmit (e){
    e.preventDefault()
    console.log(checkDisciplines)
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
      dispatch({type: SAVE_COACH, payload: data.coach})
      setEdit(false)
    } catch(error) {
        dispatch({type: COACHES_ERROR, payload: error})
    }
  }
  
  return(

    <StyledForm>
      
      <StyledSection1 primerColumna>
        <StyledPicture picture>
          {coach.profilePicture !== undefined && <FileUploader initialPicture={coach.profilePicture} url='/coaches/profile/picture'/>}
        </StyledPicture>
        
        <StyledPicture>
          {edit === true ? (
            <FormInputs
              id="name"
              type="text"
              name="name"
              onChange={(e)=> setName(e.target.value)}
              value={name}
            >
              Nombre
            </FormInputs>) :
            (<StyledLabel>{coach.name}</StyledLabel>)
          }
        </StyledPicture>
      </StyledSection1>
      <StyledSection1 segundaColumna>
        <StyledTop>
          <StyledTopContainer align="right">
            <Button customWidth='175px'
              type="button"
              >
              Ver transacciones
            </Button>
            <LinkButton to='/profile/availability'>
              Ver agenda
            </LinkButton>
          </StyledTopContainer>
            
          <StyledTopContainer>
            <StyledLabel for="description">Descripción</StyledLabel>
          </StyledTopContainer>
        </StyledTop>
      
        {edit === true ? (
          <StyledTextArea
            id="description"
            name="description"
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
          >
            Esta es una breve descripción acerca del entrenador
          </StyledTextArea>
          ) : 
          (<StyledSpan textArea>{coach.description}</StyledSpan>)
        }
      </StyledSection1>
      <StyledSection1>
        <StyledRedes>
          <StyledRed>
            {edit === false ? (
              <Button
                type="button"
                handleClick={() => {
                  setName(coach.name)
                  setDescription(coach.description)
                  setExperience(coach.experienceYears)
                  setPrice(coach.appointmentFee)
                  setEdit(true)
                  if( coach.specializations.length > 0){
                    coach.specializations.map(el => checkSpecializations.includes(el._id) ? "" : dispatch(addSpecialization(el._id)))
                  }
                  if( coach.disciplines.length > 0){
                    coach.disciplines.map(el => checkDisciplines.includes(el._id) ? "" : dispatch(addDiscipline(el._id)))
                  }
                }}
              >
                Editar perfil
              </Button>
              ) : ("")
            }
          </StyledRed>

          <StyledRed>
            {edit === true ? (
              <Button
                type="button"
                handleClick={handleSubmit}
              >
                Guardar cambios
              </Button>
              ) : ("")
            }
          </StyledRed>

          <StyledRed>
            {edit === true ? (
              <Button
                type="button"
                handleClick={() => setEdit(false)}
              >
                Cancelar
              </Button>
              ) : ("")
            }
          </StyledRed>
        </StyledRedes>
        
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
        <StyledMid expYears>
          <StyledLabel>Años de experiencia</StyledLabel>
          {edit === true ? (
            <FormInputs
              id="experience"
              type="text"
              name="experience"
              onChange={(e)=> setExperience(e.target.value)}
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
              onChange={(e)=> setPrice(e.target.value)}
              value={price}
            />) : 
            (<StyledSpan>{coach.appointmentFee}</StyledSpan>)
          }
        </StyledMid>
        <StyledMid>
          <StyledLabel>Redes sociales</StyledLabel>
        </StyledMid>
        <StyledRedes>
          <StyledRed><FontAwesomeIcon icon={faFacebookSquare}/></StyledRed>
          <StyledRed><FontAwesomeIcon icon={faInstagram}/></StyledRed>
          <StyledRed><FontAwesomeIcon icon={faTwitterSquare}/></StyledRed>
        </StyledRedes>
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

