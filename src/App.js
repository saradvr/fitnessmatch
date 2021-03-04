import {
  BrowserRouter as Router,
  Route,  
  Switch,
} from 'react-router-dom';
import {ListadoEntrenadores} from './pages/ListadoEntrenadores';
import Login from "./pages/Login"
import {CoachProfile} from './pages/CoachProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/coachesList" component={ListadoEntrenadores} />
        <Route exact path="/coach/:idUserType" component={CoachProfile} />
      </Switch>
    </Router>
  );
}

export default App;
