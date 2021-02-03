import React,{Component} from 'react'
import { Container, Jumbotron, Nav,Navbar,NavDropdown,
    Card,CardDeck,CardGroup,CardColumns,ListGroup,Row,Col } from 'react-bootstrap';
import {Link,Route,Switch,Redirect} from 'react-router-dom'

import ViewUsers from '../users/viewusers'
import AddUser from '../users/adduser'
import ViewRoles from '../roles/viewroles'
import AssignRoles from '../roles/assignroles'
import ViewDesignations from '../designation/viewdesignations'
import AssignDesignations from '../designation/assigndesignations'
import ViewDepartments from '../departments/viewdepartments'
import AssignDepartments from '../departments/assigndepartments'
import ViewBenefits from '../benefits/viewbenefits'
import AssignBenefits from '../benefits/assignbenefit'

import ClipLoader from 'react-spinners'
import {css} from '@emotion/core'
import './header.css'

class Dashboard extends Component{
    render(){
        return(
            <Container fluid className="my-4 py-5">
            <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar-custom" variant="dark" >
            <Navbar.Brand href="#home">
            <img
              alt="" src="/assets/img/amalicon.JPG" width="30" height="30" className="d-inline-block align-top"/>{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#features">#</Nav.Link>
                    <Nav.Link href="#pricing">#</Nav.Link>
                     </Nav>
                    <Nav>
                    <NavDropdown title="Settings" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/">
                                 Logout
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                             <Link to="#">
                                 UserProfile
                            </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>

            <Row>
             <Col md={3}>
              <Card style={{ width: '18rem' }} className="mt-4" >
                <Card.Header>OPERATIONS</Card.Header>
                 <ListGroup variant="flush">
                 <ListGroup.Item>
                        <NavDropdown title="Users" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/main/dashboard/users/viewusers">
                                 View Users
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                             <Link to="/main/dashboard/users/addusers">
                                 Add User
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                             <Link to="/main/userprofile">
                                 ViewUser Details
                            </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                 </ListGroup.Item>
                 <ListGroup.Item>
                        <NavDropdown title="Roles" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                          <Link to="/main/dashboard/roles/viewroles">
                            View Roles
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link to="/main/dashboard/roles/asssignroles">
                            Assign Roles
                          </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                 </ListGroup.Item>
                 <ListGroup.Item>
                        <NavDropdown title="Departments" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/main/dashboard/departments/viewdepartments">
                                 View Departments
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/main/dashboard/departments/assigndepartments">
                                 Assign Departments
                            </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                </ListGroup.Item>
                 <ListGroup.Item>
                        <NavDropdown title="Designation" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                           <Link to="/main/dashboard/designations/viewdesignations">
                              View Designations
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                           <Link to="/main/dashboard/designations/assigndesignations">
                              Assign Designations
                           </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                </ListGroup.Item>
                 <ListGroup.Item>
                        <NavDropdown title="Benefits" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/main/dashboard/benefits/viewbenefits">
                                 ViewBenefits
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                           <Link to="/main/dashboard/benefits/assignbenefits">
                                 AssignBenefits
                            </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                </ListGroup.Item>
                </ListGroup>
              </Card>
             </Col>

             <Col md={9} className="mt-4">
                <Card>
                    <Card.Body>
                        <Switch>
                            <Route path="/main/dashboard/users/viewusers" component={ViewUsers}/>
                            <Route path="/main/dashboard/users/addusers" component={AddUser}/>
                            <Route path="/main/dashboard/roles/viewroles" component={ViewRoles}/>
                            <Route path="/main/dashboard/roles/asssignroles" component={AssignRoles}/>
                            <Route path="/main/dashboard/designations/viewdesignations" component={ViewDesignations}/>
                            <Route path="/main/dashboard/designations/assigndesignations" component={AssignDesignations}/>
                            <Route path="/main/dashboard/departments/viewdepartments" component={ViewDepartments}/>
                            <Route path="/main/dashboard/departments/assigndepartments" component={AssignDepartments}/>
                            <Route path="/main/dashboard/benefits/viewbenefits" component={ViewBenefits}/>
                            <Route path="/main/dashboard/benefits/assignbenefits" component={AssignBenefits}/>
                            
                            {/* default page to render on dashboard */}
                            <Redirect from="*" to="/main/dashboard/users/viewusers"/>
                        </Switch>
                    </Card.Body>
                </Card>
             </Col>
            </Row>
            </Container>
        );
    }
}

export default Dashboard