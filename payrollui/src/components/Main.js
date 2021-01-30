import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import Dashboard from './Dashboard'

class Main extends Component{
    render(){
        return(
            <Switch>
                <Route path="/main/dashboard" component={Dashboard}/>
                <Redirect from="*" to="/main/dashboard"/>
            </Switch>
        );
    }
}

export default Main