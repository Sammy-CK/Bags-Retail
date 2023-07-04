import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './addStaffPageStyle.css'
import NavBar from '../navbar/navBar';

function AddStaffPage(){


    const [newStaff, setNewStaff] = useState({});
    const [currentShops, setCurrentShops] = useState([])
    const [selectedShop, setSelectedShop] = useState(null);

    let token = useSelector((state) => state.staff.staff.jwt)
    const takeToCreateStaffOrNotToCreate = useNavigate()

    useEffect(() => {

                // Fetch current shops
                fetch(`https://bags-o7py.onrender.com/shops`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                             }
                        }).then(resp => {           
                    if (resp.ok){
                        return resp.json().then(data => {
                            console.log(data)
                            setCurrentShops(data.filter(shop => (shop.id !== 1) ));
                        })
                    }else{
                        console.log("Thats CAP LIL'NIGGA")
                    }
                })


    }, [])

    const handleChange = (e) => {
		const { name, value } = e.target;
		setNewStaff((prevState) => ({ ...prevState, [name]: value }));
		console.log(newStaff);
	};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedShop) {
            let finalNewStaff = {...newStaff, shop_id: +selectedShop, role: "attendant", phone_number: +(newStaff.phone_number)}
            console.log(finalNewStaff)
            // Fetch creating staffshop.id !== 1
            fetch(`https://bags-o7py.onrender.com/staffs`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                         },
                body: JSON.stringify({staff: finalNewStaff})
                    }).then(resp => {           
                if (resp.ok){
                    return resp.json().then(data => {
                        console.log(data)
                        alert("Created Successfully")
                        takeToCreateStaffOrNotToCreate(`/staffs`)
                        setNewStaff((prevState) => {});
    
                    })
                }else{
                    console.log("Thats CAP LIL'NIGGA")
                }
            })
        }else{
            alert("Please select shop!")
            setNewStaff((prevState) => ({name: "", password: "", phone_number: ""}));        
        }
        }

        const handleShopSelection = (event) => {
            console.log(event.target.value)
            setSelectedShop(event.target.value);
    
          };

        let choiceShopForStaff = currentShops.map(shop => {
            return(
                <div className='input-x' key={shop.id}>
                <input type="radio" id="html" name="shop_id" value={shop.id} onChange={handleShopSelection} />
                    <label htmlFor="html">{shop.name}</label>
                </div>
            )
        })

    return (
        <div>
        <NavBar/>
        <div className='newbag-form'>
            <form onSubmit={handleSubmit}>
            <div className='row-form'>
                <label className='newbag-label' htmlFor='name' >NAME:</label>
                <input type='text' className='input-x' required name='name' value={newStaff.name} onChange={handleChange} />
            </div>
            <div className='row-form'>
                <label className='newbag-label' htmlFor='password' >PASSWORD:</label>
                <input type='password' className='input-x' required name='password' value={newStaff.password} onChange={handleChange} /><br/>
            </div>
            <div className='row-form'>
                <label className='newbag-label' htmlFor='phone_number' >PHONE NUMBER:</label>
                <input type='text' className='input-x' name='phone_number' required value={newStaff.phone_number} onChange={handleChange} /><br/>
            </div>
            <div className='row-form'>
            <label className='newbag-label' htmlFor='phone_number' >SHOP:</label>
                {choiceShopForStaff}<br/>
            </div>                

            <button className='submit-formbtn  jigjog' type='submit'>Create</button>
            <button className=' jigjog' onClick={(e) => {
                e.preventDefault()
                takeToCreateStaffOrNotToCreate('/staffs')
                } }>Back</button>

            </form>

        </div>
        </div>
    )
}

export default AddStaffPage;