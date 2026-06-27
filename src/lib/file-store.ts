import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import type { ProfileData, Project } from '@/lib/types'
import { defaultProfile } from '@/lib/defaults'

// Use /tmp on Vercel (writable but ephemeral); data/ dir locally
const DATA_DIR = process.env.VERCEL === '1'
  ? '/tmp/data'
  : join(process.cwd(), 'data')


function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

function readJSON<T>(filename: string, fallback: T): T {
  try {
    ensureDir()
    const raw = readFileSync(join(DATA_DIR, filename), 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON(filename: string, data: unknown) {
  ensureDir()
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
}

export function getStoredProfile(): ProfileData {
  return readJSON<ProfileData>('profile.json', defaultProfile)
}

export function setStoredProfile(data: Partial<ProfileData>) {
  const current = getStoredProfile()
  const merged = { ...current, ...data }
  writeJSON('profile.json', merged)
}

export function getStoredProjects(): Project[] {
  return readJSON<Project[]>('projects.json', [])
}

export function setStoredProjects(data: Project[]) {
  writeJSON('projects.json', data)
}

export function getStoredAdminHash(): string | null {
  return readJSON<string | null>('admin.json', null)
}

export function setStoredAdminHash(hash: string) {
  writeJSON('admin.json', hash)
}
