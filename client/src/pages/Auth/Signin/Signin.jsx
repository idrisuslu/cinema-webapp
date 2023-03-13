import React from "react";
import { useFormik } from "formik";
import styles from "../Signup/signup.module.css";
import validationSchema from "./validation";
import { fetchLogin } from "../../../api";

function Signin() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                const response = await fetchLogin(values);
                console.log(response);
            } catch (e) { }
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.headTitleContainer} ><p className={styles.headTitle}>Login</p></div>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-group" >
                    <label className={styles.lbl} name="email">Email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" className="form-control form-control-lg" type="email" placeholder="Enter your email" />
                </div>


                <div className="form-group">
                    <label className={styles.lbl}>Password</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" className="form-control form-control-lg" type="password" placeholder="Enter your password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>

            </form>
        </div>
    );

}

export default Signin;