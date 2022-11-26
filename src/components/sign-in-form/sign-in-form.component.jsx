import { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //   reset form fields functions
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // on change handler function
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // on submit handler funcrion
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formFields);
    resetFormFields();
  };

  const googleSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with email and password</span>
      <form onSubmit={onSubmitHandler}>
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

        <div className="button">
          <Button type="submit" childNode="Sign In" />
          <Button
            childNode="Sign In with goggle popup"
            onClick={googleSignIn}
            buttonType="google"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;