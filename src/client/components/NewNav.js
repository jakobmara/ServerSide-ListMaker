import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon'
const NewNav = ({ user }) => {
    const listUrl = '/myLists/' + user;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let authButtons;

    if (user){
        authButtons = <div className="nav-link">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>{user.charAt(0)}</Avatar>
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
           
            <a href={listUrl} className="non-hyperlink">
            <MenuItem className="non-hyperlink">My Lists</MenuItem>
            </a>
            <Divider />
            <a href="/logout" className="non-hyperlink">
            <MenuItem>
            <ListItemIcon><Logout fontSize="small" />
            </ListItemIcon>Logout</MenuItem>
            </a>
        </Menu>
        </div>
    }else{
        authButtons = <a key={1} className="navButton nav-link" href="/login">Login/Sign Up </a>
        
    }
    

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

function mapStateToProps({auth}){
    return { auth };
}
export default connect(mapStateToProps)(NewNav); 