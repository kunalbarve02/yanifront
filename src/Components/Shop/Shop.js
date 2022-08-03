import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Dropdown, DropdownButton, Form, Toast } from 'react-bootstrap'
import ProdCard from '../ProductCard/ProdCard'
import 'rc-slider/assets/index.css';
import './Shop.css'
import { Slider } from '@mui/material';
import AdminPanelNav from '../Admin/AdminPanelNav';

function Shop({ isEdit }) {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const [dd1, setdd1] = useState('Default Sorting')
    const [dd2, setdd2] = useState('Any Rating')

    const [priceRange, setPriceRange] = useState([0, 2000])

    const [show, setShow] = useState(false)

    const [filter,setFilter] = useState({
        minPrice: 0,
        maxPrice: 2000,
        rating: 0,
        category: [],
        sort: 'Default Sorting',
    })

    const callFilterApi = () => {
        console.table(filter)
        axios.get('https://yaniback.herokuapp.com/api/products/filter', {
            params: {
                filter: filter
            }})
        .then(res => {
            console.log(res.data)
            setProducts(res.data)
        }
        )
        .catch(err => {
            console.log(err)
        })
    }

    const colors=[
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
        'black'
    ]

    useEffect(() => {

        document.title = 'Shop'
        axios.get('https://yaniback.herokuapp.com/api/products')
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        axios.get('https://yaniback.herokuapp.com/categories')
        .then(res => {
            const cat = res.data.map(cat => {
                cat.checked = false
                return cat
            })
            setCategories(cat)
            setFilter({...filter, category: cat})
        }
        )
        .catch(err => {
            console.log(err)
        })

    },[])

    const handledd1Select = (e) => {
        setdd1(e)
        setFilter({...filter, sort: e})
        callFilterApi()
    }

    const handledd2Select = (e) => {
        setdd2(e)
        setFilter({
            ...filter,
            rating: e === 'Any Rating' ? 0 : parseInt(e[0])
        })
        callFilterApi()
    }

    const handleRangeChange = (e) => {
        setPriceRange(e.target.value)
        setFilter({
            ...filter,
            minPrice: e.target.value[0],
            maxPrice: e.target.value[1]
        })

        callFilterApi()
    }

    const handleCategoryChange = (category) => {
        const newArr = categories.map(cat=>{
            if(cat._id == category)
            {
                cat.checked = !cat.checked
            }
            return cat
        })
        setCategories(newArr)
        console.log(newArr)
        setFilter({
            ...filter,
            //include every item in newArr into filter.category where checked is true
            category: newArr
        })
        callFilterApi()
    }

    return (
        <>
        <div>
            {
                isEdit ?
                <AdminPanelNav/>
                :
                null
            }
            <h1>Shop</h1>
            <Row className="p-3">
                <Col className="filter-container" lg={3}>

                    <span className="filter-text">Filter By Price</span>
                    <div className='ranger-container'>
                        <Slider
                            value={priceRange}
                            onChange={handleRangeChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={priceRange => `${priceRange[0]} - ${priceRange[1]}`}
                            min={0}
                            max={2000}
                        />
                        <span>
                            &#8377; {priceRange[0]} - &#8377; {priceRange[1]}
                        </span>
                    </div>

                    <span className="filter-text">Filter By Categories</span>
                    <div  className='categories-container' >
                        {
                            categories.map( category=> (
                                <p>
                                    <Form.Group onChange={()=>{handleCategoryChange(category._id)}} className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label={category.name} />
                                    </Form.Group>
                                </p>
                            ))
                        }
                    </div>
                    
                    <span className="filter-text">Filter By Color</span>
                    <div  className='categories-container' >
                        {
                            colors.map(color => (
                                <p>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label={color} />
                                    </Form.Group>
                                </p>
                            ))
                        }
                    </div>
                </Col>
                <Col className="shop-products-container" >
                    <Container className="shop-sort">
                        <p>
                            Showing {products.length} products
                        </p>
                        <div className='dropdown-container'>
                            <DropdownButton variant="light" title={dd1} onSelect={handledd1Select} className="sort-dd">

                                <Dropdown.Item eventKey={"Default Sorting"}> Default Sorting </Dropdown.Item>
                                <Dropdown.Item eventKey={"Price: High to Low"}> Price: High to Low </Dropdown.Item>
                                <Dropdown.Item eventKey={"Price: Low to High"}> Price: Low to High </Dropdown.Item>

                            </DropdownButton>

                            <DropdownButton variant="light" title={dd2} onSelect={handledd2Select} className="sort-dd">

                                <Dropdown.Item eventKey={"Any Rating"}> Any Rating </Dropdown.Item>
                                <Dropdown.Item eventKey={"1 Star"}> 1 Star </Dropdown.Item>
                                <Dropdown.Item eventKey={"2 Star"}> 2 Star </Dropdown.Item>
                                <Dropdown.Item eventKey={"3 Star"}> 3 Star </Dropdown.Item>
                                <Dropdown.Item eventKey={"4 Star"}> 4 Star </Dropdown.Item>
                                <Dropdown.Item eventKey={"5 Star"}> 5 Star </Dropdown.Item>

                            </DropdownButton>
                        </div>
                    </Container>
                    <Row>
                        
                        {
                            products.map(product => (
                                <Col className="my-2 shop-product" key={product.id} xl={4} lg={4}>
                                    <ProdCard  toast={setShow} isEdit={isEdit} key={product._id} product={product} />
                                </Col>
                            ))
                        }

                    </Row>

                </Col>
                
            </Row>
        </div>
        </>
    )

}

export default Shop
