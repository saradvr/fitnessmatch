import React from 'react'
import Button from '../Button'
import FormInputs from '../FormInputs'
import Filter from '../Filter'
import { useHistory } from 'react-router'
import { StyledForm, StyledSection1, StyledSection2, StyledLabel, StyledTextArea, StyledTopContainer, StyledTop, StyledMid, StyledSpan } from './styles'
import { changeDescription, changeExperience, changeName, changePrice, editProfile } from '../../store/coachesProfileReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getDisciplines, toggleDiscipline } from '../../store/disciplinesReducer'
import { getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'



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
    } = useSelector(({
      coachesProfileReducer, 
      specializationReducer, 
      disciplineReducer
    })=>({
    name: coachesProfileReducer.name,
    description: coachesProfileReducer.description,
    experience: coachesProfileReducer.experience,
    price: coachesProfileReducer.price,
    specializations: specializationReducer.specializations,
    checkSpecializations: specializationReducer.checkSpecializations,
    disciplines: disciplineReducer.disciplines,
    checkDisciplines: disciplineReducer.checkDisciplines,
    edit: coachesProfileReducer.edit,
  }))


  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
  }, [])
  const dispatch = useDispatch()
  return(

    <StyledForm>
      
      <StyledSection1 primerColumna>
        <button
          type="button"
          onClick={() => dispatch(editProfile(!edit))}

        >
          Editar perfil
        </button>
        {edit === true ? (<FormInputs
          id="name"
          type="text"
          name="name"
          onChange={(e)=> dispatch(changeName(e.target.value))}
          value={name}
        >
          Nombre
        </FormInputs>) :
        (<StyledSpan>{name}</StyledSpan>)
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
        ) : (
          <StyledSpan textArea>{description}</StyledSpan>
        )}
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
         ) : ( 
           <StyledSpan>{checkSpecializations}</StyledSpan>
        )}
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
            >
            </FormInputs>
          ) : (
            <StyledSpan>{experience}</StyledSpan>
          )}
          <StyledLabel>Precio cita</StyledLabel>
          {edit === true ? (
            <FormInputs
            id="price"
            type="text"
            name="price"
            onChange={(e)=> dispatch(changePrice(e.target.value))}
            value={price}
          >
          </FormInputs>
          ) : (
            <StyledSpan>{price}</StyledSpan>
          )}
        </StyledMid>
        <StyledMid>
          <StyledLabel>Redes sociales</StyledLabel>
        </StyledMid>
        
      </StyledSection2>

      <StyledSection2>
        <StyledLabel>Disciplinas</StyledLabel>
        <Filter
            filterName={disciplines}
            nameCheckbox='checkDisciplines'
            checks = {checkDisciplines}
            handleChange = {(e) => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
          />
      </StyledSection2>
    </StyledForm>
  
     


    

  )
}

export default CoachProfileForm

