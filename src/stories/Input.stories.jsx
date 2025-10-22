// src/components/common/Input.stories.jsx

import { TextInput } from "../components/common/Inputs";

export default {
  title: "Components/Common/Inputs",
  component: TextInput,
  argTypes: {
    labelText: { control: "text" },
    value: { control: "text" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    labelText: "First Name",
    value: "",
    placeholder: "First Name",
    className: "",
  },
};
