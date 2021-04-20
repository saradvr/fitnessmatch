import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import {ListadoEntrenadores} from './pages/ListadoEntrenadores'
import {Login} from "./pages/Login"
import {CoachProfile} from './pages/CoachProfile'
import './App.css'
import { SignUp } from './pages/SignUp'
import { LandingPage } from './pages/LandingPage'
import { CoachAvailability } from './pages/CoachSetAvailability'
import { history } from './utils/history'
import { ClientSetAppointment } from './pages/ClientSetAppointment'

function PrivateRoute({children, ...rest}) {
  const token = localStorage.getItem('token')
  return (
    <Route {...rest} render={() => {
      return token ? children : <Redirect to="/login" />
    }} />  
  )
}

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/coacheslist">
          <ListadoEntrenadores />        
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <CoachProfile /> 
        </PrivateRoute>
        <PrivateRoute exact path="/profile/availability">
          <CoachAvailability />  
        </PrivateRoute>
        <PrivateRoute exact path="/coach/:coachId">
          <CoachProfile />
        </PrivateRoute>
        <PrivateRoute exact path="/coach/:coachId/setappointment">
          <ClientSetAppointment />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
