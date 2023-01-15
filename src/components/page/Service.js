import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../template/Nav';
import Sidebar from '../template/Sidebar';
import { KaProductPage } from 'ka-productpage';
import Products from '../../assets/json/text.json'


const Service = () => {
    
    const getProdData = (data) => {
        //get prod id and url for navigating to product Detail page.
        console.log('data', data)
    }
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
                        <KaProductPage products={Products} prodData={getProdData} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Service