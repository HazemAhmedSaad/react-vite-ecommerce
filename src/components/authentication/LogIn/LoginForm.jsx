import { motion } from "motion/react";
import { TextField } from "@mui/material";

export default function LoginForm({formVariants}) {
  return (
    <motion.form
      key="login"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="form-content"
    >
      <h2>Login</h2>
      <TextField label="Email" variant="standard" />
      <TextField label="Password" type="password" variant="standard" />
      <button type="submit" className="mt-3">Login</button>
    </motion.form>
  );
}
