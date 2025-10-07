export async function getFooterData(): Promise<FooterData> {
  const res = await fetch('http://localhost:5029/footer');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  return res.json();
}

export type FooterData = {
  _id: string;
  name: string;
  cvr: string;
  address: string;
  zipncity: string;
  phone: string;
  email: string;
  openinghours: string;
  __v: number;
}
