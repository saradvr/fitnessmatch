import axios from 'axios'
import React from 'react'
import Button from '../Button'
import FormInputs from '../FormInputs'
import { LinkButton } from '../LinkButton'
import Filter from '../Filter'
import { StyledForm, StyledSection, StyledLabel, StyledTextArea, StyledTopContainer, StyledTop, StyledMid, StyledSpan, StyledRedes, StyledRed, StyledPicture } from './styles'
import { SliderContentItem, StyledButtonVideos, StyledLabelVideoDeleted } from './styles'
import { StyledLabelChargeVideos, StyledInputVideos, StyledFormChargeVideos, StyledChargeVideoSection } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDisciplines, toggleDiscipline, addDiscipline } from '../../store/disciplinesReducer'
import { addSpecialization, getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FileUploader } from '../FileUploader'
import { getCoach, SAVE_COACH, COACHES_ERROR, getPublicCoach } from '../../store/coachesReducer'
import { useParams } from 'react-router'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import './styles.css'

function CoachProfileForm ({isPublic}){
  
  const [edit,setEdit] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState(null)
  const [current, setCurrent] = useState(0)
  const [videoToDelete, setVideoToDelete] = useState(null)
  const [existVideo, setExistVideo] = useState(false)

  const dispatch = useDispatch()
  const { coachId } = useParams()

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
    isPublic ? dispatch(getPublicCoach(coachId)) : dispatch(getCoach())
  }, [dispatch, isPublic, coachId])

  const {
    checkSpecializations,
    specializations, 
    disciplines,
    checkDisciplines,
    coach,
    } = useSelector(({
      specializationReducer,
      disciplineReducer,
      coachReducer,
    })=>({
    checkSpecializations: specializationReducer.checkSpecializations,
    specializations: specializationReducer.specializations,
    disciplines: disciplineReducer.disciplines,
    checkDisciplines: disciplineReducer.checkDisciplines,
    coach: coachReducer.coach,
  }))

  function handleChangeVideo(e) {
    let link = e.target.value
    link = link.split('=')
    setLink(link[1])
    if(coach.uploadedFiles.includes(link[1])){
      setExistVideo(true)
    } else {
      setExistVideo(false)
    }
  }

  async function handleSubmit (e){
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if(!!videoToDelete){
        await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/coaches/profile/deletefiles',
          data : {
            uploadedFiles: videoToDelete,
          },
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        setVideoToDelete(null)
      }
      
      if(existVideo !== true && !!link){
        await axios({
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
        setLink(null)
      }
      
      const { data } = await axios ({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches/profile',
        data: {
          name,
          description,
          experienceYears: experience,
          appointmentFee: price,
          disciplines: checkDisciplines,
          specializations: checkSpecializations,
        },
        headers:{
          Authorization: `bearer ${token}`
        }
      })
      if(data.coach.uploadedFiles.length <= current){
        setCurrent(prevCurrent => prevCurrent -1)
      }
      if(current < 0){
        setCurrent(prevCurrent => prevCurrent +1)
      }
      dispatch({type: SAVE_COACH, payload: data.coach})
      setEdit(false)
    } catch(error) {
        dispatch({type: COACHES_ERROR, payload: error})
    }
  }

  const nextSlide = () => {
    setCurrent(current === coach.uploadedFiles.length - 1 ? 0 : current + 1)
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? coach.uploadedFiles.length -1  : current - 1)
  }

  return(

    <StyledForm>
      <StyledSection primerColumna>
        <StyledPicture picture>
          {coach && coach.profilePicture !== undefined && 
          <FileUploader 
          isPublic={isPublic} 
          initialPicture={coach.profilePicture} 
          url='/coaches/profile/picture'/>
          }
        </StyledPicture>
        <StyledPicture>
          {edit === true && !!coach ? (
            <FormInputs
              id="name"
              type="text"
              name="name"
              onChange={(e)=> setName(e.target.value)}
              value={name}
            >
              Nombre
            </FormInputs>) :
            <StyledLabel>{coach && coach.name}</StyledLabel>
          }
        </StyledPicture>
      </StyledSection>
      <StyledSection segundaColumna>
        <StyledTop>
          {!isPublic && 
          <StyledTopContainer align="right">
            <LinkButton to='/profile/availability'>
              Ver agenda
            </LinkButton>
          </StyledTopContainer>}   
          <StyledTopContainer>
            <StyledLabel htmlFor="description">Descripción</StyledLabel>
          </StyledTopContainer>
        </StyledTop>
        {edit === true && !!coach ? (
          <StyledTextArea
            id="description"
            name="description"
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
          >
            Esta es una breve descripción acerca del entrenador
          </StyledTextArea>
          ) : 
          (<StyledSpan textArea>{coach && coach.description}</StyledSpan>)
        }
      </StyledSection>
      <StyledSection>
        <StyledRedes>
          {!isPublic && edit === false && !!coach && (
            <StyledRed>
              <Button
              type="button"
              handleClick={() => {
                setName(coach.name)
                setDescription(coach.description)
                setExperience(coach.experienceYears)
                setPrice(coach.appointmentFee)
                setEdit(true)
                if( coach.specializations.length > 0){
                  coach.specializations
                  .map(el => checkSpecializations.includes(el._id) ? "" : 
                  dispatch(addSpecialization(el._id)))
                }
                if( coach.disciplines.length > 0){
                  coach.disciplines.map(el => checkDisciplines.includes(el._id) ? "" : 
                  dispatch(addDiscipline(el._id)))
                }
              }}
            >
                Editar perfil
              </Button>
            </StyledRed>
          )}
          
          {isPublic && (
            <StyledRed>
              <LinkButton
                to={location => `${location.pathname}/setappointment`}
              >
                Pedir cita de valoracion
              </LinkButton>
            </StyledRed>
          )}
          <StyledRed>
            {edit === true && !!coach? (
              <Button
                type="button"
                handleClick={handleSubmit}
              >
                Guardar cambios
              </Button>
              ) : ("")
            }
          </StyledRed>
          <StyledRed>
            {edit === true && !!coach ? (
              <Button
                type="button"
                handleClick={() => {
                  setEdit(false)
                  setVideoToDelete(null)
                }}
              >
                Cancelar
              </Button>
              ) : ("")
            }
          </StyledRed>
        </StyledRedes>
      </StyledSection>

      <StyledSection>
        <StyledLabel>Especializaciones</StyledLabel>
        {edit === true && !!coach? (
          <Filter
            filterName={specializations}
            nameCheckbox='checkSpecializations'
            checks = {checkSpecializations}
            handleChange = {(e) => dispatch(toggleSpecialization(checkSpecializations.includes(e.target.id), e.target.id))}
          />
         ) : 
         (<StyledSpan>{coach && coach.specializations ? coach.specializations
          .map((el)=> <li key={el._id}>{el.name}</li>) : "" }
          </StyledSpan>)
        }
      </StyledSection>
      <StyledSection order={1}>
        <StyledMid expYears>
          <StyledLabel>Años de experiencia</StyledLabel>
          {edit === true && !!coach ? (
            <FormInputs
              id="experience"
              type="text"
              name="experience"
              onChange={(e)=> setExperience(e.target.value)}
              value={experience}
            />) : 
            (<StyledSpan>{coach && coach.experienceYears}</StyledSpan>)
          }
          <StyledLabel>Precio cita</StyledLabel>
          {edit === true && !!coach? (
            <FormInputs
              id="price"
              type="text"
              name="price"
              onChange={(e)=> setPrice(e.target.value)}
              value={price}
            />) : 
            (<StyledSpan>{coach && coach.appointmentFee}</StyledSpan>)
          }
        </StyledMid>
        <StyledMid>
          <StyledLabel>Redes sociales</StyledLabel>
        </StyledMid>
        <StyledRedes>
          <StyledRed><FontAwesomeIcon icon={faFacebookSquare}/></StyledRed>
          <StyledRed><FontAwesomeIcon icon={faInstagram}/></StyledRed>
          <StyledRed><FontAwesomeIcon icon={faTwitterSquare}/></StyledRed>
        </StyledRedes>
        <StyledMid>
        {edit && 
          <>
            {existVideo && <StyledLabelChargeVideos>El video ya existe </StyledLabelChargeVideos>}
            <StyledChargeVideoSection>
              <StyledFormChargeVideos >
                <StyledLabelChargeVideos>Agrega un video </StyledLabelChargeVideos>
                <StyledInputVideos
                  type="text"
                  name="myLink"
                  id="myLink"
                  placeholder="Video URL"
                  onChange={handleChangeVideo}
                />
              </StyledFormChargeVideos>
            </StyledChargeVideoSection>
          </>
        }
        </StyledMid>
        <StyledMid>
          <SliderContentItem>
            <>
              {!!coach.uploadedFiles && coach.uploadedFiles.length <= 0 && <StyledLabelChargeVideos> No hay videos</StyledLabelChargeVideos>}
              {!!coach && !!coach.uploadedFiles && coach.uploadedFiles.length > 0  && coach.uploadedFiles.map((el, index)  => {
                return ( 
                <>
                  <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
                  <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
                  <section key={el}>
                    {index === current &&  (
                      <>
                        <iframe
                          key={el}
                          width="420" 
                          height="205" 
                          src={`https://www.youtube.com/embed/${el}`}
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe><br/>
                        <StyledButtonVideos>
                          {edit && <Button 
                            key={`btn-${el}`} 
                            handleClick={e => setVideoToDelete(el)}
                            type="button"
                            isGreen="true"
                          >
                            Eliminar Video
                          </Button>}
                        </StyledButtonVideos>
                        {videoToDelete !== null && <StyledLabelVideoDeleted>Al guadar cambios el video se eliminará.</StyledLabelVideoDeleted> }
                      </>
                    )} 
                  </section>
                </> )
              })
              }
            </>
          </SliderContentItem>
        </StyledMid>
      </StyledSection>

      <StyledSection>
        <StyledLabel>Disciplinas</StyledLabel>
        {edit === true && !!coach? (
          <Filter
          filterName={disciplines}
          nameCheckbox='checkDisciplines'
          checks = {checkDisciplines}
          handleChange = {(e) => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
        />
        ) : (
          <StyledSpan>{coach && coach.disciplines ? coach.disciplines.map((el)=> <li key={el._id}>{el.name}</li> ) : "" }</StyledSpan>
        )}
      </StyledSection>
    </StyledForm> 
  )
}

export default CoachProfileForm