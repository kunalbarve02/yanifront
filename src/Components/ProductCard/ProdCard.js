import axios from 'axios'
import React,{ useState, useContext, useEffect } from 'react'
import { Card, Button, Toast, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userContext } from '../../App'
import StarRatings from 'react-star-ratings'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProdCard.css'
import EditProduct from '../Admin/edit product/EditProduct'

function ProdCard(props) {

    // get user from context api
    const user = useContext(userContext)

    const [isincart, setIsincart] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        // check weather product is in cart or not
        console.log(user.state.user);
        let productInCart = user.state.user.cart && user.state.user.cart.find(product => product.product === props.product._id);
        if(productInCart){
            setIsincart(true)
        }
    }, [])

    const [product, setProduct] = useState(props.product)

    const handleAddtoCart=()=>{
        axios.post('https://yaniback.onrender.com/api/cart/add', {
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
            console.log(res.data);
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
            <Card onClick={props.isEdit?()=>{setModalShow(true)}:null} className="card-container">
                {
                    !props.isEdit?
                    <Link to={`/shop/${product._id}`} style={{ color:"initial", textDecoration:"none", width:"100%", height:"100%" }} >
                        <div className='card-body-wrapper'>
                        <Card.Img variant="top" className="prod-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0r0K7kHwKULivjt6xR1CUcP9NX4397GWiQ&usqp=CAU" />
                        <Card.Body>
                            <Card.Text className="product-category">
                                {
                                    product.category.name
                                }
                            </Card.Text>
                            <Card.Text>
                                {
                                    product.name
                                }
                            </Card.Text>
                            <div className="prod-price-rating-container" style={{display:"flex", justifyContent:"space-between"}}>
                                <Card.Text>
                                    {
                                        `₹ ${product.price}`
                                    }
                                </Card.Text>
                                <Card.Text>
                                    <StarRatings
                                        rating={3}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="17px"
                                        starSpacing="1px"
                                    />
                                </Card.Text>
                            </div>
                            <div className="btn-container d-flex justify-content-center align-items-center" >
                        {
                          <Button disabled={isincart} onClick={handleAddtoCart} className="text-white w-75 my-3">{isincart?'In Cart':'Add to Cart'} </Button>
                        }
                    </div>
                        </Card.Body>
                        </div>
                    </Link> :
                    <>
                    <Card.Img variant="top" className="prod-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0r0K7kHwKULivjt6xR1CUcP9NX4397GWiQ&usqp=CAU" />
                        <Card.Body>
                            <Card.Text className="product-category">
                                {
                                    product.category.name
                                }
                            </Card.Text>
                            <Card.Text>
                                {
                                    product.name
                                }
                            </Card.Text>
                            <div className="prod-price-rating-container" style={{display:"flex", justifyContent:"space-between"}}>
                                <Card.Text>
                                    {
                                        `₹ ${product.price}`
                                    }
                                </Card.Text>
                                <Card.Text>
                                    <StarRatings
                                        rating={3}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="17px"
                                        starSpacing="1px"
                                    />
                                </Card.Text>
                            </div>
                            <div className="btn-container d-flex justify-content-center align-items-center" >
                        {
                          <Button disabled={isincart} onClick={handleAddtoCart} className="text-white w-75 my-3">{isincart?'In Cart':'Add to Cart'} </Button>
                        }
                    </div>
                        </Card.Body>
                        </>
                }
                
                </Card>
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
                <Modal show={modalShow} size="lg" onHide={()=>{setModalShow(false)}} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProduct setShow={setModalShow} product={product} />
                    </Modal.Body>
                </Modal>
            </>
    )
}

export default ProdCard
