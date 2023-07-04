import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { storeStaffDetails } from '../../redux/staffSlice'
import { useNavigate } from 'react-router-dom'
import './login.css'



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
                    console.log(data)
                    let role = data.staff.role
                    let shop = data.staff.shop.id
                    if(role == "admin"){
                        takeStore('/store')   
                    }else{
                        takeStore(`/shops/${shop}`)   
                    }
                    setLogInDetails({name: "", password: ""})
                })
            }else{
                setLogInDetails({name: "", password: ""})
                alert("No matching username and password")
            }
        })
    };

return(
    <div className='login-bigboy'>
    <div className="login-page">
    <div className="signup-card login-top">
      <h1>LOGIN</h1>
    <form onSubmit={handleSubmit} className='login-form'>
        <div className="txt_field">
            <h4>USERNAME</h4>
            <input type='text' className='login-input' name="name" required onChange={handleChange} value={logInDetails.name}/>
        </div>
        <div className="txt_field">
            <h4>PASSWORD</h4>
            <input type='password' className='login-input' name="password" required onChange={handleChange} value={logInDetails.password} />
        </div>
        <div className="buttons">
        <button type="submit" className='login-btn'>Login</button>
        </div>
    </form>
    </div>
    </div>
    </div>

    )
}

export default LogInForm;