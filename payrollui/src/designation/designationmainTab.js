import React,{Component} from 'react'
import {Tabs,Tab,Nav,Col,Row,
    TabContainer,TabContent,TabPane } from 'react-bootstrap'
import ViewDesignations from './viewdesignations'
import AssignDesignations from './assigndesignations'

class DesignationMain extends Component{
    render(){
        return(
            <Tab.Container  defaultActiveKey="viewdesignations">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="viewdesignations">View Departments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assigndesignations">Assign Department</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="viewdesignations">
                    <ViewDesignations />
                  </Tab.Pane>
                  <Tab.Pane eventKey="assigndesignations">
                    <AssignDesignations />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
        );
    }
}

export default DesignationMain;