import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './allStaffPageStyle.css'

function AllStaffPage(){

    const [staffs, setStaffs] = useState([]);
    let token = useSelector((state) => state.staff.staff.jwt)
    const takeStaff = useNavigate()


    useEffect(() => {
        // Fetching staff members
        fetch("https://bags-o7py.onrender.com/staffs", {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    console.log(data)
                    setStaffs(data)
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    let shownStaff = staffs.map(staff => {
        return(
            <li className="staffs-li" key={staff.id} onClick={() => takeStaff(`/staffs/${staff.id}`)}><p>NAME: {staff.name}</p> PHONE NUMBER<p>{staff.phone_number}</p><p>SHOP: {staff.shop.name}</p></li>
        )
    })

    return (
        <div>
            <h2 >STAFF</h2>
            <button className="addstaff-btn" onClick={() => takeStaff('/staffs/new')}>ADD STAFF</button>
            <ul className="staffs-ul">
                {shownStaff}
            </ul>
        </div>
    )
}

export default AllStaffPage;