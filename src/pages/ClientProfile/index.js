import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Header } from '../../components/Header'
import { FileUploader } from '../../components/FileUploader'
import { changeWeight, changeHeight, changeName, changeBMI, getClient, getMetric } from '../../store/clientReducer'
import { StyledButton } from '../../components/Button/styles'

export function ClientProfile() {
  const [edit, setEdit] = useState(false)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClient())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const {
    name,
    weight,
    height,
    bmi,
    client,

  } = useSelector(({clientReducer}) => ({
    name: clientReducer.name,
    weight: clientReducer.weight,
    height: clientReducer.height,
    bmi: clientReducer.bmi,
    client: clientReducer.client
  }))

  console.log(client)
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
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch(getClient())

  }
  if(edit === true) {
    return(
      <>
        <Header></Header>

        <main>
          <FileUploader initialPicture="picture" url="/clients/clientprofile"/>
          <form onSubmit={handleSubmit}>
            <section primerColumna>
                <label 
                  htmlFor="name"
                >
                  Nombre
                </label>  
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => dispatch(changeName(e.target.value))}
                />
                <label htmlFor="weight">Peso:</label>
                <input 
                  type="text" 
                  id="weight" 
                  name="weight" 
                  value={weight}
                  onChange={e => dispatch(changeWeight(e.target.value))}
    
                />
                <label htmlFor="height">Estatura:</label>
                <input 
                  type="text" 
                  id="height" 
                  name="height" 
                  value={height}
                  onChange={e => dispatch(changeHeight(e.target.value))}
     
                />
                <StyledButton
                  type="submit"
                  green={true}
                >
                  Guardar Cambios
                </StyledButton>
            </section>
          </form>
        </main>
      </>
    )
  }else if(edit === false) {
    return(
      <>
      <Header></Header>
      <main>
        <section primerColumna>
          <img src=""></img>
          <label htmlFor="name"> Nombre: </label>
          <p>{client !== undefined && client.name}</p>

          <label> Weight: </label>
          
          {client.metric !== undefined && <p>{client.metric.weight}</p>}
          <label htmlFor="height"> Height: </label>
          <p
            edit={edit}
            id="height"
            name="height"
          >
            {client.metric !== undefined && client.metric.height}
          </p>
          <label htmlFor="bmi"> IMC: </label>
          <p
            id="bmi"
            name="bmi"
          >
            {client.metric !== undefined && Math.ceil(client.metric.bmi)}
          </p>
          <StyledButton
            edit={edit}
            type="button"
            onClick={e => setEdit(true)}
            green={true}
          >
            Editar Perfil
          </StyledButton>
        </section>
        <section>
        </section>
      </main>
    </>
    )
  }
}