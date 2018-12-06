<template>
  <div class="s-height accountSelect_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <!-- <el-date-picker v-model="DateRangeValue" class="s_padding" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getExceptionTradeList()">
                    查询
                  </button> -->
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','异常交易汇总','异常交易汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 5%;">序号</th>
                    <th style="width: 10%">姓名</th>
                    <th style="width: 10%">代码</th>
                    <th style="width: 10%">身份证号</th>
                    <th style="width: 10%">类型</th>
                    <th style="width: 10%">手机号</th>
                    <th style="width: 7%">触发时间</th>
                    <th style="width: 8%">触发类型</th>
                    <th style="width: 20%">备注</th>
                    <th style="width: 10%"></th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="panel panel-default table-2" v-loading="loading">
            <table class="table table-hover table-2-1 table__243" id="tableBody">
              <tbody>
                <tr>
                  <td v-show="ishow" style="width:100%">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in ExceptionTradeList" :key="index">
                  <td style="width:5%;">{{index+1}}</td>
                  <td style="width:10%">{{item.Name}}</td>
                  <td style="width:10%">{{item.UserCode}}</td>
                  <td style="width:10%">{{item.IDCard}}</td>
                  <td style="width:10%">{{item.UserTypeStr}}</td>
                  <td style="width:10%">{{item.Phone}}</td>
                  <td style="width:7%">{{item.TriggerTime}}</td>
                  <td style="width:8%">{{item.TriggerTypeStr}}</td>
                  <td style="width:20%">{{item.Remark}}</td>
                  <td style="width:10%">
                    <!-- <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" @click.native="DelBlackList(item.ID)">
                              删除
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="TriggerRecords(item.ID)">
                              触发记录
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div> -->
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
  </div>
</template>

<script>
import EnumConfig from "../../../assets/js/EnumConfig.js";
import exportExcel from "../../../assets/js/exportTable.js";
import commonJs from "../../../assets/js/Common.js";
import pageination from "../../subcom/pageination.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: true,
      ExceptionTradeList: [],
      textid: "Text_",
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      DateRangeValue: []
    };
  },
  components: {
    pageination
  },
  filters: {
    GetDirection(type) {
      return EnumConfig.GetDirection(type);
    }
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getExceptionTradeList();
  },
  methods: {
    getExceptionTradeList(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      // let AgentValue = this.$refs.SeachConPage.AgentValue;
      // let UserValue = this.$refs.SeachConPage.UserValue;
      let url = "/insblack/QryBlackTriggerRecords";
      let postData = {
        TriggerType: 0,
        KeyWord: ""
      };
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
            this.ExceptionTradeList = response.Data;
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
    ShowText(text, index) {
      $(".ssss,.dddd").css("display", "none");
      $("." + this.textid + index).css({
        display: "inline-block",
        right: "20%"
      });
    },
    Hiddens() {
      $(".ssss,.dddd").css("display", "none");
    },
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getExceptionTradeList(false);
    }
  }
};
</script>


<style  scoped>
.table__243 tr {
  width: 100%;
}
.table__243 th,
.table__243 td {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ssss,
.dddd {
  position: absolute;
  display: none;
  width: 30%;
  background-color: gray;
  font-size: 18px;
  line-height: 28px;
  color: oldlace;
  padding: 15px;
  border-radius: 10px;
  word-break: break-all;
  word-wrap: break-word;
}
.dddd {
  width: 8px;
  height: 8px;
  right: 19.7% !important;
  border-radius: 50% 0 0 0;
  transform: translateY(0px) rotate(45deg);
  background-color: gray;
}
.ssss {
  z-index: 1;
  transform: translateY(-10px);
}
</style>
