import axios from 'axios';
import React,{ useState, useContext } from 'react'
import { DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import CartProduct from '../Cart/CartProduct';
import { userContext } from '../../App';

function OrderItem(props) {

    const {state} = useContext(userContext);

    const [order, setOrder] = useState(props.order);
    const [products, setProducts] = useState(props.order.products);
    const [orderStatus, setOrderStatus] = useState(props.order.status);

    const handleSelect = (e)=> {

        setOrderStatus(e);

        axios.put(`https://yaniback.herokuapp.com/api/order/${order.id}/status/${state.user.id}`, {
            status: e,
            oderId: order._id
        },{
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }
        })
        .then(res => {
            console.log(res.data);
            setOrder(res.data);
        })
        .catch(err => {
            console.log(err.error);
        })
    }

    return (
        <div>
            <div className='w-100'>
                <p>
                    From : {order.user.name} {order.user.lastname}
                </p>
                <p>
                    E-mail : {order.user.email}
                </p>
                <p>
                    Address : {order.address}
                </p>
                <p>
                    Total : {order.amount}
                </p>
                <label>
                    Status :
                </label>
                <DropdownButton onSelect={handleSelect} variant='light' id="dropdown-basic-button" className='w-50' title={orderStatus||"Select Status"}>

                    <Dropdown.Item eventKey="Cancelled">
                        Cancelled
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Delivered">
                        Delivered
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Shipped">
                        Shipped
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Processing">
                        Processing
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Recieved">
                        Recieved
                    </Dropdown.Item>

                </DropdownButton>
            </div>
            <div className='w-100'>
                <Row>
                    <Col>
                        Name
                    </Col>
                    <Col>
                        Price
                    </Col>
                    <Col>
                        Quantity
                    </Col>
                    <Col>
                        Total
                    </Col>
                </Row>
            {
                products.map(product => {
                    return(
                        <>
                            <Row>
                                <Col>
                                    {product.productId.name}
                                </Col>
                                <Col>
                                    {product.productId.price}
                                </Col>
                                <Col>
                                    {product.quantity}
                                </Col>
                                <Col>
                                    {product.productId.price * product.quantity}
                                </Col>
                            </Row>
                        </>
                    )
                }
                )
            }
            </div>

        </div>
    )
}

export default OrderItem