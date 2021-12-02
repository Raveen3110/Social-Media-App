import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import LoginForm from './LoginForm'
import SiginForm from './SigninForm'
import bgImg from '../../../assets/css/sliderrr.jpeg'


function Login() {
  const [user, setUser] = useState(true)

  return (
    <>
      <div className="container-fluid mainheight p-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${bgImg})`,
          backgroundSize: "cover",
          height: "100vh"
        }}>
        <Row>
          <Col>
            {/* {user ? <Button onClick={() => setUser(!user)}>Goto Sign Up</Button>
              : <Button onClick={() => setUser(!user)}>Goto Login</Button>
            } */}

            {user ? <>
              <div className='form-head'>
                Login Page
              </div>
              <div className="innerpart">
                <LoginForm handler={()=>setUser(!user)}/>
              </div></>
              : <>
                <div className='form-head'>
                  Sign Up Page
                </div>
                <div className="innerpart-sign">
                  <SiginForm handlers={()=>setUser(!user)} />
                </div>
              </>}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login
