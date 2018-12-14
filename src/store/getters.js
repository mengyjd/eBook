const book = {
  fileName: state => state.book.fileName,
  titleAndMenuVisible: state => state.book.titleAndMenuVisible,
  menuSettingVisible: state => state.book.menuSettingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme: state => state.book.defaultTheme,
  progress: state => state.book.progress,
  bookAvailable: state => state.book.bookAvailable,
  section: state => state.book.section,
  readTime: state => state.book.readTime
}

export default book
