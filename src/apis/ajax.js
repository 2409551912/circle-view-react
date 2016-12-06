import $ from 'jquery'

const ajax = {
  get: (url, data, fun) => {
    if (localStorage.getItem('bang_token') && localStorage.getItem('account')) {
      const token = {
        bang_token: localStorage.getItem('bang_token'),
        bang_account: localStorage.getItem('account')
      }
      Object.assign(data, token)
    }
    $.get(url, data, fun)
  },
  post: (url, data, fun) => {
    if (localStorage.getItem('bang_token') && localStorage.getItem('account')) {
      const token = {
        bang_token: localStorage.getItem('bang_token'),
        bang_account: localStorage.getItem('account')
      }
      Object.assign(data, token)
    }
    $.post(url, data, fun)
  }
}
export default ajax
