import React from 'react'
import CoachProfileForm from '../../components/CoachProfileForm/index'
import { Header } from '../../components/Header'
import { StyledMain } from './styles'

export class CoachProfile extends React.Component {
  render(){
    return(
      <>
      <Header />
      <StyledMain>
        <section>
          <CoachProfileForm history={this.props.history}/>
        </section>
      </StyledMain>
      </>
    )
  }
}