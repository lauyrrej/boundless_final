import API from '..'
import moment from 'moment'

class Coupon {
  constructor() {
    this.url = 'coupon/'
  }

  FindAll() {
    return new Promise((resolve, reject) => {
      API.Get({
        url: this.url + 'FindAll',
        success: (data) => {
          const formated = data.map((i) => {
            return {
              ...i,
              created_time: moment(i.created_time).format(
                'YYYY-MM-DD HH:mm:ss'
              ),
              limit_time: moment(i.limit_time).format('YYYY-MM-DD HH:mm:ss'),
              onshelf_time: moment(i.onshelf_time).format(
                'YYYY-MM-DD HH:mm:ss'
              ),
            }
          })
          resolve(formated)
        },
        fail: (err) => reject(err),
      })
    })
  }
  // 傳參數進來，後端會將這個id的valid改成0
  Delete(id = 1) {
    return new Promise((resolve, reject) => {
      API.Post({
        url: this.url + 'Delete',
        success: (data) => resolve(data),
        fail: (err) => reject(err),
      })
    })
  }
}

export default new Coupon()

//#region 使用API的方法

// 在想要使用的地方import

// 由於是非同步，所以需要加上async await

// 範例:
// const res = await Coupon.Delete()
// 返回值為boolean
// 可以透過這個res，決定前端要呈現失敗或成功的提示
// 完工!!!!
//#endregion
