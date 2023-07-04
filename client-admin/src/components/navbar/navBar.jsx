import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './navBarStyle.css'


function NavBar(){
    let role = useSelector((state) => state.staff.staff.staff.role)
    let [decider, setDecider] = useState({});
    const takePage = useNavigate();
    useEffect(() => {
         setDecider( (role != "admin") ? {display:"none"} : console.log("goat") )
        // console.log(role)
    }, [])


    return(
        <div className='navbar-ul' style={ decider }>
        <h2 onClick={() => takePage('/store')}>STORE</h2>
        <h2 onClick={() => takePage('/shops')}>SHOPS</h2>
        <h2 onClick={() => takePage('/staffs')}>STAFF</h2>
        <h2 onClick={() => takePage('/sales')}>SALES</h2>
        </div>
    )
}

export default NavBar;