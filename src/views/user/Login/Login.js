import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import LoginForm from './LoginForm'
import SiginForm from './SigninForm'
import bgImg from '../../../assets/css/sliderrr.jpeg'
import Particles from 'react-particles-js';

function Login() {
  const [user, setUser] = useState(true)

  return (
    <>
      <div className="container-fluid mainheight p-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),url(${bgImg})`,
          backgroundSize: "cover",
          height: "100vh",
          position:"relative"
        }}>
        <Row>
          <Col>
            {/* <Particles
              params={{
                "particles": {
                  "number": {
                    "value": 160,
                    "density": {
                      "enable": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "speed": 4,
                      "size_min": 0.3
                    }
                  },
                  "line_linked": {
                    "enable": false
                  },
                  "move": {
                    "random": true,
                    "speed": 1,
                    "direction": "top",
                    "out_mode": "out"
                  }
                },
                "interactivity": {
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "bubble"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "repulse"
                    }
                  },
                  "modes": {
                    "bubble": {
                      "distance": 250,
                      "duration": 2,
                      "size": 0,
                      "opacity": 0
                    },
                    "repulse": {
                      "distance": 400,
                      "duration": 4
                    }
                  }
                }
              }} /> */}
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
