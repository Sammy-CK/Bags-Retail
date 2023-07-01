import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import './shopIndividualCategoryPageStyle.css'

function ShopIndividualCategoryPage(){

    let { categoryID, shopID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBags, setCategoryBags] = useState([])
    let [categoryName, setCategoryName] = useState("");
    const [shopName, setShopName] = useState("")

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
        <li className="bags-lis" key={categoryBag.id}><p className="bags-name">name: {categoryBag.name}</p> <img className="bags-img" src={categoryBag.image_url} width="220px" height="220px"/> </li>
        )
    })
    
    return(

        <div>
            <h2>{shopName}</h2>
            <h3>{categoryName}</h3>
            <p className='total-individual'>TOTAL: {categoryBags.length}</p>
            <ul className='bags-ul'>
            {shownCategoryBags}
            </ul>
        </div>

        
    )
}

export default ShopIndividualCategoryPage;
