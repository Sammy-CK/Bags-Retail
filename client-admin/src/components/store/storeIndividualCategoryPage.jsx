import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import './storeIndividualCategoryPageStyle.css'
import NavBar from '../navbar/navBar';

function StoreIndividualCategoryPage(){
    const takeCategoryBag = useNavigate();

    let { categoryID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBags, setCategoryBags] = useState([])
    let [categoryName, setCategoryName] = useState("");
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
                    setCategoryBags(data.bags.filter(bag => bag.secret_shop_key === 1));
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    let shownCategoryBags = categoryBags.map(categoryBag => {
        return(
        <li className="bags-li" key={categoryBag.id}><p className="bags-name">{categoryBag.name}</p> <img className="bags-img" src={categoryBag.image_url} width="220px" height="220px"/> <button className="bags-btn" onClick={() => takeCategoryBag(`/store/category/${categoryID}/bags/${categoryBag.id}`)}>ASSIGN</button></li>
        )
    })
    
    return(

        <div>
            <NavBar/>
            <h2>STORE</h2>
            <h3>{categoryName}</h3>
            <p className='total-individual'>TOTAL: {categoryBags.length}</p>
            <ul className='bags-ul'>
            {shownCategoryBags}
            </ul>
        </div>

        
    )
}

export default StoreIndividualCategoryPage;
