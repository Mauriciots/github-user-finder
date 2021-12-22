import { useReducer } from 'react'

import { SearchResult } from '../Result'

interface State extends SearchResult {
  login: string
  loading: boolean
}

type Action = {
  type: 'startSearch',
  payload: {
    login: string,
  }
} | {
  type: 'finishSearch'
  payload: SearchResult
} | {
  type: 'changePage'
}

interface UserSearch {
  startSearch: (login: string) => void
  changePage: () => void
  completeSearch: (searchResult: SearchResult) => void
  failSearch: (error: number | 'noresponse') => void
  state: State
}

function reducer(state: State, action: Action) {
  switch (action.type) {
  case 'startSearch':
    return {
      ...state,
      login: action.payload.login,
      loading: true,
    }
  case 'finishSearch':
    return {
      ...state,
      ...action.payload,
      loading: false,
    }
  case 'changePage':
    return {
      ...state,
      loading: true,
    }
  default:
    return {
      ...state,
    }
  }
}

const useUserSearch = (): UserSearch => {
  const [state, dispatch] = useReducer(reducer, {
    login: '',
    loading: false,
    data: [],
    page: 0,
    totalCount: 0,
  })

  return {
    startSearch: (login: string) => {
      dispatch({
        type: 'startSearch',
        payload: {
          login,
        }
      })
    },
    changePage: () => {
      dispatch({ type: 'changePage' })
    },
    completeSearch: (searchResult: SearchResult) => {
      dispatch({
        type: 'finishSearch',
        payload: {
          ...searchResult,
          error: undefined,
        },
      })
    },
    failSearch: (error: number | 'noresponse') => {
      dispatch({
        type: 'finishSearch',
        payload: {
          error,
          data: [],
          totalCount: 0,
          page: 0,
        },
      })
    },
    state,
  }
}

export default useUserSearch
