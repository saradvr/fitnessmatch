import {
  BrowserRouter as Router,
  Route,  
  Switch,
} from 'react-router-dom';
import {ListadoEntrenadores} from './pages/ListadoEntrenadores';
import Login from "./pages/Login"
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/coachesList" component={ListadoEntrenadores} />
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
