import React,{Component} from 'react'
import axios from 'axios'
import {Card,CardDeck,CardGroup,CardColumns,
        Table,Form,Modal,Button,Col,Alert,Container,Row,NavDropdown,Navbar,Nav,FormControl} from 'react-bootstrap'
import {PATHBASE,PATH_GETUSERROLESONLY,PATH_GETUSERBENEFITSONLY,
    PATH_GETUSERDEPARTMENTONLY,PATH_GETUSERDESIGNATIONSONLY,PATH_GETUSERDETAILSONLY} from '../API_URLS'
import './header.css'
   
class UserProfile extends Component{
    constructor(props){
        super(props);

        this.state = {
            //searchUser variable
            searchEmail:'',

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

            //alert on User fetch
            showUserdetails:true,
            showUserbenefits:true,
            showUserdepartment:true,
            showUserdesignation:true,
            showUserroles:true,

        }

        this.fetchUserbenefitOnly = this.fetchUserbenefitOnly.bind(this);
        this.fetchUserdepartmentOnly = this.fetchUserdepartmentOnly.bind(this);
        this.fetchUserdesignationOnly = this.fetchUserdesignationOnly.bind(this);
        this.fetchUserroleOnly = this.fetchUserroleOnly.bind(this);
        this.fetchUserdetailsOnly = this.fetchUserdetailsOnly.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(event){
      const{searchEmail} = this.state;
      this.fetchUserdetailsOnly(searchEmail);
      this.fetchUserbenefitOnly(searchEmail);
      this.fetchUserdepartmentOnly(searchEmail);
      this.fetchUserdesignationOnly(searchEmail);
      this.fetchUserroleOnly(searchEmail); 
      event.preventDefault();
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
              resultDesignation,errorDesignation,resultUser,errorUser,showUserdetails,
              showUserbenefits,showUserdepartment,showUserdesignation,showUserroles} = this.state;
        return(
            <Container fluid>
                <Navbar  fixed="top" expand="lg"  className="mb-5 navbar-custom">
                    <Navbar.Brand href="#home">UserDetails</Navbar.Brand> 
                      <Form inline>
                          <FormControl type="text" placeholder="Search by email" className="mr-sm-2" onChange={(e) => this.setState({searchEmail: e.target.value})}/>                       
                          <Button variant="secondary" onClick={this.onSearchSubmit}>Search</Button> 
                      </Form>
                </Navbar>

                {errorUser?
                <Alert className="mt-5" show={showUserdetails} variant="danger" onClose={(event) => this.setState({showUserdetails:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User details</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorBenefit?
                <Alert className="mt-5" show={showUserbenefits} variant="danger" onClose={(event) => this.setState({showUserbenefits:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User benefit</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorDepartment?
                <Alert className="mt-5" show={showUserdepartment} variant="danger" onClose={(event) => this.setState({showUserdepartment:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User departments</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorDesignation?
                <Alert className="mt-5" show={showUserdesignation} variant="danger" onClose={(event) => this.setState({showUserdesignation:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User departments</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorRole?
                <Alert className="mt-5" show={showUserroles} variant="danger" onClose={(event) => this.setState({showUserroles:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User departments</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {resultUser?
                   <Row className="mt-5">
                   <Col md={2}></Col>
                   <Col md={6}>
                    <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                      <Card.Header as="h5">PERSONAL INFORMATION</Card.Header>
                      <Card.Body>
                          <Table responsive="sm"  bordered hover size="sm">
                            <thead>
                              <tr>
                                 <th>Name</th>
                                 <th>Address</th>
                                 <th>Email</th>
                                 <th>Birthdate</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{resultUser.name}</td>
                                <td>{resultUser.address}</td>
                                <td>{resultUser.email}</td>
                                <td>{resultUser.birthdate}</td>
                            </tbody>

                            <thead>
                              <tr>
                                 <th>Gender</th>
                                 <th>Birthdate</th>
                                 <th>City</th>
                                 <th>PhoneNumber</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{resultUser.gender}</td>
                                <td>{resultUser.birthdate}</td>
                                <td>{resultUser.city}</td>
                                <td>{resultUser.phonenumber}</td>
                            </tbody>

                            <thead>
                              <tr>
                                 <th  colSpan="4">Marital Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td  colSpan="4">{resultUser.maritalstatus}</td>
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
                  :null
                }

                {resultUser?
                   <Row className="mt-2">
                   <Col md={2}></Col>
                   <Col md={6}>
                    <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                      <Card.Header as="h5">NATIONAL ID AND CERTS</Card.Header>
                      <Card.Body>
                          <Table responsive="sm"  bordered hover size="sm">
                            <thead>
                              <tr>
                                 <th>DriversLicense</th>
                                 <th>PassportNo</th>
                                 <th>Tin Number</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{resultUser.driverslicenseid}</td>
                                <td>{resultUser.passportid}</td>
                                <td>{resultUser.tinnumber}</td>
                            </tbody>
                         
                            <thead>
                              <tr>
                                 <th>Marriage Certificate</th>
                                 <th>VotersID</th>
                                 <th>Birth Certificate</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{resultUser.marriagecertid}</td>
                                <td>{resultUser.votersid}</td>
                                <td>{resultUser.tinnumber}</td>
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
                  :null
                }

                {resultUser?
                   <Row className="mt-2">
                   <Col md={2}></Col>
                   <Col md={6}>
                    <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                      <Card.Header as="h5">EMPLOYMENT DETAILS</Card.Header>
                      <Card.Body>
                          <Table responsive="sm"  bordered hover size="sm">
                            <thead>
                              <tr>
                                 <th>EmployeeID</th>
                                 <th>EmployeeLevel</th>
                                 <th>Hiredate</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{resultUser.employeeid}</td>
                                <td>{resultUser.employeelevel}</td>
                                <td>{resultUser.hiredate}</td>
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
                  :null
                }

                {resultUser?
                <Row className="mt-2">
                <Col md={2}></Col>
                <Col md={6}>
                 <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                   <Card.Header as="h5">BANK DETAILS</Card.Header>
                   <Card.Body>
                       <Table responsive="sm"  bordered hover size="sm">
                         <thead>
                           <tr>
                              <th>BankAccount No</th>
                           </tr>
                         </thead>
                         <tbody>
                             <td>{resultUser.bankaccountnumber}</td>
                         </tbody>
                       </Table>
                   </Card.Body>
                 </Card>
                </Col>
                <Col md={3}></Col>
               </Row>
                 :null
                } 

                {resultBenefit?
                  <Row className="mt-2">
                  <Col md={2}></Col>
                  <Col md={6}>
                   <Card  style={{ width: '68rem' }} className="text-center mt-2"  border="danger">
                     <Card.Header as="h5">USER BENEFIT</Card.Header>
                     <Card.Body>
                         <Table responsive="sm"  bordered hover size="sm">
                           <thead>
                             <tr>
                               <th>BENEFIT NAMES</th>
                               <th>FREQUENCY</th>
                               <th>AMOUNT FLAT</th>
                               <th>AMOUNT CALCULATED</th>
                               <th>%AMOUNT CALCULATED</th>
                               <th>DESIGNATION NAME</th>
                               <th>DESIGNATION DEPT NAME</th>
                             </tr>
                           </thead>
                           <tbody>
                           {resultBenefit.map(benefit => 
                              <tr key={benefit.id}>
                                   <td>{benefit.benefitname}</td>
                                   <td>{benefit.frequency}</td>
                                   <td>{benefit.flatamount}</td>
                                   <td>{benefit.calculatedamount}</td>
                                   <td>{benefit.percentagevalue}</td>
                                   <td>{benefit.designation?
                                        benefit.designation.designationname
                                        :null
                                       }
                                   </td>
                                   <td>{benefit.designation?
                                        benefit.designation.department.departmentname
                                        :null
                                      }
                                   </td>
                             </tr>
                           )}
                           </tbody>
                         </Table>
                     </Card.Body>
                   </Card>
                  </Col>
                  <Col md={3}></Col>
                 </Row>
                 :null
                } 

                {resultDepartment?
                  <Row className="mt-2">
                  <Col md={2}></Col>
                  <Col md={6}>
                   <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                     <Card.Header as="h5">USER DEPARTMENT</Card.Header>
                     <Card.Body>
                         <Table responsive="sm"  bordered hover size="sm">
                           <thead>
                             <tr>
                                <th>DEPARTMENT CODE</th>
                                <th>DEPARTMENT NAME</th>
                             </tr>
                           </thead>
                           <tbody>
                           {resultDepartment.map(department => 
                             <tr key={department.id}>
                               <td>{department.departmentid}</td>
                                <td>{department.departmentname}</td>
                             </tr>
                           )}
                           </tbody>
                         </Table>
                     </Card.Body>
                   </Card>
                  </Col>
                  <Col md={3}></Col>
                 </Row>
                 :null
                } 

                {resultDesignation?
                  <Row className="mt-2">
                   <Col md={2}></Col>
                   <Col md={6}>
                   <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                     <Card.Header as="h5">USER DESIGNATIONS</Card.Header>
                     <Card.Body>
                         <Table responsive="sm"  bordered hover size="sm">
                           <thead>
                             <tr>
                                 <th>Designation Name</th>
                                 <th>Designation Department</th>
                             </tr>
                           </thead>
                           <tbody>
                           {resultDesignation.map(designation => 
                             <tr key={designation.id}>
                               <td>{designation.designationname}</td>
                               <td>
                                 {designation.department?
                                  designation.department.departmentname
                                  :null
                                }
                                </td>
                             </tr>
                           )}
                           </tbody>
                         </Table>
                     </Card.Body>
                   </Card>
                  </Col>
                  <Col md={3}></Col>
                 </Row>
                 :null
                } 

                {resultRole?
                   <Row className="mt-2">
                   <Col md={2}></Col>
                   <Col md={6}>
                    <Card style={{ width: '68rem' }} className="text-center mt-2" border="danger">
                      <Card.Header as="h5">USER ROLES</Card.Header>
                      <Card.Body>
                          <Table responsive="sm"  bordered hover size="sm">
                            <thead>
                              <tr>
                                  <th>Roles</th>
                              </tr>
                            </thead>
                            <tbody>
                            {resultRole.map(role => 
                              <tr key={role.roleid}>
                                <td>{role.rolename}</td>
                              </tr>
                            )}
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
                 :null
                }  
            </Container>
        );
    }
}

export default UserProfile;