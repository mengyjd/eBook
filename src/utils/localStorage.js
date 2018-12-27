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

export function saveFontFamily (fileName, font) {
  setBookObject(fileName, 'fontFamily', font)
}

export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontSize (fileName, size) {
  setBookObject(fileName, 'fontSize', size)
}

export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveBookTheme (fileName, bookTheme) {
  setBookObject(fileName, 'bookTheme', bookTheme)
}

export function getBookTheme (fileName) {
  return getBookObject(fileName, 'bookTheme')
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
