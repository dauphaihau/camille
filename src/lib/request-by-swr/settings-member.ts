import { fetcher } from "core/helpers";

export async function updateRoleMember(payload) {
  return fetcher(`/api/settings/member`, payload, 'PATCH')
}

export async function deleteMember(payload) {
  return fetcher(`/api/settings/member`, payload, 'DELETE')
}

export async function memberLeave(payload) {
  return fetcher(`/api/settings/member/leave`, payload, 'DELETE')
}

export async function addMember(payload) {
  return fetcher(`/api/settings/member`, payload)
}
