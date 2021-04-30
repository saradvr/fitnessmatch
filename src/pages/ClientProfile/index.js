import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Filter from '../../components/Filter'
import { Header } from '../../components/Header'
import { getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'
import { getDisciplines, toggleDiscipline } from '../../store/disciplinesReducer'
import { FileUploader } from '../../components/FileUploader'
import { getClient, getPublicClient } from '../../store/clientReducer'
import { StyledButton } from '../../components/Button/styles'
import { StyledForm, StyledLabel, StyledSection, StyledSection1, StyledMain, StyledLabelEdit, StyledImg } from './styles'
import Button from '../../components/Button'
import { addSpecialization } from '../../store/specializationsReducer'
import { addDiscipline } from '../../store/disciplinesReducer'
import { useParams } from 'react-router'




export function ClientProfile({isPublic}) {
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  
  const dispatch = useDispatch()
  const { clientId } = useParams()

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
    isPublic && dispatch(getPublicClient(clientId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !isPublic && dispatch(getClient())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit])

  const {
    client,
    checkSpecializations,
    specializations,
    checkDisciplines,
    disciplines,
    appointments,
  } = useSelector(({
    clientReducer,
    specializationReducer,
    disciplineReducer,
  }) => ({
    client: clientReducer.client,
    checkSpecializations: specializationReducer.checkSpecializations,
    specializations: specializationReducer.specializations,
    checkDisciplines: disciplineReducer.checkDisciplines,
    disciplines: disciplineReducer.disciplines,
    appointments: clientReducer.appointments,
  }))

  async function handleSubmit(e) {
    e.preventDefault()
    setEdit(false)
    const token = localStorage.getItem('token')

    await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/clients/clientprofile',
      data: {
        name,
        weight,
        height,
        appointments,
        specializations: checkSpecializations,
        disciplines: checkDisciplines,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch(getClient())
  }
  if(!!client && edit === true) {
    return(
      <>
        <Header></Header>
        <StyledMain>
          <StyledForm onSubmit={handleSubmit}>
            {client && client.profilePicture && <StyledImg src={client.profilePicture} url='/clients/clientprofile/picture'/>}
            {console.log(client.profilePicture)}
            <StyledSection primerColumna>
              <StyledLabelEdit htmlFor="name">Nombre</StyledLabelEdit>  
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <StyledLabelEdit htmlFor="weight">Peso</StyledLabelEdit>
              <input 
                type="text" 
                id="weight" 
                name="weight" 
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
              <StyledLabelEdit htmlFor="height">Estatura</StyledLabelEdit>
              <input 
                type="text" 
                id="height" 
                name="height" 
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
              <StyledLabelEdit>Objetivos</StyledLabelEdit>
              <Filter
                filterName={specializations}
                nameCheckbox='checkSpecializations'
                checks = {checkSpecializations}
                handleChange = {(e) => dispatch(toggleSpecialization(checkSpecializations.includes(e.target.id), e.target.id))}
                marginLeft = '20px'
              />
            </StyledSection>
            <StyledSection>
            <StyledLabelEdit>Disciplinas</StyledLabelEdit>
              <Filter
                filterName={disciplines}
                nameCheckbox='checkDisciplines'
                checks = {checkDisciplines}
                handleChange = {e => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
                marginLeft = '20px'
              />
            </StyledSection>
            <Button
                type="button"
                green={true}
                handleClick={handleSubmit}
            >
                Guardar Cambios
            </Button>
            <StyledButton
              onClick={() => setEdit(false)}
            >
              Cancelar
            </StyledButton>
          </StyledForm>
        </StyledMain>
      </>
    )
  }else if(edit === false) {
    return(
      <>
      <Header></Header>
      <StyledMain>
          <StyledForm>
            <StyledSection primerColumna>
              {client && client.profilePicture && <FileUploader isPublic={isPublic} initialPicture={client.profilePicture} url='/clients/clientprofile/picture' />}
              <br/>
              <StyledLabel>Nombre: </StyledLabel>
              <p>{!!client && client.name}</p>
            </StyledSection>
            <StyledSection segundaColumna>
                <StyledLabel> Peso: </StyledLabel>
                {!!client && !!client.metric && <p>{client.metric.weight}</p>}
                <StyledLabel htmlFor="height"> Height: </StyledLabel>
                <p
                  id="height"
                  name="height"
                >
                  {!!client && !!client.metric && client.metric.height}
                </p>
                <StyledLabel htmlFor="bmi"> IMC: </StyledLabel>
                <p
                  id="bmi"
                  name="bmi"
                >
                {!!client && !!client.metric && Math.ceil(client.metric.bmi)}
                </p> 
            </StyledSection>   
          </StyledForm>
          <StyledForm>
              <StyledSection1 primerColumna>
                <StyledLabel>Mis Metas</StyledLabel>
                {!!client && !!client.specializations && client.specializations.length > 0 && client.specializations.map((el) => <p>{el.name}</p>)}
                {!isPublic && <StyledLabel>Mis Citas</StyledLabel>}
                {!isPublic && !!client && !!client.appointments && client.appointments.length > 0 && client.appointments.map((el) => <p>{el.appointmentDate}</p>)}
              </StyledSection1>
              <StyledSection1 segundaColumna>
                <StyledLabel>Mis disciplinas</StyledLabel>
                {!!client && !!client.disciplines && client.disciplines.length > 0 && client.disciplines.map((el) => <p>{el.name}</p>)}
              </StyledSection1>
              {!isPublic &&
                <Button
                  type="button"
                  handleClick={() => {
                    setName(client.name)
                    setWeight(client.metric.weight)
                    setHeight(client.metric.height)
                    setEdit(true)
                    if( client.specializations.length > 0){
                    client.specializations
                    .map(el => checkSpecializations.includes(el._id) ? "" : 
                    dispatch(addSpecialization(el._id)))
                  }
                  if( client.disciplines.length > 0){
                    client.disciplines.map(el => checkDisciplines.includes(el._id) ? "" : 
                    dispatch(addDiscipline(el._id)))
                  }
                }}
                  green={true}
                >
                  Editar Perfil
                </Button>
              }         
          </StyledForm>
      </StyledMain>
    </>
    )
  }
}