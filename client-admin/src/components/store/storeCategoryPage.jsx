import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


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
                    setCategories(data.map(category => {category.bags.filter(bag => bag.shop_id === 1)}));
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
        return(
            <li onClick={() => {
                takeCategory(`/store/category/${category.id}`)
                }}>
                <p>{category.bags.length}</p><p>{category.name}</p>
            </li>
        )
    })

    return(
        <div>
        <h2>STORE</h2>
        <p>TOTAL: {storedBags.length}</p>
        <h3>CATEGORIES</h3>
        <ul>
            {categoryBox}
        </ul>

        </div>
        )
}

export default StoreCategoryPage;