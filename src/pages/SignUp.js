import React from 'react'
import SignUpForm from '../components/SignUpForm/index'

export class SignUp extends React.Component {

    render(){
        return (
            <main>
               <SignUpForm history={this.props.history}/>
            </main>
        )
    }
}