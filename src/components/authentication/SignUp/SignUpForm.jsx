import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import validateRegister from "./validateRegister";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
export default function SignUpForm({
  formVariants,
  errorSignUp,
  setErrorSignUp,
  successSignUp,
  setSuccessSignUp,
  setIsLogin,
  isLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const registerNewUser = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      if (data.message == "success") {
        setSuccessSignUp("Account Created Successfully");
        setErrorSignUp(null);
        formik.resetForm();
        setTimeout(() => {
          setSuccessSignUp(null);
          setIsLogin(true);
        }, 1000);
      }
    } catch (error) {
      setErrorSignUp(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
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

    validate: (values) => validateRegister(values, errorSignUp, setErrorSignUp),
  });

  return (
    <>
      {successSignUp ? (
        <div>
          <div className="mt-4 text-center text-success">
            <i className="fa-solid fa-circle-check fa-5x"></i>
          </div>
          <div className="h2 mt-2 text-center text-success">
            {successSignUp}
          </div>
          <p className="h5 text-center">
            Congratulations! Your account has been created successfully. You can
            now log in.
          </p>
        </div>
      ) : (
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
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
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
              (formik.errors.email && formik.touched.email) || errorSignUp,
            )}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : errorSignUp
                  ? errorSignUp
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
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
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
              error={Boolean(
                formik.errors.rePassword && formik.touched.rePassword,
              )}
              helperText={
                formik.errors.rePassword &&
                formik.touched.rePassword &&
                formik.errors.rePassword
              }
            />
            <span onClick={() => setShowRePassword(!showRePassword)}>
              <i
                className={showRePassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
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

          <button
            type="submit"
            disabled={Boolean(
              !formik.isValid || !formik.dirty || formik.isSubmitting,
            )}
            className="mt-3"
          >
            {formik.isSubmitting ? (
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
              "Create Account"
            )}
          </button>
          <div></div>
        </motion.form>
      )}
    </>
  );
}
