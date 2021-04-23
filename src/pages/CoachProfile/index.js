import React from 'react'
import CoachProfileForm from '../../components/CoachProfileForm/index'
import { Header } from '../../components/Header'
import { StyledMain } from './styles'

export function CoachProfile({isPublic}) {
  return(
    <>
      <Header />
      <StyledMain>
        <section>
          <CoachProfileForm isPublic={isPublic} />
        </section>
      </StyledMain>
    </>
  )
}