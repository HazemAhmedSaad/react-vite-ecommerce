import { motion } from "motion/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";


export default function SignUpForm({formVariants}) {
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
    onSubmit: (values) => console.log(values),
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
      />
      <TextField
        label="Email"
        name="email"
        variant="standard"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <div className="password-field">
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
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
          fullWidth
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
      />
      <button type="submit">Create Account</button>
    </motion.form>
  );
}
