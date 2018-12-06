<template>
  <div class="s-height dealSelect_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <SeachConPage ref="SeachConPage"></SeachConPage>
                  <el-select v-model="PositionEffectValue" size="small" placeholder="请选择" class="s_padding">
                    <el-option v-for="item in PositionEffectList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-input placeholder="请输入合约代码" v-model="ContactNoValue" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <el-input placeholder="请输入账号/名称/经纪人代码等关键字查询" v-model="KeyWord" style="width:300px;" clearable size="small" class="s_padding filterSelect">
                  </el-input>
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getDealList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','当日成交汇总','当日成交汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
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
                    <th style="width: 9%">合约代码</th>
                    <th style="width: 4%">方向</th>
                    <th style="width: 4%">开平</th>
                    <th style="width: 8%">成交数量</th>
                    <th style="width: 8%">成交价格</th>
                    <th style="width: 10%">成交时间</th>
                    <th style="width: 10%">成交编号</th>
                    <th style="width: 6%">平仓盈亏</th>
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
                <tr v-for="(item,index) in DealList" :key="index">
                  <td style="width: 4%;">{{index+1}}</td>
                  <td style="width: 8%">{{item.UserCode}}</td>
                  <td style="width: 8%">{{item.UserName}}</td>
                  <td style="width: 8%">{{item.AgentCode == null ? "--" : item.AgentCode}}</td>
                  <td style="width: 8%">{{item.AgentName == null ? "--" : (item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <td style="width: 9%">{{item.CommodityNo}}{{item.ContractNo}}</td>
                  <td style="width: 4%">{{item.Direction | GetDirection}}</td>
                  <td style="width: 4%">{{item.PositionEffect | GetPositionEffectType}}</td>
                  <td style="width: 8%">{{item.Volume}}</td>
                  <td style="width: 8%">{{item.Price }}</td>
                  <td style="width: 10%">{{item.TradeDateTime | datefmt("YYYY-MM-DD HH:mm:ss")}}</td>
                  <td style="width: 10%">{{item.LocalMatchNo}}</td>
                  <td style="width: 6%">{{item.CloseProfit}}</td>
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
          <div class="panel-heading">当日成交详情</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">子账户代码：</label>
                    <div class="wei1"> {{obj.UserCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">合约代码： </label>
                    <div class="wei1">{{obj.CommodityNo}}{{obj.ContractNo}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">方向： </label>
                    <div class="wei1">{{obj.Direction | GetDirection}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">开平：</label>
                    <div class="wei1">{{obj.PositionEffect | GetPositionEffectType}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">成交数量：</label>
                    <div class="wei1">{{obj.Volume}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">成交价格： </label>
                    <div class="wei1">{{obj.Price}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">成交时间：</label>
                    <div class="wei1">{{obj.TradeDateTime | datefmt("YYYY-MM-DD HH:mm:ss")}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">成交编号：</label>
                    <div class="wei1">{{obj.LocalMatchNo}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">总账户代码：</label>
                    <div class="wei1">{{obj.TopAccountNo}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">交易所名称：</label>
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
        <span class="income2">成交数量：
          <span class="income3">{{VolumeTraded}}</span>
        </span>
        <span class="income2">最盈亏：
          <span class="income3">{{CloseProfit}}</span>
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
      DealList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      obj: {},
      Volume: 0,
      VolumeTraded: 0,
      CloseProfit: 0,
      ContactNoValue: "",
      PositionEffectValue: "",
      PositionEffectList: [
        { Code: 0, Name: "请选择开平仓" },
        { Code: 1, Name: "开仓" },
        { Code: 2, Name: "平仓" }
      ],
      KeyWord: ""
    };
  },
  components: {
    pageination,
    SeachConPage
  },
  filters: {
    GetPositionEffectType(type) {
      return EnumConfig.GetPositionEffectType(type);
    },
    GetDirection(type) {
      return EnumConfig.GetDirection(type);
    }
  },
  mounted() {
    this.PositionEffectValue = this.PositionEffectList[0].Code;
    this.getDealList();
  },
  methods: {
    getDealList(isSearch = true) {
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
        url = "/report/QryAllUserCurrentTrade";
        postData = {
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllIns") {
        url = "/report/QryInsUserCurrentTrade";
        postData = {
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          Keyword: this.KeyWord
        };
      } else if (AgentValue == "AllAgent") {
        url = "/report/QryAgentUserCurrentTrade";
        postData = {
          AgentCode: "",
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          Keyword: this.KeyWord
        };
      } else {
        url = "/report/QryAgentUserCurrentTrade";
        postData = {
          AgentCode: AgentValue,
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          Keyword: this.KeyWord
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
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.DealList = response.Data.Records;

            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
              this.VolumeTraded = response.Data.Volume;
              this.CloseProfit = response.Data.CloseProfit;
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
      this.getDealList(false);
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
