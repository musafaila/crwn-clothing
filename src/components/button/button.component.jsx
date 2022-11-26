import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = (props) => {
  const { childNode, buttonType, ...otherProps } = props;
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {childNode}
    </button>
  );
};

export default Button;

// todo: make a sign in form component
// todo: grab the email and password and save in a state (or aan obj)
// todo: console log the state / obj on submit.
// todo: attach a firebase login function.