import { fetcher } from "core/helpers";

export async function updateRoleMember(payload) {
  return fetcher(`/api/settings/member`, payload, 'PATCH')
}

export async function deleteMember(userId) {
  return fetcher(`/api/settings/member?userId=${userId}`, undefined, 'DELETE')
}

export async function memberLeave() {
  return fetcher(`/api/settings/member`)
}

export async function addMember(payload) {
  return fetcher(`/api/settings/member`, payload)
}
