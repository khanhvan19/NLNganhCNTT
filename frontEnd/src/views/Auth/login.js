import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import {useStore} from '../../stores'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon as FAws } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

import styles from './Auth.module.css'

function Login() {
    const [state] = useStore();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            account: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            account: Yup
                .string()
                .required('You must fill in this section!'),
            password: Yup
                .string()
                .required('You must fill in this section!'),
        }),
        onSubmit: (values) => {
            axios
                .post("http://localhost:5000/api/auth/login", {
                    account: values.account,
                    password: values.password
                })
                .then((res) => {
                    if (res.data) {
                        localStorage.setItem("user", JSON.stringify({
                            ...res.data
                        }))
                        console.log(state.history);
                        (state.history!=="") ? navigate(state.history) : navigate("/");
                    }
                })
                .catch((err) => {
                    setError(err.response.data.message)
                });
        }
    })

    return (
        <Container>
            <Row>
                <Col lg='6' className='flexbox-center'>
                    <img src='/images/logo-vbook.png' alt='' className='w-75'/>
                </Col>
                <Col lg='6'>
                    <form noValidate onSubmit={formik.handleSubmit} className={styles.formLogin}>

                        <div className={styles.title}>Sign In</div>

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

                        <div className='text-end mt-1'>
                            <Link to='' className='default-link' >Forgot Password? </Link>
                        </div>

                        <div className='mt-4'>
                            {error && (
                                <div className={styles.error}>
                                    {error}
                                </div>
                            )}
                            <button type='submit' className={styles.btnSubmit}>Sign In</button>
                        </div>

                        <div className='text-center mt-2 mb-4'>
                            <span>Don't have an account? </span>
                            <Link to='/register' className={styles.link}>Sign Up</Link>
                        </div>

                        <div className='text-center'>
                            <span className={styles.ortherLable}>Or</span>
                            <div>
                                <a href='/FB' className={styles.iconFacebook}><FAws icon={faFacebookF} /></a>
                                <a href='/GG' className={styles.iconGoogle}><FAws icon={faGoogle} /></a>
                                <a href='/TT' className={styles.iconTwitter}><FAws icon={faTwitter} /></a>
                            </div>
                        </div>

                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;