export interface Company {
  id: number;
  name: string;
  website: string;
  sponsored: boolean;
  created_at: string;
  updated_at: string;
  logo: string | null;
}

export interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  title: string;
  company: Company;
  tags: Tag[];
  description: string;
  begin: string;
  end: string;
  created_at: string;
  url: string;
}
