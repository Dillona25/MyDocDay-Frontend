import FormWrapper from "../../../components/common/FormWrapper";
import { TextInput } from "../../../components/common/Inputs";
import Button from "../../common/Button";

const AddAppointments = () => {
  return (
    <>
      <FormWrapper className="mb-5">
        <div className="row mb-4">
          <div className="col-12">
            <TextInput
              labelText="Appointment Title"
              placeholder="Appointment Title"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <span>Create Select Field</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <TextInput type="date" labelText="Appointment Date" />
          </div>
          <div className="col-6">
            <TextInput type="time" labelText="Appointment Time" />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <span>Create Radio Input</span>
          </div>
        </div>
      </FormWrapper>
      <div className="row">
        <div className="col-12 text-end">
          <Button buttonText="Add Appointment" type="submit" />
        </div>
      </div>
    </>
  );
};

export default AddAppointments;
