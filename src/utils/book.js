import { getReadTime } from './localStorage'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export function themeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          padding: '40px 20px !important',
          boxSizing: 'border-box'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Grace',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          padding: '40px 20px !important',
          boxSizing: 'border-box'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#304c42',
          background: '#a9c1a9',
          padding: '40px 20px !important',
          boxSizing: 'border-box'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          padding: '40px 20px !important',
          boxSizing: 'border-box'
        }
      }
    }
  ]
}

export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.querySelector('head').appendChild(link)
}

export function removeCss (href) {
  let links = document.querySelectorAll('link')
  for (let i = links.length; i >= 0; i--) {
    if (links[i] && links[i].getAttribute('href') &&
       links[i].getAttribute('href') === href) {
      links[i].parentNode.removeChild(links[i])
    }
  }
}

export function removeAllCss () {
  removeCss(`${process.env.VUE_APP_RES_URL}/themes/default_theme.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/themes/eye_theme.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/themes/night_theme.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/themes/grace_theme.css`)
}

export function getReadTimeByMinute(fileName) {
  let readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
}

export function flatten (arr) {
  return [].concat(...arr.map(item => {
    return [].concat(item, ...flatten(item.subitems))
  }))
}
