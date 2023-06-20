import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

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
    
                    })
                }else{
                    console.log("Thats CAP LIL'NIGGA")
                }
            })
        }
        }

        const handleShopSelection = (event) => {
            console.log(event.target.value)
            setSelectedShop(event.target.value);
    
          };

        let choiceShopForStaff = currentShops.map(shop => {
            return(
                <div key={shop.id}>
                <input type="radio" id="html" name="shop_id" value={shop.id} onChange={handleShopSelection} />
                    <label htmlFor="html">{shop.name}</label>
                </div>
            )
        })

    return (
        <div>
            <form>
                <label htmlFor='name' >NAME</label>
                <input type='text' name='name' value={newStaff.name} onChange={handleChange} /><br/>
                <label htmlFor='password' >PASSWORD</label>
                <input type='password' name='password' value={newStaff.password} onChange={handleChange} /><br/>
                <label htmlFor='phone_number' >PHONE NUMBER</label>
                <input type='text' name='phone_number' value={newStaff.phone_number} onChange={handleChange} /><br/>
                {choiceShopForStaff}
                
            <button onClick={(e) => {
                e.preventDefault()
                takeToCreateStaffOrNotToCreate('/staffs')
                } }>Back</button>
            <button onClick={ handleSubmit }>Create</button>

            </form>

        </div>
    )
}

export default AddStaffPage;