import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TestPage() {
		
		const [input1,setInput1] = useState('');
		const [input2,setInput2] = useState('');
		const [data, setData] = useState('');
		const navigate = useNavigate();
		const token = localStorage.getItem('token');


		const handleChange = (e) => {
				if (e.target.name === 'input1') {
						setInput1(e.target.value);
				}
				if (e.target.name === 'input2') {
						setInput2(e.target.value);
				}
		}

		const handleSubmit = () => {
				const token = localStorage.getItem('token');

				if(token) {
						axios.post('/myview/',{
										key1: input1,
										key2: input2
								},{
								headers: {
										'Content-Type': 'application/json',
										'Authorization': `Token ${token}`
								}
								})
						.then(response => setData(response.data))
						.catch(error => setData(error));
				} else {
						navigate('/login');
				}
		};
		
		const getData =async (e) => {
				e.preventDefault();
				const token = localStorage.getItem('token');

				if (token) {
						try {
								const response = await axios.get('/myview/',
										{
												headers: {
														'Authorization': `Token ${token}`
												}
										});
								setData(response.data);
						}catch(error) {
								setData(error);
						}

				} else {
						navigate('/login');
				}
		};

		return (
				<>
						<h1>Test Page</h1>
						<hr />
						<p>This form send data with token: ${token}</p>
						<form onSubmit={handleSubmit}>
								<label>Input 1</label>
								<input type="test" name="input1" value={input1} onChange={handleChange} />
								<label>Input 2</label>
								<input type="text" name="input2" value={input2} onChange={handleChange} />
								<button type="submit">Submit</button>
						</form>
						<hr />
								<button onClick={getData}>Get Data</button>
						<hr />
						<div>
								<h2>The response data are :</h2> 
								<p> {data.message} </p>
						</div>
				< />
		);
}

export default TestPage
