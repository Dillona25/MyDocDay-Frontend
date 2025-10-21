import ReminderIcon from "../../assets/Reminders-icon.svg";
import { reminders } from "../../data/user";
import Input from "../common/Input";
import Reminders from "../common/Reminders";

const RemindersWidget = () => {
  return (
    <section className="border border-light rounded-3 p-3 position-relative">
      <img
        className="position-absolute reminders-icon"
        alt="Reminders Icon"
        src={ReminderIcon}
      />
      <h3>Reminders</h3>
      <Reminders />
    </section>
  );
};

export default RemindersWidget;
