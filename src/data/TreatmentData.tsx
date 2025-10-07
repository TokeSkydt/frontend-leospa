export async function getTreatmentsData(): Promise<treatmentsData[]> {
  const res = await fetch('http://localhost:5029/treatment');
  if (!res.ok) {
    throw new Error('Failed to fetch treatment data');
  }
  return res.json();
}

export type treatmentsData = {
  _id: string;
  title: string;
  content: string;
  image: string;
  __v: number;
}
