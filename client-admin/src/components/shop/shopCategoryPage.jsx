import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './shopCategoryPageStyle.css'
import NavBar from '../navbar/navBar';


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
            <li className="category-li" key={category.id} onClick={() => {
                takeCategory(`/shops/${shopID}/categories/${category.id}`)
                }}>
                <p style={{float:"left", paddingLeft:"10px"}}>{category.name}</p><p style={{float:"right", paddingRight:"27px"}}>{currentlyShopBags.length}</p>
            </li>
        )
    })

    return(
        <div>
        <NavBar />
        <button onClick={() => takeCategory('/shops')}>ALL SHOPS</button>
        <h2 style={{float:"left", paddingLeft:"10px"}}>{shopName}</h2>
        <p style={{float:"right", paddingRight:"10px"}}>TOTAL: {shopBags.length}</p>
        <h3 style={{clear:"both"}} className='category-h3'>CATEGORIES</h3>
        <ul className="category-ul" >
        <li className='allshop-li title-ul'><p style={{float:"left", paddingLeft:"10px"}}>CATEGORY</p> <p style={{float:"right", paddingRight:"10px"}}>TOTAL</p></li>
            {categoryBox}
        </ul>

        </div>
        )
}

export default ShopCategoryPage;