import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Register.css";
  const formVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  };

 function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div className="auth-container">
      <motion.div
        className="auth-box"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div className="tabs" 
          initial={{ y: -40, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          >
          <motion.button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
            transition={{ ease: "easeOut", duration:  2}}
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
              className="form"
            >
              <h2>Login</h2>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Login</button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="form"
            >
              <h2>Sign Up</h2>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Create Account</button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;