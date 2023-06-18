import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { storeStaffDetails } from '../../redux/staffSlice'
import { useNavigate } from 'react-router-dom'



function LogInForm(){
    const takeStore = useNavigate();
    const [logInDetails, setLogInDetails] = useState({})
    const staff = useSelector((state) => state.staff.staff)
    const dispatch = useDispatch()

    const handleChange = (e) => {
		const { name, value } = e.target;
		setLogInDetails((prevState) => ({ ...prevState, [name]: value }));
        console.log(logInDetails)
	};

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(logInDetails)
        fetch('https://bags-o7py.onrender.com/login', {
            method: "POST",
            headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(logInDetails),
        }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {
                    dispatch(storeStaffDetails(data))
                    console.log(staff)
                    takeStore('/store')                
                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })
    };

return(
    <form onSubmit={handleSubmit} >
        <div>
            <h3>USERNAME</h3>
            <input type='text' name="name" onChange={handleChange} value={logInDetails.name}/>
        </div>
        <div>
            <h3>PASSWORD</h3>
            <input type='password' name="password" onChange={handleChange} value={logInDetails.password} />
        </div>
        <input type='submit' value="LOGIN" />
    </form>
    )
}

export default LogInForm;