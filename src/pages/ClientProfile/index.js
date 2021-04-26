import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Filter from '../../components/Filter'
import { Header } from '../../components/Header'
import { getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'
import { getDisciplines, toggleDiscipline } from '../../store/disciplinesReducer'
import { FileUploader } from '../../components/FileUploader'
import { changeWeight, changeHeight, changeName, getClient } from '../../store/clientReducer'
import { StyledButton } from '../../components/Button/styles'
import { StyledForm, StyledLabel, StyledSection, StyledSection1 } from './styles'


export function ClientProfile() {
  const [edit, setEdit] = useState(false)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClient())
    dispatch(getSpecializations())
    dispatch(getDisciplines())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    name,
    weight,
    height,
    bmi,
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
    name: clientReducer.name,
    weight: clientReducer.weight,
    height: clientReducer.height,
    bmi: clientReducer.bmi,
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

    const { data } = await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/clients/clientprofile',
      data: {
        name,
        weight,
        height,
        appointments,
        specializations,
        disciplines,
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
        {client.profilePicture !== undefined && <FileUploader initialPicture={client.profilePicture} url='/clients/clientprofile/picture'/>}
        <main>
          <StyledForm onSubmit={handleSubmit}>
            <StyledSection primerColumna>
              <StyledLabel>
                Nombre
              </StyledLabel>  
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => dispatch(changeName(e.target.value))}
              />
              <StyledLabel htmlFor="weight">Peso:</StyledLabel>
              <input 
                type="text" 
                id="weight" 
                name="weight" 
                value={weight}
                onChange={e => dispatch(changeWeight(e.target.value))}
  
              />
              <StyledLabel htmlFor="height">Estatura:</StyledLabel>
              <input 
                type="text" 
                id="height" 
                name="height" 
                value={height}
                onChange={e => dispatch(changeHeight(e.target.value))}
    
              />
              <StyledLabel>Métodos</StyledLabel>
              <Filter
                filterName={specializations}
                nameCheckbox='checkSpecializations'
                checks = {checkSpecializations}
                handleChange = {(e) => dispatch(toggleSpecialization(checkSpecializations.includes(e.target.id), e.target.id))}
                marginLeft = '20px'
              />
              <Filter
                filterName={disciplines}
                nameCheckbox='checkDisciplines'
                checks = {checkDisciplines}
                handleChange = {e => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
                marginLeft = '20px'
              />
              <StyledButton
                type="submit"
                green={true}
              >
                Guardar Cambios
              </StyledButton>
            </StyledSection>
          </StyledForm>
        </main>
      </>
    )
  }else if(edit === false) {
    return(
      <>
      <Header></Header>
      <main>
        <StyledForm>
          <StyledSection primerColumna>
            {client.profilePicture !== undefined && <FileUploader initialPicture={client.profilePicture} url='/clients/clientprofile/picture' />}
            <br/>
            <StyledLabel>Nombre: </StyledLabel>
            <p>{client !== undefined && client.name}</p>
          </StyledSection>
          <StyledSection segundaColumna>
              <StyledLabel> Weight: </StyledLabel>
              {client.metric !== undefined && <p>{client.metric.weight}</p>}
              <StyledLabel htmlFor="height"> Height: </StyledLabel>
              <p
                id="height"
                name="height"
              >
                {client.metric !== undefined && client.metric.height}
              </p>
              <StyledLabel htmlFor="bmi"> IMC: </StyledLabel>
              <p
                id="bmi"
                name="bmi"
              >
              {client.metric !== undefined && Math.ceil(client.metric.bmi)}
              </p> 
          </StyledSection>   
        </StyledForm>
        <StyledForm>
            <StyledSection1 primerColumna>
              <StyledLabel>Mis Metas</StyledLabel>
              {!!client && !!client.specializations && client.specializations.length > 0 && client.specializations.map((el) => <p>{el.name}</p>)}
              <StyledLabel>Mis Citas</StyledLabel>
              {!!client && !!client.appointments && client.appointments.length > 0 && client.appointments.map((el) => <p>{el.appointmentDate}</p>)}
            </StyledSection1>
            <StyledSection1 segundaColumna>
              <StyledLabel>Mis disciplinas</StyledLabel>
              {!!client && !!client.disciplines && client.disciplines.length > 0 && client.disciplines.map((el) => <p>{el.name}</p>)}
            </StyledSection1>
            <StyledButton
              type="button"
              onClick={e => setEdit(true)}
              green={true}
            >
              Editar Perfil
            </StyledButton>
        </StyledForm>
      </main>
    </>
    )
  }
}