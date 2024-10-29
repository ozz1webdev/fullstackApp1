import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useUserRole() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        axios.get('/profile/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }) 
        .then(response => {
            setRole(response.data.role);
            console.log(response.data.role);
        })
        .catch(error => {
            console.error('Error fetching user role:', error);
        });
    }, []);

    return role;
}

export default useUserRole
