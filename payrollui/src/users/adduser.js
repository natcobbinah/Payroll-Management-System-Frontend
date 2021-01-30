import React,{Component} from  'react'
import {Container,Col,Form,Button,Alert} from 'react-bootstrap'
import {PATHBASE,PATH_ADDUSER} from '../API_URLS'
import axios from 'axios'

class AddUser extends Component{
    constructor(props){
        super(props);
    
        this.state = {
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
            tinnumber:'',
            marriagecertid:'',
            usercreator:'',

            error:null,
            postRecordSuccess:null,

            //alertBox attributes
            show:true
        }

        this.getFormDataandSavetoDB = this.getFormDataandSavetoDB.bind(this);
    }

    getFormDataandSavetoDB(){
        const{
            address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
            marriagecertid,usercreator
        }=this.state;

        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: `${PATHBASE}${PATH_ADDUSER}`,
            data: {
                address: address,
                city: city,
                email: email,
                employeeid: employeeid,
                employeelevel: employeelevel ,
                enabled: enabled,
                password: password,
                phonenumber: phonenumber,
                bankaccountnumber:bankaccountnumber,
                birthdate: birthdate,
                gender:gender,
                hiredate: hiredate,
                maritalstatus:maritalstatus,
                birthcertid: birthcertid,
                driverslicenseid: driverslicenseid,
                passportid: passportid,
                ssnitid: ssnitid,
                votersid:votersid,
                tinnumber: tinnumber,
                marriagecertid: marriagecertid,
                usercreator: usercreator,
                name: name,
            },
            headers: headers
        })
        .then(postRecordSuccess => this.setState({postRecordSuccess: postRecordSuccess.data}))
        .catch(error => this.setState({error}));
    }


    render(){
        const{error, postRecordSuccess,show} = this.state;
        return(
            <Container fluid>
                {error?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Unsuccessful operation</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {postRecordSuccess?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>User created Successfully</Alert.Heading>
                </Alert> 
                 : null
                }   


                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placedholder="Enter name" onChange={(e) => this.setState({name : e.target.value})}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placedholder="Enter Address" onChange={(e) => this.setState({address : e.target.value})}></Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col>
                             <Form.Label>Email</Form.Label>
                             <Form.Control type="email" placedholder="Enter email here" onChange={(e) => this.setState({email : e.target.value})}></Form.Control>
                           </Col>
                           <Col>
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Enter password here" onChange={(e) => this.setState({password : e.target.value})}></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={3}>
                             <Form.Label>Gender</Form.Label>
                             <Form.Control type="text" placedholder="Enter gender here" onChange={(e) => this.setState({gender : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="date" onChange={(e) => this.setState({birthdate : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                             <Form.Label>EmployeeLevel</Form.Label>
                             <Form.Control type="text" placedholder="Enter employeelevel here" onChange={(e) => this.setState({employeelevel : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>HireDate</Form.Label>
                              <Form.Control type="date" onChange={(e) => this.setState({hiredate : e.target.value})}></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={3}>
                             <Form.Label>City</Form.Label>
                             <Form.Control type="text" placedholder="Enter city here" onChange={(e) => this.setState({city : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>PhoneNumber</Form.Label>
                              <Form.Control type="text" placedholder="Phonenumber here.." onChange={(e) => this.setState({phonenumber : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                             <Form.Label>MaritalStatus</Form.Label>
                             <Form.Control type="text" placedholder="Enter marital status here" onChange={(e) => this.setState({maritalstatus : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>EmployeeID</Form.Label>
                              <Form.Control type="text" placeholder="Enter employeeID here..." onChange={(e) => this.setState({employeeid : e.target.value})}></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={3}>
                             <Form.Label>BankAccountNo</Form.Label>
                             <Form.Control type="text" placedholder="Enter bankaccountno here" onChange={(e) => this.setState({bankaccountnumber : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>SSNITID</Form.Label>
                              <Form.Control type="text" placedholder="SSNIT no here.." onChange={(e) => this.setState({ssnitid : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                             <Form.Label>VotersID</Form.Label>
                             <Form.Control type="text" placedholder="VoterID here" onChange={(e) => this.setState({votersid : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>BirthCertificate</Form.Label>
                              <Form.Control type="text" placeholder="BirthCert here..." onChange={(e) => this.setState({birthcertid : e.target.value})}></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={3}>
                             <Form.Label>DriversLicense</Form.Label>
                             <Form.Control type="text" placedholder="Enter Drivers license here" onChange={(e) => this.setState({driverslicenseid : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>PassportNo</Form.Label>
                              <Form.Control type="text" placedholder="Passportno here.." onChange={(e) => this.setState({passportid : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                             <Form.Label>Tin Number</Form.Label>
                             <Form.Control type="text" placedholder="Tinnumber here" onChange={(e) => this.setState({tinnumber : e.target.value})}></Form.Control>
                           </Col>
                           <Col md={3}>
                              <Form.Label>Marriage Cert</Form.Label>
                              <Form.Control type="text" placeholder="MarriageCert here..." onChange={(e) => this.setState({marriagecertid : e.target.value})}></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                        <Col md={4}></Col>
                        <Col md={4}>
                            <Button variant="primary"  type="button" size="lg" block className="mb-4" onClick={this.getFormDataandSavetoDB}>
                                AddUser
                            </Button>
                        </Col>
                        <Col md={4}></Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default AddUser