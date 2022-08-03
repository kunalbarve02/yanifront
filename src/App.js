import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Signin from './Components/Auth/Signin/Signin';
import Signup from './Components/Auth/Signup/Signup';
import NavBar from './Components/Navbar/NavBar';
import Home from './Components/Home/Home' 
import React, { createContext, useEffect } from 'react';
import Shop from './Components/Shop/Shop';
import ProductPage from './Components/Product/ProductPage';
import AdminPanel from './Components/Admin/AdminPanel';
import AddProduct from './Components/Admin/add products/AddProduct';
import AddCategory from './Components/Admin/add category/AddCategory';
import EditCategories from './Components/Admin/edit categories/EditCategories';

export const userContext = createContext(null)

const initialState = {
  isLoggedIn: false,
  user: {
    id: '',
    email: '',
    token: '',
    name:"",
    role: null
  }
}

const reducer = (state, action) => {

  switch (action.type) 
  {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload
        }
      case 'LOGOUT':
        sessionStorage.removeItem('user')
        return {
          initialState,
        }
      case 'UPDATE_CART':
        console.log(state.user)
        sessionStorage.setItem('user', JSON.stringify({
          id: state.user.id,
          email: state.user.email,
          token: state.user.token,
          name: state.user.name,
          role: state.user.role,
          address: state.user.address,
          cart: action.payload.cart
        }))
        return {
          ...state,
          user: {
            id: state.user.id,
            email: state.user.email,
            token: state.user.token,
            name: state.user.name,
            role: state.user.role,
            address: state.user.address,
            cart: action.payload.cart
          }
        }
      case 'EMPTY_CART':
        sessionStorage.setItem('user', JSON.stringify({
          id: state.user.id,
          email: state.user.email,
          token: state.user.token,
          name: state.user.name,
          role: state.user.role,
          address: state.user.address,
          cart: []
        }))
        return {
          ...state,
          user: {
            id: state.user.id,
            email: state.user.email,
            token: state.user.token,
            name: state.user.name,
            role: state.user.role,
            address: state.user.address,
            cart: []
          }
        }
      default:
        return state
  }
}

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    }
  },[])

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <div className="App w-100 h-100">
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/shop/:productId" element={<ProductPage/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/adminpanel" element={<AdminPanel/>} />
            <Route path="/adminpanel/products/add" element={<AddProduct/>} />
            <Route path="/adminpanel/products/edit" element={<Shop isEdit={true}/>} />
            <Route path="/adminpanel/categories/add" element={<AddCategory/>} />
            <Route path="/adminpanel/categories/edit" element={<EditCategories/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
