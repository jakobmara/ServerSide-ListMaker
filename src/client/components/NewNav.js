import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const NewNav = ({ auth }) => {
    const cookies = new Cookies();
    const listUrl = '/myLists/' + cookies.get('userId');
    let authButtons = []
    //if (cookies.get('userId))

    if (auth){
        authButtons = [
            <a key={1} className="navButton nav-link" href={listUrl}>
                My lists</a>,
            <NavDropdown id="navbarScrollingDropdown" title={cookies.get('username')} key={2}>
                <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
        ]
    }else{
        authButtons = [
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
    }
    console.log("auth: ", auth)
    

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
                {authButtons}
                </Nav>
        </Navbar>
    );
};

function mapStateToProps({ auth }){
    return { auth };
}
//withRouter is so that it still makes a request to the backend when it gets redirected via JS
export default connect(mapStateToProps)(withRouter(NewNav)); 