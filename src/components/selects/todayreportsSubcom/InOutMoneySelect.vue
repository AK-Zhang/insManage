 <template>
  <div class="s-height inoutmoney_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <SeachConPage ref="SeachConPage"></SeachConPage>
                  <el-select v-model="DirectionValue" size="small" placeholder="请选择" class="s_padding">
                    <el-option v-for="item in DirectionList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-input placeholder="请输入账号/名称/经纪人代码等关键字查询" v-model="KeyWord" style="width:300px;" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <button class="btn btn-default btc btn-sm" type="submit" size="small" @click="getInOutMoneyList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','当日出入金汇总','当日出入金汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 6%">序号</th>
                    <th style="width: 8%">操作日期</th>
                    <th style="width: 8%">子账户代码</th>
                    <th style="width: 8%">子账户名称</th>
                    <th style="width: 8%">经纪人代码</th>
                    <th style="width: 8%">经纪人名称</th>
                    <th style="width: 5%">类型</th>
                    <th style="width: 7%">发生金额</th>
                    <th style="width: 7%">来源</th>
                    <!-- <th style="width: 9%">操作时间 </th> -->
                    <th style="width: 9%">隶属关系 </th>
                    <th style="width: 10%">支付订单号</th>
                    <th style="width: 10%">支付状态 </th>
                    <th style="width: 6%">操作</th>
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
                <tr v-for="(item,index) in InOutMoneyList" :key="index">
                  <td style="width: 6%;">{{index+1}}</td>
                  <td style="width: 8%">{{item.OptDate | datefmt("YYYY-MM-DD")}}</td>
                  <td style="width: 8%">{{item.UserCode}}</td>
                  <td style="width: 8%">{{item.UserName}}</td>
                  <td style="width: 8%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 8%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 5%">{{item.TransferType== 2 ?"出金":"入金"}}</td>
                  <td style="width: 7%">{{item.TransferMoney}}</td>
                  <td style="width: 7%">{{item.MoneyTransSource }}</td>
                  <td style="width: 9%">{{item.IB}}</td>
                  <td style="width: 10%">{{item.Id}}</td>
                  <td style="width: 10%">{{item.OrderState}}</td>
                  <td style="width: 6%">
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
          <div class="panel-heading">出入金详情</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">操作日期：</label>
                    <div class="wei1"> {{obj.OptDate | datefmt("YYYY-MM-DD")}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">出入金流水号：</label>
                    <div class="wei1"> {{obj.Id}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账户代码： </label>
                    <div class="wei1">{{obj.UserCode}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">出入金类型： </label>
                    <div class="wei1">{{obj.TransferType==0 ?"出金":"入金"}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">发生金额：</label>
                    <div class="wei1">{{obj.TransferMoney}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">操作员：</label>
                    <div class="wei1">{{obj.OprCode}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">出入金来源： </label>
                    <div class="wei1">{{obj.MoneyTransSource}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账户名称：</label>
                    <div class="wei1">{{obj.UserName}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">货币类型：</label>
                    <div class="wei1">{{obj.CurrencyName}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">订单状态：</label>
                    <div class="wei1">{{obj.OrderState}}</div>
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
        <span class="income2">出金总计：
          <span class="income3">{{OutTotal}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">入金总计：
          <span class="income3">{{EntityTotal}}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import EnumConfig from "../../../assets/js/EnumConfig.js";
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";
import SeachConPage from "../SeachConditionSubCom.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      InOutMoneyList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      DirectionList: [
        { Code: 0, Name: "出入金方向" },
        { Code: 1, Name: "入金" },
        { Code: 2, Name: "出金" }
      ],
      OutTotal: 0,
      EntityTotal: 0,
      DirectionValue: 0,
      obj: {},
      KeyWord: ""
    };
  },
  components: {
    pageination,
    SeachConPage
  },
  mounted() {
    this.DirectionValue = this.DirectionList[0].Code;
    this.getInOutMoneyList();
  },
  methods: {
    getInOutMoneyList(isSearch = true) {
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
      this.loading = true;
      if (AgentValue == "") {
        url = "/report/QueryAllUserCurrentMoneyTransfer";
        postData = {
          MoneyTransType: this.DirectionValue,
          KeyWord: this.KeyWord
        };
      } else if (AgentValue == "AllIns") {
        url = "/report/QueryNoAgentUserCurrentMoneyTransfer";
        postData = {
          MoneyTransType: this.DirectionValue,
          KeyWord: this.KeyWord
        };
      } else if (AgentValue == "AllAgent") {
        url = "/report/QueryAgentUserCurrentMoneyTransfer";
        postData = {
          AgentCode: "",
          MoneyTransType: this.DirectionValue,
          KeyWord: this.KeyWord
        };
      } else {
        url = "/report/QueryAgentUserCurrentMoneyTransfer";
        postData = {
          AgentCode: "",
          MoneyTransType: this.DirectionValue,
          KeyWord: this.KeyWord
        };
      }

      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        postData,
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            //console.log(response);
            if (response.Data.ListDetail.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.InOutMoneyList = response.Data.ListDetail;
            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
              this.EntityTotal = response.Data.TransferTotal.EntityTotal;
              this.OutTotal = response.Data.TransferTotal.OutTotal;
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
      this.getInOutMoneyList(false);
    },
    showUpdatePage(obj) {
      this.obj = obj;
      //console.log(this.obj);
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
