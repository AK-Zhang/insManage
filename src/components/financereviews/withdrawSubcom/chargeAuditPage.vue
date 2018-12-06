<template>
  <div class="s-height userwithdrawAuth_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <el-select v-model="UserValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in UserList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <!-- <el-select v-model="StateValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in StateList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select> -->
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getwithdrawList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','子账户提现审核汇总','子账户提现审核汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>
                  <tr>
                    <th style="width: 5%;">序号</th>
                    <th style="width: 15%">子账号代码</th>
                    <th style="width: 15%">子账号名称</th>
                    <th style="width: 10%">入金金额</th>
                    <th style="width: 15%">入金申请时间</th>
                    <th style="width: 15%">状态</th>
                    <th style="width: 10%">操作</th>
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
                <tr v-for="(item,index) in withdrawList" :key="index">
                  <td style="width: 5%;">{{index+1}}</td>
                  <td style="width: 15%">{{item.UserCode}}</td>
                  <td style="width: 15%">{{item.UserName == null ? "--" : (item.UserName == "" ? "--" : item.UserName)}}</td>
                  <td style="width: 10%">{{item.TransferMoney}}</td>
                  <td style="width: 15%">{{item.AddDate}}</td>
                  <td style="width: 15%">{{item.OrderState}}</td>
                  <td style="width: 10%">
                    <a id="param-edit" @click="showUpdatePage(item)" style="color:#337ab7;">审核</a>
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
    <div class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">入金审核</div>
          <div class="panel-body" style="padding-left:80px;">
            <!-- <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">子账号代码：</label>
                    <div class="wei1">{{obj.UserCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账号名称： </label>
                    <div class="wei1">{{obj.UserName}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">入金金额： </label>
                    <div class="wei1">{{obj.TransferMoney}}{{obj.CurrencyName}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">订单编号：</label>
                    <div class="wei1">{{obj.Id}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">申请入金时间：</label>
                    <div class="wei1">{{obj.AddDate}}</div>
                  </div>
                </div>
              </div>
            </form> -->
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">子账户代码：</label>
                    <div class="wei1">{{obj.UserCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账户名称： </label>
                    <div class="wei1">{{obj.UserName}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">充值流水号：</label>
                    <div class="wei1">{{obj.Id}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">充值金额： </label>
                    <div class="wei1">{{obj.TransferMoney}} 美元</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">充值汇率： </label>
                    <div class="wei1">{{obj.ExchangeRate}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">实到美元：</label>
                    <div class="wei1">{{obj.TransferMoneyFact}} 美元</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">申请人： </label>
                    <div class="wei1">{{obj.MoneyTransSource}}</div>
                  </div>

                  <div class="form-group group1 groupw">
                    <label class="labelw">申请提现时间：</label>
                    <div class="wei1">{{obj.AddDate}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">实到人民币：</label>
                    <div class="wei1">{{obj.LocalMoneyFact}} 元</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw" style="width:96%">
                    <label class="labelw">提现说明：</label>
                    <div class="wei1">{{obj.Remark}}</div>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <div class="error3">
                <span class="error4"></span>
                备注：
              </div>
              <span class="selected">
                <textarea class="input-text input3" type="textarea" placeholder="" v-model="obj.AuditRemark" style="width:93%"></textarea>
              </span>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="AuditPass()">审核通过</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="AuditNoPass()">拒绝通过</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";

export default {
  data() {
    return {
      loading: "",
      loadingsave: "",
      ishow: true,
      withdrawList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      PassagewayList: [{ Code: "", Name: "全部通道" }],
      UserList: [{ Code: "", Name: "全部子账户" }],
      StateList: [{ Code: 0, Name: "全部状态" }],
      PassagewayValue: "",
      UserValue: "",
      StateValue: 0,
      obj: {}
    };
  },
  components: {
    pageination
  },
  mounted() {
    this.getPassagewayList();
    this.getUserList();
    this.getStateList();
    this.getwithdrawList();
  },
  methods: {
    getPassagewayList() {
      this.PassagewayValue = this.PassagewayList[0].Code;
    },
    getUserList() {
      var url = "/insbase/GetInsUserCodeList";
      var postData = {
        type: 0,
        AgentCode: ""
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.UserList = this.UserList.concat(response.Data);
          this.UserValue = this.UserList[0].Code;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    getStateList() {
      this.StateValue = this.StateList[0].Code;
    },

    getwithdrawList() {
      this.loading = true;
      this.$loginapi.postWithPage(
        "/financialstaff/QueryUserMoneyPay",
        this.pager.PageNo,
        this.pager.PageSize,
        {
          UserKey: "",
          State: 13
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.withdrawList = response.Data;
            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
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
      this.getwithdrawList();
    },
    AuditPass() {
      this.$confirm("确定通过审核吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.loadingsave = true;
          this.$loginapi.post(
            "/financialstaff/OfflineUserPayApplyAuditSuccess",
            {
              PayApplyId: this.obj.Id,
              AuditRemark: this.obj.Remark
            },
            response => {
              this.loadingsave = false;
              if (response.Ret == 0) {
                this.$message.success("操作成功！");
                this.getwithdrawList();
                this.closeMask();
              } else {
                //this.$message.error(response.Msg);
                this.$alert(response.Msg, {});
                this.closeMask();
              }
            }
          );
        })
        .catch(() => {
          this.closeMask();
        });
    },
    AuditNoPass() {
      this.$confirm("确定要拒绝通过审核吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.loadingsave = true;
          this.$loginapi.post(
            "/financialstaff/RefusedAuditUserPayApply",
            {
              PayApplyId: this.obj.Id,
              AuditRemark: this.obj.Remark
            },
            response => {
              this.loadingsave = false;
              if (response.Ret == 0) {
                this.$message.success("操作成功！");
                this.getwithdrawList();
                this.closeMask();
              } else {
                //this.$message.error(response.Msg);
                this.$alert(response.Msg, {});
                this.closeMask();
              }
            }
          );
        })
        .catch(() => {
          this.closeMask();
        });
    },
    showUpdatePage(obj) {
      this.obj = obj;
      $(".mask").fadeIn("fast");
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      this.obj = {};
    }
    //
  }
};
</script>

<style  scoped>
</style>
