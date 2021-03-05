import {
  BrowserRouter as Router,
  Route,  
  Switch,
} from 'react-router-dom';
import {ListadoEntrenadores} from './pages/ListadoEntrenadores';
import './App.css';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/coachesList" component={ListadoEntrenadores} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
