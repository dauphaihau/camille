import { fetcher } from "core/helpers";

export async function deleteWorkspace(id: string) {
  return fetcher(`/api/settings/workspace/${id}`, null, 'DELETE')
}

export async function updateInfoGeneralWorkspace(payload) {
  return fetcher(`/api/settings/workspace`, payload, 'PATCH')
}

