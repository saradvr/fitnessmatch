import { useState } from 'react'
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

  async function handleSubmit(e) {
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

      console.log(response)
      setResult(response.data.message)
    }
    catch(error){
      console.log(`Ups, ha ocurrido un error. ${error}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="myLink">Agrega un video </label>
        <input
          type="text"
          name="myLink"
          id="myLink"
          placeholder="Video URL"
          onChange={handleChange}
        />
        <Button 
          type="submit"
          isGreen="true"
        >
          Subir Video
        </Button>
      </form>
      {result && <p>{result}</p>}
    </>
  );
}

export default ChargeVideo;
