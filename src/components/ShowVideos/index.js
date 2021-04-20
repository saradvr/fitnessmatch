import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCoaches } from '../../store/coachesReducer'
import  Button  from '../../components/Button'


function ShowVideos(){

  const [ isDeleted, setIsDeleted ] = useState('')

  const dispatch = useDispatch()

  const { loading, error, coaches } = useSelector(({ coachReducer }) => ({
    loading: coachReducer.loading,
    coaches: coachReducer.coaches,
    error: coachReducer.error,
  }))
  
  useEffect(() => {
    dispatch(getCoaches())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function deleteVideo(el) {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/coaches/profile/deletefiles',
      data : {
        uploadedFiles: el,
      },
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    setIsDeleted(response.data.message)
  }
  
  return (
    <>
      {isDeleted ? (<p>{isDeleted}</p>) :('') }
      {coaches[0] !== undefined && !!coaches[0].uploadedFiles && coaches[0].uploadedFiles.length > 0 && coaches[0].uploadedFiles.map((el)  => {
        return (
          <>
            <iframe 
              key={el}
              width="455" 
              height="205" 
              src={`https://www.youtube.com/embed/${el}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
            <Button 
              key={`btn-${el}`} 
              handleClick={e => deleteVideo(el)}
              type="button"
              isGreen="true"
            >
              Eliminar Video
            </Button>
          </>
        )
      })}
    </>
  )
}

export default ShowVideos;