import React,{Component} from 'react'
import {Tabs,Tab,Nav,Col,Row,
    TabContainer,TabContent,TabPane } from 'react-bootstrap'
import ViewUsers from './viewusers'
import AddUser from './adduser'
import UserDetails from './userdetails'

class UsersMain extends Component{
    render(){
        return(
            <Tab.Container  defaultActiveKey="viewusers">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="viewusers">View Users</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="adduser">Add User</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="userdetails">User Details</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="viewusers">
                    <ViewUsers />
                  </Tab.Pane>
                  <Tab.Pane eventKey="adduser">
                    <AddUser />
                  </Tab.Pane>
                  <Tab.Pane eventKey="userdetails">
                    <UserDetails />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
        );
    }
}

export default UsersMain;