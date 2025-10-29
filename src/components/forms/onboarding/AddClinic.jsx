import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";

const AddClinic = () => {
  return (
    <>
      <FormWrapper>
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
        </>
      </FormWrapper>
    </>
  );
};

export default AddClinic;
