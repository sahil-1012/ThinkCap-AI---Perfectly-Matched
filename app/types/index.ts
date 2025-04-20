// app/types/index.ts

export interface User {
  id?: string;
  name: string;
  email: string;
  department: string;
  year: number;
  rollNumber: string;
  skills: string[];
  domainInterests: string[];
  completedAllocation: boolean;
  group?: {
    name: string;
    members: {
      name: string;
      email: string;
      roll: string;
    }[];
  } | null;
}

export interface Group {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    panel: string;
    roll: number;
    domains: string[];
  }[];
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  status: string;
  reviews: {
    review1: string;
    review2: string;
    review3: string;
  };
}

export interface Student {
  id: string;
  name: string;
  panel: string;
  roll: number;
  domains: string[];
}