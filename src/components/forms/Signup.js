import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import signup from '../../assets/image/signup.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const baseUrl = "https://6338473d937ea77bfdbd6cf2.mockapi.io/user";
    const navigate = useNavigate();
    let formData = [];
    const [data, setData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        gender: '',
        status:'Pending'
    });
    const { name, age, email, password, gender } = data;
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }



    const onSubmitHandler = e => {
        e.preventDefault();
        setErrors(validate(data));
        setIsSubmit(true);
    }

    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmit) {
            //--------local storage saving functionality--------//
            // if (localStorage.getItem('Data') !== null) {
            //     let userArr = JSON.parse(localStorage.getItem('Data'));
            //     userArr.map((value, index) => {
            //         formData.push(value);
            //     });
            //     formData.push(data);
            //     localStorage.setItem('Data', JSON.stringify(formData));
            // } else {
            //     formData.push(data);
            //     localStorage.setItem('Data', JSON.stringify(formData));
            // }

            //--------mock api saving functionality--------//
            axios.post(baseUrl, data).then( (response) => {
                console.log(response.data);
            });

            // redirect to login page
            navigate("/");
        }
    }, [errors])

    const validate = fields => {
        const error = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!fields.name) {
            error.name = true;
        }

        if (!fields.age) {
            error.age = true;
        }

        if (!fields.email) {
            error.email = true;
        } else if (!regex.test(fields.email)) {
            error.email = true;
        }

        if (!fields.password) {
            error.password = true;
        }

        if (!fields.gender) {
            error.gender = true;
        }

        return error;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col className="signup-col text-center" lg={4} md={6} sm={12} >
                    <h3 className="mb-4">Signup Form</h3>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={onChangeHandler} className={`${errors.name ? "error" : ""}`} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="number" placeholder="Enter age" name="age" value={age} onChange={onChangeHandler} className={`${errors.age ? "error" : ""}`} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter email" name="email" value={email} onChange={onChangeHandler} className={`${errors.email ? "error" : ""}`} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler} className={`${errors.password ? "error" : ""}`} />
                        </Form.Group>

                        <Form.Group className="mb-3 gender-wrapper d-flex" controlId="formBasicPassword">
                            <Form.Label> Gender </Form.Label>
                            <Form.Check
                                type="radio"
                                label="Male"
                                id="male"
                                name="gender"
                                value="male"
                                onChange={onChangeHandler}
                                className={`${errors.gender ? "error" : ""}`}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                id="female"
                                name="gender"
                                value="female"
                                onChange={onChangeHandler}
                                className={`${errors.gender ? "error" : ""}`}
                            />
                        </Form.Group>

                        <Button variant="primary signup-btn" type="submit"> Submit </Button>
                        <div className='mt-2'>
                            Already signup ?
                            <Link className='mx-2' to='/'><small className='reset'> Signin </small> </Link>
                        </div>
                    </Form>

                </Col>
                <Col lg={8} md={6} sm={12}>
                    <img className="signup-image" src={signup} alt="img" />
                </Col>
            </Row>
        </Container >
    );
}

