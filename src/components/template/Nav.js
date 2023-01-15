import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nav = () => {
    let username = 'User';
    if (localStorage.getItem('username') !== null) {
        username = localStorage.getItem('username');
    }
    return (
        <Navbar variant="dark">
            <Container>
                <h3 className='mainpage-title'>MY CART</h3>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {username}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Nav