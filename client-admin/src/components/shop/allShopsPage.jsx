import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
            return (
                <li key={shop.id} onClick={() => takeShop(`/shops/${shop.id}`)}><p>{shop.name}</p> <p>TOTAL: {shop.bags.length}</p></li>
            )
        })

    return(
        <div>
            <h2>SHOPS</h2>
            <button onClick={() => takeShop('/shops/new')}>ADD SHOP</button>

            <ul>
                {shownShops}
            </ul>
        </div>
    )
}


export default AllShopsPage;