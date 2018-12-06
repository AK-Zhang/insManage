<template>
  <div class="mask" id="b-mask" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="mask_box">
      <div class="panel panel-default  no-border">
        <!-- Default panel contents -->
        <div class="panel-heading">编辑品种基准保证金及手续费</div>
        <div class="panel-body">
          <form class="form-inline form-inline1" novalidate="" role="form">
            <div>
              <div class="error3">
                品种名称
              </div>
              <span class="selected">
                <input class="input-text input-text-bg" type="text" v-model="obj.CommodityName" readonly="true" style="width:98%">
              </span>
              <div class="error3">
                保证金/手
              </div>
              <span class="selected">
                <input class="input-text" type="text" v-model="obj.Margin" maxlength="10" style="width:98%">
                <div class="input-list">{{obj.CurrencyName}}</div>
              </span>

              <!-- <div class="error3">
                最小值
              </div>
              <span class="selected">
                <input class="input-text" type="text" v-model="obj.MinFee" maxlength="10" style="width:98%">
                <div class="input-list">{{obj.CurrencyName}}</div>
              </span> -->
              <div class="error3">
                手续费最大值
              </div>
              <span class="selected">
                <input class="input-text" type="text" v-model="obj.MaxFee" maxlength="10" style="width:98%">
                <div class="input-list">{{obj.CurrencyName}}</div>
              </span>

            </div>
          </form>
        </div>
        <div class="closed closed-add" @click="closeMask()">×</div>
        <!-- Table -->
        <p>
          <span class="fr">
            <button type="button" class="btn btn-info btn-saved" v-on:click="Modifydata(obj.SysCommodityID,obj.Margin,obj.MaxFee)">保存</button>
          </span>
          <span class="fr">
            <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../kits/common.js";

export default {
  props: ["objs"],
  data() {
    return {
      loading: "",
      obj: {}
      //postData:this.objs
    };
  },
  methods: {
    Show(item) {
      this.obj = jQuery.extend({}, item);
    },
    Modifydata(SysCommodityID, Margin, MaxFee) {
      if (isNaN(Margin)) {
        //this.$message.error("手数只能输入数字");
        this.$alert("手数只能输入数字", {});
        return;
      }
      // if (isNaN(MinFee)) {
      //   // this.$message.error("最小值只能输入数字");
      //   this.$alert("最小值只能输入数字", {});
      //   return;
      // }

      // if (Margin < MinFee) {
      //   // this.$message.error("手数应大于等于最小值");

      //   this.$alert("手数应大于等于最小值", {});
      //   return;
      // }

      if (isNaN(MaxFee)) {
        // this.$message.error("最大值只能输入数字");
        this.$alert("最大值只能输入数字", {});
        return;
      }
      // if (MinFee > MaxFee) {
      //   // this.$message.error("最小值不能大于最大值");
      //   this.$alert("最小值不能大于最大值", {});
      //   return;
      // }
      // if (Margin > MaxFee) {
      //   // this.$message.error("手数应小于等于最小值");
      //   this.$alert("手数应小于等于最小值", {});
      //   return;
      // }
      this.loading = true;
      var url = "/insargu/ConfigMargin";
      var postData = {
        SysCommodityID: SysCommodityID,
        Margin: Margin,
        // MinFee: MinFee,
        MaxFee: MaxFee
      };
      this.$loginapi.post(url, postData, response => {
        this.loading = false;
        if (response.Ret == 0) {
          this.$emit("gitlists", "");
          $(".mask").fadeOut("slow");
          this.$message.success("保存成功");
        } else {
          this.$alert(response.Msg, {});
          // this.$message.error(response.Msg); //请求失败，response为失败信息
        }
      });
    },

    // Modifydata(objs, comName) {
    //   var url = common.apidomain + "/BasicMarginInfo/Save";
    //   //var postData = objs;
    //   objs.CommodityName = objs.comName;
    //   console.log(objs);
    //   this.$api.post(url, objs, response => {
    //     if (response.data.errorCode == 0) {
    //       console.log(objs);
    //       this.$emit("getlists", "");
    //     } else {
    //       this.$message.error(response.data.errMsg); //请求失败，response为失败信息
    //     }
    //   });
    //   $(".mask").fadeOut("slow");
    // },
    closeMask() {
      $(".mask").fadeOut("slow");
    }
  }
};
</script>

<!--<style scoped>-->
<!--.mask {-->
  <!--display: none;-->
  <!--position: fixed;-->
  <!--width: 100%;-->
  <!--height: 100%;-->
  <!--background-color: rgba(0, 0, 0, 0.5);-->
  <!--z-index: 999;-->
<!--}-->
<!--.mask .mask_box {-->
  <!--width: 40%;-->
  <!--/*height: 49.5rem;*/-->
  <!--margin: 10rem auto;-->
  <!--background-color: #fff;-->
  <!--border: 1px solid #fff;-->
  <!--border-radius: 5px;-->
<!--}-->
<!--.mask .mask_box .no-border {-->
  <!--border: none;-->
  <!--position: relative;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-heading {-->
  <!--/*height: 7rem;-->
  <!--line-height: 5rem;*/-->
  <!--background-color: #fff;-->
  <!--text-align: center;-->
  <!--/*font-size: 20px;*/-->
  <!--border-bottom: 2px solid #d8dde6;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body {-->
  <!--/*height: 12rem;*/-->
  <!--padding-top: 2rem;-->
  <!--padding-left: 2rem;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .error3 {-->
  <!--padding-left: 5px;-->
<!--}-->
<!--.mask .mask_box .no-border .table-no-border tr > th:nth-of-type(1),-->
<!--.mask .mask_box .no-border .table-no-border tr > td:nth-of-type(1) {-->
  <!--padding-left: 20px;-->
<!--}-->
<!--.mask-->
  <!--.mask_box-->
  <!--.no-border-->
  <!--.table-no-border-->
  <!--.thead-bgc-->
  <!--&gt; tr-->
  <!--&gt; th:nth-of-type(3) {-->
  <!--color: transparent;-->
<!--}-->
<!--.mask .mask_box .no-border .table-no-border td {-->
  <!--border: none;-->
  <!--vertical-align: middle;-->
<!--}-->
<!--.mask .mask_box .no-border .table-no-border td input {-->
  <!--width: 10rem;-->
  <!--height: 3rem;-->
  <!--border: 1px solid #cccccc;-->
  <!--border-radius: 3px;-->
<!--}-->
<!--.mask .mask_box .no-border .table-no-border td:nth-of-type(3) {-->
  <!--text-align: right;-->
<!--}-->
<!--.mask .mask_box .no-border .closed {-->
  <!--width: 50px;-->
  <!--height: 30px;-->
  <!--font-family: "Microsoft YaHei";-->
  <!--font-size: 38px;-->
  <!--text-align: center;-->
  <!--position: absolute;-->
  <!--right: 0px;-->
  <!--top: -5px;-->
  <!--cursor: pointer;-->
  <!--color: #cccccc;-->
<!--}-->
<!--.mask .mask_box .no-border .closed:hover {-->
  <!--color: #999;-->
<!--}-->
<!--.mask .mask_box .no-border > p {-->
  <!--width: 100%;-->
  <!--background-color: #f0f0f0;-->
  <!--padding: 8px 20px;-->
  <!--margin-bottom: 0px;-->
<!--}-->
<!--.mask .mask_box .no-border > p .fr {-->
  <!--float: right;-->
  <!--padding-right: 10px;-->
<!--}-->
<!--.mask .mask_box .no-border > p .fr .btn-q {-->
  <!--color: #337ab7;-->
<!--}-->
<!--.mask .mask_box {-->
  <!--width: 40%;-->
  <!--min-width: 500px;-->
  <!--/*height: 289px;*/-->
<!--}-->
<!--.mask .mask_box .no-border .panel-heading {-->
  <!--font-size: 16px;-->
  <!--/*height: 60px;*/-->
  <!--/*line-height: 46px;*/-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body {-->
  <!--font-size: 14px;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .selected {-->
  <!--width: 100%;-->
  <!--position: relative;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .selected .input-text-bg {-->
  <!--background-color: #eee;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .selected .input-text {-->
  <!--width: 95%;-->
  <!--height: 34px;-->
  <!--line-height: 34px;-->
  <!--border: 1px solid #cccccc;-->
  <!--border-radius: 5px;-->
  <!--padding-left: 10px;-->
  <!--position: relative;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .selected .input-text:focus {-->
  <!--outline: 0;-->
  <!--box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #66afe9;-->
<!--}-->
<!--.mask .mask_box .no-border .panel-body .selected .input-list {-->
  <!--width: 40px;-->
  <!--height: 34px;-->
  <!--position: absolute;-->
  <!--top: 0px;-->
  <!--right: 0px;-->
<!--}-->
<!--.mask .mask_box .no-border > p {-->
  <!--height: 46px;-->
<!--}-->
<!--</style>-->
