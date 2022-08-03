import axios from 'axios';
import React,{ useContext, useEffect, useState } from 'react';
import { Button, Row, Col, CloseButton } from 'react-bootstrap';
import './CartProduct.css';
import { userContext } from '../../App';

function CartProduct({ product, quantity, setCart, cart, index, isAdmin }) {

  const [quantityState, setQuantityState] = useState(quantity);

  const { state } = useContext(userContext);

  const incrementQuantity = (e) => {
    e.preventDefault();
    setQuantityState(quantityState + 1)
    cart[index].quantity = quantityState + 1;
    setCart([...cart]);
    axios.put('https://yaniback.herokuapp.com/api/cart/updateQuantity',{
      productId: product._id,
      quantity: quantityState+1
    },
    {
      headers: {
        Authorization: 'Bearer ' + state.user.token
      }
    }
    )
  
  }

  const decrementQuantity = (e) => {
    e.preventDefault();
    setQuantityState(quantityState - 1);
    cart[index].quantity = quantityState - 1;
    setCart([...cart]);
    axios.put('https://yaniback.herokuapp.com/api/cart/updateQuantity',{
      productId: product.id,
      quantity: quantityState-1
    },{
      headers: {
        Authorization: 'Bearer ' + state.user.token
      }
    })
    
  }

  const inputQuantity = (e) => {
  
    e.preventDefault();
    e.target.value!==''?
    setQuantityState(parseInt(e.target.value)):setQuantityState(1);
    cart[index].quantity = parseInt(e.target.value);
    setCart([...cart]);
    console.log(cart);
    axios.put('https://yaniback.herokuapp.com/api/cart/updateQuantity',{
      productId: product._id,
      quantity: parseInt(e.target.value)
    },
    {
      headers: {
        Authorization: 'Bearer ' + state.user.token
      }
    })
  }
  
  const handleDeleteProd = (e) => {
    e.preventDefault();
    axios.put('https://yaniback.herokuapp.com/api/cart/delete',{
      productId: product._id
    },
    {
      headers: {
        Authorization: 'Bearer ' + state.user.token
      }
    })
    .then(res => {
      console.log(res.data);
      setCart(res.data);
    })
  }

  return (
      <Row className='cartProduct' >
        {!isAdmin?<Col sm={1} >
          <CloseButton onClick={handleDeleteProd} />
        </Col>:null}
        {!isAdmin?<Col sm={2} >
          <img width={"80px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0r0K7kHwKULivjt6xR1CUcP9NX4397GWiQ&usqp=CAU" alt="product" />
        </Col>:null}
        <Col sm={3}>
          <h4>{product.name}</h4>
        </Col>
        <Col sm={1}>
          <h5>₹ {product.price}</h5>
        </Col>
        {!isAdmin?<Col  sm={3} className='product-page-counter'>
          <Button className='counter-btn' variant='light' onClick={incrementQuantity}>+</Button>
          <input className='counter-input' type="text" value={quantityState} onChange={inputQuantity} />
          <Button className='counter-btn' variant='light' disabled={quantityState === 1} onClick={decrementQuantity}>-</Button>
        </Col>:
        <p>
            {quantityState}
        </p>}
        <Col sm={2}>
          <h5>₹ {product.price*quantityState}</h5>
        </Col>
      </Row>
  );
}

export default CartProduct;
