import db from "../db.js";

class Coupon {
  constructor() {
    // 定義優惠券的屬性
    this.id = 0;
    this.name = "";
    // 折扣金額
    this.discount = 0;
    // 目標類型，1代表課程，2代表樂器
    this.kind = 1;
    // 折價的方式，1代表折多少，2代表百分比
    this.type = 1;
    // 優惠券序號
    this.coupon_code = "";
    // 低消要求
    this.requirement = 0;
    // 創建日期
    this.created_time = "0000-00-00 00:00:00";
    // 截止日期
    this.limit_time = "0000-00-00 00:00:00";
    // 是否使用
    this.valid = true;
  }

  // FindAll，代表查找所有優惠券
  async FindAll() {
    try {
      const queryString = `Select * From coupon`;
      // target是我們要的，useless是套件給我們的(用不到)
      const [target, useless] = await db.execute(queryString);
      return target.map((i) => {
        return {
          // 將查詢結果映射為更符合應用需求的格式，同時將 discount 屬性格式化為小數點後2位數
          ...i,
          discount: parseFloat(parseFloat(i.discount).toFixed(2)),
        };
      });
    } catch (err) {
      console.error(err);
      // 防止環境(整個網頁)崩潰，如果有錯誤發生，回傳空陣列
      return [];
    }
  }
  // 將優惠券從未使用更新為已使用的方法(1->0)
  async Update() {
    try {
      const queryString = "Update coupon Set valid = 0 Where id = ?";
      const [target, useless] = await db.query(queryString, this.id);
      console.log(target);
      // 回傳更新成功
      return true;
    } catch (err) {
      console.error(err);
      // 回傳更新失敗
      return false;
    }
  }
}

export default Coupon;
