import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './storeAddBagPageStyle.css'
import NavBar from '../navbar/navBar';

function StoreAddBagPage(){

    const takeToCreateBagOrNotToCreate = useNavigate();
    let [newBag, setNewBag] = useState({category_id: 1})
    let token = useSelector((state) => state.staff.staff.jwt)
    const [categories, setCategories] = useState([])

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setNewBag((prevState) => ({ ...prevState, image: file }));
	};

    const handleChange = (e) => {
		const { name, value } = e.target;
		setNewBag((prevState) => ({ ...prevState, [name]: value }));
		console.log(newBag);
	};


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
                    setCategories(data)
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })
    }, [])

    let categoryOptions = categories.map(category =>{
        return(
        <option value={category.id}>{category.name}</option>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalNewBag = {...newBag, price: 0, shop_id: 1, secret_shop_key: 1, sold: false, sold_at: null, stored: true }
        const formData = new FormData();
		for (const x in finalNewBag) {
			formData.append(`${x}`, finalNewBag[x]);
        }

            // Fetch create new bag to the store
            fetch(`https://bags-o7py.onrender.com/bags`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': "application/json"
                         },
                body: formData
                    }).then(resp => {           
                if (resp.ok){
                    return resp.json().then(data => {
                        console.log(data)
                        alert("Created Successfully")
                        takeToCreateBagOrNotToCreate(`/store`)
                        setNewBag((prev) => {})
    
                    })
                }else{
                    console.log("Thats CAP LIL'NIGGA")
                }
            })
        }
        


    return (
        <div>
            <NavBar/>
        <div className='newbag-formA'>
        <h2 style={{textAlign:"center"}}>ADD BAG</h2>
            <form className='actualnewbag-form' onSubmit={handleSubmit}>
                <div className='row-form'>
               <label className='newbag-label' htmlFor='name'>NAME:</label>
               <input type="text" required name="name" onChange={handleChange} value={newBag.name}/> <br/>    
               </div>
               <div className='row-form'>
               <label className='newbag-label' htmlFor='category'>CATEGORY:</label>    
                <select name='category_id' onChange={handleChange}>
                    {categoryOptions}
                </select> <br/>
                </div>
                <div className='row-form'>
               <label className='newbag-label' htmlFor='image'>IMAGE:</label>
                <input
				type="file"
				accept="image/png, image/jpeg"
				onChange={handleImageChange}
				name="image"
				required
			    />
                </div>
                <button className='submit-formbtnr jigjog' type='submit'>Create</button>
                <button className='jigjog' onClick={() => takeToCreateBagOrNotToCreate('/store')}>Cancel</button>
                
            </form>

        </div>
        </div>
    )
}

export default StoreAddBagPage;