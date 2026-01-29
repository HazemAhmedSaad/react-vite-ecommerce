import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import validateRegister from "./ValidateRegister";
export default function SignUpForm({ formVariants }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => console.log(errors),
    validate: (values) => validateRegister(values),
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
        error={Boolean(formik.errors.email && formik.touched.email)}
        helperText={
          formik.errors.email && formik.touched.email ? formik.errors.email : ""
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
      <button type="submit" disabled={Boolean( !formik.isValid || !formik.dirty  || formik.isSubmitting)} className="mt-3">
        Create Account
      </button>
    </motion.form>
  );
}
