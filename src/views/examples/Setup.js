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

// reactstrap components
import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import axios from "axios";

import StateSelector from "components/StateSelector/StateSelector.js";
import PhoneInput from "components/PhoneInput/PhoneInput.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stateResident, setStateResident] = useState("");

  const history = useHistory();

  function isValidPhoneNumber(number) {
    return /^\d{10}$/.test(number);
  }

  async function finishSetup() {
    console.log("submitted");
    if (isValidPhoneNumber(phoneNumber)) {
        console.log(phoneNumber);
        console.log(stateResident);
        const result = await axios.post('http://127.0.0.1:5000/update_user', {
            "user_email": localStorage.getItem("email"),
            "fields_to_update": {
                "Phone Number": phoneNumber,
                "State": stateResident
            }
        });
        console.log(result);
        history.push("/admin");

    }
}


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Let's get you set up!</small>
            </div>
            <Form role="form">
              <StateSelector setStateResident={setStateResident}/>
              <PhoneInput setPhoneNumber={setPhoneNumber}/>
              
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button"
                  onClick={finishSetup}>
                  Secure my privacy
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
