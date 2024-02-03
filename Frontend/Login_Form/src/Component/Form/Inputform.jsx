import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useAuth } from '../Context/Logincontext';
import { useNavigate } from "react-router-dom";
function Inputform(props) {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout,access1,id } = useAuth();
  const [validated, setValidated] = useState(false);
  const[data,setData]=useState({
    firstname:"",
    lastname:"",
    branch:"",
    // username:"",
    city:"",
    state:"",
    zip:""
  });//data is a object which is used to store the data of the form

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(props.id){
      update_student();
    }
    else{console.log(data);
      add_student();
      setValidated(true);}
    
  };
  useEffect(() => {
    console.log(props.id);
    // if(!isLoggedIn){
    //   navigate('/login')
    // }
  },[isLoggedIn])
  window.onload = function () {
    const authtoken = localStorage.getItem("auth-token");
    if (!authtoken) {
      navigate('/login')
    }
  }
  //---------------------------------------------------Add student api call-----------------------------------------------
const url1 = 'http://localhost:3000/api/profile/addProfile';
const requestBody = {
  first_name: data.firstname,
  last_name: data.lastname,
  branch: data.branch,
  // username: data.username,
  city: data.city,
  state: data.state,
  zip: data.zip,
};
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token':isLoggedIn
  },
  body: JSON.stringify(requestBody)
}
const add_student = () => {
  console.log(options)
  fetch(url1, options)
  .then(response => response.json())
  .then(data => {
    console.log('Response data:', data);
    if(data.error){
      alert(data.error);
    }
    else{
      alert("Student added successfully");
      window.location.reload();

  }})
  .catch(error => {
    console.error('Error:', error);
  });
}
  //---------------------------------------------------update student api call-----------------------------------------------
  const url2 = `http://localhost:3000/api/profile/updateProfile/${props.id}`;
const requestBody1 = {
  first_name: data.firstname,
  last_name: data.lastname,
  branch: data.branch,
  // username: data.username,
  city: data.city,
  state: data.state,
  zip: data.zip,
}
const options1 = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token':isLoggedIn
  },
  body: JSON.stringify(requestBody1)
}
const update_student = () => {
  console.log(options1)
  fetch(url2, options1)
  .then(response => response.json())
  .then(data => {
    console.log('Response data:', data);
    if(data.error){
      alert(data.error);
    }
    else{
      alert("Student updated successfully");
      window.location.reload();

  }})
  .catch(error => {
    console.error('Error:', error);
  });
}
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
            onChange={(e)=>setData({...data,firstname:e.target.value})}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
            onChange={(e)=>setData({...data,lastname:e.target.value})}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Branch</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Branch"
            defaultValue="Computer Science Engineering"
            onChange={(e)=>setData({...data,branch:e.target.value})}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        

        
        
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required 
          onChange={(e)=>setData({...data,city:e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required 
          onChange={(e)=>setData({...data,state:e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required
          onChange={(e)=>setData({...data,zip:e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default Inputform;