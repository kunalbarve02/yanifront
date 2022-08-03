import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import { userContext } from '../../App'
import 'react-toastify/dist/ReactToastify.css';
import './ProductPage.css';

function ProductPage() {

    const { productId } = useParams();

    const user = useContext(userContext);

    const [ product, setProduct ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ isincart, setIsincart ] = useState(false);

    useEffect(() => {
        axios.get(`https://yaniback.herokuapp.com/api/product/${productId}`)
        .then(res=>{
            setProduct(res.data)
            console.log(user.state.user.cart)
            console.log(product._id)
            let productInCart = user.state&&user.state.user&&user.state.user.cart.find(p => p.product === product._id);
            console.log(productInCart);
            if(productInCart){
                setIsincart(true)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    

    console.log(quantity)

    const handleAddtoCart=()=>{
        axios.post('https://yaniback.herokuapp.com/api/cart/add', {
        productId: product._id,
        quantity: 1
        },
        {
            headers: {
                Authorization: 'Bearer ' + user.state.user.token
            }
        }
        )
        .then(res => {
            setIsincart(true)
            user.dispatch({type:"UPDATE_CART", payload: res.data})
            toast.success(`Added ${product.name} to Cart!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                });
            }
        )
        .catch(err => {
            console.log(err)
        }
        )
    }

    return (
        <>
            <div className='product-page-container d-flex justify-content-start p-5 w-100' >
                <div className='product-img-container'>
                    <img className='w-50 h-75' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0r0K7kHwKULivjt6xR1CUcP9NX4397GWiQ&usqp=CAU' />
                </div>
                <div className='product-details-container d-flex flex-column justify-content-center align-items-start '>
                    <h2>
                        {product.name}
                    </h2>
                    <StarRatings
                        rating={3}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        starDimension="22px"
                        starSpacing="1px"
                    />
                    <p>               
                        ₹ {product.price}
                    </p>
                    <p>
                        {product.description}
                    </p>
                    <div className="product-page-counter" >
                        <label htmlFor='quantity'>Quantity : </label>
                        <Button className='counter-btn' variant='light' onClick={()=>{setQuantity(quantity+1)}}>+</Button>
                        <input className='counter-input' type="text" value={quantity} onChange={(e)=>{e.target.value!==''?
                        setQuantity(parseInt(e.target.value)):
                        setQuantity(0)}} />
                        <Button className='counter-btn' variant='light' onClick={()=>{{setQuantity(quantity-1)}}}>-</Button>
                    </div>
                    <Button disabled={isincart} onClick={handleAddtoCart} className="text-white w-50 my-3">
                        {!isincart?(<><Cart className='mb-1'/> Add to Cart </>):" In Cart "} 
                    </Button>
                </div>
            </div>
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

export default ProductPage;
