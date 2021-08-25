import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome';
import MoviesPage from './components/MoviesPage'
import LoginApp from './components/login/loginApp'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome}/>

          <Route path="/movies" component={MoviesPage}/>

          <Route path="/login" component={LoginApp}/>
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
