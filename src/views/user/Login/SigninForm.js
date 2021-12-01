import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Row } from 'reactstrap';

export default function SiginForm() {

const submitHandler=(e)=>{
  console.log("object",e)
}


    return (
        <>
           <Row>    
                <Col className="pl-5" md={10} sm={12}>
                    <AvForm>
                        <AvField name="name" label={<b>Name<span className="color-red">*</span></b>} type="text" errorMessage="Invalid name" validate={{
                            required: { value: true },
                            // pattern: { value: '^[A-Za-z0-9]+$' },
                            // minLength: { value: 6 },
                            // maxLength: { value: 16 }
                        }} />
                        <AvField name="number" label={<b>Mobile No.<span className="color-red">*</span></b>} type="number" errorMessage="Invalid name" validate={{
                            required: { value: true },
                            // pattern: { value: '^[A-Za-z0-9]+$' },
                            // minLength: { value: 6 },
                            // maxLength: { value: 10 }
                        }} />
                        <AvField name="email" label={<b>Email ID<span className="color-red">*</span></b>} type="email" errorMessage="Invalid name" validate={{
                            required: { value: true },
                            // pattern: { value: '^[A-Za-z0-9]+$' },
                            // minLength: { value: 6 },
                            // maxLength: { value: 18 }
                        }} />
                        
                        <AvField name="password" label={<b>PASSWORD<span className="color-red">*</span></b>} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a name' },
                            // pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                            // minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                            // maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                        }} />
                        <Button className="btn mt-4" type="submit" 
                        style={{width:"100%",backgroundColor:"orange",border:"none"}}
                        onClick={(e)=>submitHandler(e)}
                        >Register</Button>
                    </AvForm>
                </Col>
            </Row>
        </>
    );
}
