import React, { useCallback, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Header } from '../../components/Header'
import { FileUploader } from '../../components/FileUploader'
import { changeWeight, changeHeight, changeName, changeBMI } from '../../store/clientReducer'
import { StyledButton } from '../../components/Button/styles'

export function ClientProfile() {
  const [edit, setEdit] = useState(false)
  
  const dispatch = useDispatch()

  const {
    name,
    weight,
    height,
    bmi,

  } = useSelector(({clientReducer}) => ({
    name: clientReducer.name,
    weight: clientReducer.weight,
    height: clientReducer.height,
    bmi: clientReducer.bmi,
  }))

  async function handleSubmit(e) {
    e.preventDefault()
    setEdit(false)
    const token = localStorage.getItem('token')
    dispatch(changeBMI(weight, height))

    const { data } = await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/clients/clientprofile',
      data: {
        name,
        weight,
        height,
        bmi,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.dir(data)
  }
  if(edit === true) {
    return(
      <>
        <Header></Header>

        <main>
          <FileUploader initialPicture="picture"/>
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
          <label htmlFor="weight"> Weight: </label>
          <p 
            type="weight"
            id="weight"
            name="weight"
          >
            {weight}
          </p>
          <label htmlFor="height"> Height: </label>
          <p
            edit={edit}
            type="height"
            id="height"
            name="height"
          >
            {height}
          </p>
          <label htmlFor="bmi"> IMC: </label>
          <p
            id="bmi"
            name="bmi"
          >
            {bmi}
          </p>
          <StyledButton
            edit={edit}
            type="button"
            onClick={e => setEdit(true)}
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