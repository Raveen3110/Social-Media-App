import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import LoginForm from './LoginForm'
import SiginForm from './SigninForm'
import bgImg from '../../../assets/image/Backgroung.png'
import ReactPracticles from '../../../common/ReactPracticles'

function Login() {
  const [user, setUser] = useState(true)

  return (
    <>
      <div className="container-fluid mainheight p-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),url(${bgImg})`,
          backgroundSize: "cover",
          height: "100vh",
        }}>
        <Row>
          <Col>
          {/* <ReactPracticles/> */}
            {user ? <div className='login-page'>
              <div className='form-head'>
                Login Page
              </div>
              <div className="innerpart">
                <LoginForm handler={() => setUser(!user)} />
              </div></div>
              : <>
                <div className='form-head'>
                  Sign Up Page
                </div>
                <div className="innerpart-sign">
                  <SiginForm handlers={() => setUser(!user)} />
                </div>
              </>}
          </Col>
        </Row>
      </div>
      
    </>
  )
}

export default Login
