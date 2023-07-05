import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { userContext } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = (props) => {

    const {state} = useContext(userContext);

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(props.product);
    const [category, setCategory] = useState(props.product.category.name)

    useEffect(() => {
        document.title = 'Edit Product';
        axios.get('https://yaniback.onrender.com/api/categories')
        .then(res => {
        console.log(res.data)
        setCategories(res.data);
        })
    }, []); 

    const handleCategorySelect = (category) => {
        console.log(category);
        const { name } = categories.find(cat => {
        return cat._id === category
        }
        )
        setCategory(name);
        setProduct({...product, category: category})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
    
        let productForm = new FormData();
        productForm.append('name', product.name);
        productForm.append('description', product.description);
        productForm.append('price', product.price);
        productForm.append('category', product.category);
        productForm.append('stock', product.stock);
        productForm.append('image', product.image);
    
        axios.put(`https://yaniback.onrender.com/api/product/${product._id}/${state.user.id}`, productForm,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${state.user.token}`
          }
        })
        .then(res => {
          console.log(res.data)
          setProduct(res.data.product)
          toast.success(`Product ${res.data.product.name} updated!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
            props.setShow(false)
        })
        .catch(err => {
          console.log(err)
        })
      }
    
    const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setProduct({
        ...product,
        [e.target.name]: e.target.value
    })
    }

    return (
    <div>
        <Form onSubmit={handleSubmit} className='h-100'>
            <Row>
                <Col>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control name='name' onChange={handleChange} value={product.name} size="lg" type="text" placeholder="Name" />
                </Col>
                <Col>
                <Form.Label>Product Decription</Form.Label>
                <Form.Control name='description' onChange={handleChange} value={product.description} size="lg" type="text" placeholder="Description" />
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Label>Product Price</Form.Label>
                <Form.Control name='price' onChange={handleChange} value={product.price} size="lg" type="number" placeholder="Price" />
                </Col>
                <Col>
                <Form.Label>Product Category</Form.Label>
                <DropdownButton onSelect={handleCategorySelect} variant="light" title={category||"Select Category"} className="w-100">
                    {
                    categories.map(category => {
                        return (
                        <Dropdown.Item eventKey={category._id} key={category._id}> {category.name} </Dropdown.Item>
                        )
                    })
                    }
                </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Label>Product Stock</Form.Label>
                <Form.Control name='stock' value={product.stock} onChange={handleChange} size="lg" type="number" placeholder="Stock" />
                </Col>
                <Col>
                <Form.Label>Photo</Form.Label>
                <Form.Control name='photo' onChange={handleChange} size="lg" type='file' placeholder="Photo" />
                </Col>
            </Row>
            <Row>
                <Col>
                
                </Col>
                <Col className='d-flex justify-content-end align-items-center mt-4'>
                <Button variant="primary" className='w-50' type="submit">Update Product</Button>
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
    )
}

export default EditProduct;