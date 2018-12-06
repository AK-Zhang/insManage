<template>
  <div class="s-height accountSelect_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <SeachConPage ref="SeachConPage"></SeachConPage>
                  <el-date-picker v-model="DateRangeValue" class="s_padding" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-select v-model="Limits" size="small" placeholder="请选择开仓权限" class="s_padding">
                    <el-option label="全部开仓权限" value="">
                    </el-option>
                    <el-option label="是" value="1">
                    </el-option>
                    <el-option label="否" value="0">
                    </el-option>
                  </el-select>
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getAccountList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','子账户汇总','子账户汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 4%;">序号</th>
                    <th style="width: 8%">子账户代码</th>
                    <th style="width: 8%">子账户名称 </th>
                    <th style="width: 8%">可用余额</th>
                    <th style="width: 8%">总账户代码 </th>
                    <th style="width: 8%">经纪人代码</th>
                    <th style="width: 8%">经纪人名称</th>
                    <th style="width: 10%">保证金模板</th>
                    <th style="width: 12%">手续费模板 </th>
                    <th style="width: 10%">风控模板 </th>
                    <th style="width: 6%">开仓权限</th>
                    <th style="width: 10%">开户日期 </th>
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
                <tr v-for="(item,index) in AccountList" :key="index">
                  <td style="width: 4%;">{{index+1}}</td>
                  <td style="width: 8%">{{item.UserCode}}</td>
                  <td style="width: 8%">{{item.UserName }}</td>
                  <td style="width: 8%">{{Math.floor(item.CurrencyBalance*100)/100}}</td>
                  <td style="width: 8%">{{item.TopAccountCode}}</td>
                  <td style="width: 8%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 8%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 10%">{{item.MarginTemplateName }}</td>
                  <td style="width: 12%">{{item.FeeTemplateName}}</td>
                  <td style="width: 10%">{{item.RiskTemplateName}}</td>
                  <td style="width: 6%;">{{item.OpenPositionPower ? "是" : "否"}}</td>
                  <td style="width: 10%">{{item.CreateDate}}</td>
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
import SeachConPage from "../SeachConditionSubCom.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      AccountList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      DateRangeValue: [],
      Limits: ""
    };
  },
  components: {
    pageination,
    SeachConPage
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getAccountList();
  },
  methods: {
    getAccountList(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      let AgentValue = this.$refs.SeachConPage.AgentValue;
      let UserValue = this.$refs.SeachConPage.UserValue;
      let url = "";
      let postData = "";

      if (AgentValue == "") {
        url = "/report/QueryAllUsers";
        postData = {
          UserCode: UserValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          OpenRight: this.Limits
        };
      } else if (AgentValue == "AllIns") {
        url = "/report/QueryNoAgentInsUsers";
        postData = {
          UserCode: UserValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          OpenRight: this.Limits
        };
      } else if (AgentValue == "AllAgent") {
        url = "/report/QueryAgentInsUsers";
        postData = {
          AgentCode: "",
          UserCode: UserValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          OpenRight: this.Limits
        };
      } else {
        url = "/report/QueryAgentInsUsers";
        postData = {
          AgentCode: AgentValue,
          UserCode: UserValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          OpenRight: this.Limits
        };
      }
      this.loading = true;
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        postData,
        response => {
          this.loading = false;
          // console.log(response);
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.AccountList = response.Data;
            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
            }
          } else {
            this.$message.error(response.Msg);
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
      this.getAccountList(false);
    }
  }
};
</script>


<style  scoped>
</style>
