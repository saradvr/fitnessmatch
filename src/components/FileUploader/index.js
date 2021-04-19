import { StyledInput, StyledLabel} from '../FormInputs/styles'
import { useState } from 'react'

export function FileUploader({file, setFile}) {
  const [image, setImage] = useState(null)

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


  return (
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
    </>
  )
}

