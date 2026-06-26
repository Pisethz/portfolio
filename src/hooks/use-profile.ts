import { useState, useEffect, useCallback } from "react";

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
  avatar: string; // base64 dataURL or empty
  hardSkills: string[];
  softSkills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  references: ReferenceItem[];
}

const STORAGE_KEY = "portfolio-profile";

const defaultProfile: ProfileData = {
  name: "Chan Piseth",
  title: "IT Support Specialist & Developer",
  tagline:
    "Full-stack developer, IoT builder, and IT support specialist crafting reliable systems from Cambodia.",
  email: "piseth79@gmail.com",
  phone: "(+855) 17 762 585",
  location: "Poi Pet, Banteay Meanchey, Cambodia",
  about: {
    gender: "Male",
    nationality: "Khmer",
    dob: "September 10, 2002",
    address:
      "Gambel Village, Gambel Commune, Serey Sophon Town, Banteay Meanchey",
    languages: "Khmer (Native), English (Good)",
  },
  avatar: "",
  hardSkills: [
    "Vue.js",
    "PHP",
    "Laravel",
    "C#",
    "Node.js",
    "JavaScript",
    "Bootstrap",
    "API (JSON)",
    "MySQL",
    "SQL Server",
    "WebSockets",
    "Networking",
    "MikroTik",
    "Photoshop",
    "Illustration",
  ],
  softSkills: [
    "Communication",
    "Teamwork",
    "Perseverance",
    "Problem Solving",
    "Critical Thinking",
  ],
  experiences: [
    {
      id: "exp-1",
      period: "May 2025 – Present",
      title: "Technical / IT Support, Networking",
      company: "Pojet Technology",
      location: "Poi Pet, Cambodia",
      bullets: ["IT Support and Networking services"],
    },
    {
      id: "exp-2",
      period: "March 2025 – May 2025",
      title: "IT Support, IT Officer, Database Developer",
      company: "Union Tower",
      location: "Poi Pet, Cambodia",
      bullets: [
        "Provided IT support and officer duties",
        "Developed and maintained databases",
      ],
    },
    {
      id: "exp-3",
      period: "2022 – 2024",
      title: "Research & Development (R&D Center)",
      company: "Research and Technology Development Center",
      location: "Phnom Penh, Cambodia",
      bullets: [
        "Built and Developed an IoT Smart Home system",
        "Built and Developed an IoT platform for real-time monitoring of industrial mechatronic system",
        "Built Score keeper for Display and control for NPC robocon contest 2024 platform",
        "Mechatronic & Automation",
        "IoT-Agriculture",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      period: "2020 – 2024",
      degree: "Bachelor of Computer Science",
      school: "National Polytechnic Institute of Cambodia",
      location: "Phnom Penh",
    },
    {
      id: "edu-2",
      period: "2020 – 2022",
      degree: "Associate Degree of English",
      school: "National Polytechnic Institute of Cambodia",
      location: "Phnom Penh",
    },
    {
      id: "edu-3",
      period: "2014 – 2020",
      degree: "High School Diploma",
      school: "Gambel High School",
      location: "Banteay Meanchey",
    },
  ],
  references: [
    {
      id: "ref-1",
      name: "Mr. KH OEM Sambath",
      position: "Lecturer, Computer Science of NPIC",
      tel: "096 248 0632",
      email: "sambathkhoem@gmail.com",
    },
    {
      id: "ref-2",
      name: "Mr. LORN Vanneth",
      position: "Research Staff of Research and Technology Development Center",
      tel: "098 269 006",
      email: "lornvanneth@npic.edu.kh",
    },
  ],
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window === "undefined") return defaultProfile;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultProfile;
      return { ...defaultProfile, ...JSON.parse(stored) } as ProfileData;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // quota exceeded (large avatar) — ignore silently
    }
  }, [profile]);

  const update = useCallback((patch: Partial<ProfileData>) => {
    setProfile((p) => ({ ...p, ...patch }));
  }, []);

  const reset = useCallback(() => setProfile(defaultProfile), []);

  return { profile, update, reset };
}
