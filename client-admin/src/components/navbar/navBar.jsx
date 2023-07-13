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
        <ul className='navbar-ul' style={ decider }>
        <li className='mutia' onClick={() => takePage('/store')}>STORE</li>
        <li className='mutia' onClick={() => takePage('/shops')}>SHOPS</li>
        <li className='mutia' onClick={() => takePage('/staffs')}>STAFF</li>
        <li className='mutia' onClick={() => takePage('/sales')}>SALES</li>
        </ul>
    )
}

export default NavBar;