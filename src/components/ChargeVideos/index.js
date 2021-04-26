import { useState } from 'react'
import { StyledLabelChargeVideos, StyledInputVideos, StyledFormChargeVideos, StyledChargeVideoSection, StyledLabelVideoUploader } from './styles'
import axios from 'axios'
import  Button  from '../../components/Button'

function ChargeVideo() {
  const [link, setLink] = useState('')
  const [result, setResult] = useState('')

  function handleChange(e) {
    let link = e.target.value
    link = link.split('=')
    setLink(link[1])
  }

  async function handleSubmitVideos(e) {
    try {
      e.preventDefault()
      setLink([e.target.value])

      const token = localStorage.getItem('token')

      const response = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches/profile/files',
        data : {
          uploadedFiles: link,
        },
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setResult(response.data.message)
    }
    catch(error){
      console.log(`Ups, ha ocurrido un error. ${error}`)
    }
  }

  return (
    <StyledChargeVideoSection>
      {result && <StyledLabelVideoUploader>{result}</StyledLabelVideoUploader>}
      <StyledFormChargeVideos >
        <StyledLabelChargeVideos>Agrega un video </StyledLabelChargeVideos>
        <StyledInputVideos
          type="text"
          name="myLink"
          id="myLink"
          placeholder="Video URL"
          onChange={handleChange}
        />
        <Button 
          type="submit"
          isGreen="true"
          handleClick={handleSubmitVideos}
        >
          Subir Video
        </Button>
      </StyledFormChargeVideos>
    </StyledChargeVideoSection>
  );
}

export default ChargeVideo;
