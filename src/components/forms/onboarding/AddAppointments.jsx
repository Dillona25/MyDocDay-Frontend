import { useState } from "react";
import FormWrapper from "../../../components/common/FormWrapper";
import { SelectInput, TextInput } from "../../../components/common/Inputs";
import Button from "../../common/Button";
import { mockApi } from "../../../api/authApi";

const AddAppointments = () => {
  // Dummy select options
  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];

  // Dummy select options
  const aptTypes = [
    { value: "In-Person", label: "In-Person" },
    { value: "Telehealth", label: "Telehealth" },
  ];

  // Form Data state, our value for each input is assigned to formData.whatever
  const [formData, setFormData] = useState({
    appointmentName: "",
    doctor: "",
    date: "",
    time: "",
    aptType: "",
  });

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

  // Send a request to our fake API
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await mockApi.post("/appointments", formData);
      console.log("Submitted appointment:", response);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <FormWrapper className="mb-5" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-12">
            <TextInput
              name="appointmentName"
              value={formData.appointmentName}
              onChange={handleChange}
              labelText="Appointment Title"
              placeholder="Appointment Title"
              required
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <SelectInput
              name="doctor"
              value={formData.doctor}
              id="doctor-select"
              labelText="Select Doctor"
              options={fruitOptions}
              onChange={handleChange}
              defaultOptionText="Select Doctor"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <TextInput
              name="date"
              value={formData.date}
              type="date"
              labelText="Appointment Date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <TextInput
              name="time"
              value={formData.time}
              type="time"
              labelText="Appointment Time"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <SelectInput
              value={formData.aptType}
              name="aptType"
              id="appointment-type-select"
              labelText="Select appointment type"
              options={aptTypes}
              defaultOptionText="Select Appointment Type"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-end">
            <Button buttonText="Add Appointment" type="submit" />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default AddAppointments;
