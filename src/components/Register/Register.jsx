import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TextField } from "@mui/material";
import "./Register.css";
import { Box } from "@mui/material";
import { useFormik } from "formik";

const formVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
      console.log(JSON.stringify(values, null, 2));
    },
  });
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
          whileHover={{ scale: 1.01 }}
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
              transition={{ ease: "easeOut", duration: 1 }}
              whileTap={{ scale: 1.2 }}
            >
              Login
            </motion.button>
            <motion.button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
              transition={{ ease: "easeOut", duration: 1 }}
              whileTap={{ scale: 1.2 }}
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
                <button type="submit" className="mt-3">
                  Login
                </button>
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
                onSubmit={formikSignUp.handleSubmit}
              >
                <h2 className="mt-3">Sign Up</h2>
                <TextField
                  id="name"
                  label="Name"
                  variant="standard"
                  name="name"
                  value={formikSignUp.values.name}
                  onChange={formikSignUp.handleChange}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  name="email"
                  value={formikSignUp.values.email}
                  onChange={formikSignUp.handleChange}
                />{" "}
                <div className="position-relative d-flex align-items-center">
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formikSignUp.values.password}
                    onChange={formikSignUp.handleChange}
                    className="w-100"
                  />
                  <button
                    className="position-absolute end-0 btn btn-sm "
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                </div>
                <div className="position-relative d-flex align-items-center">
                  <TextField
                    id="rePassword"
                    label="Confirm Password"
                    variant="standard"
                    type={showRePassword ? "text" : "password"}
                    name="rePassword"
                    value={formikSignUp.values.rePassword}
                    onChange={formikSignUp.handleChange}
                    className="w-100"
                  />
                  <button
                    className="position-absolute end-0 btn btn-sm mt-2"
                    type="button"
                    onClick={() => setShowRePassword((prev) => !prev)}
                    edge="end"
                  >
                    <i
                      className={
                        showRePassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                </div>
                <TextField
                  id="phone"
                  label="Phone"
                  variant="standard"
                  name="phone"
                  className="dark"
                  value={formikSignUp.values.phone}
                  onChange={formikSignUp.handleChange}
                />
                <button type="submit" className="mt-3">
                  Create Account
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default AuthPage;
