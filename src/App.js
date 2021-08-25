import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome';
import MoviesPage from './components/MoviesPage'
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Switch>
          
          <Route exact path="/" component={Welcome}/>

          <Route path="/movies" component={MoviesPage}/>

        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
