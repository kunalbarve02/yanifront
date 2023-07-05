import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { userContext } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanelNav from '../AdminPanelNav';

function AddCategory()
{

    const {state} = useContext(userContext);

    const [category, setCategory] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://yaniback.onrender.com/api/category/create/${state.user.id}`, {
            name: category
        },
        {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        })
        .then(res => 
        {
            console.log(res.data);
            toast.success(`Category ${category} added!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        })
        .catch(err => 
        {
            console.log(err);
        })
    }

    return (
        <>
        <AdminPanelNav/>
        <div className='p-4'>
            <h1>Add Category</h1>
            <Form onSubmit={handleSubmit}>
                <Row className='w-75 mt-4' >
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control onChange={(e)=>{setCategory(e.target.value)}} type="text" placeholder="Enter Category Name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col lg={7}>

                    </Col>
                    <Col>
                        <Button variant="primary" type="submit"> Add Category </Button>
                    </Col>
                </Row>
            </Form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        </>
    )
}

export default AddCategory;