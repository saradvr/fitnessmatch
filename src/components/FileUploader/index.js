import { StyledInput, StyledLabel} from '../FormInputs/styles'
import { useState } from 'react'
import { StyledButton } from '../Button/styles'
import axios from 'axios'

export function FileUploader() {
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [showImage, setShowImage] = useState()

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

    const data = new FormData()
    data.append('username', 'Luis')
    if(file) {
      data.append('file', file[0], file[0].name)
    }

    const response = await axios({
      method: 'PUT',
      baseURL: 'http://localhost:8000',
      url: '/clients/clientprofile',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    
    console.dir(response)
  // setShowImage(response.image)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StyledLabel htmlFor="file"></StyledLabel>
        <StyledInput
          type="file"
          accept="image/*"
          name="file"
          id="file"
          onChange={handleChange}
        />
        <StyledButton type="submit">Enviar Foto</StyledButton>
      </form>
      {image && <img src={image} alt="Profile Picture Preview" />}
    </div>
  )
}

