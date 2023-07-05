//create a react functional component

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { userContext } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanelNav from '../AdminPanelNav';

function EditCategories(props)
{

    const {state} = useContext(userContext);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        axios.get(`https://yaniback.onrender.com/api/categories`)
        .then(res => {
            console.log(res.data)
            setCategories(res.data);
        })
    }, []);

    const handleCategorySelect = (category) => {
        console.log(category);
        setCategory(category.name);
        setSelectedCategory(category);
    }

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(categoryName === ''|| categoryName === null)
        {
            toast.error(`Please enter a category name!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            return;
        }
        else if(selectedCategory === undefined|| selectedCategory === null)
        {
            toast.error(`Please select a category!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            return;
        }
        console.log(categoryName);
        axios.put(`https://yaniback.onrender.com/api/category/${selectedCategory._id}/${state.user.id}`, {name: categoryName},
        {
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }
        }
        )
        .then(res => {
            toast.success(`Category ${res.data.cate.name} updated!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            console.log(res.data)
            setCategory('');
            setSelectedCategory();
        })
    }

    return(
        <>
            <AdminPanelNav/>
            <div className='p-4 w-75'>
                <h1>Edit Categories</h1>

                <DropdownButton variant='light' id="dropdown-basic-button" className='w-50' title={category||"Select Category"}>
                    {categories.map(category => (
                        <Dropdown.Item onClick={() => handleCategorySelect(category)}>{category.name}</Dropdown.Item>
                    ))}
                </DropdownButton>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control name='name' onChange={handleChange} value={categoryName} size="lg" type="text" placeholder="Edit Category Name" />
                    <Row className='mt-3'>
                        <Col sm={8}>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="primary" type="submit"> Edit Category </Button>
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

export default EditCategories