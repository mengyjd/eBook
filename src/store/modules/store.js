const store = {
  state: {
    hotSearchPageOffsetY: 0,
    flapCardVisible: false
  },
  mutations: {
    'SET_HOT_SEARCH_PAGE_OFFSETY': (state, hotSearchPageOffsetY) => {
      state.hotSearchPageOffsetY = hotSearchPageOffsetY
    },
    'SET_FLAP_CARD_VISIBLE': (state, flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    }
  }
}

export default store
