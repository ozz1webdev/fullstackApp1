import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,
		faUser, faMessage,
		faRightToBracket, faRightFromBracket,
		faCircleInfo, faGear, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/sokrates.png';
import styles from '../assets/css/navbar.module.css';
import useUserRole from './useUserRole';

function NavigationBar () {

  const [token, setToken] = useState('');
  const [userrole, setUserRole] = useState('');

  const role = useUserRole();
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (role) {
      setUserRole(role);
    }    

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
              <Nav.Link as={Link} to="/posts"><FontAwesomeIcon icon={faBullhorn} /> Posts</Nav.Link>
              {token ? (<> {userrole === 'teacher' && (<><Nav.Link as={Link} to="/teacherpage"><FontAwesomeIcon icon={faUser} /> TeacherPage</Nav.Link></>)} 
                        {userrole === 'admin' && (<> <Nav.Link as={Link} to="/adminpage"><FontAwesomeIcon icon={faUser} /> AdminPage</Nav.Link> </>)}
                        {userrole === 'student' &&  (<><Nav.Link as={Link} to="/studentpage"><FontAwesomeIcon icon={faUser} /> StudentPage</Nav.Link> </>)}
                  <Nav.Link as={Link} to="/test"><FontAwesomeIcon icon={faGear} /> TestPage</Nav.Link>
                  <Nav.Link as={Link} to="/profile"><FontAwesomeIcon icon={faUser} /> My Profile</Nav.Link>
                  <Nav.Link as={Link} to="/about"><FontAwesomeIcon icon={faCircleInfo} /> About</Nav.Link>
                  <Nav.Link as={Link} to="/contact"><FontAwesomeIcon icon={faMessage} /> Contact</Nav.Link>
                  <Nav.Link as={Link} to="/logout"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Nav.Link>  
                </>
              ):(
                <>
                  <Nav.Link as={Link} to="/about"><FontAwesomeIcon icon={faCircleInfo} /> About</Nav.Link>
                  <Nav.Link as={Link} to="/contact"><FontAwesomeIcon icon={faMessage} /> Contact</Nav.Link>
                  <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faRightToBracket} /> Login</Nav.Link>
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
