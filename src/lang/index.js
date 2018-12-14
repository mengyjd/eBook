import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './cn'
import en from './en'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

Vue.use(VueI18n)

const messages = {
  cn,
  en
}

let locale = getLocalStorage('locale')
if (!locale) {
  locale = 'cn'
  setLocalStorage('locale', 'cn')
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
