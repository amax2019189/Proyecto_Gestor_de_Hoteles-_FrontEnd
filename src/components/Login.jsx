/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "./Input";
import {
  emailValidationMessage,
  validatePasswordMessage,
  validateEmail,
  validatePassword,
} from "../shared/validators";
import { useLogin } from "../shared/hooks";

export const Login = ({ switchAuthHandler }) => {
  const {login, isLoading} = useLogin();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) =>({
        ...prevState,
        [field]:{
            ...prevState[field],
            isValid,
            showError: !isValid
        }
    }))
  };

  const handleLogin = (event) => {
    event.preventDefault()
    login(formState.email.value, formState.password.value)
  }

  const isSubmitButtonDisabled = isLoading || !formState.password.isValid || !formState.email.isValid
  return (
    <div className="login-container">
       
       <img className="img" src="https://i.pinimg.com/736x/d9/d4/00/d9d40084c1dd4af3cd5be9d2a40b246b.jpg"/>
        <h1>Login</h1>
        <p>Inicio de sesión con tu cuenta de Hoteles</p>
        <form className="auth-form">
        <Input
          field="email"
          label="Email"
          value={formState.email.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field="password"
          label="Password"
          value={formState.password.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={validatePasswordMessage}
        />
            <button onClick={handleLogin} disabled={isSubmitButtonDisabled}>
                Log in
            </button>
        </form>
        <span onClick={switchAuthHandler} className="auth-form-switch-label">
            ¿Aún no tienes una cuenta? ¡Registrate...!
        </span>
    </div>
  );
};