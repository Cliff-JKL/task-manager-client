import React, { useEffect, useRef, memo } from 'react';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useTypedSelector } from '../hooks/typedSelector';
import { useActions } from '../hooks/actions';
import { useLazyGetUserQuery } from '../store/api/user.api';
import { useLogoutMutation, useRefreshMutation } from '../store/api/auth.api';


const Header = memo(() => {
  const { user } = useTypedSelector((state) => state.user);
  const { token } = useTypedSelector((state) => state.auth);
  const [getUser, { isLoading: isUserFetched, data: userData, isError }] = useLazyGetUserQuery();
  const { setUser, clearUser, clearAuth } = useActions();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const onLogout = () => {
    localStorage.removeItem('user');
    logout();
    clearUser();
    clearAuth();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/tasks" className="navbar-brand">Task Manager</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/tasks" className="nav-link">Tasks</Link>
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
                            user?.username !== undefined
                              ? (
                                <>
                                  <Link to="/tasks" className="nav-link">{user.username}</Link>
                                  <Link to="/login" onClick={() => onLogout()} className="nav-link">Logout</Link>
                                </>
                              )
                              : (
                                <>
                                  <Link to="/login" className="nav-link">Login</Link>
                                  <Link to="/register" className="nav-link">Register</Link>
                                </>
                              )
                        }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default Header;
