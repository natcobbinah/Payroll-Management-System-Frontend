import React,{Component} from  'react'
import axios from 'axios'
import {PATHBASE,PATH_GET_ROLES,PATHGETALLUSERS,
        PARAM_PAGE,PATH_ASSIGNUSERROLES} from '../API_URLS';
import {Form,Col,Container,Button,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus} from '@fortawesome/free-solid-svg-icons'

const searchForUser = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

const searchForRole = searchRole => role =>
    role.rolename.toLowerCase().includes(searchRole.toLowerCase());

class AssignRoles extends Component{
    constructor(props){
        super(props);

        this.state = {
            //search user and role attributes
            searchUser: '',
            searchRole: '',

             //fetch role objects
             resultRolefetch: null,
             errorRolefetch: null,
 
             //fetch user objects
             resultUserfetch: null,
             errorUserfetch:null,
 
             //assign role objects
             resultRoleAssign: null,
             errorRoleAssign: null,

            //alert attributes
            show:true,
        }

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.fetchAllRoles = this.fetchAllRoles.bind(this);
        this.assignRole = this.assignRole.bind(this);
    }

    fetchAllRoles(pageRole = 0){
        axios.get(`${PATHBASE}${PATH_GET_ROLES}?${PARAM_PAGE}${pageRole}`)
        .then(resultRolefetch => this.setState({resultRolefetch: resultRolefetch.data}))
        .catch(errorRolefetch => this.setState({errorRolefetch}));
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${pageUser}`)
        .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
        .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    assignRole(){
        let selectedUser = document.getElementById('userid').value;
        let selectedRole = document.getElementById('roleid').value;

        axios.get(`${PATHBASE}${PATH_ASSIGNUSERROLES}/${selectedUser}/${selectedRole}`)
        .then(resultRoleAssign => this.setState({resultRoleAssign: resultRoleAssign.data}))
        .catch(errorRoleAssign=> this.setState({errorRoleAssign}));
    }

    componentDidMount(){
        this.fetchAllRoles();
        this.fetchAllUsers();
    }

    render(){
        const{resultRolefetch,errorRolefetch,resultUserfetch,errorUserfetch,resultRoleassignSuccess,resultRoleassignError,
            pageRole = 0, pageUser = 0,searchUser,searchRole,
            resultRoleAssign,errorRoleAssign,show} = this.state;
        return(
            <Container fluid>
                 {resultRoleAssign?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>User Assigned Role Successfully</Alert.Heading>
                </Alert> 
                : null
                }
                 {errorRoleAssign?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Error Assigning</Alert.Heading>
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
                                   <Form.Control type="text"  placeholder="Type role name here" onChange={(e) => this.setState({searchRole: e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Label>Select Role</Form.Label>
                            <Form.Row>
                                <Col>
                                  <Button variant="secondary mb-2" onClick={() => this.fetchAllRoles(pageRole - 1)}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                     Prev
                                  </Button>
                                   <Button variant="secondary mx-2 mb-2" onClick={() => this.fetchAllRoles(pageRole + 1)}>
                                   <FontAwesomeIcon icon={faArrowRight}/>
                                     Next
                                   </Button>
                                </Col>
                            </Form.Row>
                            <Form.Control as="select" id="roleid">
                             {resultRolefetch ?
                              resultRolefetch.content.filter(searchForRole(searchRole)).map(role => (
                                <option value={role.roleid}>{role.rolename}</option>
                             ))
                              : null
                            }   
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-3 py-2">
                        <Col>
                           <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={this.assignRole}>
                                Assign Role
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default AssignRoles