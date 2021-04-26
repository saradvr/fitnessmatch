import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppointmentDate, ResultContainer, StyledMain, StyledText } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { saveTransaction } from "../../store/transactionsReducer";
// import queryString from "query-string";
// const queryString = require('query-string');

function queryString(query) {
  const res = {}
  query
    .replace('?','')
    .split('&')
    .forEach(q => {
      const [key, value] = q.split('=')
      res[key] = value
    })
  return res
}


export function TransactionResult () {
  
  const location = useLocation()

  const dispatch = useDispatch()

  const [transactionResult, setTransactionResult] = useState(null)

  useEffect(() => {
    const { ref_payco } = queryString(location.search)

    axios({
      method: 'GET',
      baseURL: 'https://secure.epayco.co',
      url: `/validation/v1/reference/${ref_payco}`
    })
      .then(({ data }) => {
        setTransactionResult(data.data)

      })
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

  return(
    <>
      <Header />
      <StyledMain>
        <ResultContainer>
          <h2>Su transacción fue:</h2>
          {!!transactionResult && <h2>{transactionResult.x_transaction_state}</h2>}
          {!!transactionResult && transactionResult.x_transaction_state === "Aceptada" ? 
            <>
              <StyledText>Su cita queda confirmada para la siguiente fecha:</StyledText>
              <AppointmentDate>{!!transactionResult && transactionResult.x_extra1}</AppointmentDate>
            </> :
            <StyledText>Por favor intente agendar y pagar su cita nuevamente.</StyledText>
          }
        </ResultContainer>
      </StyledMain>
    </>
  )
}