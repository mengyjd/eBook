import axios from 'axios'
import CryptoJS from 'crypto-js'

export function login (username, password) {
  return axios.post(`${process.env.VUE_APP_BASE_URL}/login`, {
    username: window.encodeURIComponent(username),
    password: CryptoJS.MD5(password).toString()
  })
  // return axios({
  //   method: 'post',
  //   url: `${process.env.VUE_APP_BASE_URL}/login`,
  //   data: {
  //     username: encodeURIComponent(username),
  //     password: CryptoJS.MD5(password).toString()
  //   }
  // })
}

export function join (username, password) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/join`,
    data: {
      username: window.encodeURIComponent(username),
      password: CryptoJS.MD5(password).toString()
    }
  })
}
