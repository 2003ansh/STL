import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Logincontext";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Inputform from "../Form/Inputform";
import { useProfile } from "../Context/Student_Profile";
import { useNavigate } from "react-router-dom";
export default function Stud_Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, access1, acess } = useAuth();
  const { student_profile, profile } = useProfile();
  const [show, setShow] = useState(false);
  const [id1, setId] = useState();
  // const [data,setData]=useState()

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    console.log(e.target.id);
    setId(e.target.id);
  };

  const url1 = "http://localhost:3000/api/profile/fetchallProfile";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": isLoggedIn,
    },
  };

  const fetch_profile = () => {
    fetch(url1, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.error) {
          alert(data.error);
        } else {
          profile(data);
          // console.log(student_profile);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const options2 = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": isLoggedIn,
    },
  };
const delete_student=(e)=>{
  fetch(`http://localhost:3000/api/profile/deleteProfile/${e}`, options2)
  .then((response) => response.json())
  .then((data) => {
    console.log("Response data:", data);
    if (data.error) {
      alert(data.error);
    } else {
      alert("Student Deleted Successfully");
      window.location.reload();
    }
  })
}
const handleDelete=(e)=>{
  console.log(e.target.id);
  delete_student(e.target.id);
}


  useEffect(() => {
    isLoggedIn && fetch_profile()
  }, [isLoggedIn]);

  const update = (e) => {
    // updates(e.target.id);
    console.log(e.target.id);
  };
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
    <div className="pt-5">
      {isLoggedIn ? (
        <>
          <Offcanvas
            scroll={false}
            backdrop={true}
            show={show}
            onHide={handleClose}
            placement="top"
            style={{ height: "50vh", width: "50vw", borderRadius: "10px" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Add/Update a new Student</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Inputform id={id1}></Inputform>
            </Offcanvas.Body>
          </Offcanvas>

          <Container className="pt-4">
            <Container fluid className="d-flex justify-content-between">
              <h1 className="bg-warning p-2" style={{ borderRadius: "5px" }}>
                Student Details
              </h1>
              <Button variant="success" onClick={handleShow}>
                +Add
              </Button>
            </Container>

            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Registration No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Branch</th>
                  <th>Username</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                </tr>
              </thead>
              <tbody>
                {student_profile &&
                  student_profile.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.id}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{data.branch}</td>
                        <td>{data.username}</td>
                        <td>{data.state}</td>
                        <td>{data.city}</td>
                        <td>{data.zip}</td>
                        <td>{data.contact_no}</td>
                        <td onClick={update}>
                          <Button
                            id={data._id}
                            variant="primary"
                            onClick={handleShow}
                          >
                            Update
                          </Button>
                        </td>
                        <td onClick={update}>
                          <Button
                            id={data._id}
                            variant="danger"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </>
      ) : (
        <Container className="pt-4" >
          <h1>As you have logout, please login again</h1>
        <Button variant="info"  onClick={handletoken_erase}>Click to login</Button>
        </Container>
      )}
    </div>
  );
}
