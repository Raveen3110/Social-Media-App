import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';
import { auth } from "../../../config/firebase";

export default function LoginForm({ handler }) {
    const [formKey, setFormKey] = useState(1)

    const Loginsubmit = (e, values) => {
        e.preventDefault();
        console.log("object", values)
        auth
            .createUserWithEmailAndPassword(values.number, values.password)
            // .then((authUser) => {
            //     authUser.user.updateProfile({
            //         displayName: username
            //     })
            //     setFormKey(prev => (prev + 1)); // clear form
            // })
            .catch((error) => alert(error.message));
        //setFormKey(prev => (prev + 1)); //clear form

    }
    const InVaildsubmit = () => {
        console.log("In-Vaild")
    }

    return (
        <>
            <Row>
                <Col className="pl-5" md={10} sm={12}>
                    <AvForm onValidSubmit={Loginsubmit} InVaildSumit={InVaildsubmit} key={String(formKey)}>
                        <AvField name="name" label={<b>LOGIN ID<span className="color-red">*</span></b>} type="text" errorMessage="Please enter a name" validate={{
                            required: { value: true }
                        }} />
                        <AvField name="password" label={<b>PASSWORD<span className="color-red">*</span></b>} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                        }} />
                        <Button className="btn mt-4" type="submit" style={{ width: "100%" }}>Submit</Button>
                        <div>Don't have an account ? <span style={{ color: "blue", textDecoration: "underline" }} onClick={() => handler()}>Register</span></div>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
