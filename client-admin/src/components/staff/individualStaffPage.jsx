import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function IndividualStaffPage(){

    const [staff, setStaff] = useState({});
    const [currentShop, setCurrentShop] = useState("")
    let token = useSelector((state) => state.staff.staff.jwt)
    const takeStaffs = useNavigate()
    const { staffID } = useParams();

useEffect(() => {

        // Fetching staff
        fetch(`https://bags-o7py.onrender.com/staffs/${staffID}`, {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    setStaff(data)
                    setCurrentShop(data.shop.name)
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    const handleClick = () => {
        fetch(`https://bags-o7py.onrender.com/staffs/${staffID}`, {
            method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
                    if (resp.ok){
                        return resp.json().then(data => {
                            console.log(data)
                            alert('Deleted Successfully!')
                            takeStaffs('/staffs')
                            })
                    }else{
                        console.log("Thats CAP LIL'NIGGA")
                    }
                })

    }



    return(
        <div>
            <h2>{staff.name}</h2>
            <h4>NAME</h4> <p>{staff.name}</p>
            <h4>PASSWORD</h4> <p>{staff.password}</p>
            <h4>PHONE NUMBER</h4> <p>{staff.phone_number}</p>
            <h4>SHOP</h4> <p>{currentShop}</p>
            <button onClick={() => takeStaffs('/staffs') }>Back</button>
            <button onClick={ handleClick }>Delete</button>


        </div>
    )
}

export default IndividualStaffPage;