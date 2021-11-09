import './App.css';
import InputURLTextField  from './components/InputURLTextField';
import Statistics from './components/Statistics';
import {  Header } from './components/Header';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App(props) {

  return (
    <div className="App"> 
      <Header />
    <BrowserRouter>
    <NavigationItems />
    <Switch>
      <Route exact path='/' component={InputURLTextField}/>
      <Route path='/statistics' component={Statistics}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
