import { useState } from "react";
import Button from "../../common/Button";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import { useNavigate } from "react-router-dom";
import { mockApi, registerUser } from "../../../api/authApi";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle our input change
  const handleChange = (event) => {
    // Destructure our form name
    const { name, value } = event.target;
    // Update our state immutably (new copy)
    setFormData((prev) => ({
      // New copy of prev state, so empty strings ""
      ...prev,
      // Updte state; time: "22:34"
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log("User registered successfully:", res);
      navigate("/onboarding/doctors/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

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
            value={formData.firstName}
            onChange={handleChange}
            required={true}
            labelText="First Name"
            placeholder="First Name"
          />
        </div>
        <div className="col-6">
          <TextInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            required={true}
            type="email"
            labelText="Your Email"
            placeholder="Your Email"
          />
        </div>
        <div className="col-12 mb-4">
          <TextInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required={true}
            labelText="Your Phone Number"
            placeholder="Your Phone Number"
          />
        </div>

        <div className="col-12 mb-4">
          <TextInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            labelText="Create A Password"
            placeholder="Create A Password"
            type="password"
          />
        </div>
        {/* <div className="col-12">
          <TextInput
            name="password"
            required={true}
            labelText="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />
        </div> */}
      </div>
      <Button
        buttonText="Next"
        type="submit"
        className="max-w-fit bg-primary-light text-white align-self-end"
      />
    </FormWrapper>
  );
};

export default SignupForm;
