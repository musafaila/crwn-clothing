import "./form-input.styles.scss";

const FormInput = (props) => {
  const { label, id, ...otherProps } = props;
  return (
    label && (
      <div className="form-group">
        <input className="form-input" {...otherProps} />
        <label
          htmlFor={id}
          className={`form-input-label ${
            otherProps.value && (otherProps.value.length > 0 ? "shrink" : ""
            )}`}
        >
          {label}
        </label>
      </div>
    )
  );
};

export default FormInput;