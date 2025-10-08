export async function getTreatmentsData(): Promise<treatmentsData[]> {
  const res = await fetch('http://localhost:5029/treatment');
  if (!res.ok) {
    throw new Error('Failed to fetch treatment data');
  }
  return res.json();
}

export async function postTreatment(treatment: NewTreatment) {
  const formData = new FormData();
  formData.append("title", treatment.title);
  formData.append("content", treatment.content);
  formData.append("image", treatment.image);

  const res = await fetch("http://localhost:5029/treatment/admin", {
    method: "POST",
    body: formData, // 👈 FormData goes here 
  });

  if (!res.ok) {
    throw new Error(`Failed to create treatment: ${res.statusText}`);
  }

  return res.json();
};

export async function putTreatment(treatment: treatmentsData) {
  const formData = new FormData();
  formData.append("title", treatment.title);
  formData.append("content", treatment.content);
  formData.append("image", treatment.image);

  const res = await fetch("http://localhost:5029/treatment/admin/${treatment.id}", {
    method: "PUT",
    body: formData, // 👈 FormData goes here
  });

  if (!res.ok) {
    throw new Error(`Failed to update treatment: ${res.statusText}`);
  }

  return res.json();
};

// export async function getTreatmentsData(): Promise<treatmentsData[]> {
//   const res = await fetch('http://localhost:5029/treatment');
//   if (!res.ok) {
//     throw new Error('Failed to fetch treatment data');
//   }
//   return res.json();
// }

// export async function postTreatment(treatment: treatmentsData) {
//   const formData = new FormData();
//   formData.append("title", treatment.title);
//   formData.append("content", treatment.content);
//   formData.append("image", treatment.image);

//   const res = await fetch("http://localhost:5029/treatment/admin", {
//     method: "POST",
//     body: formData, // 👈 FormData goes here
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to create treatment: ${res.statusText}`);
//   }

//   return res.json();
// };

// export async function putTreatment(treatment: treatmentsData) {
//   const formData = new FormData();
//   formData.append("title", treatment.title);
//   formData.append("content", treatment.content);
//   formData.append("image", treatment.image);

//   const res = await fetch("http://localhost:5029/treatment/admin/${treatment.id}", {
//     method: "PUT",
//     body: formData, // 👈 FormData goes here
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to update treatment: ${res.statusText}`);
//   }

//   return res.json();
// };

export async function deleteTreatment(id: string) {

  const res = await fetch(`http://localhost:5029/treatment/admin/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error(`Failed to delete treatmentment: ${res.statusText}`);
  }

  return res.json();
};

/* 
export async function postTreatment(treatment: treatmentsData) {

  const formData = new FormData();
  formData.append("title", treatment.title);
  formData.append("content", treatment.content);
  formData.append("image", treatment.image);

  const res = await fetch(`http://localhost:5029/treatment/admin`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to post treatment: ${res.statusText}`);
  }

  return res.json();
} */

export type treatmentsData = {
  _id: string;
  title: string;
  content: string;
  image: string;
  __v: number;
}

export type NewTreatment = {
  title: string;
  content: string;
  image: File;
};