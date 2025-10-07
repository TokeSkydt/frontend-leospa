export async function getRecommendation(): Promise<Recommendation> {
  const res = await fetch('http://localhost:5029/recommendation');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  return res.json();
}


export type Recommendation = {
  created: Date;
  _id: string;
  name: string;
  title: string;
  content: string;
  image: string;
  __v: number;
}
