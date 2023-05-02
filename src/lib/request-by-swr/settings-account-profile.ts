import { fetcher } from "core/helpers";

export async function updateProfile(payload) {
  return fetcher(`/api/settings/account/profile`, payload, 'PATCH')
}

export async function deleteMember(payload) {
  return fetcher(`/api/settings/member`, payload, 'DELETE')
}
