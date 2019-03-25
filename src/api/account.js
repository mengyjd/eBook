import axios from 'axios'
import CryptoJS from 'crypto-js'

export function login (username, password) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/login`,
    data: {
      username: encodeURIComponent(username),
      password: CryptoJS.MD5(password).toString()
    }
  })
}

export function join (username, password) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/join`,
    data: {
      username: encodeURIComponent(username),
      password: CryptoJS.MD5(password).toString()
    }
  })
}

export function checkLogin() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/check-login`
  })
}
