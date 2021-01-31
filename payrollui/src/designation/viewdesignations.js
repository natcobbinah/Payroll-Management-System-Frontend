import React,{Component} from  'react'
import {PATHBASE,PATH_GETALL_DESIGNATION,PATH_ADD_DESIGNATION,PATH_DELETE_DESIGNATION,
    PARAM_PAGE,PATH_GET_DEPARTMENT,PATH_PATCH_DESIGNATION} from '../API_URLS'
import axios from 'axios'
import {Container,Button,Table,Alert, Form,Col,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus} from '@fortawesome/free-solid-svg-icons'

class ViewDesignations extends Component{
    constructor(props){
        super(props);

        this.state = {
            //result from fetching designations
            result: null,
            error: null, 

            //result from fetchingn departments
            deptResult:null,
            deptError:null,

            //result objects on designation deleted
            deleteDesSuccess:null,
            deleteDesFailure:null,

            //result object on designation updated
            onUpdateSuccess:null,
            onUpdateError:null,

            //result on adding new designation
            addResult:null,
            addError:null,

            //alert attributes
            show:true,
            showforUpdateAlert:true,
            showforAddDesignation:true,

            //modal attributes
            showModal:false,
            showAddModal:false,
            
            //values to edit on editClicked
            id: '',
            designationname:'',
            departmentid: '',
            departmentcode: '',
            departmentname: '',

            //values to changeState when adding new designation
            designationnamenew:'',
        }

        this.fetchAllDesignations = this.fetchAllDesignations.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditDesignation = this.onEditDesignation.bind(this);
        this.updateDesignation = this.updateDesignation.bind(this);
        this.showAddDesignation = this.showAddDesignation.bind(this);
        this.fetchAllDepartments = this.fetchAllDepartments.bind(this);
        this.addDesignationtoDB = this.addDesignationtoDB.bind(this);
    }

    fetchAllDesignations(page = 0){
        axios.get(`${PATHBASE}${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${page}`)
             .then(result => this.setState({result: result.data}))
             .catch(error => this.setState({error}))
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATHBASE}${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
        .then(deptResult => this.setState({deptResult: deptResult.data}))
        .catch(deptError => this.setState({deptError}));
    }

    onDelete(id){
        axios.get(`${PATHBASE}${PATH_DELETE_DESIGNATION}/${id}`)
             .then(deleteDesSuccess => this.setState({deleteDesSuccess : deleteDesSuccess.data}))
             .catch(deleteDesFailure => this.setState({deleteDesFailure}))
    }

    onEditDesignation(desid,desname ,desdeptid,desdeptcode,desdeptname){
        this.setState({
            id: desid,
            designationname: desname,
            departmentid: desdeptid,
            departmentcode: desdeptcode,
            departmentname: desdeptname,
        })

        this.setState({
            showModal:true,
        })
    }

    updateDesignation(){
        const{id,designationname,departmentid,departmentcode,departmentname}=this.state;
        const headers = { 'content-type': 'application/json'};
        axios({
            method: 'patch',
            url: `${PATHBASE}${PATH_PATCH_DESIGNATION}`,
            data: {
                id: id,
                designationname: designationname,
                department: {
                    id:departmentid ,
                    departmentid:departmentcode,
                    departmentname: departmentname
                }
            },
            headers: headers
        })
        .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
        .catch(onUpdateError => this.setState({onUpdateError}));

        this.fetchAllDesignations();
    }

     addDesignationtoDB(){
          const{designationnamenew} = this.state; 
          let selectedDepartment = document.getElementById('deptid').value;

          axios.get(`${PATHBASE}${PATH_ADD_DESIGNATION}/${designationnamenew}/${selectedDepartment}`)
               .then(addResult => this.setState({addResult: addResult.data}))
               .catch(addError => this.setState({addError})); 
    }

    showAddDesignation(){
        this.setState({
            showAddModal:true,
        })
    }

    componentDidMount(){
        this.fetchAllDesignations();
        this.fetchAllDepartments();
    }

    render(){
        const{result,error,page = 0,deleteDesFailure,deleteDesSuccess,show,
            showModal,showAddModal, designationname, onUpdateSuccess,onUpdateError,
            showforUpdateAlert,designationnamenew,pageDept,deptResult,
            deptError,addResult,addError,showforAddDesignation} = this.state;
        return(
            <Container fluid>
                {deleteDesFailure?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Unsuccessful Deleting designation</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {deleteDesSuccess?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Designation deleted successfully</Alert.Heading>
                </Alert> 
                 : null
                }

                {/* Button to show add new designation================================================ */}
                <Button variant="success my-2 py-1" size="lg" onClick={() => this.showAddDesignation()}>
                      <span><FontAwesomeIcon icon={faPlus}/>Add Designation</span>  
                </Button>
                {/* Button to show add new designation================================================ */}

                {/* add new designation=============================================================== */}
                <Modal show={showAddModal} size="lg" onHide={() => this.setState({showAddModal: false})} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New  Designation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {addError?
                            <Alert show={showforAddDesignation} variant="danger" onClose={(event) => this.setState({showforAddDesignation:false})} dismissible>
                              <Alert.Heading>Unsuccessful creating new designation</Alert.Heading>
                              <p>Server might be down or currently not available</p>
                            </Alert> 
                            : null
                          }

                          {addResult?
                            <Alert show={showforAddDesignation} variant="success" onClose={(event) => this.setState({showforAddDesignation:false})} dismissible>
                              <Alert.Heading>Designation created successfully</Alert.Heading>
                            </Alert> 
                            : null
                          }
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Designation Name</Form.Label>
                                    <Form.Control type="text" value={designationnamenew} onChange={(e) => this.setState({designationnamenew : e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-4 mb-2">
                                <Col>
                                    <Form.Label>Select Department</Form.Label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                               <Col className="mt-2 mb-2">
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
                            <Form.Row>
                                 <Form.Control as="select" id="deptid">
                                {deptResult ?
                                 deptResult.content.map(department => (
                                    <option value={department.id}>{department.departmentname}</option>
                                  ))
                                 : null
                                 }   
                            </Form.Control>
                            </Form.Row>
                             <Form.Row className="mt-4">
                                    <Button variant="success mt-2"  type="button" size="lg" block className="mb-4" onClick={() => this.addDesignationtoDB()}>
                                        Add Designation  
                                    </Button>
                             </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
                {/* add new designation=============================================================== */}

                {/* on edit clicked show modal populated with table values */}
                <Modal show={showModal} size="lg" onHide={() => this.setState({showModal: false})} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Designation </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {onUpdateError?
                            <Alert show={showforUpdateAlert} variant="danger" onClose={(event) => this.setState({showforUpdateAlert:false})} dismissible>
                              <Alert.Heading>Unsuccessful Updating designation</Alert.Heading>
                              <p>Server might be down or currently not available</p>
                            </Alert> 
                            : null
                          }

                          {onUpdateSuccess?
                            <Alert show={showforUpdateAlert} variant="success" onClose={(event) => this.setState({showforUpdateAlert:false})} dismissible>
                              <Alert.Heading>Designation updated successfully</Alert.Heading>
                            </Alert> 
                            : null
                          }
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Change Designation Name</Form.Label>
                                    <Form.Control type="text" value={designationname} onChange={(e) => this.setState({designationname : e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Button variant="success mt-2"  type="button" size="lg" block className="mb-4" onClick={this.updateDesignation}>
                                        Update Designation  
                                   </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
                {/* end line of on edit clicked button =====================*/}

                {result?
                    <Table responsive="sm" striped bordered hover size="sm">
                 <thead>
                     <tr>
                         <th>DESIGNATION NAME</th>
                         <th>DEPARTMENT</th>
                         <th>ACTION</th>
                     </tr>
                 </thead>
                 <tbody>
                     {result.content.map(designation => 
                         <tr key={designation.id}>
                             <td>{designation.designationname}</td>
                             <td>{designation.department.departmentname}</td>
                             <td>
                                 <Button variant="secondary mx-1" onClick={() => this.onEditDesignation(
                                    designation.id,designation.designationname ,
                                    designation.department.id,designation.department.departmentid,
                                    designation.department.departmentname
                                 )}>
                                   <FontAwesomeIcon icon={faEdit}/>
                                 </Button>
                                 <Button variant="danger mx-1" onClick={() => this.onDelete(designation.id)}>
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
              <Button variant="primary" onClick={() => this.fetchAllDesignations(page - 1)}>
                  <FontAwesomeIcon icon={faArrowLeft}/>
                   Prev
              </Button>
              <Button variant="primary mx-3" onClick={() => this.fetchAllDesignations(page + 1)}>
                <FontAwesomeIcon icon={faArrowRight}/>
                 Next
             </Button>
            </Container>
        );
    }
}

export default ViewDesignations