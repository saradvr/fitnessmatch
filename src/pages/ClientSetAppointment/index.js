import { compareAsc, format, getDayOfYear, parseISO, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { 
  StyledMain, 
  StyledDiv, 
  CalendarHorasSection, 
  StyledText, 
  CalendarSection, 
  HoursSection, 
  MessagesSection,
  HoursMessageSection 
} from "./styles"
import { CalendarPicker } from '../../components/CalendarPicker'
import { es } from "date-fns/locale";
import addHours from "date-fns/addHours";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPublicCoach } from "../../store/coachesReducer";
import { setAppointment } from "../../store/appointmentsReducer";
import pasos from './pasos2.png'
import banner from './banner.png'

export function ClientSetAppointment(){

  function showHours(el){
    const date = parseISO(el, 'yyyy-MM-dd HH:mm', new Date())
    const disabled = compareAsc(date, new Date())===-1 ? true : false
    if(getDayOfYear(value) === getDayOfYear(date) && disabled === false){
      return true
    }
    else {
      return false
    }
  }
  
  const { coachId } = useParams()

  const [value, onChange] = useState(startOfDay(new Date()))
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPublicCoach( coachId ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { 
    coach, 
    error, 
    saving, 
    success,
    appointment
  } = useSelector(({ 
    coachReducer,
    appointmentReducer,
  }) => ({
    coach: coachReducer.coach,
    error: appointmentReducer.error,
    saving: appointmentReducer.saving,
    success: appointmentReducer.success,
    appointment: appointmentReducer.appointment,
  }))
  
  const availableHours = coach.availableHours
  let hours = []
  if(availableHours){
    hours = availableHours.filter(showHours)
  }

  return(
    <>
      <Header />
      <StyledMain>
        <img src={banner} alt="Banner" width="100%"></img>
        <CalendarHorasSection>
          <CalendarSection>
            <CalendarPicker
              onChange={onChange}
              value={value}
            />
          </CalendarSection>
          <HoursMessageSection>
            <HoursSection>
              {!!hours && hours.length > 0 && hours.map(el => {
                  const date = parseISO(el, 'yyyy-MM-dd HH:mm', new Date())
                  return(
                    <StyledDiv key={el}>
                      <Button
                        type="button"
                        handleClick = {e => dispatch(setAppointment(el,coachId,'Pendiente'))}
                      >
                        {format(date, 'HH:mm')} - {format(addHours(date,1), 'HH:mm', { locale: es })}
                      </Button>
                    </StyledDiv>
                  )
                }
              )}
              {(!hours || hours.length === 0) && <StyledText>No hay horarios disponibles. Por favor, seleccione otra fecha.</StyledText>}
            </HoursSection>
            <MessagesSection>
              {error && <StyledText>{error}</StyledText>}
              {saving && <StyledText>Estamos guardando su cita, por favor espere.</StyledText>}
              {success && <StyledText>{`${success}. La cita es: ${appointment.appointmentDate}`}</StyledText>}
            </MessagesSection>
          </HoursMessageSection>
        </CalendarHorasSection>
        <img src={pasos} alt="Pasos a seguir" width="100%"></img>
      </StyledMain>
    </>
  )
}