import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Valid Email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please Enter Valid Password"),
});

function Login() {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // console.log(values);
      loginHandler(values);
    },
  });

  const loginHandler = async (values) => {
    try {
      let res = await axios.post("http://localhost:3000/users/login", values);
      // console.log(res.data.data);
      console.log("user token==>",res.data.token);
      localStorage.setItem("user_token",res.data.token)
      toast.success("User Login Succefully!");
      navigate('/')
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
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
            <h2 className="text-center">Login </h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-3">
              <div className="head-cnt">Email</div>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                value="Login"
                className="button"
                style={{ color: "white" }}
              />
            </div>
            <div className="mt-3 ">
              <p className="text-center">
                Don't have an account? <Link to="/signup"> Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
