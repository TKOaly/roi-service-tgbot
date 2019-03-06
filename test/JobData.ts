import { generateJob } from "../src/MessageUtils";
import { Job } from "../src/models/Models";

// ========== Test case 1 ==========
export const jobs1Local: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// Updated company name & end date
export const jobs1Api: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company name",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:10",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: "2019-01-02 12:00:00",
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// ========== Test case 2 ==========

export const jobs2Local: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// New job to be added
export const newJob2 = {
  id: 2,
  company: {
    id: 1,
    name: "Test company",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: "2019-01-01 13:00:00",
    updated_at: "2019-01-01 13:00:00",
  },
  description: "Job desc",
  title: "Test job 2",
  url: "example.com/job_2",
  begin: "2019-01-01 13:00:00",
  created_at: "2019-01-01 13:00:00",
  end: null,
  tags: [
    {
      id: 1,
      created_at: "2019-01-01 13:00:00",
      name: "backend",
      updated_at: "2019-01-01 13:00:00",
    },
  ],
};

// New job returned in API responce
export const jobs2Api: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
  { ...newJob2 },
];

// ========== Test case 3 ==========

export const jobs3Local: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
  { ...newJob2 },
];

// Job removed here
export const jobs3Api: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// ========== Test case 4 ==========

export const jobs4Local: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// New job to be added
export const firstNewJob4 = {
  id: 2,
  company: {
    id: 1,
    name: "Test company",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: "2019-01-01 13:00:00",
    updated_at: "2019-01-01 13:00:00",
  },
  description: "Job desc",
  title: "Test job 2",
  url: "example.com/job_2",
  begin: "2019-01-01 13:00:00",
  created_at: "2019-01-01 13:00:00",
  end: null,
  tags: [
    {
      id: 1,
      created_at: "2019-01-01 13:00:00",
      name: "backend",
      updated_at: "2019-01-01 13:00:00",
    },
  ],
};

// New job to be added
export const secondNewJob4 = {
  id: 3,
  company: {
    id: 1,
    name: "Test company",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: "2019-01-01 13:00:00",
    updated_at: "2019-01-01 13:00:00",
  },
  description: "Job desc",
  title: "Test job 3",
  url: "example.com/job_3",
  begin: "2019-01-01 13:00:00",
  created_at: "2019-01-01 13:00:00",
  end: null,
  tags: [
    {
      id: 1,
      created_at: "2019-01-01 13:00:00",
      name: "devops",
      updated_at: "2019-01-01 13:00:00",
    },
  ],
};

export const jobs4Api: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
  { ...firstNewJob4 },
  { ...secondNewJob4 },
];

// ========== Test case 5 ==========

export const jobs5Local: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

export const jobs5Api: Job[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "Test company",
      logo: "test_company.png",
      sponsored: true,
      website: "example.com",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:01",
    },
    description: "Job desc",
    title: "Test job",
    url: "example.com/job_1",
    begin: "2019-01-01 12:00:00",
    created_at: "2019-01-01 12:00:00",
    end: null,
    tags: [
      {
        id: 1,
        created_at: "2019-01-01 12:00:00",
        name: "frontend",
        updated_at: "2019-01-01 12:00:00",
      },
    ],
  },
];

// ========== Test case 6 ==========

export const jobs6Local: Job[] = [{ ...generateJob(1) }];
export const jobs6Api: Job[] = [
  { ...generateJob(1) },
  { ...generateJob(2) },
  { ...generateJob(3) },
  { ...generateJob(4) },
  { ...generateJob(5) },
  { ...generateJob(6) },
];

// ========== Test case 7 ==========

export const jobs7Local: Job[] = [
  { ...generateJob(1) },
  { ...generateJob(2) },
  { ...generateJob(3) },
  { ...generateJob(4) },
  { ...generateJob(5) },
  { ...generateJob(6) },
];
export const jobs7Api: Job[] = [{ ...generateJob(1) }];

// ========== Test case 8 ==========

export const jobs8Local: Job[] = [
  { ...generateJob(1) },
  { ...generateJob(2) },
  { ...generateJob(3) },
  { ...generateJob(4) },
  { ...generateJob(5) },
];

export const jobs8Api: Job[] = [
  { ...generateJob(1) },
  { ...generateJob(2) },
  { ...generateJob(3) },
  { ...generateJob(4) },
  { ...generateJob(5) },
  { ...generateJob(6) },
];
