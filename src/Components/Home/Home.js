import React, { useContext } from 'react'
import './Home.css'
import ProdCard from '../ProductCard/ProdCard'
import { userContext } from '../../App'

function Home() {

    const user = useContext(userContext)

    console.log(user)

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center" >
        </div>
    )
}

export default Home
