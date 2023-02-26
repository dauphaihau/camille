'use client'
import useSWR from "swr";

export function useDetailNotebook(notebookId) {
  const fetcher = url => fetch(url + new URLSearchParams({ notebookId })).then(res => res.json())
  // const fetcher = url => fetch(url, { params: { notebookId } }).then(res => res.data)
  // const fetcher = url => api.get(url, { params: { notebookId } }).then(res => res.data)
  // const fetcher = url => axios.get(url, { params: { notebookId } }).then(res => res.data)
  // const fetcher = url => axios.get(url, { params }).then(res => res.data)

  const { data, error, mutate } = useSWR('/api/notebook/pages?', fetcher)
  // const { data, error, mutate } = useSWR(notebookId ? ['/api/notebook/pages', notebookId] : null, fetcher)
  // const { data, error, mutate } = useSWR({ url: '/api/notebook/pages', args: notebookId }, fetcher)

  return {
    // notebook: data,
    pageList: data?.pages,
    pages: data?.pages,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}
