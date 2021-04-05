import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {ListadoEntrenadores} from './pages/ListadoEntrenadores';
import {Login} from "./pages/Login"
import {CoachProfile} from './pages/CoachProfile';
import './App.css';
import { SignUp } from './pages/SignUp';
import { LandingPage } from './pages/LandingPage';

function PrivateRoute(props) {
  const token = localStorage.getItem('token')

  if(!token) return <Redirect to="/login" />
  return <Route {...props} />
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/coacheslist" component={ListadoEntrenadores} />
        <PrivateRoute exact path="/coach/:idUserType" component={CoachProfile} />
      </Switch>
    </Router>
  );
}

export default App;
