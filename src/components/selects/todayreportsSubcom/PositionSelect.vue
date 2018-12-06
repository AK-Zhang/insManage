 <template>
  <div class="s-height position_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <SeachConPage ref="SeachConPage"></SeachConPage>
                  <el-input placeholder="请输入合约代码" v-model="ContactNoValue" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <el-input placeholder="请输入账号/名称/经纪人代码等关键字查询" v-model="KeyWord" style="width:300px;" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <button class="btn btn-default btn-sm btc" type="submit" size="small" @click="getPositionList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','当日持仓汇总','当日持仓汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 4%;">序号</th>
                    <th style="width: 8%">子账户代码</th>
                    <th style="width: 8%">子账户名称</th>
                    <th style="width: 8%">经纪人代码</th>
                    <th style="width: 8%">经纪人名称</th>
                    <th style="width: 8%">合约代码</th>
                    <th style="width: 5%">持卖量</th>
                    <th style="width: 10%">持卖均价</th>
                    <th style="width: 5%">持买量</th>
                    <th style="width: 10%">持买均价</th>
                    <th style="width: 8%">保证金</th>
                    <th style="width: 8%">持仓盈亏</th>
                    <th style="width: 4%">操作</th>
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
                <tr v-for="(item,index) in PositionList" :key="index">
                  <td style="width: 4%;">{{index+1}}</td>
                  <td style="width: 8%">{{item.UserCode}}</td>
                  <td style="width: 8%">{{item.UserName}}</td>
                  <td style="width: 8%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 8%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 8%">{{item.CommodityNo}}{{item.ContractNo}}</td>
                  <td style="width: 5%">{{item.HoldSaleVolume}}</td>
                  <td style="width: 10%">{{Math.round(item.HoldSalePrice*100)/100}}</td>
                  <td style="width: 5%">{{item.HoldBuyVolume}}</td>
                  <td style="width: 10%">{{Math.round(item.HoldBuyPrice*100)/100}}</td>
                  <td style="width: 8%">{{item.Margin}}</td>
                  <td style="width: 8%">{{Math.round(item.PositionProfit*100)/100}}</td>
                  <td style="width: 4%">
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
          <div class="panel-heading">持仓详情</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">结算日期：</label>
                    <div class="wei1">{{obj.TradingDay | datefmt("YYYY-MM-DD HH:mm:ss")}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">子账户代码：</label>
                    <div class="wei1">{{obj.UserCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账户名称：</label>
                    <div class="wei1">{{obj.UserName}}</div>
                  </div>
                </div>

                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">经纪人代码：</label>
                    <div class="wei1">{{obj.AgentCode}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">经纪人名称：</label>
                    <div class="wei1">{{obj.AgentName}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">合约代码： </label>
                    <div class="wei1">{{obj.CommodityNo}}{{obj.ContractNo}}</div>
                  </div>
                </div>

                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">持卖量： </label>
                    <div class="wei1">{{obj.HoldSaleVolume}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">持卖均价：</label>
                    <div class="wei1">{{obj.HoldSalePrice}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">保证金：</label>
                    <div class="wei1">{{obj.Margin}}</div>
                  </div>
                </div>

                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">持买量： </label>
                    <div class="wei1">{{obj.HoldBuyVolume}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">持买均价：</label>
                    <div class="wei1">{{obj.HoldBuyPrice}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">持仓盈亏： </label>
                    <div class="wei1">{{obj.PositionProfit}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">总账户代码：</label>
                    <div class="wei1">{{obj.TopAccountNo}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">交易所名称： </label>
                    <div class="wei1">{{obj.ExchangeName}}</div>
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
        <span class="income2">数量：
          <span class="income3">{{TotalVolume}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">保证金：
          <span class="income3">{{TotalMargin}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EnumConfig from "../../../assets/js/EnumConfig.js";
import exportExcel from "../../../assets/js/exportTable.js";
import commonJs from "../../../assets/js/Common.js";
import pageination from "../../subcom/pageination.vue";
import SeachConPage from "../SeachConditionSubCom.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      PositionList: [],
      ContactNoValue: "",
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      obj: {},
      TotalVolume: 0,
      TotalMargin: 0,
      KeyWord: ""
    };
  },
  components: {
    pageination,
    SeachConPage
  },
  mounted() {
    this.getPositionList();
  },
  methods: {
    getPositionList(isSearch = true) {
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
        url = "/report/QryAllUserPositionStatisToday";
        postData = {
          ContactNO: this.ContactNoValue,
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllIns") {
        url = "/report/QryInsUserPositionStatisToday";
        postData = {
          ContactNO: this.ContactNoValue,
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllAgent") {
        url = "/report/QryAgentUserPositionStatisToday";
        postData = {
          AgentCode: "",
          ContactNO: this.ContactNoValue,
          Keyword: this.KeyWord
        };
      } else {
        url = "/report/QryAgentUserPositionStatisToday";
        postData = {
          AgentCode: AgentValue,
          ContactNO: this.ContactNoValue,
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
          this.loading = false;
          if (response.Ret == 0) {
            //console.log(response);
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.PositionList = response.Data.Records;

            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
              this.TotalVolume = response.Data.Volume;
              this.TotalMargin = response.Data.Margin;
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
      this.getPositionList(false);
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
