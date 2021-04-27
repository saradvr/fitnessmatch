import axios from 'axios'
import Button from '../Button'
import { getCoach } from '../../store/coachesReducer'
import { SliderContentItem, StyledButtonVideos, StyledLabelVideoDeleted } from './styles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import './styles.css'
import { StyledLabelChargeVideos } from '../ChargeVideos/styles'

function ShowVideos({editIsFalse}){

  const [ isDeleted, setIsDeleted ] = useState('')
  const [ current, setCurrent ] = useState(0)
  const dispatch = useDispatch()

  const { coach } = useSelector(({ coachReducer }) => ({
    coach: coachReducer.coach,
  }))

  useEffect(() => {
    dispatch(getCoach())
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

  const nextSlide = () => {
    setCurrent(current === coach.uploadedFiles.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? coach.uploadedFiles.length -1  : current - 1)
  }

  if(!!Array && !Array.isArray(coach.uploadedFiles) || coach.uploadedFiles.length <= 0) {
    return <StyledLabelChargeVideos>No se han agregado videos</StyledLabelChargeVideos>
  }
  
  return (
    <>
      <SliderContentItem>
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {coach.uploadedFiles.map((el, index)  => {
          return (
            <section key={el} className={index === current ? 'slide active' : 'slide'}>
              {index === current && (
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
                  </iframe><br/>
                  <StyledButtonVideos>
                    {!editIsFalse && <Button 
                      key={`btn-${el}`} 
                      handleClick={e => deleteVideo(el)}
                      type="button"
                      isGreen="true"
                    >
                      Eliminar Video
                    </Button>}
                  </StyledButtonVideos>
                  {isDeleted && <StyledLabelVideoDeleted>{isDeleted}</StyledLabelVideoDeleted> }
                </>
              ) }
            </section>
          )
          })
        }
      </SliderContentItem>
    </>
  )
}

export default ShowVideos;