import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import Navbar from '../template/Nav';
import Sidebar from '../template/Sidebar';
import axios from 'axios';

const UsersDetails = () => {

    const baseUrl = 'https://6338473d937ea77bfdbd6cf2.mockapi.io/user';

    let users = [];
    // let username = '';

    if (localStorage.getItem('Data') !== null) {
        users = JSON.parse(localStorage.getItem('Data'));
    }

    const [usersData, setUsersData] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState({
        age: "",
        email: "",
        gender: "",
        name: "",
        password: "",
        status: ""
    });
    const [editStatus, setEditStatus] = useState({
        age: "",
        email: "",
        gender: "",
        name: "",
        password: "",
        status: ""
    });

    const getUserData = () => {
        axios.get(baseUrl).then((response) => {
            setUsersData(response.data);

        });
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = (user) => {
        setCurrentUser(user);

        let filterUser = usersData.filter((val, i) => {
            return val['id'] === user;
        });
        let userObj = filterUser[0];

        setEdit(() => {
            // Object.assign would also work
            return { ...edit, ...userObj };
        });
        console.log(edit);
        setShow(true);
    };

    const updateUser = (user) => {

        axios.put(`${baseUrl}/${user}`, edit).then((response) => {
            getUserData();
        });
        // let pos = users.map((val, i) => {

        //     return val['name'];
        // }).indexOf(user);

        // console.log('pos', pos);
        // users.splice(pos, 1, edit);
        // localStorage.setItem('Data', JSON.stringify(users));

        // if(localStorage.getItem('username') !== null) {
        //     username = localStorage.getItem('username');
        //     if (user === username ){
        //         localStorage.setItem('username', JSON.stringify(users));
        //     }
        // }

        setShow(false);
        // navigates('/home');
    }

    const onChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    const deleteUser = (user) => {
        // let pos = users.map((val, i) => {
        //     return val['name'];
        // }).indexOf(user);
        // users.splice(pos, 1);
        // localStorage.setItem('Data', JSON.stringify(users));
        axios.delete(`${baseUrl}/${user}`).then(() => {
            getUserData();
        });
    }

    const statusHandler = (user, e) => {
        setCurrentUser(user);

        let filterUser = usersData.filter((val, i) => {
            return val['id'] === user;
        });
        let userObj = filterUser[0];

        setEditStatus(() => {
            // Object.assign would also work
            return { ...editStatus, ...userObj, ...{ [e.target.name]: e.target.value } };
        });
    }

    useEffect(() => {
        if (currentUser !== '') {
            console.log(editStatus, '- Has changed');
            axios.put(`${baseUrl}/${currentUser}`, editStatus).then((response) => {
                getUserData();
            });
        }

    }, [editStatus]);

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
                    <Col sm={10} className="main-page">
                        <h2>Users Details</h2>
                        <Table striped hover bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    // usersData && usersData.length > 0 ?
                                    Array.isArray(usersData) && usersData.map((value, item) => {
                                        return (
                                            <tr key={item}>
                                                <td>{value.name}</td>
                                                <td>{value.age}</td>
                                                <td>{value.email}</td>
                                                <td>{value.gender}</td>
                                                <td>
                                                    <select name="status" value={value.status} onChange={(e) => statusHandler(value.id, e)}>
                                                        <option value="">Select Status</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <Button variant='warning' className='edit-action' onClick={() => handleShow(value.id)}>Edit</Button>

                                                    <Button variant="danger" onClick={() => deleteUser(value.id)}>Del</Button>
                                                </td>

                                            </tr>
                                        );
                                    })
                                    // :
                                    // "No data found!"
                                }

                            </tbody>
                        </Table>
                        {/* <UserUpdateModal /> */}
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Container className="mt-5">
                            <Row>
                                <Col className="signup-col text-center" lg={12} md={12} sm={12} >
                                    <h3 className="mb-4">User details</h3>
                                    <Form >
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Control type="text" placeholder="Enter name" name="name" value={edit.name} onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicAge">
                                            <Form.Control type="number" placeholder="Enter age" name="age" value={edit.age} onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter email" name="email" value={edit.email} onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" name="password" value={edit.password} onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Form.Group className="mb-3 gender-wrapper d-flex" controlId="formBasicPassword">
                                            <Form.Label> Gender </Form.Label>
                                            <Form.Check
                                                type="radio"
                                                label="Male"
                                                id="male"
                                                name="gender"
                                                value="male"
                                                checked={edit.gender === 'male' ? true : false}
                                                onChange={onChangeHandler}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Female"
                                                id="female"
                                                name="gender"
                                                value="female"
                                                checked={edit.gender === 'female' ? true : false}
                                                onChange={onChangeHandler}
                                            />
                                        </Form.Group>
                                        <select name="status" value={edit.status} onChange={onChangeHandler} >
                                            <option value="">Select Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </Form>

                                </Col>
                            </Row>
                        </Container >


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => updateUser(currentUser)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )
}

export default UsersDetails