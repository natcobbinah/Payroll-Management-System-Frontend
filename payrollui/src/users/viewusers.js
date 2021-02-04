import { Container,Button,Alert,Modal,Form,Col,Spinner} from "react-bootstrap"
import React,{Component} from  'react'
import axios from 'axios'
import {PATHBASE,PATHGETALLUSERS,PARAM_PAGE,PATH_DELETEUSER
 ,PARAM_DELETE,PATH_SENDLOGINDETAILS_GMAIL,PATH_PATCH_EDITUSER} from '../API_URLS'
import {Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faEdit,faTrash, faToggleOn, faMailBulk } from '@fortawesome/free-solid-svg-icons'

class ViewUsers extends Component{
    constructor(props){
        super(props);

        this.state ={
            //retrieve users attributes
            result:null,
            error:null,

            //delete user attributes
            resultDel:null,
            errorDel:null,

            //send login details attributes
            loginDetailSent:null,
            loginDetailsError:null,

            //alert attributes
            show:true,

            //modal attributes
            showModal:false,

            //checkbox attribute
            userstoDisable:[],

            //update user atttributes
            onUpdateSuccess:null,
            onUpdateError:null,
        }

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.SendLoginDetails = this.SendLoginDetails.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    
    fetchAllUsers(page = 0){
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${page}`)
             .then(result => this.setState({result: result.data}))
             .then(error => this.setState({error}));
    }

    onSelected(id){
        const{userstoDisable}=this.state;
        userstoDisable.push(id);
    }

    onDelete(id){
        const{userstoDisable,result}=this.state;
        if(userstoDisable[0] === id){
            axios.get(`${PATHBASE}${PATH_DELETEUSER}?${PARAM_DELETE}${id}`)
                 .then(resultDel => this.setState({resultDel: resultDel.data}))
                 .then(errorDel => this.setState({errorDel}))
            userstoDisable.pop();

        this.fetchAllUsers();
        }else{
            window.alert("You need to select immediate checkbox before you can delete")
        }
    }

    SendLoginDetails(email,password){
        axios.get(`${PATHBASE}${PATH_SENDLOGINDETAILS_GMAIL}/${email}/${password}`)
             .then(loginDetailSent => this.setState({loginDetailSent: loginDetailSent.data}))
             .then(loginDetailsError => this.setState({loginDetailsError}))
    }       

    onEditUser(userid,useraddress,usercity,useremail,
        useremployeeid,useremployeelevel,userenabled,userpassword,userphonenumber,
        userbankaccountnumber,userbirthdate,usergender,userhiredate,usermaritalstatus,
        userbirthcertid,userdriverslicenseid,userpassportid,userssnitid,uservotersid,
        username,usertinnumber,usermarriagecertid,userusercreator){

        this.setState({
            id: userid,
            address: useraddress,
            city: usercity,
            email: useremail,
            employeeid: useremployeeid,
            employeelevel: useremployeelevel ,
            enabled: userenabled,
            password: userpassword,
            phonenumber: userphonenumber,
            bankaccountnumber:userbankaccountnumber,
            birthdate: userbirthdate,
            gender:usergender,
            hiredate: userhiredate,
            maritalstatus:usermaritalstatus,
            birthcertid: userbirthcertid,
            driverslicenseid: userdriverslicenseid,
            passportid: userpassportid,
            ssnitid: userssnitid,
            votersid:uservotersid,
            tinnumber: usertinnumber,
            marriagecertid: usermarriagecertid,
            usercreator: userusercreator,
            name: username,
       })

       this.setState({
           showModal:true
       })
    }

    updateUser(){
        const{id, address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
            marriagecertid,usercreator} = this.state;
        
            const headers = { 'content-type': 'application/json'};
            axios({
                method: 'patch',
                url: `${PATHBASE}${PATH_PATCH_EDITUSER}`,
                data: {
                    id:id,
                    address: address,
                    city: city,
                    email: email,
                    employeeid: employeeid,
                    employeelevel: employeelevel ,
                    enabled: enabled,
                    password: password,
                    phonenumber: phonenumber,
                    bankaccountnumber:bankaccountnumber,
                    birthdate: birthdate,
                    gender:gender,
                    hiredate: hiredate,
                    maritalstatus:maritalstatus,
                    birthcertid: birthcertid,
                    driverslicenseid: driverslicenseid,
                    passportid: passportid,
                    ssnitid: ssnitid,
                    votersid:votersid,
                    tinnumber: tinnumber,
                    marriagecertid: marriagecertid,
                    usercreator: usercreator,
                    name: name,
                },
                headers: headers
            })
            .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
            .catch(onUpdateError => this.setState({onUpdateError}));
            
            this.fetchAllUsers();    
    }

    componentDidMount(){
        this.fetchAllUsers();
    }
   
    render(){
        const{result,error,resultDel,errorDel, page = 0,show,
        loginDetailSent,loginDetailsError,showModal, onUpdateSuccess,
        onUpdateError,
        
        //user data attributes
        address,city,email,employeeid,employeelevel,password,phonenumber,bankaccountnumber,birthdate,
        gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
        marriagecertid,   
        } = this.state;
        return(
            <Container fluid>
                {error?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Unsuccessful Fetching User Records</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {errorDel?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Failure Deleting User Record</Alert.Heading>
                    <p>Server might be down or currently not available</p>
                </Alert> 
                 : null
                }

                {resultDel?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>User Deleted Successfully</Alert.Heading>
                </Alert> 
                 : null
                }

                {loginDetailSent?
                <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>LoginCredentials Sent Successfully</Alert.Heading>
                </Alert> 
                 : null
                }

                {loginDetailsError?
                <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                    <Alert.Heading>Sending LoginCredentials  UnSuccessfully</Alert.Heading>
                    <p>Email might be wrong: or Server might be down</p>
                </Alert> 
                 : null
                }

                {result?
                  <Table responsive="sm" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>EmployeeLevel</th>
                            <th>BankAccountNo</th>
                            <th>HireDate</th>
                            <th>SSNITID</th>
                            <th>NAME</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.content.map(user => 
                            <tr key={user.id}>
                                <td>{user.employeeid}</td>
                                <td>{user.employeelevel}</td>
                                <td>{user.bankaccountnumber}</td>
                                <td>{user.hiredate}</td>
                                <td>{user.ssnitid}</td>
                                <td>{user.name}</td>
                                <td>
                                    <input type="checkbox" className="mx-2" onChange={() => this.onSelected(user.id)}/>
                                    <Button variant="primary mx-1" onClick={() => this.fetchAllUsers(page - 1)}>
                                      <FontAwesomeIcon icon={faToggleOn}/>
                                    </Button>
                                    <Button variant="secondary mx-1" onClick={() => this.onEditUser(user.id,user.address,user.city,user.email,
                                        user.employeeid,user.employeelevel,user.enabled,user.password,user.phonenumber,
                                        user.bankaccountnumber,user.birthdate,user.gender,user.hiredate,user.maritalstatus,
                                        user.birthcertid,user.driverslicenseid,user.passportid,user.ssnitid,user.votersid,
                                        user.name,user.tinnumber,user.marriagecertid,user.usercreator
                                    )}>
                                      <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button variant="danger mx-1" onClick={() => this.onDelete(user.id)}>
                                      <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                    <Button variant="success" onClick={() => this.SendLoginDetails(user.email,user.password)}>
                                      <FontAwesomeIcon icon={faMailBulk}/>
                                    </Button>
                                </td>
                            </tr>
                         )
                        }
                    </tbody>
                  </Table>
                 : 
                 <Button variant="success" disabled className="mr-2">
                     <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                     Loading...
                 </Button>
                }
                <Button variant="primary" onClick={() => this.fetchAllUsers(page - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    Prev
                </Button>
                <Button variant="primary mx-3" onClick={() => this.fetchAllUsers(page + 1)}>
                   <FontAwesomeIcon icon={faArrowRight}/>
                    Next
                </Button>

                {/* launch modal on edit button clicked */}
                <Modal show={showModal} size="lg" onHide={(event) => this.setState({showModal: false})} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Details</Modal.Title>
                        {onUpdateError?
                        <Alert show={show} variant="danger" onClose={(event) => this.setState({show:false})} dismissible>
                           <Alert.Heading>Unsuccessful Updating User Record</Alert.Heading>
                           <p>Server might be down or currently not available</p>
                        </Alert> 
                        : null
                        }

                        {onUpdateSuccess?
                        <Alert show={show} variant="success" onClose={(event) => this.setState({show:false})} dismissible>
                           <Alert.Heading>User Record Updated Successfully</Alert.Heading>
                        </Alert> 
                        : null
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Form>
                              <Form.Row>
                                 <Col>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => this.setState({name : e.target.value})}></Form.Control>
                                 </Col>
                                 <Col>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" value={address} onChange={(e) => this.setState({address : e.target.value})}></Form.Control>
                                 </Col>
                                 </Form.Row>
                              <Form.Row className="mt-4">
                                 <Col>
                                   <Form.Label>Email</Form.Label>
                                   <Form.Control type="email" value={email} onChange={(e) => this.setState({email : e.target.value})}></Form.Control>
                                 </Col>
                                 <Col>
                                   <Form.Label>Password</Form.Label>
                                   <Form.Control type="password" value={password} onChange={(e) => this.setState({password : e.target.value})}></Form.Control>
                                 </Col>
                               </Form.Row>
                              <Form.Row className="mt-4">
                                  <Col md={3}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control type="text" value={gender} onChange={(e) => this.setState({gender : e.target.value})}></Form.Control>
                                 </Col>
                                 <Col md={3}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" value={birthdate} onChange={(e) => this.setState({birthdate : e.target.value})}></Form.Control>
                                 </Col>
                                 <Col md={3}>
                                    <Form.Label>EmployeeLevel</Form.Label>
                                    <Form.Control type="text" value={employeelevel} onChange={(e) => this.setState({employeelevel : e.target.value})}></Form.Control>
                                 </Col>
                                <Col md={3}>
                                    <Form.Label>HireDate</Form.Label>
                                    <Form.Control type="date" value={hiredate} onChange={(e) => this.setState({hiredate : e.target.value})}></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-4">
                              <Col md={3}>
                                 <Form.Label>City</Form.Label>
                                 <Form.Control type="text" value={city} onChange={(e) => this.setState({city : e.target.value})}></Form.Control>
                              </Col>
                              <Col md={3}>
                                 <Form.Label>PhoneNumber</Form.Label>
                                 <Form.Control type="text" value={phonenumber} onChange={(e) => this.setState({phonenumber : e.target.value})}></Form.Control>
                              </Col>
                              <Col md={3}>
                                 <Form.Label>MaritalStatus</Form.Label>
                                 <Form.Control type="text" value={maritalstatus} onChange={(e) => this.setState({maritalstatus : e.target.value})}></Form.Control>
                              </Col>
                              <Col md={3}>
                                <Form.Label>EmployeeID</Form.Label>
                                <Form.Control type="text" value={employeeid} onChange={(e) => this.setState({employeeid : e.target.value})}></Form.Control>
                              </Col>
                          </Form.Row>
                          <Form.Row className="mt-4">
                             <Col md={3}>
                               <Form.Label>BankAccountNo</Form.Label>
                               <Form.Control type="text" value={bankaccountnumber} placedholder="Enter bankaccountno here" onChange={(e) => this.setState({bankaccountnumber : e.target.value})}></Form.Control>
                             </Col>
                             <Col md={3}>
                               <Form.Label>SSNITID</Form.Label>
                               <Form.Control type="text" value={ssnitid} onChange={(e) => this.setState({ssnitid : e.target.value})}></Form.Control>
                            </Col>
                            <Col md={3}>
                              <Form.Label>VotersID</Form.Label>
                              <Form.Control type="text" value={votersid} onChange={(e) => this.setState({votersid : e.target.value})}></Form.Control>
                            </Col>
                            <Col md={3}>
                               <Form.Label>BirthCertificate</Form.Label>
                               <Form.Control type="text" value={birthcertid} onChange={(e) => this.setState({birthcertid : e.target.value})}></Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row className="mt-4">
                             <Col md={3}>
                                <Form.Label>DriversLicense</Form.Label>
                                <Form.Control type="text" value={driverslicenseid} onChange={(e) => this.setState({driverslicenseid : e.target.value})}></Form.Control>
                             </Col>
                             <Col md={3}>
                                <Form.Label>PassportNo</Form.Label>
                                <Form.Control type="text" value={passportid} onChange={(e) => this.setState({passportid : e.target.value})}></Form.Control>
                             </Col>
                             <Col md={3}>
                               <Form.Label>Tin Number</Form.Label>
                               <Form.Control type="text" value={tinnumber} onChange={(e) => this.setState({tinnumber : e.target.value})}></Form.Control>
                             </Col>
                             <Col md={3}>
                                <Form.Label>Marriage Cert</Form.Label>
                                <Form.Control type="text" value={marriagecertid} onChange={(e) => this.setState({marriagecertid : e.target.value})}></Form.Control>
                             </Col>
                          </Form.Row>
                           <Form.Row className="mt-4">
                            <Col md={4}></Col>
                            <Col md={4}>
                               <Button variant="success"  type="button" size="lg" block className="mb-4" onClick={this.updateUser}>
                                 UpdateDetails
                               </Button>
                             </Col>
                            <Col md={4}></Col>
                          </Form.Row>
                          </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
}

export default ViewUsers