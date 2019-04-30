const initState = {
  authError: null,
  loading: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
    }
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login Failed. Try Again.',
        loading: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        loading: false
    }
    case 'SIGNOUT_SUCCESS':
      return state
    case 'SIGNUP_SUCESS':
      return {
        ...state,
        authError: null,
        loading: false
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message,
        loading: false
      }
    case 'UPDATE_USER_SUCCESS':
      alert('User type updated.')
      return {
        ...state,
        authError: null,
        loading: false
      }
    default:
      return state
  }
}

export default authReducer