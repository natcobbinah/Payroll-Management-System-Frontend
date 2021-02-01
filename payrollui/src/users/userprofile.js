import React,{Component} from 'react'
import axios from 'axios'
import {Card,CardDeck,CardGroup,CardColumns,
        Table,Form,Modal,Button,Alert} from 'react-bootstrap'
import {PATHBASE,PATH_GETUSERROLESONLY,PATH_GETUSERBENEFITSONLY,
    PATH_GETUSERDEPARTMENTONLY,PATH_GETUSERDESIGNATIONSONLY,PATH_GETUSERDETAILSONLY} from '../API_URLS'
   
class UserProfile extends Component{
    constructor(props){
        super(props);

        this.state = {
            //fetch benefit attribute objects
            resultBenefit:null,
            errorBenefit:null,

            //fetch role attribute objects
            resultRole:null,
            errorRole:null,

            //fetch department  attribute objects
            resultDepartment:null,
            errorDepartment:null,

            //fetch designation attribute objects
            resultDesignation:null,
            errorDesignation:null,

            //fetch user attribute objects
            resultUser:null,
            errorUser:null,

        }

        this.fetchUserbenefitOnly = this.fetchUserbenefitOnly.bind(this);
        this.fetchUserdepartmentOnly = this.fetchUserdepartmentOnly.bind(this);
        this.fetchUserdesignationOnly = this.fetchUserdesignationOnly.bind(this);
        this.fetchUserroleOnly = this.fetchUserroleOnly.bind(this);
        this.fetchUserdetailsOnly = this.fetchUserdetailsOnly.bind(this);
    }

    fetchUserbenefitOnly(email){
        axios.get(`${PATHBASE}${PATH_GETUSERBENEFITSONLY}/${email}`)
             .then(resultBenefit => this.setState({resultBenefit: resultBenefit.data}))
             .catch(errorBenefit => this.setState({errorBenefit}));
    }

    fetchUserroleOnly(email){
        axios.get(`${PATHBASE}${PATH_GETUSERROLESONLY}/${email}`)
             .then(resultRole => this.setState({resultRole: resultRole.data}))
             .catch(errorRole => this.setState({errorRole}));
    }

    fetchUserdepartmentOnly(email){
        axios.get(`${PATHBASE}${PATH_GETUSERDEPARTMENTONLY}/${email}`)
             .then(resultDepartment => this.setState({resultDepartment: resultDepartment.data}))
             .catch(errorDepartment => this.setState({errorDepartment}));
    }

    fetchUserdesignationOnly(email){
        axios.get(`${PATHBASE}${PATH_GETUSERDESIGNATIONSONLY}/${email}`)
             .then(resultDesignation => this.setState({resultDesignation: resultDesignation.data}))
             .catch(errorDesignation => this.setState({errorDesignation}));
    }

    fetchUserdetailsOnly(email){
        axios.get(`${PATHBASE}${PATH_GETUSERDETAILSONLY}/${email}`)
             .then(resultUser => this.setState({resultUser: resultUser.data}))
             .catch(errorUser => this.setState({errorUser}));
    }

    render(){
        const{resultBenefit,errorBenefit,resultRole,errorRole,resultDepartment,errorDepartment,
              resultDesignation,errorDesignation,resultUser,errorUser} = this.state;
        return(
            <p>hello i am userprofile</p>
        );
    }
}

export default UserProfile;