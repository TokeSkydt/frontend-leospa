
// AppointmentData type defines the structure of an appointment object
export type AppointmentData = {
  _id?: string;           // Optional: Unique identifier for the appointment (from database)
  name: string;           // Name of the person booking the appointment
  email: string;          // Email address of the person
  phone: string;          // Phone number of the person
  treatment: string;      // Treatment ID as a string (references a treatment)
  dateandtime: string;    // Date and time in ISO 8601 format
  notes: string;          // Additional notes for the appointment
  __v?: number;           // Optional: Version key (from MongoDB)
};


// Fetch all appointments (e.g., for admin page)
export async function getAppointmentData(): Promise<AppointmentData[]> {
  const res = await fetch('http://localhost:5029/appointment/admin');
  if (!res.ok) {
    throw new Error('Failed to fetch appointments');
  }
  return res.json();
}


// Post a new appointment to the backend
export async function postAppointment(appointment: AppointmentData) {
  // Prepare form data for submission
  const formData = new FormData();
  formData.append("name", appointment.name); // Add name
  formData.append("email", appointment.email); // Add email
  formData.append("phone", appointment.phone); // Add phone
  // Split date and time from ISO string
  formData.append("date", appointment.dateandtime.split('T')[0]); // Add date (YYYY-MM-DD)
  formData.append("time", appointment.dateandtime.split('T')[1].substring(0, 5)); // Add time (HH:MM)
  formData.append("notes", appointment.notes ?? ""); // Add notes (optional)
  formData.append("treatment", appointment.treatment); // Add treatment ID

  // Send POST request to backend
  const res = await fetch("http://localhost:5029/appointment", {
    method: "POST",
    body: formData, // FormData goes here
  });

  if (!res.ok) {
    throw new Error(`Failed to create appointment: ${res.statusText}`);
  }

  return res.json();
};
