import axios from 'axios'

const parameter = {
  url: '',
  param: {},
  success: () => {},
  fail: () => {},
}

class API {
  Get(param = parameter) {
    axios
      .get(this.url + param.url)
      .then((res) => param.success(res.data))
      .catch((err) => param.fail(err))
  }

  Post(param = parameter) {
    axios
      .post(this.url + param.url)
      .then((res) => param.success(res.data))
      .catch((err) => param.fail(err))
  }

  constructor() {
    this.url = 'http://localhost:3005/api/'
  }
}

export default new API()
