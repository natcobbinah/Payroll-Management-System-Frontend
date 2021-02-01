import React,{Component} from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import './loginform.css'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'

class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {
        
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

    handleLoginSubmit(){
        //redirect to main dashboard

        this.props.history.push("/main/dashboard")
    }

    signUpUserIfnotINDB(response){
        //will implement logics here

        //redirect to main dashboard
        this.props.history.push("/main/dashboard")
    }

    render(){
        const{buttonText,clientId} = this.state;
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
                    <Col md={4} className="formpage">
                        <Form className="mt-5 pt-2">
                            <Form.Group controlId="email">
                                <Form.Label className="mt-5 pt-5">Email address</Form.Label>
                                <Form.Control type="email" size="lg" placeholder="Enter email"/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" size="lg" placeholder="Password"/>
                            </Form.Group>
                            <Button variant="secondary"  type="submit" size="lg" block className="mb-4" onClick={this.handleLoginSubmit}>
                                Submit
                            </Button>
                            <GoogleLogin clientId={clientId} buttonText={buttonText}
                                         onSuccess={onGoogleLoginSuccess}
                                         onFailure={onGoogleLoginFailure}/>
                        </Form>
                    </Col>
                    <Col md={4} className="formpage rightSightNav"></Col>
                </Row>
            </Container>
        );
    }
}

export default LoginForm;