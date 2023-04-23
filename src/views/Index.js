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
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";
import { CircularProgress } from 'react-loading-indicators';
import Header from "components/Headers/Header.js";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [emailNumber, setEmailNumber] = useState(1);
  var sendList = [];
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  useEffect(() => {
    const e = localStorage.getItem("email");
    setEmail(e);
    getUser(e);
  }, []);
  const addToList = useCallback((company) => {
    const index = sendList.indexOf(company);
    if (index >= 0) {
      sendList.splice(index);
    } else {
      sendList.push(company);
    }
  }, [sendList]);
  const getUser = async (email) => {
    console.log("Getting user " + email);
    const res = await axios({
      method: 'get',
      url: 'http://localhost:5001/get_user',
      params: {
        "user_email": email
      }
    });
    const json = await res.data;
    setProfile(json);
  };
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const sendEmails = async () => {
    console.log(sendList);
    const res = await axios.post("http://localhost:5001/update_websites", {
      "user_email": email,
      "history": sendList
    });
    console.log(res.data);
  };
  return (
    <div>
      {profile ?
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
                          onClick={(e) => {
                            e.preventDefault();
                            sendEmails();
                          }}
                          size="sm"
                        >
                          Send Emails
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Page Name</th>
                        <th scope="col"># of Visits</th>
                        <th scope="col">Status</th>
                        <th scope="col">Risk</th>
                        <th scope="col">Send Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile["user_data"].sort((a, b) => b["Times Visited"] - a["Times Visited"]).map((item) => (
                        <ListComponent key={item["Company"]} item={item} addToList={addToList}></ListComponent>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </>) : <div style={{ "paddingTop": "300px", "paddingLeft": "200px" }}><CircularProgress /></div>}
    </div>
  );
};
function ListComponent({ item, addToList }) {
  // TODO, make this colored
  function getRisk() {
    if (item["Times Visited"] > 50) {
      return "HIGH";
    } else if (item["Times Visited"] > 25) {
      return "MEDIUM";
    } else {
      return "LOW";
    }
  }
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    addToList(item["Company"]);
  };
  return (
    <tr>
      <td>{item["Company"]}</td>
      <td>{item["Times Visited"]}</td>
      <td>
        {item["Status"]}
      </td>
      <td>
        {getRisk()}
      </td>
      <td style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "transform": "scale(1.2)" }}>
        {item["Status"] === "Unguarded" ? <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} value="" id={item["Company"] + "1"} />
          : <input type="checkbox" id={item["Company"] + "1"} checked disabled />}

      </td>
    </tr>
  );
}

export default Index;
