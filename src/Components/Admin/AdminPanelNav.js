import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Row, Nav } from 'react-bootstrap';
import { userContext } from '../../App';
import './AdminPanel.css';

function AdminPanelNav()
{
    return(
        <div>
            <Nav className="justify-content-around mt-5 admin-nav" activeKey={window.location.href}>
                <Nav.Item>
                    <Nav.Link className='admin-nav-link' href="/adminpanel">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='admin-nav-link' href="/adminpanel/products/edit">Edit Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='admin-nav-link' href="/adminpanel/products/add">Add Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='admin-nav-link' href="/adminpanel/categories/edit">Edit Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='admin-nav-link' href="/adminpanel/categories/add">Add Categories</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default AdminPanelNav;