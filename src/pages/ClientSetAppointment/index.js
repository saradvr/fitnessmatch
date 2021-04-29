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
  HoursMessageSection,
} from "./styles"
import { CalendarPicker } from '../../components/CalendarPicker'
import { es } from "date-fns/locale";
import addHours from "date-fns/addHours";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPublicCoach } from "../../store/coachesReducer";
import { deleteAppointment, setAppointment } from "../../store/appointmentsReducer";
import pasos from './pasos.png'
import banner from './banner.png'
import { getClient } from "../../store/clientReducer";
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

export function ClientSetAppointment(){

  const [show, setShow] = useState(false);

  function handleClose() {
    setPaymentProcess(false)
    dispatch(deleteAppointment(appointment._id, appointment.coachId))
    setShow(false)
  }

  function handleShow(el) {
    setPaymentProcess(true)
    dispatch(setAppointment(el,coachId,'Pendiente'))
    setShow(true)
  }

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

  function handleAppointment() {

    const handler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true,
    })
  
    const data = {
      external: 'false',
      autoclick: 'false',
  
      amount: coach.appointmentFee,
      name: 'Cita Valoración FitnessMatch',
      description: 'Cita de valoración para entrenamiento personalizado a través de la plataforma web FitnessMatch',
      currency: 'cop',
  
      country: 'CO',
      lang: 'es',
      tax: '0',
      tax_base: '0',
  
      invoice: '1234123',
      extra1: appointment.appointmentDate,
      extra2: coachId,
      extra3: appointment._id,
  
      response: `${process.env.REACT_APP_BASE_URL}/transaction-result`,
  
      name_billing: client.name,
      email_billing: client.user.email,
      type_doc_billing: 'CC',
  
      methodsDisable: ["CASH", "SP", "PSE", "DP"],
    }
    handler.open(data)
  }
  
  const { coachId } = useParams()

  const [value, onChange] = useState(startOfDay(new Date()))

  const [paymentProcess, setPaymentProcess] = useState(false)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClient())
    dispatch(getPublicCoach( coachId ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { 
    coach, 
    error, 
    saving, 
    success,
    loadingCoach,
    appointment,
    client
  } = useSelector(({ 
    coachReducer,
    clientReducer,
    appointmentReducer,
  }) => ({
    coach: coachReducer.coach,
    error: appointmentReducer.error,
    saving: appointmentReducer.saving,
    success: appointmentReducer.success,
    loadingCoach: coachReducer.loading,
    appointment: appointmentReducer.appointment,
    client: clientReducer.client,
  }))
  
  const availableHours = coach.availableHours
  let hours = []
  if(availableHours){
    hours = availableHours.filter(showHours).sort()
  }

  return(
    <>
      <Header />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Confirmación de cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!success && <p>{success}. Por favor haga el pago para confirmar su cita el {appointment.appointmentDate}, de lo contrario esta no se guardará.</p>}
          {!!error && <p>Hubo un error al reservar su cita, por favor intente nuevamente.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button handleClick={handleClose} isGreen={true} fondoClaro={true}>
            Cancelar
          </Button>
          <Button isGreen={true} fondoClaro={true} handleClick={handleAppointment}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
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
              {!!loadingCoach && <StyledText>Cargando citas disponibles...</StyledText>}
              {!!coach && !!client && !!hours && hours.length > 0 && hours.map(el => {
                  const date = parseISO(el, 'yyyy-MM-dd HH:mm', new Date())
                  return(
                    <StyledDiv key={el}>
                      <Button
                        type="button"
                        handleClick = {e => handleShow(el)}
                        disabled = {paymentProcess}
                      >
                        {format(date, 'HH:mm')} - {format(addHours(date,1), 'HH:mm', { locale: es })}
                      </Button>
                    </StyledDiv>
                  )
                }
              )}
              {!loadingCoach && (!hours || hours.length === 0) && <StyledText>No hay horarios disponibles. Por favor, seleccione otra fecha.</StyledText>}
            </HoursSection>
            <MessagesSection>
              {!!error && <StyledText>{error}</StyledText>}
              {!!saving && <StyledText>Estamos guardando su cita, por favor espere.</StyledText>}
            </MessagesSection>
          </HoursMessageSection>
        </CalendarHorasSection>
        <img src={pasos} alt="Pasos a seguir" width="100%"></img>
      </StyledMain>
    </>
  )
}