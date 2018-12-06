<template>
  <div class="mask" id="e-mask">
    <div class="mask_box">
      <div class="panel panel-default  no-border">
        <!-- Default panel contents -->
        <div class="panel-heading">编辑币种汇率</div>
        <div class="panel-body">
          <form class="form-inline form-inline1" novalidate="" role="form">
            <div>
              <span class="bi">基础币种 ：</span>
              <select name="BaseCurrency" class="select-1 form-control">
                <option value="USD">美元</option>
                <!--<option value="CNY">人民币</option>-->
                <!--<option value="EUR">欧元</option>-->
                <!--<option value="GBP">英镑</option>-->
                <!--<option value="HKD">港币</option>-->
                <!--<option value="JPY">日元</option>-->
              </select>
              <span class="error3">
                <span class="error4">注:</span>
                当前机构下含有子账户，无法修改基础币种!
              </span>
            </div>
          </form>
        </div>
        <div class="closed" @click="closeMask()">×</div>
        <!-- Table -->
        <table class="table table-no-border">
          <thead class="thead-bgc">
            <tr>
              <th style="width: 90px;">货币类型</th>
              <th style="width: 90px;">币种名称</th>
              <th style="width: 81px;">交易汇率</th>
              <th>交易汇率</th>
              <th>入金汇率</th>
              <th>出金汇率</th>
              <th>经纪人出金汇率</th>
              <th>经纪人结算汇率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td style="width: 90px;">{{item.CurrencyCode}}</td>
              <td style="width: 90px;">{{item.CurrencyName}}</td>
              <td style="width: 81px;">1{{item.CurrencyName}}=</td>
              <td>
                <input type="text" v-model="item.TradeRate" maxlength="10">美元
              </td>
              <td>
                <input type="text" v-model="item.DepositRate" maxlength="10">美元
              </td>
              <td>
                <input type="text" v-model="item.WithdrawRate" maxlength="10">美元
              </td>
              <td>
                <input type="text" v-model="item.ProxyWithdrawRate" maxlength="10">美元
              </td>
              <td>
                <input type="text" v-model="item.ProxySettlementRate" maxlength="10">美元
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <span class="fr">
            <button type="button" class="btn btn-info" v-on:click="Modifydata(list)">保存</button>
          </span>
          <span class="fr">
            <button type="button" class="btn btn-default btn-q" @click="closeMask()">取消</button>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../kits/common.js";

export default {
  props: ["childMsg"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    Show(item) {
      this.list = jQuery.extend(true, [], item);
    },

    Modifydata(obj) {
      var result = false;
      for (var i = 0; i < obj.length; i++) {
        var item = obj[i];

        if (
          isNaN(item.TradeRate) ||
          item.TradeRate.toString().trim() == "" ||
          item.TradeRate < 0
        ) {
          // this.$message.error(item.CurrencyName + "交易汇率只能输入数字");
          this.$alert("【" + item.CurrencyName + "】交易汇率只能输入数字", {});
          result = true;
          return false;
        }
        if (
          isNaN(item.DepositRate) ||
          item.DepositRate.toString().trim() == "" ||
          item.DepositRate < 0
        ) {
          // this.$message.error(item.CurrencyName + "入金汇率只能输入数字");
          this.$alert("【" + item.CurrencyName + "】入金汇率只能输入数字", {});
          result = true;
          return false;
        }
        if (
          isNaN(item.WithdrawRate) ||
          item.WithdrawRate.toString().trim() == "" ||
          item.WithdrawRate < 0
        ) {
          // this.$message.error(item.CurrencyName + "出金汇率只能输入数字");
          this.$alert("【" + item.CurrencyName + "】出金汇率只能输入数字", {});
          result = true;
          return false;
        }
        if (
          isNaN(item.ProxyWithdrawRate) ||
          item.ProxyWithdrawRate.toString().trim() == "" ||
          item.ProxyWithdrawRate < 0
        ) {
          // this.$message.error(item.CurrencyName + "经纪人出金汇率只能输入数字");
          this.$alert(
            "【" + item.CurrencyName + "】经纪人出金汇率只能输入数字",
            {}
          );
          result = true;
          return false;
        }
        if (
          isNaN(item.ProxySettlementRate) ||
          item.ProxySettlementRate.toString().trim() == "" ||
          item.ProxySettlementRate < 0
        ) {
          // this.$message.error(item.CurrencyName + "经纪人出金汇率只能输入数字");
          this.$alert(
            "【" + item.CurrencyName + "】经纪人结算汇率只能输入数字",
            {}
          );
          result = true;
          return false;
        }
      }

      if (result) {
        return;
      }

      var url = "/insargu/ConfigExchangeRate";
      var post = JSON.stringify(obj);
      this.$loginapi.post(url, obj, response => {
        if (response.Ret == 0) {
          this.$emit("gitlists", "");
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          $("#e-mask").fadeOut("fast");
        } else {
          this.$alert(response.Msg, {});
          //this.$message.error(response.Msg); //请求失败，response为失败信息
        }
      });
    },
    closeMask() {
      $("#e-mask").fadeOut("fast");
    }
  }
};
</script>

<style scoped>
.mask {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /*z-index: 999;*/
}
.mask .mask_box {
  width: 80% !important;
  min-width: 912px;
  /*height: 47.2rem;*/
  margin: 50px auto;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  /*padding-bottom: 2px;*/
}
.mask .mask_box .no-border {
  border: none;
  position: relative;
  margin-bottom: 0px;
}
.mask .mask_box .no-border .panel-heading {
  /*height: 7rem;
  line-height: 5rem;*/
  background-color: #fff;
  text-align: center;
  /*font-size: 20px;*/
  border-bottom: 2px solid #d8dde6;
}
.mask .mask_box .no-border .panel-body {
  /*height: 5rem;*/

  /*padding-top: 2rem;
  padding-left: 2rem;*/
}
.mask .mask_box .no-border .panel-body .select-1 {
  outline: none;
  width: 30rem;
  height: 3rem;
  border-radius: 4px;
}
@-moz-document url-prefix() {
  select.form-control {
    -moz-appearance: none;
    appearance: none;
    background-image: url("http://221.228.109.114:8083/manage/more/firefox_select_icon.png");
    background-repeat: no-repeat;
    background-position: calc(100% - 7px) 50%;
    background-size: 2% auto;
    border-radius: 3px;
    padding: 0;
  }
}
.mask .mask_box .no-border .panel-body .error3 {
  padding-left: 5px;
}
.mask .mask_box .no-border .panel-body .error3 .error4 {
  color: red;
}
.mask .mask_box .no-border .table-no-border {
  /*height: 30rem;*/
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  overflow-y: auto;
}
.mask .mask_box .no-border .table-no-border tr > th:nth-of-type(1),
.mask .mask_box .no-border .table-no-border tr > td:nth-of-type(1) {
  padding-left: 20px;
}
.mask .mask_box .no-border .table-no-border .thead-bgc {
  background-color: #f6f6f6;
}
.mask
  .mask_box
  .no-border
  .table-no-border
  .thead-bgc
  > tr
  > th:nth-of-type(3) {
  color: transparent;
}
.mask .mask_box .no-border .table-no-border td {
  border: none;
  vertical-align: middle;
}
.mask .mask_box .no-border .table-no-border td input {
  width: 10rem;
  height: 2.5rem;
  padding: 0px 5px;
  margin-right: 5px;
  border: 1px solid #cccccc;
  border-radius: 3px;
}
.mask .mask_box .no-border .table-no-border td:nth-of-type(3) {
  text-align: right;
}
.mask .mask_box .no-border .closed {
  width: 50px;
  height: 30px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: center;
  position: absolute;
  right: 0px;
  top: -5px;
  cursor: pointer;
  color: #cccccc;
}
.mask .mask_box .no-border .closed:hover {
  color: #999;
}
.mask .mask_box .no-border > p {
  width: 100%;
  background-color: #f0f0f0;
  padding: 8px 20px;
  margin-bottom: 0px;
}
.mask .mask_box .no-border > p .fr {
  float: right;
  padding-right: 10px;
}
.mask .mask_box .no-border > p .fr .btn-q {
  color: #337ab7;
}
</style>
