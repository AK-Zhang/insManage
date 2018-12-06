<template>
  <div class="s-height agentwithdrawHis_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="table-1">
              <div class="flex s_bg">
                <div class="s_bg_flex">
                  <el-input v-model="IDValue" class="s_padding" placeholder="流水号" size="small" style="width:200px;"></el-input>
                  <el-select v-model="PassagewayValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in PassagewayList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-select v-model="AgentValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in AgentList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-select v-model="StateValue" placeholder="请选择" size="small" class="s_padding">
                    <el-option v-for="item in StateList" :key="item.value" :label="item.Name" :value="item.Code">
                    </el-option>
                  </el-select>
                  <el-date-picker class="s_padding" v-model="DateRangeValue" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <button class="btn btn-default btn-sm btc" type="submit" @click="getwithdrawHisList()">
                    查询
                  </button>
                </div>
                <div class="s_bg_flex_right">
                  <button type="submit" id="exportBtn" @click="exportExcel('tableHeader','tableBody','经纪人提现汇总','经纪人提现汇总.xls','exportBtn')" class="btn btn-primary" style="float:right;font-size:12px;color:#fff">
                    <a id="dlink" href="" style="display: none;"></a>
                    <i class="fa fa-download  "></i> 导出表格</button>
                </div>
              </div>
              <table class="table table-1-1" id="tableHeader">
                <thead>

                  <tr>
                    <th style="width: 4%;">序号</th>
                    <th style="width: 15%">出金流水号</th>
                    <th style="width: 13%">经纪人代码</th>
                    <th style="width: 13%">经纪人名称</th>
                    <th style="width: 10%">出金金额</th>
                    <th style="width: 15%">提现时间</th>
                    <th style="width: 10%">审核人员</th>
                    <th style="width: 20%">状态</th>
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
                <tr v-for="(item,index) in withdrawHisList" :key="index">
                  <td style="width: 4%;">{{index+1}}</td>
                  <td style="width: 15%;">{{item.ID}}</td>
                  <td style="width: 13%">
                    <a id="param-edit" @click="showUpdatePage2(item)" style="color:#337ab7;">{{item.UserId}}</a>
                  </td>
                  <td style="width: 13%">{{item.UserName == null ? "--" : (item.UserName == "" ? "--" : item.UserName)}}</td>
                  <td style="width: 10%">{{item.TransferMoney}}</td>
                  <td style="width: 15%">{{item.AddDate}}</td>
                  <td style="width: 10%">{{item.AuditorCode == null ? "--" : (item.AuditorCode == "" ? "--" : item.AuditorCode)}}</td>
                  <td style="width: 20%">{{item.StateText}}</td>
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
    <div class="mask agentInfo">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">经纪人资金账户信息</div>
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
import commonJs from "../../../assets/js/Common.js";
import exportExcel from "../../../assets/js/exportTable.js";
import pageination from "../../subcom/pageination.vue";

export default {
  data() {
    return {
      loading: "",
      ishow: "",
      withdrawHisList: [],
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      },
      PassagewayList: [{ Code: "", Name: "全部通道" }],
      AgentList: [{ Code: "", Name: "全部经纪人" }],
      StateList: [
        { Code: "", Name: "全部状态" },
        { Code: "1", Name: "申请中" },
        { Code: "2", Name: "已审核" },
        { Code: "3", Name: "申请被拒绝" },
        { Code: "4", Name: "提现失败" },
        { Code: "5", Name: "处理成功 待通知第三方" },
        { Code: "6", Name: "处理成功 通知第三方失败" },
        { Code: "7", Name: "已通知第三方" }
      ],
      PassagewayValue: "",
      AgentValue: "",
      StateValue: "",
      DateRangeValue: [],
      IDValue: "",
      obj2: {}
    };
  },
  components: {
    pageination
  },
  mounted() {
    this.DateRangeValue = commonJs.getDayRanage();
    this.getPassagewayList();
    this.getAgentList();
    this.getStateList();
    this.getwithdrawHisList();
  },
  methods: {
    getPassagewayList() {
      this.PassagewayValue = this.PassagewayList[0].Code;
    },
    getAgentList() {
      this.$loginapi.post("/insbase/GetAgentCodeList", "", response => {
        if (response.Ret == 0) {
          this.AgentList = this.AgentList.concat(response.Data);
          this.AgentValue = this.AgentList[0].Code;
        } else {
          this.$message.error(response.Msg);
        }
      });
    },
    getStateList() {
      this.StateValue = this.StateList[0].Code;
    },

    getwithdrawHisList() {
      var postData = {
        UserCode: this.AgentValue,
        ID: this.IDValue,
        state: this.StateValue,
        StartDate: this.DateRangeValue[0],
        EndDate: this.DateRangeValue[1]
      };
      this.loading = true;
      this.$loginapi.postWithPage(
        "/WithDrawMgr/GetHistoryListByInsAgent",
        this.pager.PageNo,
        this.pager.PageSize,
        postData,
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.withdrawHisList = response.Data;
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
      this.getwithdrawHisList();
    },
    showUpdatePage2(obj) {
      this.$loginapi.post(
        "/WithDrawMgr/GetAgentBindBanks",
        obj.UserId,
        response => {
          this.loadingsave = false;
          if (response.Ret == 0) {
            if (response.Data.length <= 0) {
              this.$alert("尚未绑定银行卡，请通知经纪人绑定银行卡", {});
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
    closeMask() {
      $(".mask").fadeOut("fast");
    }
  }
};
</script>

<style  scoped>
</style>
