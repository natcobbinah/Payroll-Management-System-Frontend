import React,{Component} from 'react'
import {Tabs,Tab,Nav,Col,Row,
    TabContainer,TabContent,TabPane } from 'react-bootstrap'
import ViewRoles from './viewroles'
import AssignRoles from './assignroles'

class RolesMain extends Component{
    render(){
        return(
            <Tab.Container  defaultActiveKey="viewroles">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="viewroles">View Roles</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assignroles">Assign Roles</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="viewroles">
                    <ViewRoles />
                  </Tab.Pane>
                  <Tab.Pane eventKey="assignroles">
                    <AssignRoles />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
        );
    }
}

export default RolesMain;