import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LogoutPage() {
		const navigate = useNavigate();

		useEffect(() => {
				localStorage.removeItem('token');
				localStorage.clear();
				navigate('/loginpage');
		},[navigate]);

		return (
				<div>
						<h2>Logging out...</h2>
				</div>
		);
}

export default LogoutPage
