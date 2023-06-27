import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

function ShopIndividualCategoryPage(){

    let { categoryID, shopID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBags, setCategoryBags] = useState([])
    let [categoryName, setCategoryName] = useState("");
    const [shopName, setShopName] = useState("")
    let takeConfirmPage = useNavigate()

    useEffect(() => {
        // Fetching category's bags
        fetch(`https://bags-o7py.onrender.com/categories/${categoryID}`, {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    setCategoryName(data.name);
                    setCategoryBags(data.bags.filter(bag => (bag.secret_shop_key === +shopID && bag.sold == false) ));
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

                //Fetching shop name
                fetch(`https://bags-o7py.onrender.com/shops/${shopID}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                             }
                        }).then(resp => {           
                    if (resp.ok){
                        return resp.json().then(data => {
                            console.log(data)
                            setShopName(data.name)
                        })
                    }else{
                        console.log("Thats CAP LIL'NIGGA")
                    }
                })

    }, [])

    let shownCategoryBags = categoryBags.map(categoryBag => {
        return(
        <li key={categoryBag.id}><p>name: {categoryBag.name}</p> <img src={categoryBag.image_url} width="100px" height="100px"/> <button onClick={() => {
            takeConfirmPage(`/shops/${shopID}/categories/${categoryID}/bags/${categoryBag.id}/confirm`)
        }}>SELL</button> </li>
        )
    })
    
    return(

        <div>
            <h2>{shopName}</h2>
            <h3>{categoryName}</h3>
            <p>TOTAL: {categoryBags.length}</p>
            <ul>
            {shownCategoryBags}
            </ul>
        </div>

        
    )
}

export default ShopIndividualCategoryPage;
