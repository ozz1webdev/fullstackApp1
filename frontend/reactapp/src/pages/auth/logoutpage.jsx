import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();

        const timer = setTimeout(() => {
            navigate('/');
        }, 1000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
            <p>You will be redirected shortly.</p>
        </div>
    );
}

export default LogoutPage;