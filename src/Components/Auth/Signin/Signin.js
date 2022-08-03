import React, { useState, useContext } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../App'
import axios from 'axios'
import './signin.css'

function Signin() {

    let nav = useNavigate()

    let[userData,setUserData]=useState({})
    let[isAlert,setIsAlert]=useState({
        msg:'',
        view:false     
    })

    const user = useContext(userContext)

    const handleSubmit = (e)=>{

        e.preventDefault()
        console.log(userData)
        const { email, password } = userData
        axios.post( "https://yaniback.herokuapp.com/api/signin" , { email, password } )
            .then((res)=>{
                console.log(res)
                user.dispatch({
                    type:'LOGIN',
                    payload:res.data.user
                })
                nav('/')
                window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    const handleChange = (e)=>{

        e.preventDefault()
        let name=e.target.name
        let value=e.target.value
        setUserData({...userData,[name]:value})

    }

    return (
        <div className="signin-container h-75 d-flex flex-column justify-content-center align-items-center ">
            <h1 className="signin-header mb-5">Sign-In</h1>
            <Form onSubmit={handleSubmit} className="w-50">

                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label style={{fontSize:"25px"}}>Email address</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label style={{fontSize:"25px"}}>Password</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
                    </FloatingLabel>
                </Form.Group>

                <Button variant="primary" type="submit" className="text-white">
                    Sign-In
                </Button>
                
            </Form>
            <p className="mt-4">
                Don't have an account? <Link to="/signup"> Sign-Up </Link>
            </p>
        </div>
    )
}

export default Signin
