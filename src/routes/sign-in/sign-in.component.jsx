import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };

    return (
      <div>
        <h1>I am the sign in page</h1>
        <button onClick={logGoogleUser}>Sign In with goggle popup</button>
      </div>
    );
};

export default SignIn;
