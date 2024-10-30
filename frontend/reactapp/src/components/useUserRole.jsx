import { useState, useEffect } from 'react';
import axios from 'axios';

function useUserRole() {

    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

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
