/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "./Input";
import {
  emailValidationMessage,
  validatePasswordMessage,
  passwordConfirmationMessage,
  validateUsernameMessage,
  validateUsername,
  validateConfirPassword,
  validateEmail,
  validatePassword,
  validateRole,
  roleValidateMessage,
} from "../shared/validators";
import { useRegister } from "../shared/hooks";

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();

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
    passwordConfir: {
      value: "",
      isValid: false,
      showError: false,
    },
    userName: {
      value: "",
      isValid: false,
      showError: false,
    },
    roleUser: {
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
      case "passwordConfir":
        isValid = validateConfirPassword(formState.password.value, value);
        break;
      case "userName":
        isValid = validateUsername(value);
        break;
      case "roleUser":
        isValid = validateRole(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    register(formState.email.value, formState.password.value, formState.userName.value, formState.roleUser.value);
   // console.log(formState.email.value, formState.password.value, formState.userName.value, formState.roleUser.value);
  };

  const isSubmitButtonDisabled = isLoading || 
                                !formState.password.isValid || 
                                !formState.email.isValid ||
                                !formState.passwordConfir.isValid ||
                                !formState.userName.isValid ||
                                !formState.roleUser.isValid;
  return (
    <div className="register-container">
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
          field="userName"
          label="Username"
          value={formState.userName.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.userName.showError}
          validationMessage={validateUsernameMessage}
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
        <Input
          field="passwordConfir"
          label="Passowrd Confirmation"
          value={formState.passwordConfir.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.passwordConfir.showError}
          validationMessage={passwordConfirmationMessage}
        />
        <Input
          field="roleUser"
          label="Role User"
          value={formState.roleUser.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.roleUser.showError}
          validationMessage={roleValidateMessage}
        />
        <button onClick={handleRegister} disabled={isSubmitButtonDisabled}>
          Register
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        ¿Ya tienes cuenta? ¡Inicia sesión acá!...
      </span>
    </div>
  );
};