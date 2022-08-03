import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Col, Row, Nav, Table, Modal } from 'react-bootstrap';
import { userContext } from '../../App';
import './AdminPanel.css';
import AdminPanelNav from './AdminPanelNav';
import OrderItem from './OrderItem';

function AdminPanel()
{

    const { state } = useContext(userContext);

    console.log(state.user.token);

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [latch, setLatch] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        state.user.token!==""?axios.get(`https://yaniback.herokuapp.com/api/order/all/${state.user.id}`,{
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }         
        })
        .then(res => {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch(err => {
            console.log(err.error);
        }
        ):setLatch(true);
    }, 
    [latch]);

    const showModal=(order)=>{
        setOrder(order);
        setShow(true);
    }

    return(
        <>
            <AdminPanelNav/>
            <div className="orders-container p-4">
               <h1>Orders</h1>
                <div className="orders-table">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                return(
                                    <tr onClick={()=>{showModal(order)}} key={order._id}>
                                        <td>{order.transaction.paid?order.transaction.paymentId:"Not Paid"}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.amount}</td>
                                        <td>{order.status}</td>
                                        <td>{order.createdAt.split('T')[0]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div> 
            <Modal size='lg' className='admin-modal' show={show} onHide={()=>{setShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderItem order={order}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminPanel;