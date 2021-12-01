import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';

export default function LoginForm() {
    const [formKey, setFormKey] = useState(1)

   const Loginsubmit=(e,values)=>{
    e.preventDefault();        
   setFormKey(prev => (prev + 1)); //clear form
    console.log("object",values)
   }
   const InVaildsubmit=()=>{
    console.log("In-Vaild")
  }

    return (
        <>
            <Row>    
                <Col className="pl-5" md={10} sm={12}>
                    <AvForm onValidSubmit={Loginsubmit} InVaildSumit={InVaildsubmit}  key={String(formKey)}>
                        <AvField name="name" label={<b>LOGIN ID<span className="color-red">*</span></b>} type="text" errorMessage="Please enter a name" validate={{
                            required: { value: true },
                            // pattern: { value: '^[A-Za-z0-9]+$' },
                            // minLength: { value: 6 },
                            // maxLength: { value: 16 }
                        }} />
                        <AvField name="password" label={<b>PASSWORD<span className="color-red">*</span></b>} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                            // pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                            // minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                            // maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                        }} />
                        <Button className="btn mt-4" type="submit" style={{width:"100%"}}>Submit</Button>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
