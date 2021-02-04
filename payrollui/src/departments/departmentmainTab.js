import React,{Component} from 'react'
import {Tabs,Tab,Nav,Col,Row,
    TabContainer,TabContent,TabPane } from 'react-bootstrap'
import ViewDepartments from './viewdepartments'
import AssignDepartments from './assigndepartments'

class DepartmentMain extends Component{
    render(){
        return(
            <Tab.Container  defaultActiveKey="viewdepartment">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="viewdepartment">View Departments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assigndepartment">Assign Department</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="viewdepartment">
                    <ViewDepartments />
                  </Tab.Pane>
                  <Tab.Pane eventKey="assigndepartment">
                    <AssignDepartments />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
        );
    }
}

export default DepartmentMain;