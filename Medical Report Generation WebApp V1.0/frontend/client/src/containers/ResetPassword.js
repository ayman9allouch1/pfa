import React, { useState } from "react";
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const ResetPassword = () => {

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email:''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const reset_password = (email) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ email });
    
        try {
            axios.post('http://localhost:8000/auth/users/reset_password/', body, config);
        } catch (err) {

        }

    };

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    };


    if (requestSent) {
        return <Navigate to='/' />
    }

    return(
        <Layout title='PFE | Reset Password' content='Reset Password page'>
            < div className="container mt-5">
            <h1> Request Password Reset:</h1>
            <div className='mt-5' style={{width:'50%', justifyContent: 'center', alignItems: 'center', display: 'inline-block'}}>

                <Form onSubmit={e => onSubmit(e)}>
                
                    <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                    >
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    </FloatingLabel>
                    </Form.Group>

                    <Button type="submit">Reset Password</Button>
                </Form>
            </div>
            </div>
        </Layout>
    )
}

export default ResetPassword;
