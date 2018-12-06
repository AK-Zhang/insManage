<template>
  <div class="s-height capital_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <SeachConPage ref="SeachConPage"></SeachConPage>
                  <el-select v-model="CurrencyValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in CurrencyList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-date-picker class="s_padding" size="small" v-model="DateRangeValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-input placeholder="请输入账号/名称/经纪人代码等关键字查询" v-model="KeyWord" style="width:300px;" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <button class="btn btn-default btc btn-sm" size="small" type="submit" @click="getCatipalList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','历史资金汇总','历史资金汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 5%;">序号</th>
                    <th style="width: 8%">结算日期</th>
                    <th style="width: 8%">子账户代码</th>
                    <th style="width: 7%">子账户名称</th>
                    <th style="width: 10%">经纪人代码</th>
                    <th style="width: 8%">经纪人名称</th>
                    <th style="width: 6%">入金</th>
                    <th style="width: 6%">出金</th>
                    <th style="width: 8%">持仓盈亏</th>
                    <th style="width: 8%">平仓盈亏</th>
                    <th style="width: 6%">手续费</th>
                    <th style="width: 8%">动态权益</th>
                    <th style="width: 8%">可用资金</th>
                    <th style="width: 5%">操作</th>
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
                <tr v-for="(item,index) in CatipalList" :key="index">
                  <td style="width: 5%;">{{index+1}}</td>
                  <td style="width: 8%">{{item.TradingDay | datefmt("YYYY-MM-DD")}}</td>
                  <td style="width: 8%">{{item.UserCode}}</td>
                  <td style="width: 7%">{{item.UserName == null ? "--" : (item.UserName == "" ? "--" : item.UserName)}}</td>
                  <td style="width: 10%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 8%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 6%">{{item.Deposit}}</td>
                  <td style="width: 6%">{{item.Withdraw}}</td>
                  <td style="width: 8%">{{item.FloatingProfit}}</td>
                  <td style="width: 8%">{{item.CloseProfit}}</td>
                  <td style="width: 6%">{{item.Commission}}</td>
                  <td style="width: 8%">{{item.CurrBalance}}</td>
                  <td style="width: 8%">{{item.CurrUse}}</td>
                  <td style="width: 5%">
                    <a id="param-edit" @click="showUpdatePage(item)" style="color:#337ab7;">详细</a>
                  </td>
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
    <div class="mask">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">历史资金详情</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">结算日期： </label>
                    <div class="wei1">{{obj.TradingDay | datefmt("YYYY-MM-DD HH:mm:ss")}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账户代码： </label>
                    <div class="wei1">{{obj.UserCode}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">机构代码：</label>
                    <div class="wei1">{{obj.InsCode}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">经纪人： </label>
                    <div class="wei1">{{obj.AgentCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">经纪人名称： </label>
                    <div class="wei1">{{obj.AgentName}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">可用资金： </label>
                    <div class="wei1">{{obj.CurrUse}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">入金：</label>
                    <div class="wei1">{{obj.Deposit}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">出金：</label>
                    <div class="wei1">{{obj.Withdraw}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">持仓盈亏： </label>
                    <div class="wei1">{{obj.FloatingProfit}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">平仓盈亏：</label>
                    <div class="wei1">{{obj.CloseProfit}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">手续费：</label>
                    <div class="wei1">{{obj.Commission}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">动态权益：</label>
                    <div class="wei1">{{obj.CurrBalance}}</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">关闭</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="footbincon">
      <div class="footbincon1">
        <span class="income4">记录数：
          <span class="income3">{{pager.RecordCount}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">出金：
          <span class="income3">{{TotalWithdraw}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">入金：
          <span class="income3">{{TotalDeposit}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">手续费：
          <span class="income3">{{TotalCommission}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">平仓盈亏：
          <span class="income3">{{TotalCloseProfit}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from "../../../assets/js/Common.js";
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";
import SeachConPage from "../SeachConditionSubCom.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      CatipalList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      CurrencyList: [{ Code: "", Name: "全部币种" }],
      CurrencyValue: "",
      obj: {},
      DateRangeValue: [],
      TotalDeposit: 0,
      TotalWithdraw: 0,
      TotalCommission: 0,
      TotalCloseProfit: 0,
      KeyWord: ""
    };
  },
  components: {
    pageination,
    SeachConPage
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getCurrencyList();
    this.getCatipalList();
  },
  methods: {
    getCurrencyList() {
      this.$loginapi.post("/insbase/GetCurrencyCodeList", "", response => {
        if (response.Ret == 0) {
          this.CurrencyList = this.CurrencyList.concat(response.Data);
          this.CurrencyValue = this.CurrencyList[0].Code;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    getCatipalList(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      let AgentValue = this.$refs.SeachConPage.AgentValue;
      let url = "";
      let postData = "";

      if (AgentValue == "") {
        url = "/report/QryAllUserHistoryAccount";
        postData = {
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllIns") {
        url = "/report/QryInsUserHistoryAccount";
        postData = {
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllAgent") {
        url = "/report/QryAgentUserHistoryAccount";
        postData = {
          AgentCode: "",
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      } else {
        url = "/report/QryAgentUserHistoryAccount";
        postData = {
          AgentCode: AgentValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      }
      this.loading = true;
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        postData,
        response => {
          if (response.Ret == 0) {
            this.loading = false;
            // console.log(response);
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.CatipalList = response.Data.Records;

            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
              this.TotalDeposit = response.Data.Deposit;
              this.TotalWithdraw = response.Data.Withdraw;
              this.TotalCommission = response.Data.Commission;
              this.TotalCloseProfit = response.Data.CloseProfit;
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
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getCatipalList(false);
    },
    showUpdatePage(obj) {
      this.obj = obj;
      $(".mask").fadeIn("fast");
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      this.obj = {};
    }
  }
};
</script>

<style  scoped>
</style>
