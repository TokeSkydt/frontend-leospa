export async function getAbout(): Promise<about> {
  const res = await fetch('http://localhost:5029/about');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  return res.json();
}

export async function updateAbout(data: Partial<about>): Promise<about> {
  const res = await fetch(`http://localhost:5029/about/admin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update about data');
  }

  return res.json();
}

export type about = {
  _id: string;
  title: string;
  content: string;
  __v: number;
}
