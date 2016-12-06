import axios from 'axios'

const ajax = {
  get: (url, _this) => axios.get(url),
  post: () => {
    console.log('post')
  }
}
export default ajax
