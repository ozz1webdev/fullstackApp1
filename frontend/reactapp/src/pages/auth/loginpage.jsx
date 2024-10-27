import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
		const [username, setUsername] = useState('');
		const [password, setPassword] = useState('');
		const navigate = useNavigate();

		const handleChange = (e) => {
				if (e.target.name === 'username') {
						setUsername(e.target.value);
				}
				if (e.target.name === 'password') {
						setPassword(e.target.value);
				}
		}
		
		const handleSubmit = (e) => {
				e.preventDefault();

				axios.post('/token-auth/', {
						username: username,
						password: password
				})
				.then(response => {
						if(response.status === 200) {
								localStorage.setItem('token', response.data.token);
								navigate("/homepage");
						}
						else {
								console.log(response.status);
						}
				})
				.catch(error => { 
				    console.error('Error during authentication', error.response?.data || error.message);
				})
		}

		return (
		<>
				<h1>Please Login to Continue</h1>

				<form onSubmit={handleSubmit}>
						<label>Username: </label>
						<input type="text" name="username" value={username} onChange={handleChange} require="true" />

						<label>Password: </label>
						<input type="password" name="password" value={password} onChange={handleChange} require="true" />
						
						<button type="submit">Submit</button>
				</form>

				<h1>{username}</h1>
		</>
	);
}

export default LoginPage;
