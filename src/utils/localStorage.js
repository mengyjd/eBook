import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}

export function saveBookShelf (shelfList) {
  setLocalStorage('shelf', shelfList)
}

export function getBookShelf () {
  return getLocalStorage('shelf')
}

export function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject (fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    return null
  } else {
    return book[key]
  }
}

export function saveBookReadSettings (key, val) {
  let readSettings = getBookReadSettings()
  if (!readSettings) {
    readSettings = {}
  }
  readSettings[key] = val
  setLocalStorage('readSettings', readSettings)
}

export function getBookReadSettings () {
  let readSettings = getLocalStorage('readSettings')
  if (!readSettings) {
    readSettings = {}
  }
  return readSettings
}

export function saveFontFamily (font) {
  saveBookReadSettings('fontFamily', font)
}

export function getFontFamily () {
  return getBookReadSettings().fontFamily
}

export function saveFontSize (size) {
  saveBookReadSettings('fontSize', size)
}

export function getFontSize () {
  return getBookReadSettings().fontSize
}

export function saveBookTheme (theme) {
  saveBookReadSettings('theme', theme)
}

export function getBookTheme () {
  let theme = getBookReadSettings().theme
  if (!theme) {
    theme = {}
  }
  return theme
}

export function saveLocation (fileName, location) {
  setBookObject(fileName, 'location', location)
}

export function getLocation (fileName) {
  return getBookObject(fileName, 'location')
}

export function getReadTime (fileName) {
  return getBookObject(fileName, 'readTime')
}

export function saveReadTime (fileName, readTime) {
  setBookObject(fileName, 'readTime', readTime)
}

export function getBookmark (fileName) {
  return getBookObject(fileName, 'bookmarks')
}

export function saveBookmark (fileName, bookmark) {
  setBookObject(fileName, 'bookmarks', bookmark)
}

export function getSearchHistory () {
  return getLocalStorage('searchHistory')
}

export function saveSearchHistory (text) {
  let searchHistoryItem = {
    type: 'text',
    text
  }
  let searchHistoryList = getSearchHistory()
  if (!searchHistoryList) {
    searchHistoryList = [ searchHistoryItem ]
  } else {
    // 先去掉重复项
    searchHistoryList = searchHistoryList.filter(searchItem => searchItem.text !== text)
    searchHistoryList.unshift(searchHistoryItem)
  }
  setLocalStorage('searchHistory', searchHistoryList)
}

export function clearSearchHistory () {
  setLocalStorage('searchHistory', [])
}

export function saveHomeData (homeData) {
  setLocalStorage('homeData', homeData)
}

export function getLocalHomeData () {
  return getLocalStorage('homeData')
}
