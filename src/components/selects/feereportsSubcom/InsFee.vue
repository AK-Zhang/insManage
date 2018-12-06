<template>
  <div class="s-height insFee_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div style="flex:8;">
                  <el-date-picker class="s_padding" v-model="DateRangeValue" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getInsFeeList()">
                    查询
                  </button>
                </div>
                <div class="text-right" style="flex:4;">
                  <button type="submit" @click="exportExcelBase('tableHeader','tableBody','机构佣金汇总','机构佣金汇总.xls')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" style="margin-bottom:0;" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 5%; text-indent: 1em;">序号</th>
                    <th style="width: 15%">结算日期</th>
                    <th style="width: 15%">直属客户手续费</th>
                    <th style="width: 15%">经纪人手续费</th>
                    <th style="width: 10%">机构成本</th>
                    <th style="width: 10%">机构佣金</th>
                    <th style="width: 10%">币种代码</th>
                    <th style="width: 10%">总账户代码</th>
                    <th style="width: 11%">操作</th>
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
                <tr v-for="(item,index) in InsFeeList" :key="index">
                  <td style="width:5%; text-indent: 1em;">{{index+1}}</td>
                  <td style="width: 15%">{{item.CreateDate| datefmt("YYYY-MM-DD")}}</td>
                  <td style="width: 15%">{{item.UserCommission}}</td>
                  <td style="width: 15%">{{item.AgentCommissionProfit}}</td>
                  <td style="width: 10%">{{item.ServiceCommission}}</td>
                  <td style="width: 10%">{{item.CommissionProfit}}</td>
                  <td style="width: 10%">{{item.CurrencyNo}}</td>
                  <td style="width: 10%">{{item.TopAccountNo}}</td>
                  <td style="width: 11%">
                    <a id="param-edit" @click="handleClick(item)" style="color:#337ab7;">详细</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation" class="text-center page-separation">
              <pageination :pagerPro="PagerMain" @ee="MainpageFn"></pageination>
            </nav>
          </div>
        </div>
      </article>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="交易明细" :visible.sync="dialogTableVisible" append-to-body width="78.6%" top="9vh" center>
      <el-table :data="transactionDetaillist" class="celll" height="450" id="tableExcel" fixed>
        <el-table-column prop="UserCode" label="客户代码"></el-table-column>
        <el-table-column prop="ContractNo" label="合约代码"></el-table-column>
        <el-table-column prop="Direction" label="方向">
          <template slot-scope="scope">
            <span>{{scope.row.Direction | GetDirection}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PositionEffect" label="开平">
          <template slot-scope="scope">
            <span>{{scope.row.PositionEffect | GetPositionEffectType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Volume" label="成交手数"></el-table-column>
        <el-table-column prop="Price" label="成交价格"></el-table-column>
        <el-table-column prop="UserCommission" label="手续费"></el-table-column>
        <el-table-column prop="OrderRef" label="成交编号" width="200"></el-table-column>
        <!-- <el-table-column prop="TradeDateTime" label="成交日期">
          <template slot-scope="scope">
            <span>{{scope.row.TradeDateTime | datefmt("YYYY-MM-DD")}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="TradeDateTime" label="成交时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.TradeDateTime | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CommodityNo" label="品种代码"></el-table-column>
        <el-table-column prop="CommissionProfit" label="佣金"></el-table-column>
      </el-table>
      <div class="pagination_mx text-center" style="margin-top:10px">
        <pageination :pagerPro="Pager" @ee="pageFn"></pageination>
      </div>
      <div class="total">
        <div class="total_word">
          佣金合计：
          <span class="footb_money">{{TotalCommission}}</span>
          <span class="footb_money1"> （美元）</span>
        </div>
        <div class="total_word">
          成交手数合计：
          <span class="footb_money">{{TotalVolume}}</span>
          <span class="footb_money1"> （手）</span>
        </div>
        <div class="total_word">
          手续费合计：
          <span class="footb_money">{{TotalUserCommission}}</span>
          <span class="footb_money1"> （美元）</span>
        </div>
      </div>
      <div>
        <button type="submit" id="exportBtn" @click="exportExcel('tableExcel','机构佣金交易明细','机构佣金交易明细.xls','exportBtn')" class="btn btn-primary" style="float:right;margin-top:-40px;font-size:12px;color:#fff">
          <a id="dlinks" href="" style="display: none;"></a>
          <i class="fa fa-download  "></i> 导出表格</button>
      </div>
    </el-dialog>
    <div class="footbincon">
      <div class="footbincon1">
        <span class="income4">记录数：
          <span class="income3">{{PagerMain.RecordCount}}</span>
        </span>
      </div>
      <div class="footbincon2">
        <span class="income2">机构佣金：
          <span class="income3">{{TotalCommissionMain}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from "../../../assets/js/Common.js";
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";
import EnumConfig from "../../../assets/js/EnumConfig.js";
export default {
  data() {
    return {
      loading: "",
      ishow: true,
      InsFeeList: [],
      pagerow: {},
      dialogTableVisible: false,
      transactionDetaillist: [],
      TotalUserCommission: "",
      TotalVolume: "",
      Pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      PagerMain: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      DateRangeValue: [],
      obj: {},
      TotalCommissionMain: 0,
      TotalCommission: 0
    };
  },
  components: {
    pageination
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getInsFeeList();
  },
  filters: {
    GetDirection(type) {
      return EnumConfig.GetDirection(type);
    },
    GetPositionEffectType(type) {
      return EnumConfig.GetPositionEffectType(type);
    }
  },
  methods: {
    getInsFeeList(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      let url = "/report/QryInsCommissionHistory";
      let postData = {
        BeginDate: this.DateRangeValue[0],
        EndDate: this.DateRangeValue[1]
      };
      this.loading = true;
      this.$loginapi.postWithPage(
        url,
        this.PagerMain.PageNo,
        this.PagerMain.PageSize,
        postData,
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.InsFeeList = response.Data.Records;

            if (this.PagerMain.PageNo == 1) {
              this.PagerMain = response.Pager;
              this.TotalCommissionMain = response.Data.TotalCommissionProfit;
            }
          } else {
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 查看明细
    handleClick(row) {
      this.pagerow = row;
      this.dialogTableVisible = true;
      let url = "/report/QryInsDayCommissionDetail";
      let postData = {
        Date: row.CreateDate,
        CurrencyNo: row.CurrencyNo,
        TopAccountNo: row.TopAccountNo
      };
      this.$loginapi.postWithPage(
        url,
        this.Pager.PageNo,
        this.Pager.PageSize,
        postData,
        response => {
          if (response.Ret == 0) {
            this.transactionDetaillist = response.Data.Records;
            if (this.Pager.PageNo == 1) {
              this.Pager = response.Pager;
              this.Pager.RecordCount = response.Data.RecordCount;
              this.TotalCommission = response.Data.TotalCommissionProfit;
              this.TotalVolume = response.Data.TotalVolume;
              this.TotalUserCommission = response.Data.TotalUserCommission;
            }
          } else {
            this.$message.error(response.Msg);
          }
        }
      );
    },
    exportExcelBase(tableHead, tableBody, name, filename, btnid) {
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
      this.Pager.PageSize = size;
      this.Pager.PageNo = pageno;
      this.handleClick(this.pagerow);
    },
    MainpageFn(size, pageno) {
      this.PagerMain.PageSize = size;
      this.PagerMain.PageNo = pageno;
      this.getInsFeeList(false);
    },
    // 导出表格
    getExplorer() {
      var explorer = window.navigator.userAgent;

      //ie
      if (explorer.indexOf("MSIE") >= 0) {
        return "ie";
      } else if (explorer.indexOf("Firefox") >= 0) {
        //firefox
        return "Firefox";
      } else if (explorer.indexOf("Chrome") >= 0) {
        //Chrome
        return "Chrome";
      } else if (explorer.indexOf("Opera") >= 0) {
        //Opera
        return "Opera";
      } else if (explorer.indexOf("Safari") >= 0) {
        //Safari
        return "Safari";
      }
    },
    exportExcel(tableid, name, filename) {
      if (this.getExplorer() == "ie") {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;
        try {
          var fname = oXL.Application.GetSaveAsFilename(
            "Excel.xls",
            "Excel Spreadsheets (*.xls), *.xls"
          );
        } catch (e) {
          print("Nested catch caught " + e);
        } finally {
          oWB.SaveAs(fname);
          oWB.Close((savechanges = false));
          oXL.Quit();
          oXL = null;
          idTmr = window.setInterval("Cleanup();", 1);
        }
      } else {
        this.tableToExcel(tableid, name, filename);
      }
    },
    Cleanup() {
      window.clearInterval(idTmr);
      CollectGarbage();
    },
    tableToExcel(table, name, filename) {
      var uri = "data:application/vnd.ms-excel;base64,",
        //Excel样式代码
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
          'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
          "<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
          "</x:ExcelWorkbook></xml><![endif]-->" +
          ' <style type="text/css">' +
          ".excelTable  {" +
          "border-collapse:collapse;" +
          " border:thin solid #999; " +
          "}" +
          "   .excelTable  th {" +
          "   border: thin solid #999;" +
          "  padding:20px;" +
          "  text-align: center;" +
          "  border-top: thin solid #999;" +
          " background-color: #E6E6E6;" +
          " }" +
          " .excelTable  td{" +
          " border:thin solid #999;" +
          "  padding:2px 5px;" +
          "  text-align: center;" +
          " }</style>" +
          '</head><body ><table class="excelTable">{table}</table></body></html>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          });
        };
      if (!table.nodeType) table = document.getElementById(table);
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      document.getElementById("dlinks").href =
        uri + base64(format(template, ctx));
      document.getElementById("dlinks").download = filename;
      document.getElementById("dlinks").click();
    }
  }
};
</script>

<style  scoped>
.total {
  width: 80%;
  min-width: 800px;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
}
.total_word {
  float: left;
  margin-right: 30px;
  color: #000;
  font-size: 14px;
}
.footb_money {
  font-size: 17px;
  color: #000;
}
.footb_money1 {
  font-size: 13px;
  color: #000;
}
</style>
