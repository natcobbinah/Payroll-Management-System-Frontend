import React,{Component} from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import LoginForm from './login/loginform'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  render(){
    return(
        <BrowserRouter>
           <Switch>
              <Route exact path="/" component={LoginForm}/>
              <Route path="/main" component={Main}/>
           </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
