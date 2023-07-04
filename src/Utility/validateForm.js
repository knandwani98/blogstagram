const validateForm = (errors, name, value) => {
  switch (name) {
    case "email":
      let emailError =
        value.indexOf("@") === -1 ? "Email does not contain @" : "";
      errors.email = emailError;
      break;

    case "password":
      let passWordError;

      if (value.length < 6) {
        passWordError = "Password should be at-least 6 characters";
      }

      let re = /([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/;
      if (!re.test(value)) {
        passWordError = "Password must contain a digit and a number";
      }

      errors.password = passWordError;
      break;

    case "username":
      let usernameError =
        value.length < 6 ? "Username must be at least 6 characters" : "";
      errors.username = usernameError;
      break;

    default:
      return errors;
  }
};

export default validateForm;
