export type Student = {
  id: string;
  name: string;
  panel: string;
  roll: number;
  domains: string[];
};

export type Group = {
  id: string;
  name: string;
  members: Student[];
};

export type Project = {
  id: string;
  name: string;
  domain: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  reviews: {
    review1: '-' | 'pending' | 'In-progress' | 'Completed' | 'approved';
    review2: '-' | 'pending' | 'In-progress' | 'Completed' | 'approved';
    review3: '-' | 'pending' | 'In-progress' | 'Completed' | 'approved';
  };
};

export const PANELS = ['Panel A', 'Panel B', 'Panel C', 'Panel D'] as const;

export const DOMAINS = [
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Cloud Computing',
  'Cybersecurity',
  'Data Science',
] as const;