import { WorkHours } from '../../components/WorkHours'
import { Header } from "../../components/Header"
import React, { useState } from 'react'
import {CalendarSection, StyledMain, AvailabilitySection, StyledH2, AppointmentsSection, StyledParagraph, Appointment, LinkClientButton, ClientImg } from './styles'
import { compareAsc, format, parseISO, startOfDay } from 'date-fns'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setAvailability } from '../../store/availabilityReducer'
import banner from './bannerAvailability.png'
import { CalendarPicker } from '../../components/CalendarPicker'
import getDayOfYear from 'date-fns/getDayOfYear'
import addHours from 'date-fns/addHours'
import { es } from 'date-fns/locale'

export function CoachAvailability() {

  function showAppointments(el){
    const date = parseISO(el.appointmentDate, 'yyyy-MM-dd HH:mm', new Date())
    const disabled = compareAsc(date, new Date())===-1 ? true : false
    if(getDayOfYear(value) === getDayOfYear(date) && disabled === false){
      return true
    }
    else {
      return false
    }
  }
  
  const [value, onChange] = useState(startOfDay(new Date()))
  const dispatch = useDispatch()
  const { 
    availableHours, 
    error, 
    saving, 
    success, 
    coach, 
    loadingCoach, 
    errorCoach 
  } = useSelector(({
    availabilityReducer,
    coachReducer
  }) => ({
    availableHours: availabilityReducer.availableHours,
    error: availabilityReducer.error,
    saving: availabilityReducer.saving,
    success: availabilityReducer.success,
    coach: coachReducer.coach,
    loadingCoach: coachReducer.loading,
    errorCoach: coachReducer.error,
  }))

  let todayDates = []
  if( Object.keys(coach).length > 0 ){
    console.log(coach.appointments)
    todayDates = coach.appointments.filter(showAppointments)
  }

  console.log(todayDates)

  return (
    <>
      <Header />
      <StyledMain>
          <AvailabilitySection>
            <StyledH2>Selecciona tus horarios disponibles para la fecha seleccionada:</StyledH2>
            <form onSubmit={e => {
              e.preventDefault()
              dispatch(
                setAvailability({
                  availableHours
                })
              )
            }}>
              <WorkHours 
                selectedDate = {value}
              />
              {error && <StyledParagraph>{error}</StyledParagraph>}
              {saving && <StyledParagraph>Estamos guardando su disponibilidad</StyledParagraph>}
              {success && <StyledParagraph>{success}</StyledParagraph>}
              <Button 
                type='submit'
              >
                Guardar Cambios
              </Button>
            </form>
          </AvailabilitySection>
          <CalendarSection>
            <img 
              src={banner}
              alt='Programa tu match'
              width='100%'
            />
            <CalendarPicker
              onChange={onChange}
              value={value}
            />
          </CalendarSection>
          <AppointmentsSection>
            <StyledH2>Tus citas agendadas para la fecha seleccionada:</StyledH2>
            {!!loadingCoach && <StyledParagraph>Cargando sus citas agendadas...</StyledParagraph>}
            {!!errorCoach && <StyledParagraph>Hubo un error cargando sus citas.</StyledParagraph>}
            {Object.keys(coach).length > 0 && todayDates.map(el => {
              const date = parseISO(el.appointmentDate, 'yyyy-MM-dd HH:mm', new Date())

              return (
                <Appointment>
                  <StyledParagraph
                    key={el.appointmentDate}
                  >
                    {format(date, 'HH:mm')} - {format(addHours(date,1), 'HH:mm', { locale: es })}  
                    <LinkClientButton to={`/client/${el.clientId}`}>
                      <ClientImg src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" alt="Imagen estándar de usuario"></ClientImg>
                    </LinkClientButton>
                  </StyledParagraph>
                </Appointment>
              )
              })}
          </AppointmentsSection>
      </StyledMain>
    </>
  )
}