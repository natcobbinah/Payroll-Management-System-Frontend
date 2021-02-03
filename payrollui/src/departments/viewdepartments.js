import React,{Component} from  'react'
import axios from 'axios'
import {PATH_GET_DEPARTMENT,PARAM_PAGE,PATH_DELETE_DEPARTMENT,
    PATH_PATCH_EDITDEPARTMENT,PATHBASE,PATH_ADD_DEPARTMENT} from '../API_URLS'
import {Container,Button,Table,Alert, Form,Col,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus} from '@fortawesome/free-solid-svg-icons'
    

class ViewDepartments extends Component{
    constructor(props){
        super(props);

        this.state = {
            //fetchdepartments object attributes
            deptfetchSuccess:null,
            deptfetchError:null,

            //delete department object attributes
            deptDeleteSuccess:null,
            deptDeleteError:null,

            //add department object attributes
            resultpost:null,
            errorpost:null,

            //update department object attributes
            onUpdateSuccess:null,
            onUpdateError:null,

            //alert attributes
            show:true,
            deletdeptShow:true,
            updatedeptShow:true,
            addDeptalertShow:true,

            //modal attributes
            showModalonEdit: false,
            addDeptModal:false,

            //attributes to change state when adding new department
            departmentid:'',
            departmentname:'',
        }

        this.fetchAllDepartments = this.fetchAllDepartments.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
        this.showAddDepartment = this.showAddDepartment.bind(this);
        this.addDepartmenttoDB = this.addDepartmenttoDB.bind(this);
    }

    fetchAllDepartments(page = 0){
        axios.get(`${PATHBASE}${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${page}`)
             .then(deptfetchSuccess => this.setState({deptfetchSuccess: deptfetchSuccess.data}))
             .catch(deptfetchError => this.setState({deptfetchError}));
    }

    onDelete(id){
        axios.get(`${PATHBASE}${PATH_DELETE_DEPARTMENT}/${id}`)
             .then(deptDeleteSuccess => this.setState({deptDeleteSuccess: deptDeleteSuccess.data}))
             .catch(deptDeleteError => this.setState({deptDeleteError}))
             this.fetchAllDepartments();
    }

    onEditDepartment(id,deptid,name){
        this.setState({
            id: id,
            departmentid:deptid,
            departmentname: name,
        })
        
        this.setState({
            showModalonEdit:true,
        })
    }

    updateDepartment(){
        const{id,departmentid,departmentname} = this.state;
        const headers = { 'content-type': 'application/json'};
        axios({
            method: 'patch',
            url: `${PATHBASE}${PATH_PATCH_EDITDEPARTMENT}`,
            data: {
                id: id,
                departmentid:departmentid,
                departmentname: departmentname,
            },
            headers: headers
        })
        .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
        .catch(onUpdateError => this.setState({onUpdateError}));
        
        this.fetchAllDepartments();
    }

    showAddDepartment(){
        this.setState({
            addDeptModal:true,
        })
    }

    addDepartmenttoDB(){
        const{departmentid,departmentname}=this.state;
        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: `${PATHBASE}${PATH_ADD_DEPARTMENT}`,
            data: {
                departmentid: departmentid,
                departmentname: departmentname,
            },
            headers: headers
        })
        .then(resultpost => this.setState({resultpost: resultpost.data}))
        .catch(errorpost => this.setState({errorpost}));

        this.fetchAllDepartments();
    }

    componentDidMount(){
        this.fetchAllDepartments();
    }

    render(){
        const{page = 0,deptfetchSuccess,deptfetchError,show,
              deptDeleteSuccess,deptDeleteError,deletdeptShow,
              showModalonEdit,departmentid,departmentname,
              onUpdateError,onUpdateSuccess,updatedeptShow,
              addDeptModal,resultpost,errorpost,addDeptalertShow} = this.state;
        return(
            <Container fluid>   
                {deptDeleteSuccess?
                <Alert show={deletdeptShow} variant="success" onClose={(event) => this.setState({deletdeptShow:false})} dismissible>
                    <Alert.Heading>Department deleted Successfully</Alert.Heading>
                </Alert> 
                 : null
                }

                {deptDeleteError?
                <Alert show={deletdeptShow} variant="danger" onClose={(event) => this.setState({deletdeptShow:false})} dismissible>
                    <Alert.Heading>Deleting department unsuccessful</Alert.Heading>
                      <p>Server might be down: or currently unavailable</p>
                </Alert> 
                 : null
                }

                {deptfetchError?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Error Fetching Departments</Alert.Heading>
                      <p>Server might be down</p>
                </Alert> 
                 : null
                }

                {/* Button to show add new designation================================================ */}
                <Button variant="success my-3 py-1" size="lg" onClick={() => this.showAddDepartment()}>
                      <span><FontAwesomeIcon icon={faPlus} spin/>Add Department</span>  
                </Button>
                {/* Button to show add new designation================================================ */}

                {/* add new department modal ==========================================================*/}
                 <Modal show={addDeptModal} size="lg" onHide={() => this.setState({addDeptModal: false})} centered>
                     <Modal.Header closeButton>
                         <Modal.Title>Add New Department</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                         {resultpost?
                           <Alert show={addDeptalertShow} variant="success" onClose={(event) => this.setState({addDeptalertShow:false})} dismissible>
                              <Alert.Heading>Department added Successfully</Alert.Heading>
                           </Alert> 
                            : null
                          }
                          {errorpost?
                           <Alert show={addDeptalertShow} variant="danger" onClose={(event) => this.setState({addDeptalertShow:false})} dismissible>
                              <Alert.Heading>Failure adding new Department</Alert.Heading>
                              <p>Server might be down: or currently unavailable</p>
                           </Alert> 
                            : null
                          }
                          <Form>
                              <Form.Row className="mt-2">
                                  <Col>
                                     <Form.Label>Department Code</Form.Label>
                                     <Form.Control type="text" placeholder="Departmentcode  here...." onChange={(e) => this.setState({departmentid : e.target.value})}/>
                                  </Col>
                              </Form.Row>
                              <Form.Row className="mt-2">
                                  <Col>
                                     <Form.Label>Department Name</Form.Label>
                                     <Form.Control type="text" placeholder="Departmentname  here...." onChange={(e) => this.setState({departmentname : e.target.value})}/>
                                  </Col>
                              </Form.Row>
                              <Form.Row className="mt-2">
                                   <Button variant="success mt-2"  type="button" size="lg" block className="mb-4" onClick={() => this.addDepartmenttoDB()}>
                                        Add Department  
                                    </Button>
                              </Form.Row>
                          </Form>
                     </Modal.Body>
                 </Modal>
                {/* end add new department modal ======================================================*/}

                {deptfetchSuccess?
                    <Table responsive="sm" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DEPARTMENT CODE</th>
                            <th>DEPARTMENT NAME</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deptfetchSuccess.content.map(department => 
                                <tr key={department.id}>
                                <td>{department.departmentid}</td>
                                <td>{department.departmentname}</td>
                                <td>
                                    <Button variant="secondary mx-1" onClick={() => this.onEditDepartment(
                                        department.id,department.departmentid,department.departmentname
                                    )}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button variant="danger mx-1" onClick={() => this.onDelete(department.id)}>
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
                    <Button variant="primary" onClick={() => this.fetchAllDepartments(page - 1)}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Prev
                    </Button>
                    <Button variant="primary mx-3" onClick={() => this.fetchAllDepartments(page + 1)}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                    Next
                </Button>

               {/* on edit button clicked===================================================*/}
                  <Modal show={showModalonEdit} size="lg" onHide={() => this.setState({showModalonEdit: false})} centered>
                      <Modal.Header closeButton>
                          <Modal.Title>Edit Department</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {onUpdateError?
                             <Alert show={updatedeptShow} variant="danger" onClose={(event) => this.setState({updatedeptShow:false})} dismissible>
                             <Alert.Heading>Updating department unsuccessful</Alert.Heading>
                             <p>Server might be down: or currently unavailable</p>
                             </Alert> 
                             : null
                         }
                         {onUpdateSuccess?
                             <Alert show={updatedeptShow} variant="success" onClose={(event) => this.setState({updatedeptShow:false})} dismissible>
                               <Alert.Heading>Department updated Successfully</Alert.Heading>
                             </Alert> 
                             : null
                         }
                          <Form>
                              <Form.Row>
                                  <Col>
                                     <Form.Label>Department Code</Form.Label>
                                     <Form.Control type="text" value={departmentid} onChange={(e) => this.setState({departmentid : e.target.value})}/>
                                  </Col>
                              </Form.Row>
                              <Form.Row>
                                   <Col>
                                      <Form.Label>Department Name</Form.Label>
                                      <Form.Control type="text" value={departmentname} onChange={(e) => this.setState({departmentname : e.target.value})}/>
                                   </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col>
                                    <Button variant="success mt-2"  type="button" size="lg" block className="mb-4" onClick={this.updateDepartment}>
                                        Update Department  
                                   </Button>
                                </Col>
                            </Form.Row>
                          </Form>
                      </Modal.Body>
                  </Modal>
               {/* end edit button clicked===================================================*/}
            </Container>
        );
    }
}

export default ViewDepartments