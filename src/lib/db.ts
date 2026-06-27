import { createServerFn } from '@tanstack/react-start'
import type { ProfileData, Project } from '@/lib/types'

// ─── Profile ────────────────────────────────────────────────

export const getProfile = createServerFn({ method: 'GET' }).handler(async () => {
  const { getProfileData } = await import('./sheets')
  return getProfileData()
})

export const updateProfile = createServerFn({ method: 'POST' })
  .validator((d: Partial<ProfileData>) => d)
  .handler(async ({ data }) => {
    const { updateProfileData } = await import('./sheets')
    await updateProfileData(data)
    return { success: true }
  })

// ─── Projects ───────────────────────────────────────────────

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
  const { getProjectsData } = await import('./sheets')
  return getProjectsData()
})

export const addProject = createServerFn({ method: 'POST' })
  .validator((d: Omit<Project, 'id' | 'createdAt'>) => d)
  .handler(async ({ data }) => {
    const { getProjectsData, saveProjectsData } = await import('./sheets')
    const projects = await getProjectsData()
    const newProject: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    projects.unshift(newProject)
    await saveProjectsData(projects)
    return newProject
  })

export const updateProject = createServerFn({ method: 'POST' })
  .validator((d: { id: string; updates: Partial<Omit<Project, 'id' | 'createdAt'>> }) => d)
  .handler(async ({ data }) => {
    const { getProjectsData, saveProjectsData } = await import('./sheets')
    const projects = await getProjectsData()
    const updated = projects.map((p) =>
      p.id === data.id ? { ...p, ...data.updates } : p,
    )
    await saveProjectsData(updated)
    return { success: true }
  })

export const deleteProject = createServerFn({ method: 'POST' })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    const { getProjectsData, saveProjectsData } = await import('./sheets')
    const projects = await getProjectsData()
    await saveProjectsData(projects.filter((p) => p.id !== data))
    return { success: true }
  })

// ─── Admin ──────────────────────────────────────────────────

export const getAdminHash = createServerFn({ method: 'GET' }).handler(async () => {
  const { getAdminPasswordHash } = await import('./sheets')
  return getAdminPasswordHash()
})

export const setAdminHash = createServerFn({ method: 'POST' })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    const { setAdminPasswordHash } = await import('./sheets')
    await setAdminPasswordHash(data)
    return { success: true }
  })
