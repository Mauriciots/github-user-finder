import User from './User'

interface SearchUsersResponse {
  items: User[]
  total_count: number
}

export default SearchUsersResponse
