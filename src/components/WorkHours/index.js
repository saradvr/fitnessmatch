import { useDispatch, useSelector } from "react-redux"
import { getAvailability, toggleHour } from "../../store/availabilityReducer"
import { getCoach } from "../../store/coachesReducer"
import Checkbox from "../Checkbox"
import { addHours, compareAsc, eachHourOfInterval, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect } from "react"
import { StyledParagraph } from "../../pages/CoachSetAvailability/styles"

export function WorkHours({selectedDate}) {

  const workHours = eachHourOfInterval({
    start: addHours(selectedDate,5),
    end: addHours(selectedDate,21)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoach())
    dispatch(getAvailability())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { availableHours, coach, loading } = useSelector(({
    availabilityReducer,
    coachReducer,
  }) => ({
    availableHours: availabilityReducer.availableHours,
    coach: coachReducer.coach,
    loading: coachReducer.loading
  }))

  let scheduledAppointments = []

  if( Object.keys(coach).length > 0 ){
    scheduledAppointments = coach.appointments.map(el => el.appointmentDate)
  }
  
  return(
    <>
      {!!loading && <StyledParagraph>Cargando horarios...</StyledParagraph>}
      {Object.keys(coach).length > 0 && !!workHours && workHours.length > 0 && workHours.map((el)  => {
        
        const date = format(el, 'yyyy-MM-dd HH:mm', { locale: es })

        const disabled = (compareAsc(el, new Date())===-1 ? true : false || scheduledAppointments.includes(date))

        const isChecked = (availableHours.includes(date) || scheduledAppointments.includes(date)) 

        return (
            <Checkbox
              key = {el}
              id = {el}
              name = 'workHours'
              value = {el}
              isChecked = {isChecked}
              children = {`${format(el, 'HH:mm')} - ${format(addHours(el,1), 'HH:mm', { locale: es })}`}
              handleChange = {e => dispatch(toggleHour(availableHours.includes(date), date))}
              disabled = {disabled}
            />
        )
      })
    }
    </>
  )
}