import React,{Component} from  'react'
import {PATHBASE,PARAM_PAGE,PATH_GETALL_BENEFITS,PATH_GETALL_DESIGNATION,PATH_POST_BENEFIT
    ,PATH_DELETE_BENEFIT,NO_OF_DESIGNATIONS,PATH_GET_DEPARTMENT} from '../API_URLS'
import axios from 'axios'
import {Container,Button,Table,Alert, Form,Col,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash,faPlus} from '@fortawesome/free-solid-svg-icons'
    
import {fetchBenefitAll} from '../API_URLS/apiCalls'

class ViewBenefits extends Component{
    constructor(props){
        super(props);

        this.state = {
           //attributes on benefits fetch 
           result: null,
           error: null,  

           //attributes to change state adding new benefit
           benefitname: '',
           calculatedamount:'',
           percentageonCalcamount: '',
           flatamount:'',
           designation:'',

           //checkbox state to activate  flatamount
            flatamountradiobtn:false,
            calculatedamoutradiobtn:false,

           //attributes on benefit deleted
           resultOndelete:null,
           errorOndelete:null,

           //attributes on department  fetched
           resultDept:null,
           errorDept:null,

           //attributes on designation fetched
           resultDesignation:null,
           errorDesignation:null,

           //alert attributes
           fetchbenefitsShow:true,
           deletebenefitShow:true,
           postbenefitShow:true,

           //modal attributes to add benefit
           showModal:false,

           //multiple select attribute
           selectedDesignations:'',
           selectedDepartments: '',

           //posting benefits to db result objects
           onPostSuccess:null,
           onPostFailure:null,
        }

        this.fetchAllBenefits = this.fetchAllBenefits.bind(this);
        this.fetchAllDepartments = this.fetchAllDepartments.bind(this);
        this.fetchAllDesignations = this.fetchAllDesignations.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.showaddBenefitModal = this.showaddBenefitModal.bind(this);
        this.addBenefittoDB = this.addBenefittoDB.bind(this);
        this.multipleselectHandler =this.multipleselectHandler.bind(this);
        /* this.multipleselectHandlerDept = this.multipleselectHandlerDept.bind(this); */
        this.clearModalFields = this.clearModalFields.bind(this);
    }

    fetchAllBenefits(page = 0){
       /*  axios.get(`${PATHBASE}${PATH_GETALL_BENEFITS}?${PARAM_PAGE}${page}`) */
            //code refactoring performed here
             fetchBenefitAll(page)
             .then(result => this.setState({result: result.data}))
             .catch(error => this.setState({error}));
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATHBASE}${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
             .then(resultDept => this.setState({resultDept: resultDept.data}))
             .catch(errorDept => this.setState({errorDept}));
    }

    fetchAllDesignations(pageDesignation = 0){
        axios.get(`${PATHBASE}${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${pageDesignation}`)
             .then(resultDesignation => this.setState({resultDesignation: resultDesignation.data}))
             .catch(errorDesignation => this.setState({errorDesignation}))
    }

    onDelete(id){
        axios.get(`${PATHBASE}${PATH_DELETE_BENEFIT}/${id}`)
             .then(resultOndelete => this.setState({resultOndelete: resultOndelete.data}))
             .catch(errorOndelete => this.setState({errorOndelete}))
        this.fetchAllBenefits();
    }

    showaddBenefitModal(){
        this.setState({
            showModal:true,
        })
    }

    multipleselectHandler(event){
        const selected=[];
        let selectedOption = (event.target.selectedOptions);

        for(let i=0; i < selectedOption.length; i++){
            selected.push(selectedOption.item(i).value)
        }
        this.setState({
            selectedDesignations:selected
        })
    }

  /*   multipleselectHandlerDept(event){
        const selectedDept=[];
        let selectedOption = (event.target.selectedOptions);

        for(let i=0; i < selectedOption.length; i++){
            selectedDept.push(selectedOption.item(i).value)
        }
        this.setState({
            selectedDepartments:selectedDept
        })
    } */

    addBenefittoDB(){
        const{benefitname,calculatedamount,flatamount,
        percentageonCalcamount,selectedDesignations} = this.state;
        
        let selectedFrequency = document.getElementById('frequencyId').value;
        let computationsonCalculatedAmount = ((+percentageonCalcamount/100) * +calculatedamount)

       // "/test/benefit/{benefitname}/{calculatedamount}/{flatamount}/{frequency}/{percentagevalue}/{designations}"
        axios.post(`${PATHBASE}${PATH_POST_BENEFIT}/${benefitname}/${computationsonCalculatedAmount}/${flatamount}/
              ${selectedFrequency}/${percentageonCalcamount}?${NO_OF_DESIGNATIONS}${selectedDesignations}`) 
             .then(onPostSuccess => this.setState({onPostSuccess: onPostSuccess.data}))
             .catch(onPostFailure => this.setState({onPostFailure}));    
    }

    clearModalFields(){
        this.setState({
            benefitname: '',
            calculatedamount:'',
            percentageonCalcamount: '',
            flatamount:'',
            designation:'',
            flatamountradiobtn:false,
            calculatedamoutradiobtn:false,
        })
    }


    componentDidMount(){
        this.fetchAllBenefits();
        this.fetchAllDesignations();
        this.fetchAllDepartments();
    }

    render(){
        const{result,error,fetchbenefitsShow,page = 0,resultOndelete,
              errorOndelete,deletebenefitShow,showModal,pageDept = 0,
              pageDesignation = 0,benefitname,calculatedamount,flatamount,
              flatamountradiobtn,calculatedamoutradiobtn,percentageonCalcamount,
              resultDesignation,resultDept,onPostSuccess,onPostFailure,
              postbenefitShow} = this.state;
        return(
            <Container fluid>
                {error?
                <Alert show={fetchbenefitsShow} variant="danger" onClose={(event) => this.setState({fetchbenefitsShow:false})} dismissible>
                  <Alert.Heading>Error fetching Benefits</Alert.Heading>
                  <p>Server might be down: or Currently unavailable</p>
                </Alert> 
                : null
                }

                {errorOndelete?
                <Alert show={deletebenefitShow} variant="danger" onClose={(event) => this.setState({deletebenefitShow:false})} dismissible>
                  <Alert.Heading>Error deleting Benefit</Alert.Heading>
                  <p>Server might be down: or Currently unavailable</p>
                </Alert> 
                : null
                }

                {resultOndelete?
                <Alert show={deletebenefitShow} variant="success" onClose={(event) => this.setState({deletebenefitShow:false})} dismissible>
                  <Alert.Heading>Benefit deleted successfully</Alert.Heading>
                </Alert> 
                : null
                }

                {/* add benefit button clicked  show modal=============================================*/}
                <Button variant="success my-2 py-1" size="lg" onClick={() => this.showaddBenefitModal()}>
                      <span><FontAwesomeIcon icon={faPlus} spin/>Add New Benefit</span>  
                </Button>
                {/* add benefit button clicked  show modal=============================================*/}

                {/* modal to add new benefit========================================================== */}
                <Modal size="lg" show={showModal} onHide={() => this.setState({showModal: false})} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Benefit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {onPostFailure?
                             <Alert show={postbenefitShow} variant="danger" onClose={(event) => this.setState({postbenefitShow:false})} dismissible>
                             <Alert.Heading>Error Creating Benefit</Alert.Heading>
                             <p>Server might be down: or Currently unavailable</p>
                             </Alert> 
                            : null
                         }
                         {onPostSuccess?
                             <Alert show={postbenefitShow} variant="success" onClose={(event) => this.setState({postbenefitShow:false})} dismissible>
                              <Alert.Heading>Benefit Created Successfully</Alert.Heading>
                             </Alert> 
                            : null
                         }
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Benefit Name</Form.Label>
                                    <Form.Control type="text" value={benefitname} onChange={(e) => this.setState({benefitname : e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Amount</Form.Label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={3}>
                                    <Form.Check type="radio" name="amountradiobtn" id="flatamountradbtn" onChange={(e) => this.setState({flatamountradiobtn : e.target.value, calculatedamoutradiobtn:false})}/>
                                    <Form.Label>Flat Amount</Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Check type="radio" name="amountradiobtn" id="calcamountradbtn" onChange={(e) => this.setState({calculatedamoutradiobtn : e.target.value, flatamountradiobtn:false})}/>
                                    <Form.Label>Calculated Amount</Form.Label>
                                </Col>
                            </Form.Row>
                            {flatamountradiobtn?
                                <Form.Row>
                                    <Col>
                                        <Form.Control type="text" value={flatamount} onChange={(e) => this.setState({flatamount : e.target.value, calculatedamount: '0',percentageonCalcamount:'0'})}/>
                                    </Col>
                                </Form.Row>
                                :null
                            }
                            {calculatedamoutradiobtn?
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control value={calculatedamount} onChange={(e) => this.setState({calculatedamount : e.target.value, flatamount: '0'})}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>% on Amount</Form.Label>
                                        <Form.Control value={percentageonCalcamount} onChange={(e) => this.setState({percentageonCalcamount : e.target.value})}/>
                                    </Col>
                                </Form.Row>
                                :null
                            }
                            <Form.Row>
                                <Col>
                                    <Form.Label>Frequency</Form.Label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                  <Form.Control as="select" id="frequencyId">
                                       <option value="1month">1month</option>
                                       <option value="2months">2months</option>
                                       <option value="3months">3months</option>
                                       <option value="4months">4months</option>
                                       <option value="5months">5months</option>
                                       <option value="6months">6months</option>
                                       <option value="7months">7months</option>
                                       <option value="8months">8months</option>
                                       <option value="9months">9months</option>
                                       <option value="10months">10months</option>
                                       <option value="11months">11months</option>
                                       <option value="12months">12months</option>
                                  </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className="my-2">
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
                            <Form.Row>
                                <Col>
                                    <Form.Label>Select Designation(s)</Form.Label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                 <Col>
                                    <Form.Control as="select" multiple id="designationId" onChange={this.multipleselectHandler}>
                                    {resultDesignation ?
                                        resultDesignation.content.map(designation => (
                                        <option value={designation.id}>{designation.designationname}</option>
                                        ))
                                         : null
                                     }   
                                    </Form.Control>
                                 </Col>
                            </Form.Row>
                            <Form.Row className="my-2">
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
                        </Form>
                        <Form.Row>
                            <Col>
                               <Button variant="success mt-2"  type="button" size="lg"  onClick={this.addBenefittoDB}>
                                        Add Benefit  
                               </Button>
                               <Button variant="warning mt-2 mx-4"  type="button" size="lg"  onClick={this.clearModalFields}>
                                        Clear  
                               </Button>
                            </Col>
                        </Form.Row>
                    </Modal.Body>
                </Modal>
                {/* modal to add new benefit========================================================== */}

                {result?
                       <Table responsive="sm" striped bordered hover size="sm">
                       <thead>
                           <tr>
                               <th>BENEFIT NAMES</th>
                               <th>FREQUENCY</th>
                               <th>AMOUNT FLAT</th>
                               <th>AMOUNT CALCULATED</th>
                               <th>%AMOUNT CALCULATED</th>
                               <th>DESIGNATION NAME</th>
                               <th>DESIGNATION DEPT NAME</th>
                               <th>ACTION</th>
                           </tr>
                       </thead>
                       <tbody>
                           {result.content.map(benefit => 
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
                                   <td>
                                       <Button variant="danger mx-1" onClick={() => this.onDelete(benefit.id)}>
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
                       <Button variant="primary" onClick={() => this.fetchAllBenefits(page - 1)}>
                           <FontAwesomeIcon icon={faArrowLeft}/>
                           Prev
                       </Button>
                       <Button variant="primary mx-3" onClick={() => this.fetchAllBenefits(page + 1)}>
                       <FontAwesomeIcon icon={faArrowRight}/>
                          Next
                       </Button>
            </Container>
        );
    }
}

export default ViewBenefits