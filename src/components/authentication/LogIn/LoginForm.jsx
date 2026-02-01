import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import validateLogIn from "./validateLogIn";
export default function LogInForm({
  formVariants,
  errorLogIn,
  setErrorLogIn,
  successLogIn,
  setSuccessLogIn,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const navigateFunc = useNavigate();
  const loginToAccount = async (values, {setSubmitting}) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values,
      );
      if (data.message == "success") {
        setSuccessLogIn("Logged in successfully");
        setTimeout(() => {
          navigateFunc("/");
        }, 1000);
      }
    } catch (error) {
      setErrorLogIn(error.response.data.message);
    }
    finally{
      setSubmitting(false)
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
              !formikLog.isValid ||
              !formikLog.dirty ||
              formikLog.isSubmitting
              
            )}
            className="mt-3"
          >
            {formikLog.isSubmitting?  (
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
              " Create Account"
            )}
          </button>
          <div></div>
        </motion.form>
      )}
    </>
  );
}
