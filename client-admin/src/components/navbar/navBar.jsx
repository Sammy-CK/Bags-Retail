import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NavBar(){

    const takePage = useNavigate();


    return(
        <div>
        <h2 onClick={() => takePage('/store')}>STORE</h2>
        <h2 onClick={() => takePage('/shops')}>SHOPS</h2>
        <h2 onClick={() => takePage('/staffs')}>STAFF</h2>
        <h2 onClick={() => takePage('/sales')}>SALES</h2>
        </div>
    )
}

export default NavBar;