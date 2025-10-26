import { useState } from "react";
import Button from "../../common/Button";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle when the input changes
  function handleInputChange(event, inputState) {
    console.log(event.target.value);
    inputState(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/onboarding/doctors/");
  }

  return (
    <FormWrapper
      className="mt-5 d-flex flex-column"
      id="sign-up-form"
      onSubmit={handleSubmit}
    >
      <div className="row mb-4">
        <div className="col-6">
          <TextInput
            name="firstName"
            onChange={(event) => handleInputChange(event, setFirstName)}
            required={true}
            labelText="First Name"
            placeholder="First Name"
          />
        </div>
        <div className="col-6">
          <TextInput
            name="lastName"
            onChange={(event) => handleInputChange(event, setLastName)}
            required={true}
            labelText="Last Name"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 mb-4">
          <TextInput
            name="email"
            onChange={(event) => handleInputChange(event, setEmail)}
            required={true}
            type="email"
            labelText="Your Email"
            placeholder="Your Email"
          />
        </div>
        <div className="col-12 mb-4">
          <TextInput
            name="phone"
            onChange={(event) => handleInputChange(event, setPhone)}
            required={true}
            labelText="Your Phone Number"
            placeholder="Your Phone Number"
          />
        </div>

        <div className="col-12 mb-4">
          <TextInput
            name="password"
            onChange={(event) => handleInputChange(event, setPassword)}
            required={true}
            labelText="Create A Password"
            placeholder="Create A Password"
            type="password"
          />
        </div>
        <div className="col-12">
          <TextInput
            name="password"
            onChange={(event) => handleInputChange(event, setConfirmPassword)}
            required={true}
            labelText="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>
      </div>
      <Button buttonText="Create Account" type="submit" />
    </FormWrapper>
  );
};

export default SignupForm;
