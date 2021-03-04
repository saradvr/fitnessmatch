import {
  BrowserRouter as Router,
  Route,  
  Switch,
} from 'react-router-dom';
import {ListadoEntrenadores} from './pages/ListadoEntrenadores';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/coachesList" component={ListadoEntrenadores} />
      </Switch>
    </Router>
  );
}

export default App;
