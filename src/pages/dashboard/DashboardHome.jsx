import AppointmentsWidget from "../../components/widgets/AppointmentsWidget";
import DoctorWidget from "../../components/widgets/DoctorWidget";
import RemindersWidget from "../../components/widgets/RemindersWidget";
import { currentUser } from "../../data/constants";

const DashboardHome = () => {
  const today = new Date();

  const formatWithOrdinal = (date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    });
    const parts = formatter.formatToParts(date);

    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const day = parts.find((p) => p.type === "day")?.value ?? "";

    return `${month} ${addOrdinalSuffix(Number(day))}`;
  };

  const addOrdinalSuffix = (day) => {
    const rule = new Intl.PluralRules("en-US", { type: "ordinal" }).select(day);
    const suffixMap = { one: "st", two: "nd", few: "rd", other: "th" };
    return `${day}${suffixMap[rule] ?? "th"}`;
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="text-primary text-poppins fw-semibold">
            Today is {formatWithOrdinal(today)}
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-9 d-flex flex-column gap-4">
          <AppointmentsWidget />
          <RemindersWidget />
        </div>
        <div className="col-12 col-lg-3 ms-lg-auto mt-4 mt-lg-0">
          <DoctorWidget />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
