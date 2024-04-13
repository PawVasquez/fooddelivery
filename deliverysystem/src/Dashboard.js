import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { Navbar, Container, Nav, Button } from 'react-bootstrap'; // Import the components here

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'));
                const decoded = jwtDecode(response);
                setUser(decoded);
            } catch (error) {
                navigate('/Login');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate('/Login');
        } catch (error) {
            console.error('logout failed', error);
        }
    };


    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Reactjs Web Application</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="text-decoration-none text-white">Nav1</Nav.Link>
                        <Nav.Link href="text-decoration-none text-white">Nav2</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Welcome: {user ? user.id : 'id'} {user ? user.user.name : 'name'}
                            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
    }
export default Dashboard;
