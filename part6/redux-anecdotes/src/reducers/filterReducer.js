const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    case 'CLEAR': {
      return initialState
    }
    default: return state
  }
}

export const filterObj = (string) => {
  return {
    type: 'SET',
    payload: string
  }
}

export default filterReducer