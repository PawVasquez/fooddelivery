import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css';


import { jwtDecode } from 'jwt-decode'; // Corrected import

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const decoded = jwtDecode(token); // Decode the token using jwtDecode
                setUser(decoded);
                navigate('/dashboard');
            } catch (error) {
                navigate('/login');
            }
        };

        fetchUser();
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.10.65:3000/user/login', {
                username,
                password
            });
            localStorage.setItem('token', JSON.stringify(response.data.token));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <div className="login-container">
                    <div className='login-box'>
                    <h1 className='login-tittle'>Login</h1>
                        <div className='email-pass-container'>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className='login-items'/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='login-items'/>
                        </div>
                        <button onClick={handleLogin} className='login-button'>Login</button>
                    </div>
            </div>
        </>
    );
}

export default Login;