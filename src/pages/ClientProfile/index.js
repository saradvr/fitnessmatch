import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Header } from '../../components/Header'
import { FileUploader } from '../../components/FileUploader'
import { StyledImage, StyledMain, StyledSection, StyledButtonEdit, StyledButtonSave, StyledSectionEdit, StyledInputWeightEdit, StyledInputHeightEdit, StyledParagraph, StyledLabel } from './styles'

export function ClientProfile() {
  const [wtext, setwText] = useState(0)
  const [htext, sethText] = useState(0)
  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState(null)
  const [bmi, setBmi] = useState(0)
  const [picture, setPicture] = useState(null)
  
  function handleChange(e) {
    setwText(e.target.value)
  }

  function handleChangeHeight(e) {
    sethText(e.target.value)
  }

  function calcBMI() {
    const BMI = parseInt(wtext) / parseFloat(htext * htext)
    return Math.ceil(BMI)
  }

  const {
    name
  } = useSelector(({clientReducer}) => ({
    name: clientReducer.name
  }))

  async function handleSubmit(e) {
    e.preventDefault()
    setEdit(false)
    const token = localStorage.getItem('token')

    const form = new FormData()
    form.append('name', name)
    if(file) {
      form.append('profilePicture', file[0], file[0].name)
    }

    const { data } = await axios({
      method: 'PUT',
      baseURL: 'http://localhost:8000',
      url: '/clients/clientprofile',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
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
          <form onSubmit={handleSubmit}>
            <StyledSection primerColumna>
              <StyledImage src=""></StyledImage>
                <FileUploader 
                  file={file}
                  setFile={setFile}
                />
              <StyledSectionEdit 
                edit={edit}
              >
              </StyledSectionEdit>
                <StyledLabel htmlFor="weight">Weight:</StyledLabel>
                <StyledInputWeightEdit 
                  type="text" 
                  id="weight" 
                  name="weight" 
                  value={wtext}
                  onChange={handleChange}
                  edit={edit} />
                <p edit={edit}>{wtext}</p>
                <StyledLabel htmlFor="height">Height:</StyledLabel>
                <StyledInputHeightEdit 
                  type="text" 
                  id="height" 
                  name="height" 
                  value={htext}
                  onChange={handleChangeHeight}
                  edit={edit} 
                />
              <p edit={edit}>{htext}</p>
              <StyledLabel htmlFor="bmi"> BMI: </StyledLabel>
              <StyledParagraph
                id="bmi"
                name="bmi"
              >
                {calcBMI()}
              </StyledParagraph>
                <StyledButtonSave
                  type="submit"
                  edit={edit}
                  type="button"
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
            edit={edit}
            type="weight"
            id="weight"
            name="weight"
          >
            {wtext}
          </StyledParagraph>
          <StyledLabel htmlFor="height"> Height: </StyledLabel>
          <StyledParagraph
            edit={edit}
            type="height"
            id="height"
            name="height"
          >
            {htext}
          </StyledParagraph>
          <StyledLabel htmlFor="bmi"> BMI: </StyledLabel>
          <StyledParagraph
            id="bmi"
            name="bmi"
          >
            {calcBMI()}
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