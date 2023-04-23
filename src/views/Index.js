/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Data Guardian (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Data Guardian

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  FormGroup,
  Input,
  Label,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [email, setEmail] = useState(null);
  // const [websites, setWebsites] = useState([]);

  const websites = ["YouTube", "Google", "Instagram"];
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  useEffect(() => {
    const e = localStorage.getItem("email");
    setEmail(e);
  }, []);
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <div>
      {email ?
        (<>
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Websites Visited</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Page Name</th>
                        <th scope="col"># of Visits</th>
                        <th scope="col">Risk</th>
                        <th scope="col">Date Last Deleted</th>
                        <th scope="col">Recurring Delete</th>
                        <th scope="col">Delete Now</th>
                      </tr>
                    </thead>
                    <tbody>
                      {websites.map((website) =>
                      <tr>
                        <th scope="row">{website}</th>
                        <td>4,569</td>
                        <td>340</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                        </td>
                        <td>
                        <FormGroup check>
                          <Input
                            id="checkbox2"
                            type="checkbox"
                          />
                          {' '}
                          <Label check>
                          </Label>
                        </FormGroup>
                        </td>
                        <td>
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Delete Data
                          </Button>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </>) : <div><h1>Not Authenticated</h1></div>}
    </div>
  );
};

export default Index;
