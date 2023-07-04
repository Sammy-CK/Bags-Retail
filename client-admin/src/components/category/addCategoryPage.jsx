import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../navbar/navBar';


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
            <form>
            <label htmlFor='name' >NAME</label>
                <input type='text' name='name' value={newCategory.name} onChange={handleChange} /><br/>
            
                <button onClick={(e) => {
                e.preventDefault()
                takeCategory('/store')
                } }>Back</button>
            <button onClick={ handleSubmit }>Create</button>
            
            </form>
        </div>
    )


}

export default AddCategoryPage;