import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';
import { auth } from '../../../config/firebase'

export default function SiginForm() {
    const [formKey, setFormKey] = useState(1)

    const SignInsubmit = (e, values) => {
        console.log("email", values.email)
        console.log("name", values.name)
        console.log("number", values.number)
        console.log("password", values.password)

        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .catch(alert("Errorrrr"));

        // setFormKey(prev => (prev + 1)); // clear form
    }


    return (
        <>
            <Row>
                <Col className="pl-5" md={10} sm={12}>
                    <AvForm onValidSubmit={SignInsubmit} key={String(formKey)}>
                        <AvField name="name" label={<b>Name<span className="color-red">*</span></b>} type="text" errorMessage="Please enter a name" validate={{
                            required: { value: true },
                        }} />
                        <AvField name="number" label={<b>Mobile No.<span className="color-red">*</span></b>} type="number" errorMessage="Please enter a number" validate={{
                            required: { value: true },
                        }} />
                        <AvField name="email" label={<b>Email ID<span className="color-red">*</span></b>} type="email" errorMessage="Please enter a email" validate={{
                            required: { value: true },
                        }} />
                        <AvField name="password" label={<b>Password<span className="color-red">*</span></b>} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                        }} />
                        <Button className="btn mt-4" type="submit"
                            style={{ width: "100%", backgroundColor: "orange", border: "none" }}
                        >Register</Button>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
