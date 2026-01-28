import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import "./AuthPage.css";
import ThemeToggle from "../Theme/ThemeToggle";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const formVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <motion.div className="auth-container">
      <Box sx={{ width: { xs: 350, sm: 420, md: 480 } }}>
        <motion.div
          className="auth-box"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {/* Theme Toggle */}
          <div className="theme-toggle-wrapper mb-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          {/* Tabs */}
          <div className="tabs ">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm formVariants={formVariants} />
            ) : (
              <SignUpForm formVariants={formVariants} />
            )}
          </AnimatePresence>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default AuthPage;
