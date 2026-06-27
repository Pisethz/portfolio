export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  school: string;
  location: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  tel: string;
  email: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  about: {
    gender: string;
    nationality: string;
    dob: string;
    address: string;
    languages: string;
  };
  avatar: string;
  hardSkills: string[];
  softSkills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  references: ReferenceItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  createdAt: string;
}
