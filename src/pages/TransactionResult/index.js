import { useEffect } from "react";
import { Header } from "../../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppointmentDate, ResultContainer, StyledMain, StyledText } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment, getAppointment, updateAppointment } from '../../store/appointmentsReducer'
import { saveTransaction } from "../../store/transactionsReducer";
import queryString from "query-string";

export function TransactionResult () {
  
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    const { ref_payco } = queryString.parse(location.search)

    axios({
      method: 'GET',
      baseURL: 'https://secure.epayco.co',
      url: `/validation/v1/reference/${ref_payco}`
    })
      .then(({ data }) => {
        dispatch(saveTransaction(data.data))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const {
    savingTransaction,
    errorTransaction,
    successTransaction,
    transaction,
    savingAppointment,
    errorAppointment,
    successAppointment,
    appointment,
  } = useSelector(({
    appointmentReducer,
    transactionReducer,
  }) => ({
    savingTransaction: transactionReducer.saving,
    errorTransaction: transactionReducer.error,
    successTransaction: transactionReducer.success,
    transaction: transactionReducer.transaction,
    errorAppointment: appointmentReducer.error,
    savingAppointment: appointmentReducer.saving,
    successAppointment: appointmentReducer.success,
    appointment: appointmentReducer.appointment,
  }))

  useEffect(() => {
    if(!!transaction.appointmentId && !appointment._id){
      dispatch(getAppointment(transaction.appointmentId))
    } else if(!!appointment && !!appointment._id && !!transaction.status){
      if(transaction.status === 'Aceptada') {
        dispatch(updateAppointment(appointment._id, 'Confirmada'))
      } else if (transaction.status === 'Pendiente' || transaction.status === "Iniciada") {
        dispatch(updateAppointment(appointment._id, 'Pendiente de pago'))
      } else {
        dispatch(deleteAppointment(appointment._id, appointment.coachId))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction.appointmentId, transaction.status, appointment._id])

  return(
    <>
      <Header />
      <StyledMain>
        <ResultContainer>
          <h2>Su transacción fue:</h2>
          {!!savingTransaction && <p>Cargando resultado...</p>}
          {!!errorTransaction && <p>Error al cargar el resultado de transacción.</p>}
          {!!transaction && !!successTransaction && <h2>{transaction.status}</h2>}
          {!!transaction && transaction.status === "Aceptada" ? 
            <>
              <StyledText>Su cita queda confirmada para la siguiente fecha:</StyledText>
              {!!savingAppointment && <p>Guardando su cita...</p>}
              {!!errorAppointment && <p>Error al guardar la cita.</p>}
              <AppointmentDate>{!!transaction && !!appointment && !!successAppointment && appointment.appointmentDate}</AppointmentDate>
            </> :
            <StyledText>Por favor intente agendar y pagar su cita nuevamente.</StyledText>
          }
        </ResultContainer>
      </StyledMain>
    </>
  )
}