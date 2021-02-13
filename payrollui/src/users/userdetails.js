import React,{Component} from 'react'
import axios from 'axios'
import {Card,Table,Button,Col,Alert,Container,Row,
        FormControl,InputGroup} from 'react-bootstrap'
import {PATHBASE,PATH_GETUSERROLESONLY,PATH_GETUSERBENEFITSONLY,
    PATH_GETUSERDEPARTMENTONLY,PATH_GETUSERDESIGNATIONSONLY,PATH_GETUSERDETAILSONLY} from '../API_URLS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
    

import './header.css'
   
class UserDetails extends Component{
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
                <div>
                  <InputGroup size="lg">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup.Prepend>
                     <FormControl placeholder="Search by users email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                          onChange={(e) => this.setState({searchEmail: e.target.value})}/>
                     <InputGroup.Append>
                     <Button variant="secondary" onClick={this.onSearchSubmit}>Search</Button> 
                     </InputGroup.Append>
                  </InputGroup>
                 </div>

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
                    <Alert.Heading>Unsuccessful  fetching User designations</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorRole?
                <Alert className="mt-5" show={showUserroles} variant="danger" onClose={(event) => this.setState({showUserroles:false})} dismissible>
                    <Alert.Heading>Unsuccessful  fetching User roles</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {resultUser?
                   <PersonalInformation list={resultUser}/>
                  :null
                }

                {resultUser?
                   <NationalIdentificationCards list={resultUser}/>
                  :null
                }

                {resultUser?
                   <EmploymentDetails list={resultUser}/>
                  :null
                }

                {resultUser?
                  <BankDetails list={resultUser}/>
                  :null
                } 

                {resultBenefit?
                  <BenefitsforUser list={resultBenefit}/>
                  :null
                } 

                {resultDepartment?
                  <UsersDepartment list={resultDepartment}/>
                 :null
                } 

                {resultDesignation?
                  <UsersDesignation list={resultDesignation}/>
                 :null
                } 

                {resultRole?
                  <UsersRole list={resultRole}/>
                 :null
                }   
            </Container>
        );
    }
}

function PersonalInformation({list}){
    return(
      <Row className="mt-2">
      <Col md={12}>
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
                   <td>{list.name}</td>
                   <td>{list.address}</td>
                   <td>{list.email}</td>
                   <td>{list.birthdate}</td>
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
                   <td>{list.gender}</td>
                   <td>{list.birthdate}</td>
                   <td>{list.city}</td>
                   <td>{list.phonenumber}</td>
               </tbody>

               <thead>
                 <tr>
                    <th  colSpan="4">Marital Status</th>
                 </tr>
               </thead>
               <tbody>
                   <td  colSpan="4">{list.maritalstatus}</td>
               </tbody>
             </Table>
         </Card.Body>
       </Card>
      </Col>
     </Row>
    );
}

function NationalIdentificationCards({list}){
    return(
      <Row className="mt-2">
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
                                <td>{list.driverslicenseid}</td>
                                <td>{list.passportid}</td>
                                <td>{list.tinnumber}</td>
                            </tbody>
                         
                            <thead>
                              <tr>
                                 <th>Marriage Certificate</th>
                                 <th>VotersID</th>
                                 <th>Birth Certificate</th>
                              </tr>
                            </thead>
                            <tbody>
                                <td>{list.marriagecertid}</td>
                                <td>{list.votersid}</td>
                                <td>{list.tinnumber}</td>
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
    );
}

function EmploymentDetails({list}){
    return(
      <Row className="mt-2">
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
                                <td>{list.employeeid}</td>
                                <td>{list.employeelevel}</td>
                                <td>{list.hiredate}</td>
                            </tbody>
                          </Table>
                      </Card.Body>
                    </Card>
                   </Col>
                   <Col md={3}></Col>
                  </Row>
    );
}

function BankDetails({list}){
    return(
      <Row className="mt-2">
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
                             <td>{list.bankaccountnumber}</td>
                         </tbody>
                       </Table>
                   </Card.Body>
                 </Card>
                </Col>
                <Col md={3}></Col>
               </Row>
    );
}

function BenefitsforUser({list}){
    return(
      <Row className="mt-2">
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
                           {list.map(benefit => 
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
    );
}

function UsersDepartment({list}){
    return(
      <Row className="mt-2">
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
                           {list.map(department => 
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
    );
}

function UsersDesignation({list}){
    return(
      <Row className="mt-2">
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
                           {list.map(designation => 
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
    );
}

function UsersRole({list}){
    return(
      <Row className="mt-2">
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
               {list.map(role => 
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
    );
}

export default UserDetails;