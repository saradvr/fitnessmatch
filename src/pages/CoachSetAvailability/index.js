import { WorkHours } from '../../components/WorkHours'
import { Header } from "../../components/Header"
import React, { useState } from 'react'
import {CalendarSection, StyledMain, AvailabilitySection, StyledH2, AppointmentsSection, StyledParagraph } from './styles'
import { startOfDay } from 'date-fns'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setAvailability } from '../../store/availabilityReducer'
import banner from './bannerAvailability.png'
import { CalendarPicker } from '../../components/CalendarPicker'

export function CoachAvailability() {

  const dispatch = useDispatch()
  const { availableHours, error, saving, success } = useSelector(({
    availabilityReducer,
  }) => ({
    availableHours: availabilityReducer.availableHours,
    error: availabilityReducer.error,
    saving: availabilityReducer.saving,
    success: availabilityReducer.success,
  }))

  const [value, onChange] = useState(startOfDay(new Date()))

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
          </AppointmentsSection>
      </StyledMain>
    </>
  )
}