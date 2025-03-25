export interface JobPost {
  id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  is_remote_work: number;
  company: string;
  location: string;
  application_deadline: string;
  contact: string;
  job_category: string;
  qualifications: string[];
  number_of_opening: number;
  salary_from: number;
  salary_to: number;
  employment_type: string;
}
