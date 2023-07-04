import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './storeAssignBagShopPageStyle.css'
import NavBar from '../navbar/navBar';

function StoreAssignBagShopPage(){

    const [selectedShop, setSelectedShop] = useState(null);

    const handleShopSelection = (event) => {
        console.log(event.target.value)
        setSelectedShop(event.target.value);

      };


    const takeToAssignOrNotToAssign = useNavigate();

    let { categoryID, bagID } = useParams();


    let token = useSelector((state) => state.staff.staff.jwt)

    let [currentShops, setCurrentShops] = useState([]);
    useEffect(() => {

        // Fetch current shops
        fetch(`https://bags-o7py.onrender.com/shops`, {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)

                    setCurrentShops(data.filter(shop => shop.id !== 1 ));
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    let choiceShopForBag = currentShops.map(shop => {
        return(
            <div className='choice-li' key={shop.id}>
            <input type="radio" id="html" name="fav_language" value={shop.id} onChange={handleShopSelection} />
                <label htmlFor="html">{shop.name}</label>
            </div>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ndio kuondoka")
            // Fetch assigning current bag from store to shop
            if (selectedShop) {

            fetch(`https://bags-o7py.onrender.com/bags/${bagID}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                         },
                body: JSON.stringify({ shop_id: `${selectedShop}`, secret_shop_key: `${selectedShop}`})
                    }).then(resp => {           
                if (resp.ok){
                    return resp.json().then(data => {
                        console.log(data)
                        alert("Updated Successfully")
                        takeToAssignOrNotToAssign(`/store/category/${categoryID}`)
    
                    })
                }else{
                    alert("Please Select Shop")
                }
            })
        }else{
                    alert("Please Select Shop")
        }
        }


    return(
        <div>
            <NavBar/>
        <div className='choice-div'>
            <h3>CHOOSE SHOP</h3>
            <form className='assign-form'>
            {choiceShopForBag}
            <button onClick={(e) => {
                e.preventDefault();
                takeToAssignOrNotToAssign(`/store/category/${categoryID}`)
        }}>Cancel</button>
            <button onClick={handleSubmit}>Confirm</button>
            </form>

        </div>
        </div>
    )
}

export default StoreAssignBagShopPage;