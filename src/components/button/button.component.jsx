import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {//classes to be set depending on the prop entered when called
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  //otherProps contains the type of button etc
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
//the syntax Obj[property] is similar to obj.property, js feature.
console.log(BUTTON_TYPE_CLASSES["google"]);

export default Button;

// We have three types of buttons
// 1. default, 2. inverted, 3.Google sign-in
// we create an object that contains strings that will apply a classname
// in order to give it said classname to either button.
