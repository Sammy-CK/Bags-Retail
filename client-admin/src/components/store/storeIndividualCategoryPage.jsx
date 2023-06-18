import { React, useState, useEffect, useParams } from 'react';
import { useSelector } from 'react-redux'

function StoreIndividualCategoryPage(){

    let { categoryID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBags, setCategoryBags] = useState([])
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
                    setCategoryBags(data.bags);
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])
    
    return(

        <div>
            
        </div>

        
    )
}

export default StoreIndividualCategoryPage;