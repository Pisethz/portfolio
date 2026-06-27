import '@tanstack/react-start/server-only'
import type { ProfileData, Project } from '@/lib/types'

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || ''
const API_TOKEN = process.env.API_TOKEN || ''

function isConfigured(): boolean {
  return !!APPS_SCRIPT_URL
}

async function callAppsScript(action: string, payload?: unknown): Promise<unknown> {
  const url = new URL(APPS_SCRIPT_URL)
  url.searchParams.set('action', action)
  if (API_TOKEN) {
    url.searchParams.set('token', API_TOKEN)
  }

  const res = await fetch(url.toString(), {
    method: payload ? 'POST' : 'GET',
    headers: payload ? { 'Content-Type': 'application/json' } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  })

  if (!res.ok) {
    throw new Error(`Apps Script API error: ${res.status} ${res.statusText}`)
  }

  const body = await res.json()
  if (body.error) {
    throw new Error(`Apps Script error: ${body.error}`)
  }
  return body.data
}

// ─── Profile ────────────────────────────────────────────────

export async function getProfileData(): Promise<ProfileData | null> {
  if (!isConfigured()) return null
  try {
    const data = await callAppsScript('getProfile')
    return data as ProfileData
  } catch {
    return null
  }
}

export async function updateProfileData(data: Partial<ProfileData>): Promise<void> {
  if (!isConfigured()) throw new Error('APPS_SCRIPT_URL not set')
  await callAppsScript('updateProfile', data)
}

// ─── Projects ───────────────────────────────────────────────

export async function getProjectsData(): Promise<Project[]> {
  if (!isConfigured()) return []
  try {
    const data = await callAppsScript('getProjects')
    return (data || []) as Project[]
  } catch {
    return []
  }
}

export async function saveProjectsData(projects: Project[]): Promise<void> {
  if (!isConfigured()) throw new Error('APPS_SCRIPT_URL not set')
  await callAppsScript('saveProjects', projects)
}

// ─── Admin ──────────────────────────────────────────────────

export async function getAdminPasswordHash(): Promise<string | null> {
  if (!isConfigured()) return null
  try {
    const data = await callAppsScript('getAdminHash')
    return (data as string) || null
  } catch {
    return null
  }
}

export async function setAdminPasswordHash(hash: string): Promise<void> {
  if (!isConfigured()) throw new Error('APPS_SCRIPT_URL not set')
  await callAppsScript('setAdminHash', hash)
}
