import { clinicFields, doctorFields } from "../../../data/AddDocFormFields";
import FormWrapper from "../../common/FormWrapper";
import { Input, TextInput } from "../../common/Inputs";

const AddDoctors = () => {
  return (
    <FormWrapper id="add-doctor-form">
      <div className="row mb-3">
        <div className="col-12">
          <h5 className="border-bottom pb-2">Doctor's Information</h5>
        </div>
      </div>
      <div className="row mb-4">
        {doctorFields.map((field, index) => (
          <div className={`${field.colSize} mb-4`} key={index}>
            {field.type !== "text" ? (
              <Input
                labelText={field.label}
                type="file"
                name={field.name}
                className="form-control"
              />
            ) : (
              <TextInput
                labelText={field.label}
                placeholder={field.label}
                type={field.type}
                name={field.name}
              />
            )}
          </div>
        ))}
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <h5 className="border-bottom pb-2">Doctors's Clinic Information</h5>
        </div>
      </div>
      <div className="row mb-4">
        {clinicFields.map((field, index) => (
          <div className={`${field.colSize} mb-4`} key={index}>
            <TextInput
              labelText={field.label}
              placeholder={field.label}
              type={field.type || "text"}
              name={field.name}
            />
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default AddDoctors;
