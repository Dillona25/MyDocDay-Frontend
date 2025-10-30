import { useState } from "react";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import Button from "../../common/Button";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormWrapper className="mt-5 d-flex flex-column" id="sign-in-form">
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            type="email"
            name="email"
            onChange={(event) => handleInputChange(event, setEmail)}
            required={true}
            labelText="Your Account Email"
            placeholder="Your Account Email"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            type="password"
            name="password"
            onChange={(event) => handleInputChange(event, setPassword)}
            required={true}
            labelText="Your Account Password"
            placeholder="Your Account Password"
          />
        </div>
      </div>
      <Button disabled buttonText="Sign In" type="submit" />
    </FormWrapper>
  );
};

export default SigninForm;
