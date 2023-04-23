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
import { useGoogleLogin } from "@react-oauth/google";
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
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Login = () => {
  const history = useHistory();
  const login_function = useGoogleLogin({
    onSuccess: tokenResponse => setUser(tokenResponse),
  });
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            console.log(res.data);
            // TODO: Send request to server with user data
            localStorage.setItem("email", res.data["email"]);
            authFlow(res);
            //   axios.post('http://localhost:5001/update_user', {
            //     "user_email": res.data["email"],
            //     "fields_to_update": {
            //       "User": res.data["email"],
            //       "Profile Picture": res.data["picture"],
            //       "First Name": res.data["given_name"],
            //       "Last Name": res.data["family_name"]
            //     }
            //   }).then((response) => {
            //     console.log(response);
            //   }).catch(function (error) {
            //     console.log(error);
            //   });
            //   history.push("/admin");
            // })
            // .catch((err) => console.log(err));

          });
      }
    }, [user]);

  const authFlow = async (res) => {
    const result = await axios.post('http://127.0.0.1:5000/update_user', {
      "user_email": res.data["email"],
      "fields_to_update": {
        "User": res.data["email"],
        "Profile Picture": res.data["picture"],
        "First Name": res.data["given_name"],
        "Last Name": res.data["family_name"]
      }
    });
    const data = result.data;
    axios({
      method: "get",
      url: 'http://127.0.0.1:5000/get_user',
      params: {
        "user_email": res.data["email"]
      }
    }).then((response) => {
      console.log(response.data);
      if (response.data["user_profile"]["Phone Number"] == null) {
        console.log("no user exists");
        history.push("/auth/setup");
      } else {
        console.log("user exists");
        history.push("/admin");
      }
    });
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                onClick={login_function}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </Col>
    </>
  );
};

export default Login;
