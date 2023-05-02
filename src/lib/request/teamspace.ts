import { fetcher } from "core/helpers";

export function archived(teamspaceId, status) {
  return fetcher(
    `/api/teamspace/${teamspaceId}`,
    { status },
    'DELETE'
  )
}

export function createTeamspace(payload) {
  return fetcher(
    `/api/teamspace`,
    payload,
    'POST'
  )
}
