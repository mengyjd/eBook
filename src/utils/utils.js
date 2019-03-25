import { saveToken } from './localStorage'

export function px2rem (px) {
  const ratio = 375 / 10
  return px / ratio
}

export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

export function deToken (vue) {
  vue.$store.commit('DELETE_TOKEN')
  saveToken('')
}

// 将shelfList从一维数组转到二维
export function spreadShelfList (shelfList) {
  let newArr = []
  let subArrName = {}
  let subArr = []
  // 获取书架中所有的分组名
  shelfList.forEach(book => {
    if (book.groupName) {
      subArrName[book.groupName] = []
    } else {
      newArr.push(book)
    }
  })
  // 将有分组的书籍添加到对应的分组中
  Object.keys(subArrName).forEach(groupName => {
    // 定义分组属性
    let group = {
      type: 2,
      id: groupName,
      title: groupName,
      itemList: []
    }
    //  添加书籍到分组
    shelfList.forEach(book => {
      if (book.groupName && book.groupName === groupName) {
        group.itemList.push(book)
      }
    })
    subArr.push(group)
  })
  return newArr.concat(...subArr)
}

// 将shelfList从二维数组转到一维
export function flattenShelfList (shelfList) {
  return [].concat(...shelfList.map(book => {
    if (book.type === 1) {
      return [].concat(book)
    } else {
      return flattenShelfList(book.itemList)
    }
  }))
}
