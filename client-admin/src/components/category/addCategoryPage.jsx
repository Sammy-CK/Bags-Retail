import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../navbar/navBar';
import './addCategoryPageStyle.css'


function AddCategoryPage(){


    const [newCategory, setNewCategory] = useState({});

    let token = useSelector((state) => state.staff.staff.jwt)
    const takeCategory = useNavigate()

    const handleChange = (e) => {
		const { name, value } = e.target;
		setNewCategory((prevState) => ({ ...prevState, [name]: value }));
		console.log(newCategory);
	};

    const handleSubmit = (e) => {
        e.preventDefault();

            // Fetch creating category
            console.log(newCategory.name);
            fetch(`https://bags-o7py.onrender.com/categories`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                         },
                body: JSON.stringify({category: newCategory})
                    }).then(resp => {           
                if (resp.ok){
                    return resp.json().then(data => {
                        console.log(data)
                        alert("Created Successfully")
                        takeCategory(`/store`)
    
                    })
                }else{
                    console.log("Thats CAP LIL'NIGGA")
                }
            })
        }



    return (
        <div>
            <NavBar />
            <form className="addshop-form">
                <h2>ADD CATEGORY</h2>
            <label htmlFor='name' >NAME</label>
                <input type='text' required className='input-name' name='name' value={newCategory.name} onChange={handleChange} /><br/>
                <button className="btn-floater" onClick={ handleSubmit }>Create</button>

                <button className="btn-floater" onClick={(e) => {
                e.preventDefault()
                takeCategory('/store')
                } }>Back</button>
            
            </form>
        </div>
    )


}

export default AddCategoryPage;