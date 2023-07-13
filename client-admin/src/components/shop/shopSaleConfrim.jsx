import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import './shopSaleConfirmStyle.css'
import NavBar from '../navbar/navBar';

function ShopSaleConfirm(){

    let { categoryID, shopID, bagID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBag, setCategoryBag] = useState({})
    let takeConfirmPage = useNavigate()

    useEffect(() => {
        // Fetching selling bag
        fetch(`https://bags-o7py.onrender.com/bags/${bagID}`, {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    setCategoryBag(data);
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

        let [sellPrice, setSellPrice] = useState(null)

        const handleSubmit = (e) => {
                            e.preventDefault()
                            if (sellPrice){
                                let now = new Date();
                                let year = now.getFullYear();
                                let month = (now.getMonth() + 1).toString().padStart(2, '0');
                                let day = now.getDate().toString().padStart(2, '0');
                                let date = `${year}-${month}-${day}`;
                                console.log(date); // e.g. "2022-09-12"
                            //Fetching sell details for bag
                            fetch(`https://bags-o7py.onrender.com/bags/${bagID}`, {
                                method: "PATCH",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                         },
                                    body: JSON.stringify({price: +sellPrice, sold: true, sold_at: date})
                                    }).then(resp => {           
                                if (resp.ok){
                                    return resp.json().then(data => {
                                        console.log(data)
                                        alert('SOLD SUCCESSFULLY!')
                                        takeConfirmPage(`/shops/${shopID}`)

                                    })
                                }else{
                                    console.log("Thats CAP LIL'NIGGA")
                                }
                            })
                        }else{
                            alert('Set Number')
                        }
        }
    
    return(

        <div>
            <ul className='confirm-ul'>
        <li className="confirm-li" key={categoryBag.id}>
            <p className="confirm-name"> {categoryBag.name}</p> <img className="confirm-img" src={categoryBag.image_url} width="240px" height="240px"/> 
        <div className='sale-div'>
        <p className="confirm-p" >Confirm Price of Sale</p>
        <form>
            <label className='price-label' htmlFor='price'>PRICE:</label>
            <input className='price-input' type='number' name='price' value={sellPrice} onChange={(e) =>  setSellPrice(e.target.value)} />
            <button className='price-btn' type='submit' onClick={(e) => {
                e.preventDefault();
                takeConfirmPage(`/shops/${shopID}`)
                }}>Cancel</button>
            <button type='submit' onClick={handleSubmit}>Confirm</button>

        </form>
        </div>
        </li>
        </ul>
        </div>

        
    )
}

export default ShopSaleConfirm;
