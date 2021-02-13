import React,{Component} from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import './loginform.css'
import {PATHBASE,PATH_ADDUSER,PATH_USER_LOGIN,loginEmail,loginPassword} from '../API_URLS'
import {Container,Row,Col,Form,Button,Alert} from 'react-bootstrap'

class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {
        
         // attributes for creating user credentials if individual
         //logs in with Google Chrome
          address:'',
          city:'',
          email:'',
          employeeid:'',
          employeelevel:'',
          enabled: true,
          password:'',
          phonenumber:'',
          bankaccountnumber:'',
          birthdate:'',
          gender:'',
          hiredate:'',
          maritalstatus:'',
          birthcertid:'',
          driverslicenseid:'',
          passportid:'',
          ssnitid:'',
          votersid:'',
          name:'',
          tier2: '',
          tinnumber:'',
          marriagecertid:'',
          usercreator:'Google',

          //resultObject for for getRequest
          postRecordSuccess:null,
          postRecordError:null,

          //basic auth with springsecurity
          errorLogin: null,
          successLogin: null,

          //error login alert
          showAlert:true,
        
          //login in with google
          buttonText:'Login With Google',
          googlename:null,
          googleemail:null,
          googletoken:null,
          googleProviderId: 'Google',
          onGoogleLoginSuccess: null,
          onGoogleLoginFailure: null,
          clientId: '552767747033-o7fm828mscm2otn5oprkfjjtq3qscqad.apps.googleusercontent.com'
        }

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit(event){
        const{successLogin,errorLogin}=this.state;

        event.preventDefault();
        const{email,password} = this.state;
        console.log(email + ":" + password );

        axios.get(`${PATHBASE}${PATH_USER_LOGIN}?${loginEmail}${email}&${loginPassword}${password}`)
             .then(successLogin => this.setState({successLogin: successLogin.data}))
             .catch(errorLogin => this.setState({errorLogin}));

        //redirect to main dashboard
      /*   if(successLogin){
            this.props.history.push("/main/dashboard");
        } */
    }

    signUpUserIfnotINDB(response){
              //get email,name and googleId from response and
              const{enabled,usercreator} = this.state;
      
              const headers = { 'content-type': 'application/json'};
      
              let googleEmail = response.profileObj.email;
              let googleIdasPasswrd = response.profileObj.googleId;
              let googleName = response.profileObj.name;
      
             if(response){
              //then create user
              axios({
                method: 'post',
                url: `${PATHBASE}${PATH_ADDUSER}`,
                data: {
                    address: '',
                    city: '',
                    email: googleEmail,
                    employeeid: '',
                    employeelevel: '' ,
                    enabled: enabled,
                    password: googleIdasPasswrd,
                    phonenumber: '',
                    bankaccountnumber:'',
                    birthdate: '',
                    gender:'',
                    hiredate: '',
                    maritalstatus:'',
                    birthcertid: '',
                    driverslicenseid: '',
                    passportid: '',
                    ssnitid: '',
                    votersid:'',
                    name: googleName,
                    tier2: '',
                    tinnumber:'',
                    marriagecertid:'',
                    usercreator:usercreator,
                   
                },
                headers: headers
            })
            .then(postRecordSuccess => this._isMounted && this.setState({postRecordSuccess: postRecordSuccess.data}))
            .catch(postRecordError => this._isMounted && this.setState({postRecordError}))
            }

        //redirect to main dashboard
        this.props.history.push("/main/dashboard")
    }

    render(){
        const{buttonText,clientId,errorLogin,showAlert,successLogin} = this.state;
        const onGoogleLoginSuccess = (response) => {
            let res = response.profileObj;
            
            this.signUpUserIfnotINDB(response);
        }

        const onGoogleLoginFailure = (response) => {
            let res = response.profileObj;
        }

        return(
            <Container fluid>
                <Row>
                    <Col className="sidePage" md={3}></Col>
                    <Col md={1} className="formpage"></Col> 
                    <Col md={3} className="formpage">
                        {successLogin?  
                        /* redirect to main dashboard */
                        this.props.history.push("/main/dashboard")
                        :
                        null
                        }
                        <Form className="mt-5 pt-2">
                            <Form.Group controlId="email">
                                <Form.Label className="mt-5 pt-5">Email address</Form.Label>
                                <Form.Control type="email" size="lg" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})}/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" size="lg" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                            </Form.Group>
                            <Button variant="secondary"  type="submit" size="lg" block className="mb-4" onClick={this.handleLoginSubmit}>
                                Submit
                            </Button>
                            <GoogleLogin clientId={clientId} buttonText={buttonText}
                                         onSuccess={onGoogleLoginSuccess}
                                         onFailure={onGoogleLoginFailure}/>
                        </Form>
                    </Col>
                    <Col md={5} className="formpage rightSightNav">
                    {errorLogin?
                            <Alert className="mt-5" show={showAlert} variant="danger" onClose={(event) => this.setState({showAlert:false})} dismissible>
                            <Alert.Heading>Incorrect Email or Password</Alert.Heading>
                             </Alert> 
                            : null
                            }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginForm;