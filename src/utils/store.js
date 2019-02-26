export function gotoStoreHome (vue) {
  vue.$router.push({
    path: '/store/home'
  })
}

export function gotoEbookRead (book, vue) {
  vue.$router.push({
    path: `/ebook/${book.categoryText}|${book.fileName}`
  })
}

export function gotoDetail (book, vue) {
  vue.$router.push({
    path: '/store/detail',
    query: {
      fileName: book.fileName,
      categoryText: book.categoryText
    }
  })
}

export function addShelfList (list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function removeShelf (list) {
  list.filter(item => item.type !== 3)
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
// 根据分类id获取分类名称
export const categoryName = {
  1: 'ComputerScience',
  2: 'SocialSciences',
  3: 'Economics',
  4: 'Education',
  5: 'Engineering',
  6: 'Environment',
  7: 'Geography',
  8: 'History',
  9: 'Laws',
  10: 'LifeSciences',
  11: 'Literature',
  12: 'Biomedicine',
  13: 'BusinessandManagement',
  14: 'EarthSciences',
  15: 'MaterialsScience',
  16: 'Mathematics',
  17: 'MedicineAndPublicHealth',
  18: 'Philosophy',
  19: 'Physics',
  20: 'PoliticalScienceAndInternationalRelations',
  21: 'Psychology',
  22: 'Statistics'
}

// 将分类名称根据语言翻译
export function getTranslateCategoryText (text, vue) {
    text = text.substring(0, 1).toLowerCase() + text.substring(1)
  return vue.$t(`category.${text}`)
}
