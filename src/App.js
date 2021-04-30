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
import { ClientSetAppointment } from './pages/ClientSetAppointment'
import { TransactionResult } from './pages/TransactionResult'
import { UserProfile } from './pages/UserProfile'

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
          <UserProfile />
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
        <PrivateRoute exact path="/transaction-result">
          <TransactionResult />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
