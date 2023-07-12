import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import './shopIndividualCategoryPageStyle.css'
import NavBar from '../navbar/navBar';

function ShopIndividualCategoryPage(){

    let { categoryID, shopID } = useParams();
    let token = useSelector((state) => state.staff.staff.jwt)
    let [categoryBags, setCategoryBags] = useState([])
    let [categoryName, setCategoryName] = useState("");
    const [shopName, setShopName] = useState("")
    let takeConfirmPage = useNavigate()
    let role = useSelector((state) => state.staff.staff.staff.role)
    let [decider, setDecider] = useState({});
    let [currSearchValue, setCurrSearchValue] = useState("")
    let [filteredBags, setFilteredBags] = useState([])


console.log(decider)
    useEffect(() => {

        setDecider((role === "admin") ? {display:"none"} : console.log("goat")) 
        // console.log(decider)
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
                    setFilteredBags(data.bags.filter(bag => (bag.secret_shop_key === +shopID && bag.sold == false) ));
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


    let shownCategoryBags = filteredBags.map(categoryBag => {
        return(
        <li className="bags-lis" key={categoryBag.id}><p className="bags-name">name: {categoryBag.name}</p> <img className="bags-img" src={categoryBag.image_url} width="220px" height="220px"/>
            <button
            style={ decider }
          className="bags-btn"
          onClick={() => {
            takeConfirmPage(
              `/shops/${shopID}/categories/${categoryID}/bags/${categoryBag.id}/confirm`
            ); 
          }}
        >
          SELL
            </button>
             </li>
        )
    })
    
    const handleSearch = (e) => {
        setCurrSearchValue(e.target.value)
        setFilteredBags(categoryBags.filter(bag => (bag.name.toLowerCase().includes((e.target.value).toLowerCase()))))
    }

    return(

        <div>
            < NavBar/>
            <h2>{shopName}</h2>
            <h3>{categoryName}</h3>
            <p className='total-individual'>TOTAL: {categoryBags.length}</p>
            <form>
                <input type='search' value={currSearchValue} onChange={handleSearch}/>
            </form>
            <ul className='bags-ul'>
            {shownCategoryBags}
            </ul>
        </div>

        
    )
}

export default ShopIndividualCategoryPage;
