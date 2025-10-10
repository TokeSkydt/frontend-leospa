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

export async function getAllHeroes(): Promise<hero[]> {
  const res = await fetch('http://localhost:5029/hero');
  if (!res.ok) throw new Error('Failed to fetch heroes');
  return res.json();
}

export async function getHeroById(id: string): Promise<hero | null> {
  const res = await fetch(`http://localhost:5029/hero/${id}`);
  if (!res.ok) return null;
  return res.json();
}


// delete hero med id
export async function deleteHero(id: string): Promise<void> {
  const res = await fetch(`http://localhost:5029/hero/admin/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete hero: ${text}`);
  }
}

//hero put request
export async function updateHero(id: string, updatedData: Partial<hero>): Promise<hero> {
  const res = await fetch(`http://localhost:5029/hero/admin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update hero: ${text}`);
  }

  return res.json();
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


