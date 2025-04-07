import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required("Please Enter First Name"),
  lastname: Yup.string().required("Please Enter Last Name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Valid Email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please Enter Valid Password"),
});

function Signup() {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // console.log(values);
      signupHandler(values);
    },
  });

  const signupHandler = async (values) => {
    try {
      let res = await axios.post("http://localhost:3000/users/signup", values);
      // console.log(res.data.data);
      toast.success('User Signup Succefully!')
      navigate('/login')
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-content">
          <div className="text-center fs-1">
            <MdAccountCircle />
          </div>
          <div>
            <h2 className="text-center">Create Account </h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-3">
              <div className="head-cnt">Your First Name</div>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div style={{ color: "red" }}>{formik.errors.firstname}</div>
              )}
            </div>
            <div className="mt-3">
              <div className="head-cnt">Your Last Name</div>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div style={{ color: "red" }}>{formik.errors.lastname}</div>
              )}
            </div>
            <div className="mt-3">
              <div className="head-cnt">Email</div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>
            <div className="mt-3">
              <div className="head-cnt">Password</div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
            </div>
            <div className="mt-3 ">
              <input
                type="submit"
                value="signup"
                className="button"
                style={{ color: "white" }}
              />
            </div>
            <div className="mt-3 ">
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
