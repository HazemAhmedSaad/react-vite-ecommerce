import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import validateRegister from "./ValidateRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function SignUpForm({
  formVariants,
  errorSign,
  setErrorSign,
  successSign,
  setSuccessSign,
  isLogin,
  setIsLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigateFunc = useNavigate();
  const registerNewUser = async (values) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      console.log(data);
      if (data.message == "success") {
        console.log("success");
        setSuccessSign("Account Created Successfully");
        setTimeout(() => {
          // navigateFunc("/");
          setIsLogin(true);
          setSuccessSign(null);
        }, 1000);
      }
    } catch (error) {
      console.log("error", error.response.data.message);
      setErrorSign(error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: registerNewUser,
    //two correct way to pass func to valdidate
    // validate: validateRegister,
    validate: (values) => validateRegister(values, errorSign, setErrorSign),
  });

  return (
    <motion.form
      key="signup"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="form-content"
      onSubmit={formik.handleSubmit}
    >
      <h2>Sign Up</h2>
      <TextField
        label="Name"
        name="name"
        variant="standard"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.name && formik.touched.name)}
        helperText={
          formik.errors.name && formik.touched.name ? formik.errors.name : ""
        }
      />
      <TextField
        label="Email"
        name="email"
        variant="standard"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(
          (formik.errors.email && formik.touched.email) || errorSign,
        )}
        helperText={
          formik.errors.email && formik.touched.email
            ? formik.errors.email
            : errorSign
              ? errorSign
              : ""
        }
      />
      <div className="password-field">
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={Boolean(formik.errors.password && formik.touched.password)}
          helperText={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>
      <div className="password-field">
        <TextField
          label="Confirm Password"
          name="rePassword"
          type={showRePassword ? "text" : "password"}
          variant="standard"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={Boolean(formik.errors.rePassword && formik.touched.rePassword)}
          helperText={
            formik.errors.rePassword &&
            formik.touched.rePassword &&
            formik.errors.rePassword
          }
        />
        <span onClick={() => setShowRePassword(!showRePassword)}>
          <i className={showRePassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>
      <TextField
        label="Phone"
        name="phone"
        variant="standard"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.phone && formik.touched.phone)}
        helperText={
          formik.errors.phone && formik.touched.phone && formik.errors.phone
        }
      />
      {successSign ? (
        <div className="alert alert-success">{successSign}</div>
      ) : (
        ""
      )}

      <button
        type="submit"
        disabled={Boolean(
          !formik.isValid || !formik.dirty || formik.isSubmitting,
        )}
        className="mt-3"
      >
        {formik.isSubmitting || successSign ? (
          <div className="d-flex justify-content-center">
            <ThreeDots
              visible={true}
              height=""
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
  );
}
