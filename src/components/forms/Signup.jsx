import { useState } from "react";
import Button from "../common/Button";
import FormWrapper from "../common/FormWrapper";
import { TextInput } from "../common/Inputs";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle when the input changes
  function handleInputChange(event, inputState) {
    console.log(event.target.value);
    inputState(event.target.value);
  }

  return (
    <FormWrapper className="mt-5 d-flex flex-column" id="sign-up-form">
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
        <div className="col-12">
          <TextInput
            name="email"
            onChange={(event) => handleInputChange(event, setEmail)}
            required={true}
            type="email"
            labelText="Your Email"
            placeholder="Your Email"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            name="phone"
            onChange={(event) => handleInputChange(event, setPhone)}
            required={true}
            labelText="Your Phone Number"
            placeholder="Your Phone Number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            name="password"
            onChange={(event) => handleInputChange(event, setPassword)}
            required={true}
            labelText="Create A Password"
            placeholder="Create A Password"
            type="password"
          />
        </div>
      </div>
      <Button disabled buttonText="Create Account" type="submit" />
    </FormWrapper>
  );
};

export default SignupForm;
