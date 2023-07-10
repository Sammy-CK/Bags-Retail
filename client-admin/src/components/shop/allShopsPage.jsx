import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './allShopsPageStyle.css'
import NavBar from '../navbar/navBar';


function AllShopsPage(){

    const takeShop = useNavigate();

    let token = useSelector((state) => state.staff.staff.jwt)
    let [shops, setShops] = useState([]);

    useEffect(() => {

        //Fetching store bags
        fetch("https://bags-o7py.onrender.com/shops", {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    setShops(data);
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

        let shownShops = shops.filter(shop => shop.id !== 1).map(shop => {
            let notSoldBages = shop.bags.filter( bag => (bag.sold === false) )
            return (
                <li className='allshop-li' key={shop.id} onClick={() => takeShop(`/shops/${shop.id}`)}><p style={{float:"left", paddingLeft:"10px"}}>{shop.name}</p> <p style={{float:"right", paddingRight:"27px"}}>{notSoldBages.length}</p></li>
            )
        })

    return(
        <div>
            <NavBar />
            <h2>SHOPS</h2>
            <button className='addshop-btn' onClick={() => takeShop('/shops/new')}>ADD SHOP</button>

            <ul className='allshop-ul'>
            <li className='allshop-li title-ul'><p style={{float:"left", paddingLeft:"10px"}}>SHOP</p> <p style={{float:"right", paddingRight:"10px"}}>TOTAL</p></li>
                {shownShops}
            </ul>
        </div>
    )
}


export default AllShopsPage;