import React,{Component} from 'react'
import {Tabs,Tab,Nav,Col,Row,
    TabContainer,TabContent,TabPane } from 'react-bootstrap'
import ViewBenefits from './viewbenefits'
import AssignBenefits from './assignbenefit'

class BenefitMain extends Component{
    render(){
        return(
            <Tab.Container  defaultActiveKey="viewbenefits">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="viewbenefits">View Benefits</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assignbenefits">Assign Benefits</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="viewbenefits">
                    <ViewBenefits />
                  </Tab.Pane>
                  <Tab.Pane eventKey="assignbenefits">
                    <AssignBenefits />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
        );
    }
}

export default BenefitMain;