export async function getHeroData(): Promise<hero> {
  const res = await fetch('http://localhost:5029/hero?show=true');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }

  const data: hero[] = await res.json();

  // Find the single hero with show = true
  const heroToShow = data.find(h => h.show);

  if (!heroToShow) {
    throw new Error('Failed to fetch hero data, more than one is true');
  }
  return heroToShow; // return hero or throw error if none found
}



export type hero = {
  show: boolean;
  _id: string;
  title1: string;
  title2: string;
  content: string;
  link: string;
  __v: number;
}


