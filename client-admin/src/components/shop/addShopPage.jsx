import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './addShopPageStyle.css'

function AddShopPage(){

    let token = useSelector((state) => state.staff.staff.jwt)
    let [newShop, setNewShop] = useState({});
    const takeToCreateShopOrNotToCreate = useNavigate();


    const handleChange = (e) => {
		const { name, value } = e.target;
		setNewShop((prevState) => ({ ...prevState, [name]: value }));
		console.log(newShop);
	};

    const handleSubmit = (e) => {
        e.preventDefault();
            // Fetch assigning current bag from store to shop
            fetch(`https://bags-o7py.onrender.com/shops`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                         },
                body: JSON.stringify(newShop)
                    }).then(resp => {           
                if (resp.ok){
                    return resp.json().then(data => {
                        console.log(data)
                        alert("Created Successfully")
                        takeToCreateShopOrNotToCreate(`/shops`)
    
                    })
                }else{
                    console.log("Thats CAP LIL'NIGGA")
                }
            })
        
        }

    return (
        <div>
            <form className="addshop-form" onSubmit={handleSubmit}>
            <h2>ADD SHOP</h2>
                <label htmlFor='name' className='label-name'>NAME:</label>
                <input required className='input-name' type="text" name="name" value={newShop.name} onChange={handleChange} /><br/><br/>
                <button className="btn-floater" type='submit' > Create </button>
                <button className="btn-floater" onClick={(e) => {
                    e.preventDefault();
                    takeToCreateShopOrNotToCreate('/shops')
                }}>Cancel</button>
            </form>
        </div>
    )
}

export default AddShopPage;