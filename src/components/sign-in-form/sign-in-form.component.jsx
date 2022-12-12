import { useState, useContext } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  loginUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // grab our setter function from UserContext.
  // we'll use it to store the current auth user into a context.
  const { setCurrentUser } = useContext(UserContext);

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
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert("Password must be more than six characters!");
      return;
    }

    try {
      const { user } = await loginUserWithEmailAndPassword(email, password);

      setCurrentUser(user);
      // console.log(UserContext['currentUser']);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email!");
          break;
        case "auth/network-request-failed":
          alert(
            "Network error, please check your network settings and try again!"
          );
        default:
          alert(`Something went wrong, please try again! ${error.message}`);
          break;
      }
    }
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

        <div className="buttons-container">
          <Button type="submit" childNode="Sign In" />
          <Button
            type="button"
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
