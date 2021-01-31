import React,{Component} from  'react'
import {PATHBASE,PARAM_PAGE,PATH_DELETE_ROLE,
    PATH_PATCH_EDIT_ROLE,PATH_GET_ROLES,PATH_ADD_ROLE} from '../API_URLS'
import axios from 'axios'
import {Container,Button,Table,Alert, Form,Col,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus} from '@fortawesome/free-solid-svg-icons'

    

class ViewRoles extends Component{
    constructor(props){
        super(props);

        this.state = {
            //attributes on roles fetched
            result:null,
            error:null,

            //attributes on roles deleted
            resultDel: null,
            errorDel: null,

            //alert attributes
            show:true,

            //values to changestate on edit clicked
            role_id:'',
            role_name:'',

            //modal attributes
            showModal:false,
            addRoleShowModal:false,

            //values to changestate on adding a new role
            rolename:'',

            //attributes on roles updated
            onUpdateSuccess: null,
            onUpdateError:null,

            //attributes on roles added
            resultRolepost:null,
            errorRolepost:null,

        }

        this.fetchAllRoles = this.fetchAllRoles.bind(this);
        this.onEditRole = this.onEditRole.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateRole = this.updateRole.bind(this);
        this.addRoletoDB = this.addRoletoDB.bind(this);
    }

    fetchAllRoles(page = 0){
        axios.get(`${PATHBASE}${PATH_GET_ROLES}?${PARAM_PAGE}${page}`)
             .then(result => this.setState({result: result.data}))
             .catch(error => this.setState({error}));
    }

    onDelete(id){
        axios.get(`${PATHBASE}${PATH_DELETE_ROLE}/${id}`)
             .then(resultDel => this.setState({resultDel: resultDel.data}))
             .then(errorDel => this.setState({errorDel}))
    
        this.fetchAllRoles();
    }

    onEditRole(id,name){
        this.setState({
            role_id: id,
            role_name: name
        })

        this.setState({
            showModal:true
        })
    }

    updateRole(){
        const{role_id,role_name} = this.state;
        const headers = { 'content-type': 'application/json'};
        axios({
            method: 'patch',
            url: `${PATHBASE}${PATH_PATCH_EDIT_ROLE}`,
            data: {
                roleid: role_id,
                rolename: role_name,
            },
            headers: headers
        })
        .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
        .catch(onUpdateError => this.setState({onUpdateError}));
        this.fetchAllRoles();
    }

    showaddRoleModal(){
        this.setState({
            addRoleShowModal:true,
        })
    }

    addRoletoDB(){
        const{rolename} = this.state;
        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: `${PATHBASE}${PATH_ADD_ROLE}`,
            data: {
                rolename: rolename,
            },
            headers: headers
        })
        .then(resultRolepost => this.setState({resultRolepost: resultRolepost.data}))
        .catch(errorRolepost => this.setState({errorRolepost}));
    }

    componentDidMount(){
        this.fetchAllRoles();
    }

    render(){
        const{result,error,page = 0,show,
             resultDel,errorDel,showModal,role_name,
             onUpdateSuccess,onUpdateError,addRoleShowModal,
             rolename,resultRolepost,errorRolepost} = this.state;
        return(
           <Container fluid>
               {error?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Unsuccessful Fetching Roles</Alert.Heading>
                  <p>Server might be down or currently not available</p>
               </Alert> 
                : null
               }

              {errorDel?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Unsuccessful Operation Deleting Role</Alert.Heading>
                  <p>Server might be down or currently not available</p>
               </Alert> 
                : null
               }

                {resultDel?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Role Deleted Successfully</Alert.Heading>
               </Alert> 
                : null
                }

                {/* add role button clicked  show modal*/}
                <Button variant="success my-2 py-1" size="lg" onClick={() => this.showaddRoleModal()}>
                      <span><FontAwesomeIcon icon={faPlus} spin/>Add New Role</span>  
                </Button>

                {/* modal content to add a new role */}
                <Modal size="lg" show={addRoleShowModal} onHide={() => this.setState({addRoleShowModal: false})} centered>
                    <Modal.Header>
                        <Modal.Title>Add Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {resultRolepost?
                        <Alert show={show} variant="success" onClose={(event) => this.setState({addRoleShowModal:false})} dismissible>
                          <Alert.Heading>Role Added Successfully</Alert.Heading>
                        </Alert> 
                        : null
                      }
                      {errorRolepost?
                        <Alert show={show} variant="danger" onClose={(event) => this.setState({addRoleShowModal:false})} dismissible>
                          <Alert.Heading>Unsuccessful operation adding Role</Alert.Heading>
                          <p>Server might be down: or not available currently</p>
                        </Alert> 
                        : null
                        }
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Rolename</Form.Label>
                                    <Form.Control type="text" placeholder="Enter rolename here" onChange={(e) => this.setState({rolename : e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                  <Button variant="success mt-2"  type="button" size="lg" block className="mb-4" onClick={this.addRoletoDB}>
                                      AddRole
                                   </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>

               {result?
                 <Table responsive="sm" striped bordered hover size="sm">
                 <thead>
                     <tr>
                         <th>ROLE NAMES</th>
                         <th>ACTION</th>
                     </tr>
                 </thead>
                 <tbody>
                     {result.content.map(role => 
                         <tr key={role.roleid}>
                             <td>{role.rolename}</td>
                             <td>
                                 <Button variant="secondary mx-1" onClick={() => this.onEditRole(
                                    role.roleid,role.rolename
                                 )}>
                                   <FontAwesomeIcon icon={faEdit}/>
                                 </Button>
                                 <Button variant="danger mx-1" onClick={() => this.onDelete(role.roleid)}>
                                   <FontAwesomeIcon icon={faTrash}/>
                                 </Button>
                             </td>
                         </tr>
                      )
                     }
                 </tbody>
               </Table>
              : null
             }
             <Button variant="primary" onClick={() => this.fetchAllRoles(page - 1)}>
                 <FontAwesomeIcon icon={faArrowLeft}/>
                 Prev
             </Button>
             <Button variant="primary mx-3" onClick={() => this.fetchAllRoles(page + 1)}>
                <FontAwesomeIcon icon={faArrowRight}/>
                 Next
             </Button>

             {/* On edit button clicked show modal */}
             <Modal size="lg" show={showModal} onHide={() => this.setState({showModal: false})} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                {onUpdateSuccess?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Role Updated Successfully</Alert.Heading>
                </Alert> 
                : null
                }
                 {onUpdateError?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Unsuccessful operation updating Role</Alert.Heading>
                  <p>Server might be down: or not available currently</p>
                </Alert> 
                : null
                }
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Rolename</Form.Label>
                                    <Form.Control type="text" value={role_name} onChange={(e) => this.setState({role_name : e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col className="mt-2">
                                  <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={this.updateRole}>
                                    UpdateDetails
                                  </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                </Modal.Body>
             </Modal>
           </Container>
        );
    }
}

export default ViewRoles