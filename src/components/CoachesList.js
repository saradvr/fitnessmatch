import {CoachCard} from './CoachCard'
import { getCoaches } from '../store/coachesReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export function CoachesList () {
  const dispatch = useDispatch()
  const { loading, error, coaches } = useSelector(({ coachReducer }) => ({
    loading: coachReducer.loading,
    coaches: coachReducer.coaches,
    error: coachReducer.error,
  }))

  useEffect(() => {
    dispatch(getCoaches())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <p>Cargando entrenadores disponibles...</p>
  if (error) return <p>Algo salió mal</p>
  return (
    <>
      {!!coaches && coaches.length > 0 ? coaches.map(({
        _id,
        name, 
        specializations, 
        disciplines, 
        experienceYears, 
        appointmentFee,
        profilePicture,
      }) => {
        return(
          <CoachCard
            key={_id}
            name={name}
            specializations={specializations}
            disciplines={disciplines}
            experienceYears={experienceYears}
            appointmentFee={appointmentFee}
            profilePicture={profilePicture}
            _idUserType={_id}
          />
        )
      }):
          <p>No se encontraron entrenadores con esas características.</p>
      }
    </>
  );
}