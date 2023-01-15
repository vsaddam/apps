import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../template/Nav';
import Sidebar from '../template/Sidebar';


const Contactus = () => {
    return (
        <>
            <Container fluid >
                <Row className='navbar-row'>
                    <Col className='navbar-col'>
                        <Navbar />
                    </Col>
                </Row>
                <Row className="mainpage-sidebar-cnt-row">
                    <Col md={2} className="mainpage-sidebar"><Sidebar /></Col>
                    <Col md={10} className="main-page">
                        <h2>Contactus</h2>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contactus