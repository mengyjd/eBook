import store from '../store/index'
import axios from 'axios'

/**
 * 云同步
 * 同步条件：
 * 移动图书，向书架中添加图书，删除图书，书籍状态改变：私密阅读
 * 在阅读界面：添加书签，每隔30秒同步一次
 * @param shelf [] 图书列表
 * @returns {AxiosPromise<any>}
 */
export function syncShelf (shelf) {
  return axios.post(`${process.env.VUE_APP_BASE_URL}/user/shelf`, {
    username: store.state.username,
    shelfList: shelf
  })
}

export function syncSettings (settings) {
  return axios.post(`${process.env.VUE_APP_BASE_URL}/user/settings`, {
    username: store.state.username,
    settings: settings
  })
}

// 获取用户在云端的书架数据
export function getCloudShelfList () {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/user/cloud_shelf`, {
    params: {
      username: store.state.username
    }
  })
}

export function getCloudSettings () {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/user/cloud_settings`, {
    params: {
      username: store.state.username
    }
  })
}

export function getAllCloudData (func) {
  axios.all([getCloudShelfList(), getCloudSettings()])
    .then(axios.spread(
      (shelf, settings) => {
        // 两个请求现在都执行完成
        func(shelf, settings)
      }))
}
