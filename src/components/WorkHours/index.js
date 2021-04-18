import { useDispatch, useSelector } from "react-redux"
import { getAvailability, toggleHour } from "../../store/availabilityReducer"
import Checkbox from "../Checkbox"
import { addHours, compareAsc, eachHourOfInterval, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect } from "react"

export function WorkHours({selectedDate}) {

  const workHours = eachHourOfInterval({
    start: addHours(selectedDate,5),
    end: addHours(selectedDate,21)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAvailability())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { availableHours } = useSelector(({
    availabilityReducer,
  }) => ({
    availableHours: availabilityReducer.availableHours,
  }))

  return(
    <>
      {!!workHours && workHours.length > 0 && workHours.map((el)  => {
        
        const date = format(el, 'yyyy-MM-dd HH:mm', { locale: es })

        const disabled = compareAsc(el, new Date())===-1 ? true : false

        const isChecked = availableHours.includes(date)

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