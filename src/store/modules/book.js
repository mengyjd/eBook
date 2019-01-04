const book = {
  state: {
    fileName: '',
    bookAvailable: false,
    titleAndMenuVisible: false,
    menuSettingVisible: -1, // -1:不显示 1:显示菜单 2:显示进度条 3:显示主题 4:显示字号
    defaultFontSize: 14,
    currentBook: null,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'default',
    progress: 0,
    section: 0,
    cover: null,
    metadata: null,
    navigation: null,
    offsetY: 0,
    isBookmark: false,
    bookmarks: null,
    totPage: 0,
    paginate: ''
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_TITLE_AND_MENU_VISIBLE': (state, titleAndMenuVisible) => {
      state.titleAndMenuVisible = titleAndMenuVisible
    },
    'SET_MENU_SETTING_VISIBLE': (state, menuSettingVisible) => {
      state.menuSettingVisible = menuSettingVisible
    },
    'SET_DEFAULT_FONT_SIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_CURRENT_BOOK': (state, currentBook) => {
      state.currentBook = currentBook
    },
    'SET_DEFAULT_FONT_FAMILY': (state, defaultFontFamily) => {
      state.defaultFontFamily = defaultFontFamily
    },
    'SET_FONT_FAMILY_VISIBLE': (state, fontFamilyVisible) => {
      state.fontFamilyVisible = fontFamilyVisible
    },
    'SET_DEFAULT_THEME': (state, defaultTheme) => {
      state.defaultTheme = defaultTheme
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_OFFSET_Y': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
    'SET_BOOKMARKS': (state, bookmarks) => {
      state.bookmarks = bookmarks
    },
    'SET_TOT_PAGE': (state, totPage) => {
      state.totPage = totPage
    },
    'SET_PAGINATE': (state, paginate) => {
      state.paginate = paginate
    }
  }
}

export default book
