import axios from 'axios'
import React, { useContext } from 'react'
import { BoxArrowInRight, Envelope, Facebook, Instagram, Twitter, Whatsapp } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { userContext } from '../../App'
import './NavContact.css'

function NavContact() {

    const user = useContext(userContext)

    console.log(user)

    const handleSignout = ()=>{
        user.dispatch({
            type:'LOGOUT'
        })
        axios.get('https://yaniback.onrender.com/api/signout')
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        }
        )
    }

    return (
        <div className="contact-container w-100 px-3 justify-content-between align-items-center" >
            <div className="contact-left d-flex justify-content-center" >
                <div className="contact px-2" >
                    <Envelope className="contact-icon" size={16} />
                    <span className="contact-text" >
                        {' '}info.yani@gmail.com
                    </span>
                </div>
                <div className="contact px-2" style={{borderRight:"1px solid #EBEBEB"}}>
                    <Whatsapp className="contact-icon" size={16} />
                    <span className="contact-text" >
                        {' '}+91-9888888888
                    </span>
                </div>
            </div>
            <div className="contact-right d-flex justify-content-center" >
                {
                    user.state.isLoggedIn?
                    <div className="contact px-2" >
                        <span className="contact-text" >
                            My Account
                        </span>
                    </div>
                    :
                    null
                }
                {
                    user.state.isLoggedIn?
                    <div className="contact px-2" >
                        <span className="contact-text" >
                            Hi {user.state.user.name}
                        </span>
                    </div>
                    :
                    null
                }
                <div className="contact px-2" >
                    {
                        !user.state.isLoggedIn
                        ?
                        <Link to="/signin" style={{color:"inherit",textDecoration:"none"}} >
                            <BoxArrowInRight className="contact-icon" size={16} />
                            <span className="contact-text" >
                                {" "}Login
                            </span>
                        </Link>
                        :
                        <div onClick={handleSignout}>
                            <BoxArrowInRight className="contact-icon" size={16} />
                            <span className="contact-text" >
                                {" "}Signout
                            </span>
                        </div>
                    }
                    
                </div>
                <div style={{width:"100px"}} className="contact px-2 d-flex justify-content-between align-items-center" >
                    <Facebook style={{color:"#3b5998"}} className="contact-icon" size={16} />
                    <Twitter style={{color:"#1DA1F2"}} className="contact-icon" size={16} />
                    <Instagram style={{color:"#8a3ab9"}} className="contact-icon" size={16} />
                </div>
            </div>
        </div>
    )
}

export default NavContact
