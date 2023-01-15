import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginPic from '../../assets/image/icon.svg';
import SecureImg from '../../assets/image/secure.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const baseUrl = 'https://6338473d937ea77bfdbd6cf2.mockapi.io/user';
    const [usersData, setUsersData ] = useState([]);
    localStorage.setItem('isAuthenticated', null);
    localStorage.setItem('username', null);
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        user: '',
        password: ''
    }); // useState for user input saving
    const [errors, setErrors] = useState({}); // useState for error message saving and displaying
    const [isSubmit, setIsSubmit] = useState(false); // useState for confirmation for submit is submitted.
    const [isAuthenticated, setIsAuthenticated] = useState('SDBT25ERBERB52ERB2E5RBRT2');
    const { user, password } = login;

    const changeHandler = e => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();
        setErrors(validate(login));
        setIsSubmit(true);

    }

    useEffect(() => {
        axios.get(baseUrl).then( (response)=> {
            setUsersData(response.data);
            console.log('response', response);
            
        });

        if (Object.keys(errors).length === 0 && isSubmit) {

            
            console.log('usersData', usersData);
            // usersData localStorage.getItem('Data') !== null
            if ( usersData.length > 0 ) {

                // const users = JSON.parse(localStorage.getItem('Data'));
                // console.log(users);
                const acc = usersData.find((cuser) => {
                    return cuser.name === user;
                });

                if (acc && acc.password === password) {
                    localStorage.setItem('isAuthenticated', isAuthenticated);
                    localStorage.setItem('username', user);
                    navigate("/userdetails");
                } else {
                    alert('username or password not correct');
                }

            } else {
                alert('No users found!');
                navigate("/signup");
            }
        }
    }, [errors]);

    const validate = (field) => {
        const error = {};
        if (field.user === '') {
            error.user = "username is required";
        }
        if (field.password === '') {
            error.password = "password is required";
        }
        return error;
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center p-3 mt-5">
                        <img className="icon-img" src={LoginPic} alt="icon" />
                        <Form onSubmit={submitHandler} className="login-form">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type="text" placeholder="Enter username" name="user" value={user} onChange={changeHandler} />
                            </Form.Group>
                            <p style={{ color: "red", textAlign: "left" }} className="error_list1">{errors.user}</p>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeHandler} />
                            </Form.Group>
                            <p style={{ color: "red", textAlign: "left" }} className="error_list2">{errors.password}</p>

                            <Button className="login-btn" variant="primary" type="submit"> Login </Button>
                            <div className='text-left-custom mt-2'>
                                <Link className='mx-2'><small className='reset'>Forget Password ?</small> </Link>
                                <Link to="/signup"><small className='reset'>Signup</small></Link>
                            </div>
                        </Form>
                    </Col>

                    <Col lg={8} md={6} sm={12}>
                        <img className='secure-img w-100' src={SecureImg} alt="secure" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm