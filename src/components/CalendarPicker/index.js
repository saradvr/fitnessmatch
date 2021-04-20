import { StyledDatePicker } from "./styles";

export function CalendarPicker({value, onChange}){
  return (
    <StyledDatePicker
      onChange={onChange}
      value={value}
      locale="es-ES"
      isOpen={true}
      closeCalendar={false}
    />
  )
}