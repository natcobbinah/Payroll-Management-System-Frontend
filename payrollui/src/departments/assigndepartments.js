import React,{Component} from  'react'
import axios from 'axios'
import {PATHBASE,PATH_GET_DEPARTMENT,PATHGETALLUSERS,
        PARAM_PAGE,PATH_ASSIGNUSER_DEPARTMENT} from '../API_URLS';
import {Form,Col,Container,Button,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus,faCoffee} from '@fortawesome/free-solid-svg-icons'

const searchForUser = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

const searchForDepartment = searchDepartment => department =>
    department.departmentname.toLowerCase().includes(searchDepartment.toLowerCase());

class AssignDepartments extends Component{
    constructor(props){
        super(props);

        this.state = {
            //search user and role attributes
            searchUser: '',
            searchDepartment: '',

             //fetch department objects
             resultDeptfetch: null,
             errorDeptfetch: null,
 
             //fetch user objects
             resultUserfetch: null,
             errorUserfetch:null,
 
             //assign role objects
             resultDeptAssign: null,
             errorDeptAssign: null,

            //alert attributes
            show:true,
        }

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.fetchAllDepartments = this.fetchAllDepartments.bind(this);
        this.assignDepartment = this.assignDepartment.bind(this);
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATHBASE}${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
            .then(resultDeptfetch => this.setState({resultDeptfetch: resultDeptfetch.data}))
            .catch(errorDeptfetch => this.setState({errorDeptfetch}));
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${pageUser}`)
        .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
        .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    assignDepartment(){
        let selectedUser = document.getElementById('userid').value;
        let selectedDepartment = document.getElementById('deptid').value;

        axios.get(`${PATHBASE}${PATH_ASSIGNUSER_DEPARTMENT}/${selectedUser}/${selectedDepartment}`)
        .then(resultDeptAssign => this.setState({resultDeptAssign: resultDeptAssign.data}))
        .catch(errorDeptAssign=> this.setState({errorDeptAssign}));
    }

    componentDidMount(){
        this.fetchAllDepartments();
        this.fetchAllUsers();
    }

    render(){
        const{resultDeptfetch,errorDeptfetch,resultUserfetch,errorUserfetch,resultDeptAssignSuccess,resultDeptAssignError,
            pageDept = 0, pageUser = 0,searchUser,searchDepartment,
            resultDeptAssign,errorDeptAssign,show} = this.state;
        return(
            <Container fluid>
                <span> <FontAwesomeIcon icon={faCoffee}/>ASSIGNING Departments</span>

                 {resultDeptAssign?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>User Assigned Department Successfully</Alert.Heading>
                </Alert> 
                : null
                }
                 {errorDeptAssign?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Error Assigning Department</Alert.Heading>
                  <p>Server might be down: or not available currently</p>
                </Alert> 
                : null
                }
                <Form>
                    <Form.Row>
                        <Col className="mt-3 py-2">
                            <Form.Row>
                                <Col className="mb-2">
                                    <Form.Control type="text"  placeholder="Type username here" onChange={(e) => this.setState({searchUser: e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Label>Select User</Form.Label>
                            <Form.Row>
                                <Col>
                                  <Button variant="secondary mb-2" onClick={() => this.fetchAllUsers(pageUser - 1)}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                     Prev
                                  </Button>
                                   <Button variant="secondary mx-2 mb-2" onClick={() => this.fetchAllUsers(pageUser + 1)}>
                                   <FontAwesomeIcon icon={faArrowRight}/>
                                     Next
                                   </Button>
                                </Col>
                            </Form.Row>
                            <Form.Control as="select" id="userid">
                             {resultUserfetch ?
                              resultUserfetch.content.filter(searchForUser(searchUser)).map(user => (
                                <option value={user.id}>{user.name}</option>
                             ))
                              : null
                            }   
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-5 py-2">
                        <Col>
                            <Form.Row>
                                <Col>
                                   <Form.Control type="text"  placeholder="Type role name here" onChange={(e) => this.setState({searchDepartment: e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Label>Select Department</Form.Label>
                            <Form.Row>
                                <Col>
                                  <Button variant="secondary mb-2" onClick={() => this.fetchAllDepartments(pageDept - 1)}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                     Prev
                                  </Button>
                                   <Button variant="secondary mx-2 mb-2" onClick={() => this.fetchAllDepartments(pageDept + 1)}>
                                   <FontAwesomeIcon icon={faArrowRight}/>
                                     Next
                                   </Button>
                                </Col>
                            </Form.Row>
                            <Form.Control as="select" id="deptid">
                             {resultDeptfetch ?
                              resultDeptfetch.content.filter(searchForDepartment(searchDepartment)).map(department => (
                                <option value={department.id}>{department.departmentid} - {department.departmentname}</option>
                             ))
                              : null
                            }   
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-3 py-2">
                        <Col>
                           <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={() => this.assignDepartment()}>
                                Assign Department
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default AssignDepartments