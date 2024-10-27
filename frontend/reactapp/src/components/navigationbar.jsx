import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, 
		faUser, faMessage, 
		faRightToBracket, faRightFromBracket, 
		faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/sokrates.png';
import styles from '../assets/css/navbar.module.css';

function NavigationBar () {

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/" className={styles.logotitle} ><img className={styles.logo} src={logo} alt="logo sokrates"/> Greek School  Sokrates</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/"> <FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
              <Nav.Link as={Link} to="/about"><FontAwesomeIcon icon={faCircleInfo} /> About</Nav.Link>
              <Nav.Link as={Link} to="/contact"><FontAwesomeIcon icon={faMessage} /> Contact</Nav.Link>
              {token ? (
                <>
                  <Nav.Link as={Link} to="/test"><FontAwesomeIcon icon={faGear} /> TestPage</Nav.Link>
                  <Nav.Link as={Link} to="/profile"><FontAwesomeIcon icon={faUser} /> My Profile</Nav.Link>
                  <Nav.Link as={Link} to="/logoutpage"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Nav.Link>  
                </>
              ):(
                <>
                  <Nav.Link as={Link} to="/loginpage"><FontAwesomeIcon icon={faRightToBracket} /> Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
);  
}

export default NavigationBar
