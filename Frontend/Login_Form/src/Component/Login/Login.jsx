import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoReloadCircle } from "react-icons/io5";
import { useAuth } from "../Context/Logincontext";

export default function Login() {
  const { isLoggedIn, login, logout,access1 } = useAuth();
  const [captchaText, setCaptchaText] = useState(generateRandomString(6));
  const [userInput, setUserInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const refreshCaptcha = () => {
    setCaptchaText(generateRandomString(6));
    setUserInput("");
  };
//---------------------------------------------------Login api call-----------------------------------------------
const url1 = 'http://localhost:3000/api/auth/login';
  const requestBody = {
    userId: email,
    password: password,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  const Login_user = () => {
    fetch(url1, options)
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      if(data.error){
        alert(data.error);
      }
      else{
      login(data.authtoken); //here login is a function which is defined in Logincontext.jsx for set the token in variable isLoggedIn
    get_access(data.authtoken);

    }})
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const url2 = 'http://localhost:3000/api/roles/fetchallRole';
  const get_access = (authtoken) => {

    const options2 = {
      method: 'GET',
      headers: {
        'auth-token':authtoken
      },
    };
    console.log("option2",options2);
    fetch(url2, options2)
    .then(response => response.json())
    .then(data1 => {
      console.log('Response data:', data1[0]);
      if(data1.error){
        alert(data1.error);
      }
      else{
        access1(data1[0]); // here access1 is a function which is defined in Logincontext.jsx for set the access data in variable acess
        console.log(data1[0].role_name)
        if(data1[0].role_name==="admin")
        {navigate("/admin");}
        else if(data1[0].role_name==="work")
        {navigate("/student");}
        else if(data1[0].role_name==="superadmin")
        {navigate("/superadmin");}
       

    }})
    .catch(error => {
      console.error('Error:', error);
    });
  }





  const submit = () => {
    if (userInput === captchaText) {
      alert("Captcha is correct!");
      Login_user();
    //   console.log(isLoggedIn);
    //   navigate("/admin");
    } else {
      alert("Captcha is incorrect. Please try again.");
    }
    refreshCaptcha();
  };
  return (
    <>
      <Container
        className="bg-info"
        fluid
        style={{ height: "100vh", width: "100vw" }}
      >
        <Row
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <Col
            sm={12}
            md={6}
            className="mx-auto flex-column d-flex justify-content-center align-items-center"
          >
            <Card
              className="p-5"
              style={{
                width: "22rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Title className="text-center">Login Form</Card.Title>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  style={{ width: "18rem" }}
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  style={{ width: "18rem" }}
                  type="password"
                  placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <div
                style={{
                  width: "18rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}
                className="captcha-container"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                  className="py-3"
                >
                  <div
                    className="captcha"
                    style={{
                      border: "2px solid grey",
                      width: "60%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                    }}
                  >
                    <span>{captchaText}</span>
                  </div>
                  <Button onClick={refreshCaptcha}>
                    <IoReloadCircle
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>
                </div>
                <input
                  type="text"
                  id="captcha-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter captcha"
                />
                {/* <button onClick={checkCaptcha}>Submit</button> */}
              </div>
              <br />
              <Button onClick={submit} variant="primary" type="submit">
                Submit
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
