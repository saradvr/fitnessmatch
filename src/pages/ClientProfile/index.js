import react from 'react'
import { Header } from '../../components/Header'
import { FileUploader } from '../../components/FileUploader'
import { StyledImage, StyledMain, StyledSection } from './styles'

export function ClientProfile() {
  return(
    <>
      <Header></Header>
      <StyledMain>
        <StyledSection>
        </StyledSection>
        <StyledSection primerColumna>
          <StyledImage></StyledImage>
          <FileUploader />
        </StyledSection>
        <StyledSection>
          
        </StyledSection>
      </StyledMain>
    </>
  )
}