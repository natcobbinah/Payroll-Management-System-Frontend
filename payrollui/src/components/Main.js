import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import Dashboard from './Dashboard'
import UserProfile from '../users/userdetails'

class Main extends Component{
    render(){
        return(
            <Switch>
                <Route path="/main/dashboard" component={Dashboard}/>
                <Route path="/main/userprofile" component={UserProfile}/>
               {/*  <Redirect from="*" to="/main/dashboard"/> */}
            </Switch>
        );
    }
}

export default Main