import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextField from "@mui/material/TextField";

import "./Register.css";
import { Box } from "@mui/material";

const formVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div className="auth-container">
      <Box
        sx={{
          width: { xs: 350, sm: 420, md: 480 },
        }}
      >
        <motion.div
          className="auth-box"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="tabs"
            initial={{ y: -40, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <motion.button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
              transition={{ ease: "easeOut", duration: 2 }}
              whileTap={{ scale: 2 }}
            >
              Login
            </motion.button>
            <motion.button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
              transition={{ ease: "easeOut", duration: 2 }}
            >
              Sign Up
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="form-content "
              >
                <h2>Login</h2>
                <TextField id="email" label="Email" variant="standard" />{" "}
                <TextField id="password" label="Password" variant="standard" />{" "}
                <button className="mt-3">Login</button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="form-content"
              >
                <h2 className="mt-3">Sign Up</h2>
                <TextField id="name" label="Name" variant="standard" />
                <TextField id="email" label="Email" variant="standard" />{" "}
                <TextField id="password" label="Password" variant="standard" />{" "}
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="standard"
                />{" "}
                <TextField id="phone" label="Phone" variant="standard" />
                <button className="mt-3">Create Account</button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default AuthPage;
