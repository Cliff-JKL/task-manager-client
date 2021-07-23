import React, { useEffect, useRef } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Header = () => {
    // const { user } = useTypedSelector((state) => state.user);
    const user = JSON.parse(localStorage.getItem('user'));
    const firstRender = useRef(true);

    const onLogout = () => {
        localStorage.removeItem('user');
        Cookies.remove('Access_token');
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Task Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/tasks">Tasks</Nav.Link>
                        <NavDropdown title="Info" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {
                            user?.username != null ?
                            <>
                                <Nav.Link href="/tasks">{user.username}</Nav.Link>
                                <Nav.Link href="/login" onClick={() => onLogout()} >Logout</Nav.Link>
                            </> :
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </>
    )
};

export default Header;