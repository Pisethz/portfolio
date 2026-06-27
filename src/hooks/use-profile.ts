import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile } from "@/lib/db";
import type { ProfileData } from "@/lib/types";
import { defaultProfile } from "@/lib/defaults";

export type { ProfileData, ExperienceItem, EducationItem, ReferenceItem } from "@/lib/types";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((data) => {
      if (data) {
        setProfile(data);
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const update = useCallback(async (patch: Partial<ProfileData>) => {
    setProfile((p) => ({ ...p, ...patch }));
    try {
      await updateProfile({ data: patch });
    } catch (err) {
      console.error("Failed to save profile to Google Sheets:", err);
    }
  }, []);

  const reset = useCallback(() => setProfile(defaultProfile), []);

  return { profile, update, reset, loading };
}
