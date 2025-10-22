import { useState } from "react";
import { reminders } from "../../data/user";
import { Input } from "./Inputs";

const Reminders = () => {
  const [items, setItems] = useState(reminders ?? []);

  const handleSelectedTask = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isComplete: true } : item
      )
    );

    setTimeout(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }, 500);
  };

  return (
    <ul className="mt-4 d-flex flex-column gap-3 list-unstyled">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`${
            index % 2 !== 0 ? "bg-primary-light" : "bg-secondary-subtle"
          } d-flex gap-4 p-2 align-items-center rounded-2`}
        >
          <Input
            onChange={() => handleSelectedTask(item.id)}
            type="checkbox"
            className="p-0"
          />
          <p className="m-0 text-body">{item.content}</p>
        </li>
      ))}

      {items.length === 0 && (
        <li className="text-center text-body fw-semibold small">
          All reminders completed. Nice work!
        </li>
      )}
    </ul>
  );
};

export default Reminders;
