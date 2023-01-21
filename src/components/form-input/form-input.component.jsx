import "./form-input.styles.scss";

const FormInput = (props) => {
  const { label, ...otherProps } = props; //props is an object with properties
  //   console.log({ ...otherProps }); //...otherProps is what's left in props
  //0.conditionally render label if it is passed down
  //1.conditionally render the "shrink" classname if input has non-null value (otherProps.value.length ? means if the value's length is not zero, it's true)
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`form-input-label ${
            otherProps.value.length ? "shrink" : null
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
