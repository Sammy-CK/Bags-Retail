import { React, useState } from 'react';
// import { useState } from 'react-router-dom';

function LogInForm(){

    const [logInDetails, setLogInDetails] = useState({})

    const handleChange = (e) => {
		const { name, value } = e.target;
		setLogInDetails((prevState) => ({ ...prevState, [name]: value }));
        console.log(logInDetails)
	};

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://bags-o7py.onrender.com/login', {
            method: "POST",
            headers: {
				'Content-Type': 'application/json',
			},
			body: logInDetails,
        }).then(resp => {
            if (resp.ok){
                return resp.json()
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        }).then(data => console.log(data))

    };

return(
    <form onSubmit={handleSubmit} >
        <div>
            <h3>USERNAME</h3>
            <input type='text' name="username" onChange={handleChange} value={logInDetails.username}/>
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