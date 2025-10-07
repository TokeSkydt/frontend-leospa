export async function getTeamData(): Promise<Team[]> {
  const res = await fetch('http://localhost:5029/team');
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  return res.json();
}

export type Team = {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
  image: string;
  __v: number;
}
