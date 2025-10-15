// src/components/common/Input.stories.jsx

import Input from "../components/common/Input";

export default {
  title: "Components/Common/Input",
  component: Input,
  argTypes: {
    labelText: { control: "text" },
    type: { control: "text" },
    value: { control: "text" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    type: "",
    labelText: "First Name",
    value: "",
    placeholder: "First Name",
    className: "",
  },
};
