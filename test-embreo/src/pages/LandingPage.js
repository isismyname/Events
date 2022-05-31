import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext'
import { API } from '../config/API';
import { Modal, Form, Button } from 'react-bootstrap';
import img from '../img/CE.png'
import img1 from '../img/calendar.png'

export const LandingPage = () => {
  const [showL, setShowL] = useState(false);
  const handleCloseL = () => setShowL(false);
  const handleShowL = () => setShowL(true);

  const Login = () => {
    const nav = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    
    const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const body = JSON.stringify(form)

      const response = await API.post('/login', body, config)

      console.log(response.data)

      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        
        // Status check
        if (response.data.data.statusUser === 'admin') {
          nav('/admin');
        } else{
          nav('/user');
        }
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    return (
      <Modal className='my-5 modal py-5' show={showL} onHide={handleCloseL}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
              <Modal.Title className="mt-3 mb-5"><h1 className='font-heading text-center'>Login</h1></Modal.Title>
              <Form.Control value={email} onChange={handleChange} id='email' name='email' type="email" placeholder="Email" className="border-2 border-info bg-secondary bg-opacity-25 font-text my-3" />
              <Form.Control value={password} onChange={handleChange} id='password' name='password' type="password" placeholder="Password" className="border-2 border-info bg-secondary bg-opacity-25 font-text my-3" />
              <Button className='font-text fw-bold mx-auto my-3 w-100' variant="success" type="submit"> Sign In </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <div>
      <img className='image-landingpage' src={img1} alt="" />
      <div className='d-flex justify-content-between py-3'>
        <div className='d-flex mx-5 px-5'>
          <p className='text-logo'>E</p>
          <div className='line-logo font-heading'>
            <p>mbreo</p> 
            <p>vent</p>
          </div>
        </div>
        <Button onClick={handleShowL} className='btn btn-success font-heading my-auto mx-5 px-4'>Login</Button>
      </div>
      <Login />
      <div className='bg-success bg-opacity-25 font-heading fs-5 notes p-3 text-center'>
        <h5 className='my-auto'>Embreo event is a website that helps you book a place for your or your family's event needs</h5>
      </div>
      <div className='bg-success bg-opacity-25 font-heading fs-5 notes2 p-3 text-center'>
        <h5 className='my-auto'>we will always provide the best service and easy to use to users</h5>
      </div>
    </div>
  )
}
