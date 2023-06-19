import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


function ShopCategoryPage(){

    let {shopID} = useParams();
    const takeCategory = useNavigate();

    let token = useSelector((state) => state.staff.staff.jwt)
    const [categories, setCategories] = useState([])
    const [shopBags, setShopBags] = useState([])
    const [shopName, setShopName] = useState("")

    useEffect(() => {
        // Fetching categories
        fetch("https://bags-o7py.onrender.com/categories", {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    // setCategories(data.map(category => {category.bags.filter(bag => bag.shop_id === 1)}));
                    setCategories(data)
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

        //Fetching shop bags
        fetch(`https://bags-o7py.onrender.com/shops/${shopID}`, {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    
                    setShopBags( data.bags.filter(bag => (bag.sold === false) ) );
                setShopName(data.name)
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    let categoryBox = categories.map(category => {
     let currentlyShopBags = category.bags.filter(bag => (bag.secret_shop_key === +shopID && bag.sold == false) )
    //  console.log(currentlyShopBags)
        return(
            <li key={category.id} onClick={() => {
                takeCategory(`/shops/${shopID}/categories/${category.id}`)
                }}>
                <p>{currentlyShopBags.length}</p><p>{category.name}</p>
            </li>
        )
    })

    return(
        <div>
        <h2>{shopName}</h2>
        <p>TOTAL: {shopBags.length}</p>
        <h3>CATEGORIES</h3>
        <ul>
            {categoryBox}
        </ul>

        </div>
        )
}

export default ShopCategoryPage;