import { useState, useEffect, useCallback } from "react";
import { getProjects, addProject as addProjectServer, updateProject as updateProjectServer, deleteProject as deleteProjectServer } from "@/lib/db";
import type { Project } from "@/lib/types";

export type { Project } from "@/lib/types";

export function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      if (data) {
        setProjects(data);
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const addProject = useCallback(
    async (project: Omit<Project, "id" | "createdAt">) => {
      const newProject = await addProjectServer({ data: project });
      setProjects((prev) => [newProject, ...prev]);
    },
    [],
  );

  const updateProject = useCallback(
    async (id: string, updates: Partial<Omit<Project, "id" | "createdAt">>) => {
      await updateProjectServer({ data: { id, updates } });
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );
    },
    [],
  );

  const deleteProject = useCallback(async (id: string) => {
    await deleteProjectServer({ data: id });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, addProject, updateProject, deleteProject, loading };
}
