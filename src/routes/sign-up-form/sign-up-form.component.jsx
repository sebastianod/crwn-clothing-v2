import { useState } from "react";
import { createAuthUserFromEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../../components/button/button.component";

const SignUp = () => {
  const intialForm = {
    displayName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const [form, setForm] = useState(intialForm);
  const { displayName, email, password, confirmedPassword } = form;
  // console.log(form);

  const handleChange = (event) => {
    const { name, value } = event.target; //get the name, value properties from the input that triggered the event

    return setForm((prevForm) => {
      return { ...prevForm, [name]: value }; //use name (of the input being changed) as a variable and give what the user writes as its value
    });
  };

  const handleSubmit = async (event) => {
    //async since it depends on google
    event.preventDefault();
    //create user from the email and password submitted
    const userDocRef = await createAuthUserFromEmailAndPassword(
      displayName,
      email,
      password
    );
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="displayName"
          type="text"
          name="displayName"
          value={displayName}
          id="displayName"
          onChange={handleChange}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          id="email"
          onChange={handleChange}
          required
        />

        <FormInput
          label="password"
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={handleChange}
          required
        />

        <FormInput
          label="confirmedPassword"
          type="password"
          name="confirmedPassword"
          value={confirmedPassword}
          id="confirmedPassword"
          onChange={handleChange}
          required
        />

        <Button buttonType={""} type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUp;
