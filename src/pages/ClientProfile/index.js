import React, { useCallback, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Header } from '../../components/Header'
import { FileUploader } from '../../components/FileUploader'
import { StyledImage, StyledMain, StyledSection, StyledButtonEdit, StyledButtonSave, StyledSectionEdit, StyledInputWeightEdit, StyledInputHeightEdit, StyledParagraph, StyledLabel, StyledInputName } from './styles'
import { changeWeight, changeHeight, changeName, changeBMI } from '../../store/clientReducer'

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

        <StyledMain>
          <FileUploader initialPicture="picture"/>
          <form onSubmit={handleSubmit}>
            <StyledSection primerColumna>
                <StyledLabel 
                  htmlFor="name"
                >
                  Nombre
                </StyledLabel>  
                <StyledInputName
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => dispatch(changeName(e.target.value))}
                />
                <StyledLabel htmlFor="weight">Peso:</StyledLabel>
                <StyledInputWeightEdit 
                  type="text" 
                  id="weight" 
                  name="weight" 
                  value={weight}
                  onChange={e => dispatch(changeWeight(e.target.value))}
    
                />
                <StyledLabel htmlFor="height">Estatura:</StyledLabel>
                <StyledInputHeightEdit 
                  type="text" 
                  id="height" 
                  name="height" 
                  value={height}
                  onChange={e => dispatch(changeHeight(e.target.value))}
     
                />
                <StyledButtonSave
                  type="submit"
    
                >
                  Guardar Cambios
                </StyledButtonSave>
            </StyledSection>
          </form>
        </StyledMain>
      </>
    )
  }else if(edit === false) {
    return(
      <>
      <Header></Header>
      <StyledMain>
        <StyledSection primerColumna>
          <StyledImage src=""></StyledImage>
          <StyledLabel htmlFor="weight"> Weight: </StyledLabel>
          <StyledParagraph 
            type="weight"
            id="weight"
            name="weight"
          >
            {weight}
          </StyledParagraph>
          <StyledLabel htmlFor="height"> Height: </StyledLabel>
          <StyledParagraph
            edit={edit}
            type="height"
            id="height"
            name="height"
          >
            {height}
          </StyledParagraph>
          <StyledLabel htmlFor="bmi"> IMC: </StyledLabel>
          <StyledParagraph
            id="bmi"
            name="bmi"
          >
            {bmi}
          </StyledParagraph>
          <StyledButtonEdit 
            edit={edit}
            type="button"
            onClick={e => setEdit(true)}
          >
            Editar Perfil
          </StyledButtonEdit>
        </StyledSection>
        <StyledSection>
        </StyledSection>
      </StyledMain>
    </>
    )
  }
}