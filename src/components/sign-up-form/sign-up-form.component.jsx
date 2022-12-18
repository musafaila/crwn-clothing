import { useState } from "react";
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";


import FormInput from "../../components/form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormfields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  
  // clear the form after submit
  const formReset = () => {
    setFormFields(defaultFormfields);
  };

  //  on change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  // On submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords mismatch");
      return;
    }

    try {
      const { user } = await createAuthUserFromEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      formReset();
      
    } catch (error) {
      if ((error.code = "auth/email-already-in-use")) {
        alert("This user already exist");
      }
      console.error(`error creating the user: ${error.message}`);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>      
      <span>Sign Up with email and password</span>      
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          id="displayNameId"
          value={displayName}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          id="emailId"
          value={email}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          id="passwordId"
          value={password}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="passwordId"
          value={confirmPassword}
          required
          onChange={onChangeHandler}
        />

        <Button childNode="Sign Up" type="submit" />
        </form>
    </div>
  );
};

export default SignUpForm;