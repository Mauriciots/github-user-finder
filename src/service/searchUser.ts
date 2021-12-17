import axios from 'axios'

export interface User {
  id: number
  avatar_url: string
  login: string
  type: string
  url: string
}

export interface SearchUsersResponse {
  items: User[]
  total_count: number
}

export async function getUsers(query: string, perPage: number, page: number): Promise<SearchUsersResponse> {
  const params = { 
    q: `${query} in:login`,
    per_page: perPage,
    page,
  }

  const response = await axios.get<SearchUsersResponse>('https://api.github.com/search/users', { params })
  return response.data
}