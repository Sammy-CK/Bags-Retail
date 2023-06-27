import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

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
                                let date = `${now.getDate()} - ${now.getMonth() + 1} - ${now.getFullYear()}`
                            
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
        <li key={categoryBag.id}><p>name: {categoryBag.name}</p> <img src={categoryBag.image_url} width="100px" height="100px"/> 
        <p>Confirm Price of Sale</p>
        <form>
            <label htmlFor='price'>PRICE:</label>
            <input type='number' name='price' value={sellPrice} onChange={(e) =>  setSellPrice(e.target.value)} />
            <button type='submit' onClick={(e) => {
                e.preventDefault();
                takeConfirmPage(`/shops/${shopID}`)
                }}>Cancel</button>
            <button type='submit' onClick={handleSubmit}>Confirm</button>

        </form>
        </li>
        </div>

        
    )
}

export default ShopSaleConfirm;
