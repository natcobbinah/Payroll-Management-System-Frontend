import React,{Component} from  'react'
import axios from 'axios'
import {PATHBASE,PATH_GETALL_DESIGNATION,PATHGETALLUSERS,
        PARAM_PAGE,PATH_ASSIGNUSERDESIGNATION} from '../API_URLS';
import {Form,Col,Container,Button,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus, faCoffee} from '@fortawesome/free-solid-svg-icons'

const searchForUser = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

const searchForDesignation = searchDesignation => designation =>
    designation.designationname.toLowerCase().includes(searchDesignation.toLowerCase());

class AssignDesignations extends Component{
    constructor(props){
        super(props);

        this.state = {
            //search user and role attributes
            searchUser: '',
            searchDesignation: '',

             //fetch designation objects
             resultDesignationfetch: null,
             errorDesignationfetch: null,
 
             //fetch user objects
             resultUserfetch: null,
             errorUserfetch:null,
 
             //assign designation objects
             resultDesignationAssign: null,
             errorDesignationAssign: null,

            //alert attributes
            show:true,
        }

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.fetchAllDesignations = this.fetchAllDesignations.bind(this);
        this.assignUserDesignation = this.assignUserDesignation.bind(this);
    }

    fetchAllDesignations(pageDesignation = 0){
        axios.get(`${PATHBASE}${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${pageDesignation}`)
             .then(resultDesignationfetch => this.setState({resultDesignationfetch: resultDesignationfetch.data}))
             .catch(errorDesignationfetch => this.setState({errorDesignationfetch}))
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${pageUser}`)
             .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
             .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    assignUserDesignation(){
        let selectedUser = document.getElementById('userid').value;
        let selectedDesignation = document.getElementById('designationId').value;

        axios.post(`${PATHBASE}${PATH_ASSIGNUSERDESIGNATION}/${selectedUser}/${selectedDesignation}`)
             .then(resultDesignationAssign => this.setState({resultDesignationAssign: resultDesignationAssign.data}))
             .catch(errorDesignationAssign=> this.setState({errorDesignationAssign}));
    }

    componentDidMount(){
        this.fetchAllDesignations();
        this.fetchAllUsers();
    }

    render(){
        const{resultDesignationfetch,errorDesignationfetch,resultUserfetch,errorUserfetch,resultDesignationAssignSuccess,resultDesignationAssignError,
            pageDesignation = 0, pageUser = 0,searchUser,searchDesignation,
            resultDesignationAssign,errorDesignationAssign,show} = this.state;
        return(
            <Container fluid>
                <span> <FontAwesomeIcon icon={faCoffee}/>ASSIGNING DESIGNATIONS</span>
                 {resultDesignationAssign?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>User Assigned Designation Successfully</Alert.Heading>
                </Alert> 
                : null
                }
                 {errorDesignationAssign?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Error Assigning User to Designation</Alert.Heading>
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
                                   <Form.Control type="text"  placeholder="Type role name here" onChange={(e) => this.setState({searchDesignation: e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Label>Select Designation</Form.Label>
                            <Form.Row>
                                <Col>
                                  <Button variant="secondary mb-2" onClick={() => this.fetchAllDesignations(pageDesignation - 1)}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                     Prev
                                  </Button>
                                   <Button variant="secondary mx-2 mb-2" onClick={() => this.fetchAllDesignations(pageDesignation + 1)}>
                                   <FontAwesomeIcon icon={faArrowRight}/>
                                     Next
                                   </Button>
                                </Col>
                            </Form.Row>
                            <Form.Control as="select" id="designationId">
                             {resultDesignationfetch ?
                              resultDesignationfetch.content.filter(searchForDesignation(searchDesignation)).map(designation => (
                                <option value={designation.id}>{designation.designationname}</option>
                             ))
                              : null
                            }   
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-3 py-2">
                        <Col>
                           <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={() => this.assignUserDesignation()}>
                                Assign Designation
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default AssignDesignations