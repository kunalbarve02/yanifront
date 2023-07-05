import axios from 'axios';
import React,{ useState, useEffect, useContext } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { userContext } from '../../App'
import CartProduct from './CartProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'
import logo from '../Navbar/Yani-Logo.png'

function Cart() {

  const user = useContext(userContext);

  const [cart, setCart] = useState([]);
  const [latch, setLatch] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [ammount,setAmmount] = useState(0);

  useEffect(() => {
    console.log(user.state.user.token);
    user.state.user.token!="" ? axios.get('https://yaniback.onrender.com/api/cart/get',
    {
      headers: {
        Authorization: 'Bearer ' + user.state.user.token
    }
    }
    )
    .then(res => {
      console.log(res.data);
      setCart(res.data);
      setAmmount(res.data.reduce((acc,curr) => acc + curr.quantity*curr.product.price,0)+30);
    }
    )
    .catch(err => {
      console.log(err);
    }):setLatch(true);
  },
  [latch])

  const loadRazorpay = () => {
  
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      displaRazorpay();
      console.log('razorpay loaded');
    }
    script.onerror = () => {
      toast.error("Error loading Razorpay",
      {
        position: "top-right",
      }
      );
    }
    document.body.appendChild(script);

  }

  const displaRazorpay = () => {
    const products = cart.map(product => {
      return {
        productId: product.product._id,
        quantity: product.quantity
      }
    })
    axios.post(`https://yaniback.onrender.com/api/order/create/${user.state.user.id}`,
    {
      order:{
        products: products,
        amount: ammount,
        address: user.state.user.address,
        user: user.state.user.id,
        paymentMethod: paymentMethod
    }
    },
    {
      headers: {
        Authorization: 'Bearer ' + user.state.user.token
      }
    }
    )
    .then(res => {
      console.log(res);
      var options = {
        key: "rzp_test_UH5DCVbI2HSrBq",
        amount: res.data.razorpayOrder.amount,
        currency: res.data.razorpayOrder.currency,
        name: "Yani",
        description: "Payment for Order",
        image: "https://s3.amazonaws.com/rzp-uploads/images/rzp.png",
        handler: function (response) {
          console.log("in handler")
          console.log("display Response",response);
          setCart([]);
          user.dispatch({type:'EMPTY_CART'});
          axios.put(`https://yaniback.onrender.com/api/order/updateTransactionId/${user.state.user.id}`,{
            orderId: res.data.order._id,
            paymentId: response.razorpay_payment_id
          },
          {
            headers: {
              Authorization: 'Bearer ' + user.state.user.token
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
        },
        prefill: {
          name: "Yani",
          email: "info.yanistore@gmail.com"
        },
        theme: {
          color: "#F7A79E"
        }
      }
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    )
  }

  const handleCheckout = () => {
    console.log(user.state.user.token);
    const products = cart.map(product => {
      return {
        productId: product.product._id,
        quantity: product.quantity
      }
    })
    if(paymentMethod !== ""){
    if(paymentMethod === "Cash on Delivery"){
    axios.post(`https://yaniback.onrender.com/api/order/create/${user.state.user.id}`,
    {
      order:{
        products: products,
        amount: ammount,
        address: user.state.user.address,
        user: user.state.user.id,
        paymentMethod: paymentMethod
    }
    },
    {
      headers: {
        Authorization: 'Bearer ' + user.state.user.token
      }
    }
    )
    .then(res => {
      console.log(res);
      setCart([]);
      user.dispatch({type:'EMPTY_CART'});
    }
    )}
  
    if(paymentMethod === "Online Payment"){

      loadRazorpay();

    }

  }else{
    toast.warning('Please select a payment method', {
      
      position: "top-right",  
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  }
  console.log(cart);
  }

  return (
  <>
    
    {
      cart.length > 0 ?
      <div className="cart p-4">
        <h2>Cart</h2>
        <Row className='justify-content-center'>
            <Col className='text-align-center' sm={1}>
              
            </Col>
            <Col className='text-align-center' sm={2}>
              
            </Col>
            <Col className='text-align-center' sm={3}>
              <h4>Product</h4>
            </Col>
            <Col className='text-align-center' sm={1}>
              <h4>Price</h4>
            </Col>
            <Col className='text-align-center' sm={3}>
              <h4>Quantity</h4>
            </Col>
            <Col className='text-align-center' sm={2}>
              <h4>Total</h4>
            </Col>
        </Row>
        <div className="cart-items">
          {
            cart.map((item,index) => (
              <>
                {
                  <CartProduct cart={cart} setCart={setCart} key={item._id} index={index} quantity={item.quantity} product={item.product} />
                }
                {
                  console.log(index)
                }
              </>
            ))
          }
        </div>
        <div className="cart-invoice" >
      <Row className='cart-total'>
        <Col className='d-flex justify-content-end' sm={6}>
          <h4>Subtotal</h4>
        </Col>
        <Col className='d-flex justify-content-start w-25' sm={6}>
          <h4>₹ {cart.length>0?cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0):null}</h4>
        </Col>
      </Row>
      <Row className='cart-total'>
        <Col className='d-flex justify-content-end' sm={6}>
          <h4>Shipping</h4>
        </Col>
        <Col className='d-flex justify-content-start w-25' sm={6}>
          <h4>₹ 30</h4>
        </Col>
      </Row>
      <Row className='cart-total'>
        <Col className='d-flex justify-content-end' sm={6}>
          <h4>Grand Total</h4>
        </Col>
        <Col className='d-flex justify-content-start px-0 w-25' sm={6}>
          <h4>₹ {cart.length>0?cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 30:null}</h4>
        </Col>
      </Row>
      <Row className='cart-total'>
        <Col className='d-flex align-items-center justify-content-end' sm={6}>
          <h4>Select Payment Option : </h4>
        </Col>
        <Col className='d-flex align-items-start justify-content-start px-0 w-25' sm={6}>
          <Form.Check
          inline
          onChange={() => {setPaymentMethod('Cash on Delivery')}}
          label="Cash on Delivery"
          name="group1"
          type={'radio'}
          className='cart-radio'
          />
          <Form.Check
            inline
            onChange={() => {setPaymentMethod('Online Payment')}}
            label="Online Payment"
            name="group1"
            type={'radio'}
            className='cart-radio'
          />
        </Col>
      </Row>
      <Row className='cart-total'>
        <Col className='d-flex justify-content-end' sm={6}>
        </Col>
        <Col className='d-flex justify-content-end' sm={6}>
          <Button className='w-50' onClick={handleCheckout} >Place Order</Button>
        </Col>
      </Row>
    </div>
      </div>:
      <div className="cart">
        <h2>Cart</h2>
        <div className="cart-items">
          <h3>No items in cart</h3>
        </div>
      </div>
    }
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
  </>
  );
}

export default Cart;
