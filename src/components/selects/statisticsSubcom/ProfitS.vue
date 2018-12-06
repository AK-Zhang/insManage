<template>
  <div class="s-height accountSelect_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <el-date-picker
                    v-model="DateRangeValue"
                    class="s_padding"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                  <el-input
                    placeholder="请输入关键字查询"
                    v-model="KeyWord"
                    clearable
                    size="small"
                    class="s_padding filterSelect"
                  >
                  </el-input>
                  <el-select
                    v-model="sortType"
                    size="small"
                    placeholder="请选择排序方式"
                    class="s_padding"
                  >
                    <el-option
                      v-for="item in sortTypes"
                      :key="item.Code"
                      :label="item.label"
                      :value="item.Code"
                    >
                    </el-option>
                  </el-select>
                  <button
                    class="btn btn-default btn-sm btc"
                    type="submit"
                    @click="getExceptionTradeList()"
                  >
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button
                    type="submit"
                    id="exportBtn"
                    @click="exportExcel('tableHeader','tableBody','异常交易汇总','异常交易汇总.xls','exportBtn')"
                    class="btn btn-primary"
                    style="float:right;font-size:12px;color:#fff"
                  >
                    <a
                      id="dlink"
                      href=""
                      style="display: none;"
                    ></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table
                class="table table-1-1"
                id="tableHeader"
              >
                <thead>
                  <tr>
                    <th style="width: 5%;">序号</th>
                    <th style="width: 10%">子账户代码</th>
                    <th style="width: 10%">子账户名称</th>
                    <th style="width: 10%">单量</th>
                    <th style="width: 10%">手续费</th>
                    <th style="width: 55%">层级关系</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div
            class="panel panel-default table-2"
            v-loading="loading"
          >
            <table
              class="table table-hover table-2-1 table__243"
              id="tableBody"
            >
              <tbody>
                <tr>
                  <td
                    v-show="ishow"
                    style="width:100%"
                  >暂无数据</td>
                </tr>
                <tr
                  v-for="(item,index) in ExceptionTradeList"
                  :key="index"
                >
                  <td style="width:5%;">{{index+1}}</td>
                  <td style="width:10%">{{item.UserCode}}</td>
                  <td style="width:10%">{{item.UserName}}</td>
                  <td style="width:10%">{{item.Volume}}</td>
                  <td style="width:10%">{{item.Commission}}</td>
                  <td style="width: 55%">{{item.IB == null ? "--" : (item.IB == "" ? "--" : item.IB)}}</td>
                </tr>
              </tbody>
            </table>
            <nav
              aria-label="Page navigation"
              class="text-center page-separation"
            >
              <pageination
                :pagerPro="pager"
                @ee="pageFn"
              ></pageination>
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
  props: ["agentID"],
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
      DateRangeValue: [],
      KeyWord: "",
      sortType: "",
      sortTypes: [
        { Code: 0, label: "单量升序" },
        { Code: 1, label: "单量降序" }
      ]
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
      let url = "/report/QryTradeProfit";
      let postData = {
        AgentIds: this.agentID,
        Keyword: this.KeyWord,
        BeginTime: this.DateRangeValue[0],
        EndTime: this.DateRangeValue[1],
        SortType: ""
      };
      this.loading = true;
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        postData,
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.Records.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.ExceptionTradeList = response.Data.Records;
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
