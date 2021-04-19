import { StyledInput, StyledLabel} from '../FormInputs/styles'
import axios from 'axios'
import { useState } from 'react'
import Button from '../Button'

export function FileUploader() {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [picture, setPicture] = useState(null)
  const [edit, setEdit] = useState(false)

  function handleChange(e) {
    readFile(e.target.files[0])
    setFile(e.target.files)
  }


  function readFile(file) {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = e => setImage(e.target.result)
    reader.onerror = e => console.log(reader.error)

  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const form = new FormData()
    if(file) {
      form.append('profilePicture', file[0], file[0].name)
    }

    const { data } = await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/clients/clientprofile',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    setPicture(data.profilePicture)
    console.log(data)
    setEdit(false)
  }

  console.log(edit)

  if(edit === false) {
    return(
      <> 
        <img src={picture}></img>
        <StyledLabel htmlFor="file"></StyledLabel>
        <Button 
          type="button"
          isGreen={true}
          handleClick={e => setEdit(true)}
        >
          Cambiar Foto
        </Button>
      </>  
    )
  } 
  else {
    return(
      <>
        <StyledLabel htmlFor="file"></StyledLabel>
        <StyledInput
          type="file"
          accept="image/*"
          name="file"
          id="file"
          onChange={handleChange}
        />
        {image && <img src={image} alt="Profile Picture Preview" />}
        <Button 
          handleClick={handleSubmit}
          isGreen={true}
        >
          Guardar Foto
        </Button>
      </>
    ) 
  }
}

