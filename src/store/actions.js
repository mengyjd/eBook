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
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setOffsetY: ({ commit }, offsetY) => {
    return commit('SET_OFFSET_Y', offsetY)
  },
  setIsBookmark: ({ commit }, isBookmark) => {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setBookmarks: ({ commit }, bookmarks) => {
    return commit('SET_BOOKMARKS', bookmarks)
  },
  setTotPage: ({ commit }, totPage) => {
    return commit('SET_TOT_PAGE', totPage)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setHotSearchPageOffsetY: ({ commit }, hotSearchPageOffsetY) => {
    return commit('SET_HOT_SEARCH_PAGE_OFFSETY', hotSearchPageOffsetY)
  },
  setFlapCardVisible: ({ commit }, flapCardVisible) => {
    return commit('SET_FLAP_CARD_VISIBLE', flapCardVisible)
  },
  setIsEditModel: ({ commit }, isEditModel) => {
    return commit('SET_IS_EDIT_MODEL', isEditModel)
  },
  setShelfList: ({ commit }, shelfList) => {
    return commit('SET_SHELF_LIST', shelfList)
  },
  setShelfSelected: ({ commit }, shelfSelected) => {
    return commit('SET_SHELF_SELECTED', shelfSelected)
  },
  setShelfTitleVisible: ({ commit }, shelfTitleVisible) => {
    return commit('SET_SHELF_TITLE_VISIBLE', shelfTitleVisible)
  },
  setIsOpenPrivate: ({ commit }, isPrivate) => {
    return commit('SET_PRIVATE', isPrivate)
  },
  setIsOpenCache: ({ commit }, isCache) => {
    return commit('SET_CACHE', isCache)
  }
}

export default actions
