import Storage from 'web-storage-cache'
import { syncSettings, syncShelf } from '../api/user'
import { appendShelfItemAdd, mapShelfList, removeShelfItemAdd } from './store'
import { flattenShelfList, spreadShelfList } from './utils'
import store from '../store/index'
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

export function saveBookShelf (shelfList, isNotSave) {
  setLocalStorage('shelf', shelfList)
  // 只有在数据需要保存，并且用户为登录状态才同步数据
  if (!isNotSave && store.state.isLogged) {
    syncShelf(removeShelfItemAdd(getBookShelf()))
  }
}

export function getBookShelf () {
  return getLocalStorage('shelf') || []
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

/**
 * 保存所有的主题设置
 * @param {Object} readSettings 主题设置对象{theme: options, fontFamily: options, fontSize: options}
 */
export function saveAllReadSettings (readSettings) {
  setLocalStorage('readSettings', readSettings)
}

/**
 * 获取所有主题设置
 * @returns {Object} 返回主题设置对象{theme: options, fontFamily: options, fontSize: options}
 */
export function getAllReadSettings () {
  return getLocalStorage('readSettings')
}

// 保存单个主题设置
export function saveBookReadSettings (key, val) {
  let readSettings = getBookReadSettings()
  if (!readSettings) {
    readSettings = {}
  }
  readSettings[key] = val
  saveAllReadSettings(readSettings)
  // 只有用户为登录状态才同步数据
  if (store.state.isLogged) {
    syncSettings(readSettings)
  }
}

// 获取单个主题设置
export function getBookReadSettings () {
  let readSettings = getAllReadSettings()
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

export function saveBookTheme (themeName) {
  saveBookReadSettings('theme', themeName)
}

export function getBookTheme () {
  let theme = getBookReadSettings().theme
  if (!theme) {
    theme = ''
  }
  return theme
}

// function saveReadInfo (fileName, bookInfo) {
//   let readInfo = getReadInfo()
//   readInfo[fileName] = bookInfo
//   setLocalStorage('readInfo', readInfo)
// }

// export function getReadInfo () {
//   return getLocalStorage('readInfo') || {}
// }

// function saveBookInfo (fileName, key, val) {
//   let bookInfo = getBookInfo(fileName)
//   bookInfo[key] = val
//   saveReadInfo(fileName, bookInfo)
// }

// function getBookInfo (fileName) {
//   return getReadInfo()[fileName] || {}
// }

// 将书籍的阅读信息保存到ShelfList中
// 阅读信息包含[readTime, bookmarks, location]
function saveBookInfoToShelfList (fileName, key, val) {
  const newShelfList = mapShelfList(getBookShelf(), (book) => {
    if (book.fileName === fileName) {
      book[key] = val
    }
  })
  if (key === 'location') {
    // location改变时不同步数据
    saveBookShelf(newShelfList, false)
  } else {
    // 在书签时或者每隔30秒同步数据
    saveBookShelf(newShelfList, false)
  }
}

/**
 * 获取书籍阅读信息
 * @param fileName String
 * @returns {Object}
 */
function getBookInfoFromShelfList (fileName) {
  let bookInfo
  mapShelfList(getBookShelf(), (book) => {
    if (book.fileName === fileName) {
      bookInfo = book
    }
  })
  return bookInfo || {}
}

export function removeBookInfo (fileName) {
  let flattenShelf = flattenShelfList(removeShelfItemAdd(getBookShelf()))
  const filterShelf = flattenShelf.filter(book => {
    return book.fileName !== fileName
  })
  saveBookShelf(appendShelfItemAdd(spreadShelfList(filterShelf)))
}

export function saveLocation (fileName, location) {
  saveBookInfoToShelfList(fileName, 'location', location)
}

export function getLocation (fileName) {
  return getBookInfoFromShelfList(fileName).location || ''
}

export function getReadTime (fileName) {
  return getBookInfoFromShelfList(fileName).readTime || 0
}

export function saveReadTime (fileName, readTime) {
  saveBookInfoToShelfList(fileName, 'readTime', readTime)
}

export function getBookmark (fileName) {
  return getBookInfoFromShelfList(fileName).bookmarks || []
}

export function saveBookmark (fileName, bookmark) {
  saveBookInfoToShelfList(fileName, 'bookmarks', bookmark)
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

export function saveToken (token) {
  setLocalStorage('token', token)
}

export function getToken () {
  return getLocalStorage('token')
}
