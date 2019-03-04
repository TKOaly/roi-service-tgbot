import { Job } from "../src/models/Models";

// ========== TEST 1 ==========
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

// ========== TEST 2 ==========

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

// ========== TEST 3 ==========

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

// ========== TEST 4 ==========

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

// ========== TEST 5 ==========

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

// ========== TEST 6 ==========

export const tmpJob = (id: number) => ({
  id,
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
  title: "Test job " + id,
  url: "example.com/job_" + id,
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
});

export const jobs6Local: Job[] = [{ ...tmpJob(1) }];
export const jobs6Api: Job[] = [
  { ...tmpJob(1) },
  { ...tmpJob(2) },
  { ...tmpJob(3) },
  { ...tmpJob(4) },
  { ...tmpJob(5) },
  { ...tmpJob(6) },
];

// ========== TEST 7 ==========

export const jobs7Local: Job[] = [
  { ...tmpJob(1) },
  { ...tmpJob(2) },
  { ...tmpJob(3) },
  { ...tmpJob(4) },
  { ...tmpJob(5) },
  { ...tmpJob(6) },
];
export const jobs7Api: Job[] = [{ ...tmpJob(1) }];
