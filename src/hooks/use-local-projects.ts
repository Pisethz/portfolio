import { useState, useEffect, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  createdAt: string;
}

const STORAGE_KEY = "portfolio-projects";

export function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Project[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = useCallback(
    (project: Omit<Project, "id" | "createdAt">) => {
      const newProject: Project = {
        ...project,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev]);
    },
    [],
  );

  const updateProject = useCallback(
    (id: string, updates: Partial<Omit<Project, "id" | "createdAt">>) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );
    },
    [],
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, addProject, updateProject, deleteProject };
}
