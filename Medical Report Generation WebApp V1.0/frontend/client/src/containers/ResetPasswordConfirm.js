import React, { useState } from "react";
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Button, Form } from "react-bootstrap";


const ResetPasswordConfirm = () => {

  const routeParams = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password:'',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const reset_password_confirm = (uid, token, new_password, re_new_password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    
    try {
      axios.post('http://localhost:8000/auth/users/reset_password_confirm/', body, config);
    
    } catch (err) {
        
    }
    
  };

  const onSubmit = e => {
    e.preventDefault();

    const uid =routeParams.uid;
    const token = routeParams.token;

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };


  if (requestSent) {
    return <Navigate to='/' />
  }

  return(
    <Layout title='PFE | Reset Password Confirmation' content='Reset Password Confirmation page'>
      < div className="container mt-5" style={{width:'50%', justifyContent: 'center', alignItems: 'center', display: 'inline-block'}}>

        <Form onSubmit={e => onSubmit(e)}>

          <Form.Group>
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="password"
              name="new_password"
              value={new_password}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm New Password:</Form.Label>
            <Form.Control
              type="password"
              name="re_new_password"
              value={re_new_password}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>
          <br />
          <Button type="submit">Reset Password</Button>
        </Form>
      </div>
    </Layout>
  )
}

export default ResetPasswordConfirm;
