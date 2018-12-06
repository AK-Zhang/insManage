<template>
  <div class="s-height userwithdrawAuth_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <el-select v-model="PassagewayValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in PassagewayList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-select v-model="UserValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in UserList" :key="item.Code" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-select v-model="StateValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in StateList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
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
                    <th style="width: 15%">出金流水号</th>
                    <th style="width: 15%">子账号代码</th>
                    <th style="width: 15%">子账号名称</th>
                    <th style="width: 10%">出金金额</th>
                    <th style="width: 15%">申请提现时间</th>
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
                  <td style="width: 15%">{{item.ID}}</td>
                  <td style="width: 15%">
                    <a id="param-edit" @click="showUpdatePage2(item)" style="color:#337ab7;">{{item.UserId}}</a>
                  </td>
                  <td style="width: 15%">{{item.UserName == null ? "--" : (item.UserName == "" ? "--" : item.UserName)}}</td>
                  <td style="width: 10%">{{item.TransferMoney}} 美元</td>
                  <td style="width: 15%">{{item.AddDate}}</td>
                  <td style="width: 15%">{{item.StateText}}</td>
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
    <div class="mask auditDialog" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">出金审核</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">子账号代码：</label>
                    <div class="wei1">{{obj.UserId}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">子账号名称： </label>
                    <div class="wei1">{{obj.UserName}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">出金流水号：</label>
                    <div class="wei1">{{obj.ID}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">出金金额： </label>
                    <div class="wei1">{{obj.TransferMoney}} 美元</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">出金汇率： </label>
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
                    <div class="wei1">{{obj.OperatorCode}}</div>
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
            <!-- <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="AuditPass()">审核通过</button>
            </span> -->
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="AuditNoPass()">拒绝通过</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="offLineAuditPass()">线下转账</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask agentInfo">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">子账户资金账户信息</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">申请人： </label>
                    <div class="wei1">{{obj2.InsUserOrAgentCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">账户名称： </label>
                    <div class="wei1">{{obj2.BankAccountName}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">银行卡号：</label>
                    <div class="wei1">{{obj2.CardNO}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">所属银行：</label>
                    <div class="wei1">{{obj2.BankName}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">省份：</label>
                    <div class="wei1">{{obj2.ProvinceName}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">市/县：</label>
                    <div class="wei1">{{obj2.CityName}}</div>
                  </div>
                </div>
                <div class="formin">
                  <div class="form-group group1 groupw" style="width:96%">
                    <label class="labelw">支行信息：</label>
                    <div class="wei1">{{obj2.SubbranchName}}</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <p>
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
      obj: {},
      obj2: {}
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
        "/WithDrawMgr/GetNoAuditedListByInsUser",
        this.pager.PageNo,
        this.pager.PageSize,
        { UserCode: this.ChildAccountValue },
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
            "/WithDrawMgr/Audit",
            {
              AuditResult: 1,
              ID: this.obj.ID,
              AuditRemark: this.obj.AuditRemark
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
    offLineAuditPass() {
      this.$confirm("确定是线下转账吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.loadingsave = true;
          this.$loginapi.post(
            "/WithDrawMgr/Audit",
            {
              AuditResult: 2,
              ID: this.obj.ID,
              AuditRemark: this.obj.AuditRemark
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
            "/WithDrawMgr/Audit",
            {
              AuditResult: 0,
              ID: this.obj.ID,
              AuditRemark: this.obj.AuditRemark
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
    showUpdatePage2(obj) {
      this.$loginapi.post(
        "/WithDrawMgr/GetUserBindBanks",
        obj.UserId,
        response => {
          this.loadingsave = false;
          if (response.Ret == 0) {
            if (response.Data.length <= 0) {
              this.$alert("尚未绑定银行卡，请通知子账户绑定银行卡", {});
              return;
            }
            this.obj2 = response.Data[0];
            $(".agentInfo").fadeIn("fast");
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
            this.closeMask();
          }
        }
      );
    },
    showUpdatePage(obj) {
      this.obj = obj;
      $(".auditDialog").fadeIn("fast");
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
