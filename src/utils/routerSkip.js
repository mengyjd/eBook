export function gotoStoreHome (vue) {
  vue.$router.push({
    path: '/store/home'
  })
}

export function gotoEbookRead (book, vue) {
  vue.$router.push({
    path: `/ebook/${book.categoryText}|${book.title}`,
    query: {
      fileName: book.id,
      epubUrl: book.epub
    }
  })
}

export function gotoDetail (id, vue) {
  vue.$router.push({
    path: '/store/detail',
    query: {
      id
    }
  })
}

export function gotoShelf (vue) {
  vue.$router.push({
    path: '/store/shelf'
  })
}

export function gotoList (vue, query) {
  vue.$router.push({
    path: '/store/list',
    query
  })
}

// 跳转到个人中心
export function gotoUserInfo (vue, username) {
  vue.$router.push({
    path: `/user/${username}`
  })
}

export function gotoLogin (vue) {
  vue.$router.push({
    path: '/login'
  })
}

export function gotoRegister (vue) {
  vue.$router.push({
    path: '/register'
  })
}

export function gotoBack(vue) {
  vue.$router.go(-1)
}
