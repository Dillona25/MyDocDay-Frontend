import FormWrapper from "../../common/FormWrapper";
import { Input, TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useState } from "react";

const AddDoctors = () => {
  const [step, setStep] = useState("doctor");

  const handleChangeStep = (e) => {
    e.preventDefault();
    step === "doctor" ? setStep("clinic") : setStep("doctor");
  };

  return (
    <>
      <FormWrapper id="add-doctor-form">
        {step === "doctor" && (
          <>
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="border-bottom pb-2">Doctor's Information</h5>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TextInput
                  labelText="First Name"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Last Name"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Doctors Specialty"
                  placeholder="Doctors Speacialty"
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 text-center">
                <TextInput
                  labelText="Doctors Image"
                  placeholder="Doctors Image"
                />
                <span className="small text-body mt-1">
                  Note: Most doctors have public images on Google. Copy and
                  Paste a valid image URL here.
                </span>
              </div>
            </div>
          </>
        )}

        {step === "clinic" && (
          <>
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="border-bottom pb-2">
                  Doctors's Clinic Information
                </h5>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Clinic Name"
                  placeholder="Clinic Name"
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Street Address"
                  placeholder="Street Address"
                  className="mb-4"
                  required
                />
              </div>
              <div className="col-4">
                <TextInput labelText="City" placeholder="City" required />
              </div>
              <div className="col-4">
                <TextInput labelText="State" placeholder="State" required />
              </div>
              <div className="col-4">
                <TextInput labelText="Zipcode" placeholder="Zipcode" required />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Email"
                  placeholder="Clinic's Email"
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Phone"
                  placeholder="Clinic's Phone"
                />
              </div>
            </div>
          </>
        )}
      </FormWrapper>
      <div className="row">
        <div className="col-6 d-flex justify-content-start">
          <Button
            type="submit"
            onClick={handleChangeStep}
            buttonText={`${step === "doctor" ? "Next Step" : "Previous Step"}`}
          />
        </div>
        {step === "clinic" && (
          <div className="col-6 d-flex justify-content-end">
            <Button type="submit" buttonText="Add Doctor" />
          </div>
        )}
      </div>
    </>
  );
};

export default AddDoctors;
