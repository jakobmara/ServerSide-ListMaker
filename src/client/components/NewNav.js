import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
const NewNav = ({ auth }) => {
    const authButton = auth ? (
        <NavDropdown id="navbarScrollingDropdown">
            <LinkContainer  to={{
                pathname: '/myLists/',
            }}>
            <NavDropdown.Item href="#action3">My Lists</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
        </NavDropdown>
    ) : (
        [
            <Nav.Link as ={Link} 
                to={{
                    pathname: '/login',
                    state: {purpose: "Login"}
                }}>
                    Login</Nav.Link>,
            <Nav.Link as ={Link} 
                to={{
                    pathname: '/signup',
                    state: {purpose: "Sign Up"}
                }}>
                    Sign Up</Nav.Link>
        ]
    );
//maybe change the buttons so only thing in drop down is logout and instead have a button for "my lists in the navbar"
    return (
        <Navbar bg="dark" variant="dark">
            <LinkContainer  to={{
                pathname: '/',
            }}>
                <Navbar.Brand href="/" stlye={{color: 'red'}}>ListMaker</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <Nav.Link href="/explore">Explore</Nav.Link>
                </Nav>

                <Nav className="navButtonPadding">
                {authButton}
                </Nav>
        </Navbar>
    );
};

function mapStateToProps({ auth }){
    return { auth };
}
export default connect(mapStateToProps)(NewNav);