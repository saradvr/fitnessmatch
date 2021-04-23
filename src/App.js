import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import './App.css'
import {Login} from "./pages/Login"
import { SignUp } from './pages/SignUp'
import { CoachProfile } from './pages/CoachProfile/index'
import { CoachAvailability } from './pages/CoachSetAvailability'
import {ListadoEntrenadores} from './pages/ListadoEntrenadores'
import { LandingPage } from './pages/LandingPage'
import { history } from './utils/history'
import { ClientProfile } from './pages/ClientProfile'
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
          <CoachProfile isPublic={false} />
        </PrivateRoute>
        <PrivateRoute exact path="/clientprofile">
          <ClientProfile />
        </PrivateRoute>
        <PrivateRoute exact path="/profile/availability">
          <CoachAvailability />  
        </PrivateRoute>
        <PrivateRoute exact path="/coach/:coachId">
          <CoachProfile isPublic={true}/>
        </PrivateRoute>
        <PrivateRoute exact path="/coach/:coachId/setappointment">
          <ClientSetAppointment />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
