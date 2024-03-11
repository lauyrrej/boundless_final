// 匯入前端路由API模組，用於發送HTTP請求
import API from '..'
// 匯入 moment 函式庫，用於處理日期時間格式化
import moment from 'moment'

// 設置後端路由的基本路徑
class Coupon {
  constructor() {
    this.url = 'coupon/'
  }

  FindAll() {
    return new Promise((resolve, reject) => {
      // 使用 API.Get 方法發送 GET 請求，查詢所有優惠券
      API.Get({
        // 設置完整的請求路徑
        url: this.url + 'FindAll',
        success: (data) => {
          // 成功回調函式，處理從後端返回的優惠券數據
          const formated = data.map((i) => {
            return {
              ...i,
              created_time: moment(i.created_time).format(
                // 格式化創建日期時間
                'YYYY-MM-DD HH:mm:ss'
              ),
              limit_time: moment(i.limit_time).format(
                // 格式化截止日期時間
                'YYYY-MM-DD HH:mm:ss'
              ),
              // onshelf_time: moment(i.onshelf_time).format(
              //   // 格式化上架日期時間
              //   'YYYY-MM-DD HH:mm:ss'
              // ),
            }
          })
          // 解析處理後的優惠券數據
          resolve(formated)
        },
        // 失敗回調函式
        fail: (err) => reject(err),
      })
    })
  }
  // 傳參數進來，後端會將id參數valid改成0
  Update(id = 1) {
    return new Promise((resolve, reject) => {
      // 使用 API.Post 方法發送 POST 請求，向後端發送更改優惠券的請求
      API.Post({
        // 設置完整的請求路徑
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
