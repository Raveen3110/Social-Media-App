import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';
import { auth } from "../../../config/firebase";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function LoginForm({ handler }) {
    const [formKey, setFormKey] = useState(1)
    const history = useHistory()
    const Loginsubmit = (e, values) => {
        e.preventDefault();
            auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                localStorage.setItem('LoginUserName',values.email)              
                setFormKey(prev => (prev + 1)); // clear form
                history.push('/dashboard')

            })
            .catch((error) => toast.error(error.message));
        //setFormKey(prev => (prev + 1)); //clear form

    }
    const InVaildsubmit = () => {
        console.log("In-Vaild")
    }

    return (
        <>
            <Row>
                <ToastContainer />

                <Col className="pl-5" md={10} sm={12}>
                    <AvForm onValidSubmit={Loginsubmit} InVaildSumit={InVaildsubmit} key={String(formKey)}>
                        <AvField name="email" label={<b>Email Id<span className="color-red">*</span></b>} type="text" errorMessage="Please enter a name" validate={{
                            required: { value: true }
                        }} />
                        <AvField name="password" label={<b>Password<span className="color-red">*</span></b>} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                        }} />
                        <Button className="btn mt-4" type="submit" style={{ width: "100%",backgroundColor: "orange",border:"none" }}>Submit</Button>
                        <div className="mt-2">Don't have an account ? <span style={{ color: "blue", textDecoration: "underline",cursor:"pointer" }} onClick={() => handler()}>Register</span></div>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
