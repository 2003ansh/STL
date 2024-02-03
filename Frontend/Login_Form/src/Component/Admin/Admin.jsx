import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../Context/Logincontext';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
export default function Admin() {
  const { isLoggedIn, logout, acess } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if ( !isLoggedIn) {
  //     navigate('/login')
  //   }
  // }, [isLoggedIn])
  const handletoken_erase=()=>{
    logout();
    navigate('/login')
  }
  window.onload = function () {
    const authtoken = localStorage.getItem("auth-token");
    if (!authtoken) {
      navigate('/login')
    }
  }
  return (
    <>
      <Container className="pt-5">
        {isLoggedIn ? <h1 className="pt-4">You have logged in as a Admin</h1> : <Container className="pt-4" >
          <h1>As you have logout, please login again</h1>
        <Button variant="info"  onClick={handletoken_erase}>Click to login</Button>
        </Container>}
      {/* <h1 className="pt-4">You have logged in as a Admin</h1> */}
      </Container>
    </>
  )
}
