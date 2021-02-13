import React,{Component} from  'react'
import axios from 'axios'
import {PATHBASE,PATH_GETALL_BENEFITS,PATHGETALLUSERS,
        PARAM_PAGE,PATH_ADD_USERBENEFIT} from '../API_URLS';
import {Form,Col,Container,Button,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faCoffee} from '@fortawesome/free-solid-svg-icons'

const searchForUser = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

const searchForBenefit = searchBenefit => benefit =>
    benefit.benefitname.toLowerCase().includes(searchBenefit.toLowerCase());

class AssignBenefits extends Component{
    constructor(props){
        super(props);

        this.state = {
            //search user and role attributes
            searchUser: '',
            searchBenefit: '',

             //fetch benefit objects
             resultBenefitfetch: null,
             errorBenefitfetch: null,
 
             //fetch user objects
             resultUserfetch: null,
             errorUserfetch:null,
 
             //assign role objects
             resultBenefitAssign: null,
             errorBenefitAssign: null,

            //alert attributes
            show:true,
        }

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.fetchAllBenefits = this.fetchAllBenefits.bind(this);
        this.assignBenefit = this.assignBenefit.bind(this);
    }

    fetchAllBenefits(pageBenefit = 0){
        axios.get(`${PATHBASE}${PATH_GETALL_BENEFITS}?${PARAM_PAGE}${pageBenefit}`)
             .then(resultBenefitfetch => this.setState({resultBenefitfetch: resultBenefitfetch.data}))
             .catch(errorBenefitfetch => this.setState({errorBenefitfetch}));
    }
    fetchAllUsers(pageUser = 0){
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${pageUser}`)
             .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
             .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    ///test/userbenefit/{benefitid}/{userid}
    assignBenefit(){
        let selectedUser = document.getElementById('userid').value;
        let selectedBenefit = document.getElementById('benefitId').value;

        axios.post(`${PATHBASE}${PATH_ADD_USERBENEFIT}/${selectedBenefit}/${selectedUser}`)
             .then(resultBenefitAssign => this.setState({resultBenefitAssign: resultBenefitAssign.data}))
             .catch(errorBenefitAssign => this.setState({errorBenefitAssign}));
    }

    componentDidMount(){
        this.fetchAllBenefits();
        this.fetchAllUsers();
    }

    render(){
        const{resultDeptfetch,errorBenefitfetch,resultUserfetch,resultBenefitfetch,resultDeptAssignSuccess,resultDeptAssignError,
            pageBenefit = 0, pageUser = 0,searchUser,searchBenefit,
            resultBenefitAssign,errorBenefitAssign,show} = this.state;
        return(
            <Container fluid>
                <span> <FontAwesomeIcon icon={faCoffee}/>ASSIGNING Benefits</span>

                 {resultBenefitAssign?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>User Assigned Benefit Successfully</Alert.Heading>
                </Alert> 
                : null
                }
                 {errorBenefitAssign?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                  <Alert.Heading>Error Assigning Benefit</Alert.Heading>
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
                                   <Form.Control type="text"  placeholder="Type benefit name here" onChange={(e) => this.setState({searchBenefit: e.target.value})}/>
                                </Col>
                            </Form.Row>
                            <Form.Label>Select Benefit</Form.Label>
                            <Form.Row>
                                <Col>
                                  <Button variant="secondary mb-2" onClick={() => this.fetchAllBenefits(pageBenefit - 1)}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                     Prev
                                  </Button>
                                   <Button variant="secondary mx-2 mb-2" onClick={() => this.fetchAllBenefits(pageBenefit + 1)}>
                                   <FontAwesomeIcon icon={faArrowRight}/>
                                     Next
                                   </Button>
                                </Col>
                            </Form.Row>
                            <Form.Control as="select" id="benefitId">
                             {resultBenefitfetch ?
                              resultBenefitfetch.content.filter(searchForBenefit(searchBenefit)).map(benefit => (
                                    <option value={benefit.id}>
                                        {benefit.designation?
                                           benefit.benefitname
                                         : null
                                        }
                                        -------- 
                                        {benefit.designation?
                                           benefit.designation.designationname
                                         : null
                                        }
                                        -------- 
                                         {benefit.designation?
                                           benefit.designation.department.departmentname
                                         : null
                                        }
                                    </option>
                             ))
                              : null
                            }   
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-3 py-2">
                        <Col>
                           <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={() => this.assignBenefit()}>
                                Assign Benefit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default AssignBenefits