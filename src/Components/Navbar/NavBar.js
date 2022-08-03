import React,{ useContext } from 'react'
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import { Cart, Search, BoxArrowInRight } from 'react-bootstrap-icons'
import './Navbar.css'
import NavContact from './NavContact'
import logo from './Yani-Logo.png'
import { userContext } from '../../App'

function NavBar() {

    const user = useContext(userContext);

    return (
        <>
            <NavContact/>
            <Navbar className='navbar-container' sticky='top' collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><img className='nav-logo' width={200} height={100} src={logo}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link className="navbar-link" href="/">Home</Nav.Link>
                            <Nav.Link className="navbar-link" href="/shop">Shop</Nav.Link>
                            <Nav.Link className="navbar-link" href="/">Contact us</Nav.Link>
                            {
                                user.state.user.role&&user.state.user.role===1?
                                <Nav.Link className="navbar-link" href="/adminpanel">Admin Panel</Nav.Link>
                                :
                                null
                            }
                        </Nav>
                        <Nav>
                            <Nav.Link href="/cart"><Cart size={30}/> <span>Cart</span></Nav.Link>
                            <Nav.Link className="d-lg-none" href="/signin" >
                                <BoxArrowInRight className="contact-icon" size={20} />
                                <span className="contact-text" >
                                    {' '}Login
                                </span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
