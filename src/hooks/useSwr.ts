import useSWR from "swr"

export const jsonFetcher = async (url: string) => {
  return fetch(url).then((res) => res.json())
}

export const useSwr = (endpoint: string) => {
  return useSWR(endpoint, jsonFetcher)
}
