<template>
  <div class="s-height userwithdrawHis_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <!-- <el-input v-model="IDValue" class="s_padding" placeholder="流水号" size="small" style="width:200px;"></el-input> -->
                  <!-- <el-select v-model="PassagewayValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in PassagewayList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select> -->
                  <el-select v-model="UserValue" placeholder="请选择" @change="setUserCode" size="small" class="s_padding">
                    <el-option v-for="item in UserList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-select v-model="StateValue" placeholder="请选择" @change="setSeclectType" size="small" class="s_padding">
                    <el-option v-for="item in StateList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <!-- <el-date-picker class="s_padding" v-model="DateRangeValue" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker> -->
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getchargeHisList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','子账户提现汇总','子账户提现汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 4%;">序号</th>
                    <th style="width: 15%">充值流水号</th>
                    <th style="width: 10%">子账号代码</th>
                    <th style="width: 10%">子账名称</th>
                    <th style="width: 10%">充值金额</th>
                    <th style="width: 15%">充值时间</th>
                    <th style="width: 10%">审核人员</th>
                    <th style="width: 10%">状态</th>
                    <th style="width: 16%">备注</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="panel panel-default table-2" v-loading="loading">
            <table class="table table-hover table-2-1" id="tableBody">
              <tbody>
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in withdrawHisList" :key="index">
                  <td style="width: 4%;">{{index+1}}</td>
                  <td style="width: 15%;">
                    <a>{{item.Id}}</a>
                  </td>
                  <td style="width: 10%">{{item.UserCode}}</td>
                  <td style="width: 10%">{{item.UserName == null ? "--" : (item.UserName == "" ? "--" : item.UserName)}}</td>
                  <td style="width: 10%">{{item.TransferMoney}} 美元</td>
                  <td style="width: 15%">{{item.AddDate}}</td>
                  <td style="width: 10%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 10%">{{item.OrderState}}</td>
                  <td style="width: 16%">{{item.AuditRemark == null ? "--" : (item.AuditRemark == "" ? "--" : item.AuditRemark)}}</td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation" class="text-center page-separation">
              <pageination :pagerPro="pager" @ee="pageFn"></pageination>
            </nav>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import commonJs from "../../../assets/js/Common.js";
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      withdrawHisList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      PassagewayList: [
        { Code: "", Name: "全部通道" },
        { Code: "CPCN", Name: "中金支付" },
        { Code: "YeePay", Name: "易宝支付" }
      ],
      UserList: [{ Code: "", Name: "全部子账户" }],
      StateList: [
        { Code: -1, Name: "全部状态" },
        { Code: 11, Name: "待支付" },
        { Code: 12, Name: "已关闭" },
        { Code: 13, Name: "待审核" },
        { Code: 14, Name: "审核未通过" },
        { Code: 4, Name: "审核通过" }
      ],
      PassagewayValue: "",
      UserValue: "",
      StateValue: "",
      DateRangeValue: [],
      IDValue: "",
      UserKey: "",
      seclectType: -1
    };
  },
  components: {
    pageination
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getPassagewayList();
    this.getUserList();
    this.getStateList();
    this.getchargeHisList();
  },
  methods: {
    getPassagewayList() {
      this.PassagewayValue = this.PassagewayList[0].Code;
    },
    getUserList() {
      var url = "/insbase/GetInsUserCodeList";
      var postData = {
        type: 0,
        AgentCode: ""
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.UserList = this.UserList.concat(response.Data);
          this.UserValue = this.UserList[0].Code;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    getStateList() {
      this.StateValue = this.StateList[0].Code;
    },

    getchargeHisList() {
      this.loading = true;
      this.$loginapi.postWithPage(
        "/financialstaff/QueryUserMoneyPay",
        this.pager.PageNo,
        this.pager.PageSize,
        {
          UserKey: this.UserKey,
          State: this.seclectType
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.withdrawHisList = response.Data;
            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
            }
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    exportExcel(tableHead, tableBody, name, filename, btnid) {
      $("#" + btnid).attr("disabled", "disabled");
      const h = this.$createElement;

      this.$notify({
        title: "表格导出",
        message: h("i", { style: "color: teal" }, "正在导出，请稍后。。。")
      });
      exportExcel.exportExcel(tableHead, tableBody, name, filename);
      setTimeout(function() {
        $("#" + btnid).removeAttr("disabled");
      }, 5000);
    },
    setSeclectType(value) {
      this.seclectType = value;
    },
    setUserCode(value) {
      this.UserKey = value;
    },
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getchargeHisList();
    }
  }
};
</script>

<style  scoped>
</style>
