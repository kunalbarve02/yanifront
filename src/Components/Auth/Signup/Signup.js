import axios from 'axios'
import React,{ useState, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../App'
import './Signup.css'

function Signup() {

    let nav = useNavigate()

    const user = useContext(userContext)

    let[userData,setUserData]=useState({})
    let[isAlert,setIsAlert]=useState({
        msg:'',
        view:false     
    })

    const handleChange = (e)=>{

        e.preventDefault()
        let name=e.target.name
        let value=e.target.value
        setUserData({...userData,[name]:value})

    }

    const handleSubmit = (e)=>{
            
        e.preventDefault()
        console.log(userData)
        const { name, lastname,email, password, address1, address2, city, zip } = userData
        axios.post( "https://yaniback.herokuapp.com/api/signup" , { name,lastname,email, password,address:address1+" "+address2+" "+city+" "+zip } )
            .then((res)=>{
                console.log(res)
                setIsAlert({
                    msg:'User created successfully',
                    view:true
                })
                nav('/signin')
            })
            .catch((err)=>{
                console.log(err)
            })
    
    }


    return (
        <div className="w-100 h-100 signup-container d-flex flex-column justify-content-center align-items-center">

            <h1 className="signup-header mb-4" >Signup</h1>

            <Form className="w-50" onSubmit={handleSubmit}>
                <Row className='mb-3' >
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">First Name</Form.Label>
                        <Form.Control name='name' onChange={handleChange} type="text" placeholder="Enter First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">Last Name</Form.Label>
                        <Form.Control name='lastname' onChange={handleChange} type="text" placeholder="Enter Last Name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">Email</Form.Label>
                        <Form.Control name='email' onChange={handleChange} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">Password</Form.Label>
                        <Form.Control name='password' onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label style={{fontSize:"25px"}} className="text-left">Address</Form.Label>
                    <Form.Control name='address1' onChange={handleChange} placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label style={{fontSize:"25px"}} className="text-left">Address 2</Form.Label>
                    <Form.Control name='address2' onChange={handleChange} placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">City</Form.Label>
                        <Form.Control placeholder='City' onChange={handleChange} name='city' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">State</Form.Label>
                        <Form.Select defaultValue="State">
                            <option>State</option>
                            <option>MH</option>
                            <option>KA</option>
                            <option>GJ</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label style={{fontSize:"25px"}} className="text-left">Zip</Form.Label>
                    <Form.Control name='zip' onChange={handleChange} placeholder='Zip Code'/>
                    </Form.Group>
                </Row>

                <Button className="text-white w-50" variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default Signup
