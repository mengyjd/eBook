const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setTitleAndMenuVisible: ({ commit }, titleAndMenuVisible) => {
    return commit('SET_TITLE_AND_MENU_VISIBLE', titleAndMenuVisible)
  },
  setMenuSettingVisible: ({ commit }, menuSettingVisible) => {
    return commit('SET_MENU_SETTING_VISIBLE', menuSettingVisible)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
  },
  setCurrentBook: ({ commit }, currentBook) => {
    return commit('SET_CURRENT_BOOK', currentBook)
  },
  setDefaultFontFamily: ({ commit }, defaultFontFamily) => {
    return commit('SET_DEFAULT_FONT_FAMILY', defaultFontFamily)
  },
  setFontFamilyVisible: ({ commit }, fontFamilyVisible) => {
    return commit('SET_FONT_FAMILY_VISIBLE', fontFamilyVisible)
  },
  setDefaultTheme: ({ commit }, defaultTheme) => {
    return commit('SET_DEFAULT_THEME', defaultTheme)
  },
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOK_AVAILABLE', bookAvailable)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setReadTime: ({ commit }, readTime) => {
    return commit('SET_READ_TIME', readTime)
  }
}

export default actions
