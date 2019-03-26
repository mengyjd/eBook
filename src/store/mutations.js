export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  DELETE_TOKEN: (state) => {
    state.token = ''
  },
  SET_IS_LOGGED: (state, isLogged) => {
    state.isLogged = isLogged
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_IS_FROM_SERVER: (state, isGetHomeFromServer) => {
    state.isGetHomeFromServer = isGetHomeFromServer
  }
}
