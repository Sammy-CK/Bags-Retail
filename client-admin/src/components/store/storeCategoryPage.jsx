import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './storedCategoryPageStyle.css';
import NavBar from '../navbar/navBar';

function StoreCategoryPage(){

    const takeCategory = useNavigate();

    let token = useSelector((state) => state.staff.staff.jwt)
    const [categories, setCategories] = useState([])
    const [storedBags, setStoredBags] = useState([])

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

        //Fetching store bags
        fetch("https://bags-o7py.onrender.com/shops/1", {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    setStoredBags(data.bags);
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    let categoryBox = categories.map(category => {
     let currentlyStoredBags = category.bags.filter(bag => bag.secret_shop_key === 1)
        return(
            <li className="category-li" key={category.id} onClick={() => {
                takeCategory(`/store/category/${category.id}`)
                }}>
                <p><span style={{float:"left", paddingLeft:"10px"}}>{category.name}</span> <span style={{float:"right", paddingRight:"27px"}}>{currentlyStoredBags.length}</span></p>
            </li>
        )
    })

    return(
        <div>
            <NavBar/>
        <div className='store-div'>
        <div className='total-div'>
        <p className='totalnadd-p'>TOTAL: {storedBags.length} <button className='add-btn' onClick={() => takeCategory('/store/new')}>ADD BAG</button></p>
        </div>
        
        <h2 className='store-h2'>STORE</h2>

        <h3 className='category-h3'>CATEGORIES <button className='add-btn' onClick={() => takeCategory('/categories/new')}>+</button> </h3>
        {/* <div style={{width:"100%", textAlign:"left"}}></div> */}

        <ul className="category-ul" >
        <li className='allshop-li title-ul'><p style={{float:"left", paddingLeft:"10px"}}>CATEGORY</p> <p style={{float:"right", paddingRight:"10px"}}>TOTAL</p></li>
            {categoryBox}
        </ul>

        </div>
        </div>
        )
}

export default StoreCategoryPage;