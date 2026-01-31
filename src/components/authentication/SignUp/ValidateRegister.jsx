const validateRegister = (values, errorSign, setErrorSign) => {
  const errors = {};

  const name = values.name?.trim();
  const email = values.email?.trim();
  const phone = values.phone?.trim();

  // NAME
  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  // EMAIL
  if (errorSign) {
    setErrorSign(null);
  }
  else if (!email) {
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

  // RE-PASSWORD
  if (!values.rePassword) {
    errors.rePassword = "Confirm password is required";
  } else if (values.rePassword !== values.password) {
    errors.rePassword = "Passwords do not match";
  }

  // PHONE
  if (!phone) {
    errors.phone = "Phone number is required";
  } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(phone)) {
    errors.phone = "Invalid Egyptian phone number";
  }
  return errors;
};

export default validateRegister;
