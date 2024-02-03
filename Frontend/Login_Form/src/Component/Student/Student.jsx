import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap'
import { useAuth } from '../Context/Logincontext'
import { useNavigate } from "react-router-dom";
export default function Student() {
  const { isLoggedIn, login, logout, access1, acess } = useAuth();
  const navigate = useNavigate();
  window.onload = function () {
    const authtoken = localStorage.getItem("auth-token");
    if (!authtoken) {
      navigate('/login')
    }
  }
  const handletoken_erase=()=>{
    logout();
    navigate('/login')
  }
  return (
    <>
    <Container className="pt-5">
      {isLoggedIn ? (
        <>
        <h1 className="pt-4">You have logged in as a Student</h1>
        </>
      ) : (
        <>
        <Container className="pt-4" >
          <h1>As you have logout, please login again</h1>
        <Button variant="info"  onClick={handletoken_erase}>Click to login</Button>
        </Container>
        </>
      )}
      
      </Container>
    </>
  )
}
