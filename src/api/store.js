import axios from 'axios'
import { setLocalForage } from '../utils/localforage'

export function download (book, onProgress, onSuccess, onError) {
  return axios.create({
    method: 'get',
    responseType: 'blob',
    timeout: 1800 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(book.epub)
    .then(res => {
      const blob = new Blob([res.data])
      // 将电子书存储到indexDB中
      setLocalForage(book.fileName, blob,
        () => {
          if (onSuccess) onSuccess(book)
        },
        () => {
          if (onError) onError(book)
        })
    }).catch(err => {
      if (onError) onError(err)
    })
}

export function home () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}

export function detail (id) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/detail`,
    params: {
      id
    }
  })
}

export function list (params) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`,
    params
  })
}

export function shelf () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}

export function hotSearch() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/hotSearch`
  })
}

export function guessYouLikeList () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/guessYouLikeList`
  })
}
