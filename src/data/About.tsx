export async function getAbout(): Promise<about> {
  const res = await fetch('http://localhost:5029/about');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  return res.json();
}

export type about = {
  _id: string;
  title: string;
  content: string;
  __v: number;
}
