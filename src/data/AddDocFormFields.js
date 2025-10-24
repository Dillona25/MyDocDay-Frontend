export const addAppointmentFields = [
  {
    label: "Appointment Title",
    name: "appointment-title",
    colSize: "col-12",
    type: "text",
  },
  {
    label: "Doctor",
    name: "doctor",
    colSize: "col-12",
    type: "text",
  },
  {
    label: "Date",
    name: "date",
    colSize: "col-6",
    type: "date",
  },
  {
    label: "Time",
    name: "time",
    colSize: "col-6",
    type: "time",
  },
  {
    label: "Appointment Type",
    name: "appointment-type",
    colSize: "col-6",
    type: "time",
  },
];

// Fields (per appointment):

// Appointment Title (“Annual Checkup,” “Dental Cleaning,” etc.)

// Doctor (dropdown from Step 2 list)

// Date

// Time

// Location / Address (optional, can be used for map reminders later)

// Appointment Type (In-Person / Telehealth)

// Notes (reason for visit, pre-visit prep, etc.)

// Optional Additions:

// “Sync with Calendar?” (Google / Apple / Outlook toggle)

// “Add Reminder” (checkbox — with time options: 1 day before, 1 hour before, etc.)
