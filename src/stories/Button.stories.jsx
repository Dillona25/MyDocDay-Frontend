import Button from "../components/common/Button";

export default {
  title: "Components/Common/Button",
  component: Button,
  argTypes: {
    buttonText: { control: "text" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    buttonText: "Submit",
    className: "bg-black text-white",
  },
};
