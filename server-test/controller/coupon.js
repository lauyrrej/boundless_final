import moment from "moment";
import db from "../db.js";

class Basic {
  constructor() {
    // 定義優惠券的屬性
    this.id = 0;
    // 優惠卷的姓名
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
  }
}

// sql模板繼承基本物件
class Coupon_template extends Basic {
  constructor() {
    super();
    this.limit_time = "";
    // 是否有效
    this.valid = true;
  }

  // FindAll，代表查找所有模板
  async FindAll() {
    try {
      const queryString = `Select * From coupon_template`;
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
      return [err0];
    }
  }

  // 將coupon從未使用更新為已使用的方法(1->0)
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

  async Create() {
    try {
    } catch (err) {}
  }
}

class Coupon extends Basic {
  constructor() {
    super();
    this.user_id = 0;

    this.coupon_template_id = 0;
    // coupon是否已使用
    this.valid = 0;
  }

  //#region Find

  // 找到某個使用者下面的所有優惠券
  async FindAll(user_id = 0) {
    try {
      const [target, useless] = await db.query(
        "Select * From coupon Where user_id = ?",
        [user_id]
      );

      const obj = new Coupon_template();

      const coupon_template = await obj.FindAll();

      const result = target.map((v) => {
        // 在每個迴圈去找到他的模板
        const target = coupon_template.find(
          (i) => i.id === v.coupon_template_id
        );
        const limit_time = moment(v.created_time)
          .add(7, "d")
          .format("YYYY-MM-DD HH:mm:ss");
        return {
          id: v.ID,
          name: target.name,
          discount: target.discount,
          kind: target.kind,
          type: target.type,
          created_time: v.created_time,
          limit_time: limit_time,
          limitNum: moment(limit_time).diff(v.created_time, "days"),
        };
      });

      return result;
    } catch (err) {
      console.error(err.message);
      return [err1];
    }
  }

  //#endregion

  //#region CRUD

  async Create() {
    try {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");

      const queryString = await db.query(
        "Insert Into coupon(user_id,coupon_template_id,created_time,valid) values(?,?,?,1)",
        [this.user_id, this.coupon_template_id, now]
      );

      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  }

  //#endregion
}

export default Coupon;
