import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';

const NewNav = ({ auth }) => {
    const authButton = auth ? (
        <NavDropdown id="navbarScrollingDropdown">
            <LinkContainer to={{
                pathname: '/myLists/',
            }}>
            <NavDropdown.Item href="#action3">My Lists</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
        </NavDropdown>
    ) : (
        [
            <Nav.Link className="navButton" as ={Link} 
                to={{
                    pathname: '/login',
                    state: {purpose: "Login"}
                }} key={3}>
                    Login</Nav.Link>,
            <Nav.Link className="navButton" as ={Link} 
                to={{
                    pathname: '/signup',
                    state: {purpose: "Sign Up"}
                }} key={4}>
                    Sign Up</Nav.Link>
        ]
    );
//maybe change the buttons so only thing in drop down is logout and instead have a button for "my lists in the navbar"
    return (
        <Navbar bg="dark" variant="dark" className="parentDiv">
            <LinkContainer  to={{
                pathname: '/',
            }}>
                <Navbar.Brand href="/" id="webTitle">ListMaker</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto" key={1}>
                    <Nav.Link href="/explore" className="navButton">Explore</Nav.Link>
                </Nav>

                <Nav className="navButtonPadding" key={2}>
                {authButton}
                </Nav>
        </Navbar>
    );
};

function mapStateToProps({ auth }){
    return { auth };
}
export default connect(mapStateToProps)(NewNav);