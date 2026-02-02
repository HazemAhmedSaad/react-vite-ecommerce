const validateLogIn = (values, errorLogIn, setErrorLogIn) => {
  const errors = {};

  const email = values.email?.trim();

  // EMAIL
  if (errorLogIn) {
    setErrorLogIn(null);
  } else if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
  }

  // PASSWORD
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)) {
    errors.password = "Include upper, lower & number";
  }

  return errors;
};

export default validateLogIn;
