import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';
import { auth } from '../../../config/firebase'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from 'react-toastify';

export default function SiginForm({ handlers }) {

    const [formKey, setFormKey] = useState(1)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)

    const history = useHistory()


    const SignInsubmit = (e, values) => {
        // console.log("email", values.email)
        // console.log("name", values.name)
        setUsername(values.name)
        // console.log("number", values.number)
        // console.log("password", values.password)

        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: username
                })
                toast.success("Register successfully.");

              setTimeout(() => {
                setFormKey(prev => (prev + 1)); // clear form
                // history.push("./dashboad");
                handlers()
              }, 1000); 

            })

            .catch((error) => toast.error(error.message));
    }
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log("authUser", authUser)
                setUser(authUser)
                if (authUser.displayName) {
                    // dont update username
                }
                else {
                    return authUser.updateProfile({
                        displayName: username,
                    })

                }
            } else {
                console.log("object")

            }
        })

        return () => {
            // clean up action
            unsubcribe();
        }
    }, [user, username])
   

    return (
        <>
            <Row>
               
                <ToastContainer />
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
                        <div>Already have an account ? <span style={{ color: "blue", textDecoration: "underline" }} onClick={() => handlers()}>Login</span></div>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
