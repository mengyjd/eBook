// 为书架增加添加按钮
export function appendShelfItemAdd (list) {
  const listBack = [].concat(list)
  listBack.push({
    id: -1,
    type: 3
  })
  return listBack
}

// 删除书架中的添加按钮
export function removeShelfItemAdd (list) {
  if (!list || list.length === 0) return []
  return list.filter(item => item.type !== 3)
}

// 随机推荐功能中卡片翻转动画的css属性
export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
    zIndex: 100,
    rotateDegree: 0
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
    zIndex: 96,
    rotateDegree: 0
  }
]

// 遍历书架，对书架中每一个书籍执行调函数，然后返回新的数组
export function mapShelfList (shelfList, cb) {
  if (!shelfList || shelfList.length === 0) {
    return []
  }
  return shelfList.map((book, index) => {
    if (book.type === 1) {
      if (cb) cb(book, index)
    } else if (book.type === 2) {
      mapShelfList(book.itemList, cb)
    }
    return book
  })
}

export function filterShelfList(shelfList, cb) {
  return shelfList.filter(book => {
    if (book.type === 1) {
      if (cb) {
        return cb(book)
      }
    } else if (book.type === 2) {
      filterShelfList(shelfList.itemList, cb)
    } else {
      return book
    }
  })
}
