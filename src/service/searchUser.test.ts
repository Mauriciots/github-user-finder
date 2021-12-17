import axios from 'axios'

import { mockUser } from '../mock/user'
import { getUsers } from './searchUser'

const spyOnGet = jest.spyOn(axios, 'get')

const data = {
  total_count: 2,
  incomplete_results: false,
  items: [
    mockUser('kingpeter', 1001),
    mockUser('kingmiraz', 221, 'Organization'),
  ]
}

describe('getUsers', () => {
  it('should return users when endpoint call is successfully completed', async () => {
    spyOnGet.mockResolvedValue({ data })

    const users = await getUsers('king', 9, 1)

    expect(users).toStrictEqual(data)
    expect(spyOnGet).toHaveBeenCalledWith('https://api.github.com/search/users', {
      params: {
        q: 'king in:login',
        per_page: 9,
        page: 1,
      },
    })
  })

  it('should throw exception when endpoint call fails', async () => {
    const expectedError = { status: 500 }
    spyOnGet.mockRejectedValue(expectedError)

    let actualError = {}
    try {
      await getUsers('king', 10, 1)
    } catch(error) {
      actualError = error
    }

    expect(actualError).toBe(expectedError)
  })
})