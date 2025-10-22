import currentUserImage from "../assets/currentUser.png";

export const currentUser = {
  firstName: "Dave",
  lastName: "Henderson",
  profilePhoto:
    "https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VsZmllfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  usersDoctors: [
    {
      drFirstName: "Dr. Ruth",
      drLastName: "Mendalin",
      drProfileImage:
        "https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      drID: "1",
      drProfession: "Neurosurgeon",
      drType: "person",
      drOffice: {
        drOfficeName: "University Of Washington Montlake",
        drOfficeAddress: "1959 NE Pacific St Main Hospital, Seattle, WA 98195",
      },
    },
    {
      drFirstName: "Dr. Scott",
      drLastName: "Jenkins",
      drProfileImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      drID: "7",
      drProfession: "ENT",
      drType: "person",
      drOffice: {
        drOfficeName: "University Of Washington Montlake",
        drOfficeAddress: "1959 NE Pacific St Main Hospital, Seattle, WA 98195",
      },
    },
    {
      drFirstName: "Dr. Sara",
      drLastName: "Carter",
      drProfileImage:
        "https://images.unsplash.com/photo-1655249481446-25d575f1c054?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      drID: "2",
      drProfession: "Oncologist",
      drType: "person",
      drOffice: {
        drOfficeName: "University Of Washington Montlake",
        drOfficeAddress: "1959 NE Pacific St Main Hospital, Seattle, WA 98195",
      },
    },
    {
      drFirstName: "Dr. Jeff",
      drLastName: "Teague",
      drProfileImage:
        "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      drID: "4",
      drProfession: "Dermatologist",
      drType: "person",
      drOffice: {
        drOfficeName: "University Of Washington Montlake",
        drOfficeAddress: "1959 NE Pacific St Main Hospital, Seattle, WA 98195",
      },
    },
    {
      drFirstName: "UNL Dental",
      drLastName: "",
      drProfileImage: "",
      drID: "3",
      drProfession: "Dentist",
      drType: "entity",
      drOffice: {
        drOfficeName: "University Of Nebraska-Lincoln Dental",
        drOfficeAddress: "1959 NE Pacific St Main Hospital, Seattle, WA 98195",
      },
    },
  ],
  upcomingAppointments: [
    {
      id: "appt-001",
      doctorId: "1",
      doctorName: "Ruth Mendalin",
      title: "Post-op",
      start: "2025-10-21T09:30:00-07:00",
      end: "2025-10-14T10:00:00-07:00",
      location: "UW Montlake - Room 204",
      type: "In-person",
    },
    {
      id: "appt-002",
      doctorId: "2",
      doctorName: "Scott Jenkins",
      title: "Hearing Test",
      start: "2025-10-22T13:00:00-07:00",
      end: "2025-10-21T13:30:00-07:00",
      location: "UW Montlake - Room 309",
      type: "In-person",
    },
    {
      id: "appt-003",
      doctorId: "3",
      doctorName: "UNL Dental",
      title: "Routine cleaning",
      start: "2025-11-20T08:15:00-07:00",
      end: "2025-10-20T09:00:00-07:00",
      location: "UNL Dental Clinic",
      type: "In-person",
    },
    {
      id: "appt-004",
      doctorId: "7",
      doctorName: "Ruth Mendalin",
      title: "MRI results review",
      start: "2025-10-28T11:00:00-07:00",
      end: "2025-10-18T11:45:00-07:00",
      location: "UW Montlake - Radiology",
      type: "In-person",
    },
  ],
};

export const reminders = [
  {
    id: "1",
    owner: "Dave",
    content: "Schedule your 6 month MRI for December!",
    status: "incomplete",
    type: "task",
  },
  {
    id: "2",
    owner: "Dave",
    content: "Schedule 6 month dental cleaning for this month!",
    status: "incomplete",
    type: "task",
  },
  {
    id: "3",
    owner: "Dave",
    content: "You have two appointments in the next 30 days!",
    status: "incomplete",
    type: "reminder",
  },
];
