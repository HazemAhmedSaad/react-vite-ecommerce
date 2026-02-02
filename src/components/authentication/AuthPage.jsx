import {useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box } from "@mui/material";
import "./AuthPage.css";
import LoginForm from "./LogIn/LoginForm";
import SignUpForm from "./SignUp/SignUpForm";

const formVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [errorSignUp, setErrorSignUp] = useState(null);
  const [successSignUp, setSuccessSignUp] = useState(null);
  const [errorLogIn, setErrorLogIn] = useState(null);
  const [successLogIn, setSuccessLogIn] = useState(null);

  return (
    <motion.div className="auth-container">
      <Box sx={{ width: { xs: 350, sm: 420, md: 480 } }}>
        <motion.div
          className="auth-box overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >

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
              <LoginForm
                key={"login"}
                {...{
                  formVariants,
                  errorLogIn,
                  setErrorLogIn,
                  successLogIn,
                  setSuccessLogIn,
                }}
              />
            ) : (
              <SignUpForm
                key={"sginup"}
                {...{
                  formVariants,
                  errorSignUp,
                  setErrorSignUp,
                  successSignUp,
                  setSuccessSignUp,
                  setIsLogin,
                  isLogin,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default AuthPage;
