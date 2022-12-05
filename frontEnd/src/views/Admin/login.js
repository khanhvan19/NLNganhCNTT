import { useState } from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FontAwesomeIcon as FAws } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import styles from './Admin.module.css'

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup
                .string()
                .required('You must fill in this section!'),
            password: Yup
                .string()
                .required('You must fill in this section!'),
        }),
        onSubmit: (values) => {
            axios
                .post("http://localhost:5000/api/admin/login", {
                    email: values.email,
                    password: values.password
                })
                .then((res) => {
                    if (res.data) {
                        localStorage.setItem("admin", JSON.stringify({
                            ...res.data
                        }))
                        navigate("/admin");
                    }
                })
                .catch((err) => {
                    setError(err.response.data.message)
                });
        }
    })

    return (
        <div className={styles.formLogin}>
            <h3 className={styles.headerFormLogin}>ADMIN LOGIN</h3>
            <form noValidate onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <input 
                        required
                        type="text" name="email" 
                        className="form-control" 
                        placeholder="E-Mail" 
                        value={formik.values.account}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className={styles.validate}>
                            {formik.errors.email}
                        </div>
                    )}
                </div>
                <div className='position-relative mb-3'>
                    <input 
                        required
                        type={(showPassword) ? "text" : "password"}
                        name="password"
                        className="form-control" 
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <span
                        className={styles.btnShowPass}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {(showPassword) ? <FAws icon={faEyeSlash} /> : <FAws icon={faEye} />}
                    </span>
                    {formik.errors.password && formik.touched.password && (
                        <div className={styles.validate}>
                            {formik.errors.password}
                        </div>
                    )}
                </div>
                <div className="col-12 mb-3">
                    { error ? (
                        <div className={styles.errorLogin}>
                            {error}
                        </div>
                    ) : (
                        <div>
                            <input required type="checkbox" id="checkRobot" className="form-check-input me-2" />
                            <label htmlFor="checkRobot">Tôi không phải người máy</label>
                        </div>
                    )}
                </div>
                <div>
                    <button className={styles.btnLogin}>Đăng nhập</button>
                </div>
                <div className={styles.footerFormLogin}>VBook</div>
            </form>
        </div>
    );
}

export default AdminLogin;