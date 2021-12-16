export function mockUser(login: string, id: number, type = 'User') {
  return {
    login,
    id,
    avatar_url: 'https://via.placeholder.com/150',
    url: `https://example.com/users/${login}`,
    type,
  }
}