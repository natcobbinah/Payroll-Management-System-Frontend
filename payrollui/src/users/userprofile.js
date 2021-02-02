import React,{Component} from 'react'
import axios from 'axios'
import {Card,CardDeck,CardGroup,CardColumns,
        Table,Form,Modal,Button,Col,Alert,Container,Row,NavDropdown,Navbar,Nav,FormControl} from 'react-bootstrap'
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

    componentDidMount(){
        this.fetchUserbenefitOnly();
        this.fetchUserdepartmentOnly();
        this.fetchUserdesignationOnly();
        this.fetchUserroleOnly();
        this.fetchUserdetailsOnly();
    }

    render(){
        const{resultBenefit,errorBenefit,resultRole,errorRole,resultDepartment,errorDepartment,
              resultDesignation,errorDesignation,resultUser,errorUser} = this.state;
        return(
            <Container fluid>
                <Navbar  fixed="top" bg="dark" expand="lg" className="mb-5">
                    <Navbar.Brand href="#home">UserDetails</Navbar.Brand> 
                     <Form inline>
                         <Col>
                            <FormControl type="text" placeholder="Search by email" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                         </Col>
                     </Form>
                </Navbar>


               <Row>
                <Col>
                <Card className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Personal Information</Card.Header>
                    <Card.Body>
                    <Form>
                        <Form.Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" disabled></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" disabled></Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col>
                             <Form.Label>Email</Form.Label>
                             <Form.Control type="email" disabled></Form.Control>
                           </Col>
                           <Col>
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" disabled></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={4}>
                             <Form.Label>Gender</Form.Label>
                             <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={4}>
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="date" disabled></Form.Control>
                           </Col>
                           <Col md={4}>
                             <Form.Label>City</Form.Label>
                             <Form.Control type="text"  disabled></Form.Control>
                           </Col>
                    </Form.Row>
                    <Form.Row className="mt-4">
                           <Col md={4}>
                              <Form.Label>PhoneNumber</Form.Label>
                              <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={4}>
                             <Form.Label>MaritalStatus</Form.Label>
                             <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={4}>
                              <Form.Label>SSNITID</Form.Label>
                              <Form.Control type="text" disabled></Form.Control>
                           </Col>
                    </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
              </Row>

                <Row>
                  <Col>
                  <Card className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Bank Account Details</Card.Header>
                    <Card.Body>
                        <Form>
                          <Form.Row>
                               <Form.Label>BankAccountNo</Form.Label>
                               <Form.Control type="text" disabled></Form.Control>
                             
                          </Form.Row>
                        </Form>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className="text-center mt-2" bg="light">
                            <Card.Header as="h5">Employment Details</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                      <Col md={4}>
                                       <Form.Label>EmployeeID</Form.Label>
                                       <Form.Control type="text"  disabled></Form.Control>
                                      </Col>
                                      <Col md={4}>
                                        <Form.Label>EmployeeLevel</Form.Label>
                                        <Form.Control type="text" disabled></Form.Control>
                                       </Col>
                                       <Col md={4}>
                                          <Form.Label>HireDate</Form.Label>
                                          <Form.Control type="date" disabled></Form.Control>
                                      </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                 <Col>
                  <Card  className="text-center mt-2" bg="light">
                    <Card.Header as="h5">National ID Cards and Certs</Card.Header>
                    <Card.Body>
                        <Form>
                        <Form.Row>
                           <Col md={6}>
                             <Form.Label>DriversLicense</Form.Label>
                             <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={6}>
                              <Form.Label>PassportNo</Form.Label>
                              <Form.Control type="text" disabled></Form.Control>
                           </Col>
                        </Form.Row>
                        <Form.Row className="mt-3">
                          <Col md={6}>
                             <Form.Label>Tin Number</Form.Label>
                             <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={6}>
                              <Form.Label>Marriage Cert</Form.Label>
                              <Form.Control type="text" disabled></Form.Control>
                           </Col>
                        </Form.Row>
                        <Form.Row className="mt-3">
                        <Col md={6}>
                             <Form.Label>VotersID</Form.Label>
                             <Form.Control type="text" disabled></Form.Control>
                           </Col>
                           <Col md={6}>
                              <Form.Label>BirthCertificate</Form.Label>
                              <Form.Control type="text" disabled></Form.Control>
                           </Col>
                        </Form.Row>
                        </Form>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>

                <Row>
                 <Col>
                  <Card  className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Department</Card.Header>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                 </Col>
                </Row>

                <Row>
                 <Col>
                  <Card  className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Roles</Card.Header>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                 </Col>
                </Row>

                <Row>
                 <Col>
                  <Card  className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Benefits</Card.Header>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                 </Col>
                </Row>

                <Row>
                 <Col>
                  <Card  className="text-center mt-2" bg="light">
                    <Card.Header as="h5">Designations</Card.Header>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                 </Col>
                </Row>
 

            </Container>
        );
    }
}

export default UserProfile;