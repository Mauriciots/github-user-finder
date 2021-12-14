import axios from 'axios'

import SearchUsersResponse from './SearchUsersResponse'

export function getUsers(query: string, page: number): Promise<SearchUsersResponse> {
  const params = { 
    q: `${query} in:login`,
    per_page: 9,
    page,
  }

  return axios.get<SearchUsersResponse>('https://api.github.com/search/users', { params })
    .then(response => response.data)
}