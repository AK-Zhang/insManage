<template>
  <div class="s-height accountSelect_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <el-select
                    v-model="value"
                    placeholder="请选择"
                    @change="exchangeValue"
                    size="small"
                    class="s_padding"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
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
                    @click="getTradeVolume()"
                  >
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">

                  <button
                    type="submit"
                    id="exportBtn"
                    @click="exportExcel('tableHeader','tableBody','统计单量汇总','统计单量汇总.xls','exportBtn')"
                    class="btn btn-primary"
                    style="float:right;font-size:12px;color:#fff"
                  >
                    <a
                      id="dlink"
                      href=""
                      style="display: none;"
                    ></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                  <!-- <button type="submit" class="btn btn-primary" @click="openAddDialog(false)" style="float:right;font-size:12px;color:#fff;margin-right:10px;">
                    <a href="" style="display: none;"></a>
                    <i class="fa fa-plus  "></i> 新增</button> -->
                  <!-- <span class="btn btn-primary fileinput-button" style="float:right;font-size:12px;color:#fff;margin-right:10px;">
                    <span style="color:#fff">导入</span>
                    <input type="file" id="selectfile">
                  </span> -->
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
                    <th style="width: 50%">层级关系</th>
                    <th style="width: 5%">操作</th>
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
                  <td style="width:50%">{{item.IB}}</td>
                  <td style="width:5%">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="..."
                    >
                      <div
                        class="btn-group"
                        role="group"
                      >
                        <el-dropdown
                          trigger="click"
                          size="mini"
                        >
                          <span
                            class="el-dropdown-link"
                            size="mini"
                          >
                            <el-button
                              class="el-icon-caret-bottom el-icon--right opera_btn"
                              type="primary"
                              size="mini"
                            ></el-button>
                          </span>
                          <el-dropdown-menu
                            slot="dropdown"
                            class="dropdownul"
                          >
                            <el-dropdown-item
                              class="clearfix"
                              @click.native="openAddDialog(true,item)"
                            >
                              编辑
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item
                              class="clearfix"
                              @click.native="DelBlackList(item.ID)"
                            >
                              删除
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </td>
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
    <div
      class="mask"
      id="add-mask"
      v-loading="loadingAdd"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">{{blackListTitle}}</div>
          <div class="panel-body">
            <form
              class="form-inline form-inline1"
              novalidate=""
              role="form"
            >
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  姓名
                </div>
                <span class="selected">
                  <input
                    class="input-text"
                    type="text"
                    v-model="blackList1.Name"
                    style="width:98%"
                  >
                </span>
                <div class="error3">
                  <span class="error4"></span>
                  手机号码
                </div>
                <span class="selected">
                  <input
                    class="input-text"
                    type="text"
                    v-model="blackList1.Phone"
                    style="width:98%"
                  >
                </span>
                <div class="error3">
                  <span class="error4"></span>
                  身份证号码
                </div>
                <span class="selected">
                  <input
                    class="input-text"
                    type="text"
                    v-model="blackList1.IDCard"
                    style="width:98%"
                  >
                </span>
              </div>
            </form>
          </div>
          <div
            class="closed closed-add"
            @click="closeMask()"
          >×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button
                type="button"
                class="btn btn-info btn-saved"
                v-on:click="AddBlackList(isEdit)"
              >保存</button>
            </span>
            <span class="fr">
              <button
                type="button"
                class="btn btn-default btn-q btn-q-add"
                @click="closeMask()"
              >取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnumConfig from "../../../assets/js/EnumConfig.js";
import exportExcel from "../../../assets/js/exportTable.js";
import commonJs from "../../../assets/js/Common.js";
import pageination from "../../subcom/pageination.vue";
import Vue from "vue";

export default {
  props: ["agentID"],
  data() {
    return {
      loading: "",
      loadingAdd: false,
      ishow: true,
      ExceptionTradeList: [],
      textid: "Text_",
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      DateRangeValue: [],
      blackList: {
        ID: 0,
        InsCode: sessionStorage.getItem("inscode"),
        Name: "",
        Phone: "",
        IDCard: ""
      },
      blackList1: {
        ID: "",
        InsCode: "",
        Name: "",
        Phone: "",
        IDCard: ""
      },
      blackListTitle: "",
      isEdit: false,
      KeyWord: "",
      sortType: 0,
      sortTypes: [
        { Code: 0, label: "单量升序" },
        { Code: 1, label: "单量降序" }
      ],
      options: [
        {
          value: "",
          label: "机构及代理所有客户"
        },
        {
          value: "AllIns",
          label: "机构直属客户"
        },
        {
          value: "AllAgent",
          label: "代理客户"
        }
      ],
      value: "",
      PositionEffectValue: "",
      ContactNoValue: ""
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
    this.getTradeVolume();
    console.log(121);
  },
  methods: {
    getTradeVolume(isSearch = true) {
      if (isSearch) {
        this.pager = {
          PageNo: 1,
          PageSize: 20,
          RecordCount: 0
        };
      }
      // let url = "/report/QryTradeVolume";
      // let postData = {
      //   AgentIds: this.agentID,
      //   Keyword: this.KeyWord,
      //   BeginTime: this.DateRangeValue[0],
      //   EndTime: this.DateRangeValue[1],
      //   SortType: this.sortType
      // };
      let url = "";
      let postData = "";

      if (this.value == "") {
        url = "/report/QryAllUserHistoryOrder";
        postData = {
          UserCode: "",
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      } else if (this.value == "AllIns") {
        url = "/report/QryInsUserHistoryOrder";
        postData = {
          ContactNO: this.ContactNoValue,
          PositionEffect: this.PositionEffectValue,
          BeginDate: this.DateRangeValue[0],
          EndDate: this.DateRangeValue[1],
          Keyword: this.KeyWord
        };
      } else if (this.value == "AllAgent") {
        url = "/report/QryTradeVolume";
        postData = {
          AgentIds: this.agentID,
          Keyword: this.KeyWord,
          BeginTime: this.DateRangeValue[0],
          EndTime: this.DateRangeValue[1],
          SortType: this.sortType
        };
      } else {
        url = "/report/QryTradeVolume";
        postData = {
          AgentIds: this.agentID,
          Keyword: this.KeyWord,
          BeginTime: this.DateRangeValue[0],
          EndTime: this.DateRangeValue[1],
          SortType: this.sortType
        };
      }
      console.log(this.value);
      console.log(12121);

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
    exchangeValue(v) {
      this.$emit("esd", v);
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
      this.getTradeVolume(false);
    },
    openAddDialog(isEdit, obj) {
      this.blackListTitle = "新增黑名单";
      this.isEdit = isEdit;
      this.blackList1 = $.extend({}, this.blackList);
      if (isEdit) {
        this.blackListTitle = "编辑黑名单";
        this.blackList1 = $.extend({}, obj);
      }
      $("#add-mask").fadeIn("fast");
    },
    closeMask() {
      $("#add-mask").fadeOut("fast");
      this.blackList1.Name = "";
      this.blackList1.Phone = "";
      this.blackList1.IDCard = "";
    },
    AddBlackList(isEdit) {
      if (this.blackList1.Name == "") {
        return this.$alert("姓名不能为空！");
      }
      let url = "/insblack/AddBlack";
      if (isEdit) {
        url = "/insblack/ModifyBlack";
      }
      this.loadingAdd = true;
      this.$loginapi.post(url, this.blackList1, response => {
        this.loadingAdd = false;
        if (response.Ret == 0) {
          this.getTradeVolume();
          this.blackList1.Name = "";
          this.blackList1.Phone = "";
          this.blackList1.IDCard = "";
          this.closeMask();
        } else {
          this.$message.error(response.Msg);
        }
      });
    },
    DelBlackList(id) {
      this.$confirm("确认从黑名单中删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/insblack/DelBlack";
          this.loadingAdd = true;
          this.$loginapi.post(url, id, response => {
            this.loadingAdd = false;
            if (response.Ret == 0) {
              this.getTradeVolume();
            } else {
              this.$message.error(response.Msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>


<style  scoped>
/* .table__243 tr {
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
} */
.fileinput-button input {
  position: absolute;
  right: 181px;
  top: 94px;
  opacity: 0;
  -ms-filter: "alpha(opacity=0)";
  font-size: 20px;
}
</style>
