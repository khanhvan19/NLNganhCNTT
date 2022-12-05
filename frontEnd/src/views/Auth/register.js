import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon as FAws } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

import styles from './Auth.module.css'
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            account: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup
                .string()
                .email('Invalid Email (abcd1234@example.com)')
                .required('You must fill in this section!'),
            account: Yup
                .string()
                .min(6, 'Account must have 6-20 character!')
                .max(20, 'Account must have 6-20 character!')
                .required('You must fill in this section!'),
            password: Yup
                .string()
                .min(8, 'Password must be at least 8 characters!')
                .required('You must fill in this section!'),
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password')], 'Confirm password does not match!')
                .required('You must fill in this section!'),
        }),
        onSubmit: (values) => {
            axios
                .post("http://localhost:5000/api/auth/register", {
                    email: values.email,
                    account: values.account,
                    password: values.password,
                })
                .then((res) => {
                    toast.success("Sign Up Success!", {
                        position: "top-center",
                        autoClose: 2500,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate("/login", { replace: true });
                    }, 3500)
                })
                .catch((err) => {
                    setError(err.response.data.message)
                });
        }
    })

    return (
        <Container>
            <Row>
                <Col>
                    <form noValidate onSubmit={formik.handleSubmit} className={styles.formRegister}>

                        <div className={[styles.title, 'text-center'].join(' ')}>Sign Up</div>

                        <div className={styles.inputContainer}>
                            <input
                                required
                                type="text"
                                name="email"
                                className={styles.input}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <span className={styles.lable} data-placeholder="Email"></span>
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <div className={styles.validate}>
                                {formik.errors.email}
                            </div>
                        )}

                        <div className={styles.inputContainer}>
                            <input
                                required
                                type="text"
                                name="account"
                                className={styles.input}
                                value={formik.values.account}
                                onChange={formik.handleChange}
                            />
                            <span className={styles.lable} data-placeholder="Account"></span>
                        </div>
                        {formik.errors.account && formik.touched.account && (
                            <div className={styles.validate}>
                                {formik.errors.account}
                            </div>
                        )}

                        <div className={styles.inputContainer}>
                            <input
                                required
                                name="password"
                                type={(showPassword) ? "text" : "password"}
                                className={styles.input}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <span className={styles.lable} data-placeholder="Password"></span>
                            <span
                                className={styles.btnShowPass}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {(showPassword) ? <FAws icon={faEyeSlash} /> : <FAws icon={faEye} />}
                            </span>
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <div className={styles.validate}>
                                {formik.errors.password}
                            </div>
                        )}

                        <div className={styles.inputContainer}>
                            <input
                                required
                                name="confirmPassword"
                                type={(showPassword) ? "text" : "password"}
                                className={styles.input}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            <span className={styles.lable} data-placeholder="Confirm password"></span>
                            <span
                                className={styles.btnShowPass}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {(showPassword) ? <FAws icon={faEyeSlash} /> : <FAws icon={faEye} />}
                            </span>
                        </div>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <div className={styles.validate}>
                                {formik.errors.confirmPassword}
                            </div>
                        )}

                        <div style={{ marginTop: '2.25rem' }}>
                            {error && (
                                <div className={styles.error}>
                                    {error}
                                </div>
                            )}
                            <button type='submit' className={styles.btnSubmit}>Sign Up</button>
                        </div>

                        <div className='text-center mt-2 mb-4'>
                            <span>Already have an account? </span>
                            <Link to='/login' className={styles.link}>Sign In</Link>
                        </div>

                        <div className='text-center'>
                            <span className={styles.ortherLable}>Or</span>
                            <div>
                                <a href='FB' className={styles.iconFacebook}><FAws icon={faFacebookF} /></a>
                                <a href='GG' className={styles.iconGoogle}><FAws icon={faGoogle} /></a>
                                <a href='TT' className={styles.iconTwitter}><FAws icon={faTwitter} /></a>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default Register;