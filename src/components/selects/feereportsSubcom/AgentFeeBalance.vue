<template>
  <div class="s-height agentFeeBalance_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div style="flex:8;">
                  <el-select v-model="AgentValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in AgentList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <button class="btn btn-default btn-sm btc" type="submit" size="small" @click="getAgentFeeBalanceList()">
                    查询
                  </button>
                </div>
                <div class="text-right" style="flex:4;">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','经纪人佣金结余','经纪人佣金结余.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" style="margin-bottom:0;" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 15%">经纪人</th>
                    <th style="width: 15%">经纪人名称</th>
                    <th style="width: 15%">总佣金</th>
                    <th style="width: 10%">出金</th>
                    <th style="width: 10%">入金</th>
                    <th style="width: 15%">经纪人余额</th>
                    <th style="width: 15%">币种代码</th>
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
                <tr v-for="(item,index) in AgentFeeBalanceList" :key="index">
                  <td style="width: 5%">{{index+1}}</td>
                  <td style="width: 15%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 15%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 15%">{{item.TotalCommissionProfit}}</td>
                  <td style="width: 10%">{{item.TotalWithdraw}}</td>
                  <td style="width: 10%">{{item.TotalDeposit }}</td>
                  <td style="width: 15%">{{item.Balance }}</td>
                  <td style="width: 15%">{{item.CurrencyNo}}</td>
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
    <div class="footbincon">
      <div class="footbincon1">
        <span class="income4">记录数：
          <span class="income3">{{pager.RecordCount}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">佣金结余：
          <span class="income3">{{TotalCommission}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">机构入金：
          <span class="income3">{{TotalDeposit}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">机构出金：
          <span class="income3">{{TotalWithdraw}}</span>
        </span>
      </div>
      <!-- <div class="footbincon2">
        <span class="income2">总提现：
          <span class="income3">{{TotalWithdraw}}</span>
        </span>
      </div> -->
      <div class="footbincon2">
        <span class="income2">总佣金：
          <span class="income3">{{TotalCommission}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import exportExcel from "../../../assets/js/exportTable.js";
import commonJs from "../../../assets/js/Common.js";
import pageination from "../../subcom/pageination.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      AgentFeeBalanceList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      AgentList: [{ Code: "", Name: "全部经纪人" }],
      AgentValue: [],
      obj: {},
      TotalBalance: 0,
      TotalCommission: 0,
      TotalDeposit: 0,
      TotalWithdraw: 0
    };
  },
  components: {
    pageination
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getAgentList();
    this.getAgentFeeBalanceList();
  },
  methods: {
    getAgentList() {
      this.$loginapi.post("/insbase/GetAgentCodeList", "", response => {
        if (response.Ret == 0) {
          this.AgentList = this.AgentList.concat(response.Data);
          this.AgentValue = this.AgentList[0].Code;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    getAgentFeeBalanceList(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      let url = "/report/QryAgentBalance";
      this.loading = true;
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        this.AgentValue,
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            //console.log(response);
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.AgentFeeBalanceList = response.Data.Records;

            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
              this.TotalBalance = response.Data.TotalBalance;
              this.TotalCommission = response.Data.TotalCommission;
              this.TotalDeposit = response.Data.TotalDeposit;
              this.TotalWithdraw = response.Data.TotalWithdraw;
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
      this.getAgentFeeBalanceList(false);
    }
  }
};
</script>

<style scoped>
</style>
