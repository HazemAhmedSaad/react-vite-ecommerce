import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import validateLogIn from "./validateLogIn";
import { autContext } from "../../../context/AuthenticationToken";
export default function LogInForm({
  formVariants,
  errorLogIn,
  setErrorLogIn,
  successLogIn,
  setSuccessLogIn,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(autContext);
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);

  const loginToAccount = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values,
      );
      if (data.message === "success") {
        setSuccessLogIn("Logged in successfully");
        localStorage.setItem("token", data.token);
        const from = location.state?.from?.pathname || "/";
         timeoutRef.current  = setTimeout(() => {
           navigate(from, { replace: true });
          setToken(data.token);
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorLogIn(error.response.data.message);
      } else {
        setErrorLogIn(
          "Server is temporarily unavailable. Please try again later.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };
  const formikLog = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginToAccount,

    validate: (values) => validateLogIn(values, errorLogIn, setErrorLogIn),
  });
useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);


  return (
    <>
      {successLogIn ? (
        <div className="">
          <div className="h2 mt-2 text-center text-success">{successLogIn}</div>
          <div className="mt-4 text-center text-success">
            <i className="fa-solid fa-circle-check fa-5x"></i>
          </div>
        </div>
      ) : (
        <motion.form
          key="login"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="form-content"
          onSubmit={formikLog.handleSubmit}
        >
          <h2>Login</h2>

          <TextField
            label="Email"
            name="email"
            variant="standard"
            value={formikLog.values.email}
            onChange={formikLog.handleChange}
            onBlur={formikLog.handleBlur}
            error={Boolean(
              (formikLog.errors.email && formikLog.touched.email) || errorLogIn,
            )}
            helperText={
              formikLog.errors.email && formikLog.touched.email
                ? formikLog.errors.email
                : errorLogIn
                  ? errorLogIn
                  : ""
            }
          />
          <div className="password-field">
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              value={formikLog.values.password}
              onChange={formikLog.handleChange}
              onBlur={formikLog.handleBlur}
              fullWidth
              error={Boolean(
                (formikLog.errors.password && formikLog.touched.password) ||
                errorLogIn,
              )}
              helperText={
                formikLog.errors.password && formikLog.touched.password
                  ? formikLog.errors.password
                  : errorLogIn
                    ? errorLogIn
                    : ""
              }
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </span>
          </div>

          <button
            type="submit"
            disabled={Boolean(
              !formikLog.isValid || !formikLog.dirty || formikLog.isSubmitting,
            )}
            className="mt-3"
          >
            {formikLog.isSubmitting ? (
              <div className="d-flex justify-content-center">
                <ThreeDots
                  visible={true}
                  height="25"
                  width="80"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              " Login"
            )}
          </button>
          <div></div>
        </motion.form>
      )}
    </>
  );
}
