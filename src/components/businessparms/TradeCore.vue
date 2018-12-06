<template>
  <div class="maininstrument_" v-loading="loadingWait" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">业务参数</a>
                  </li>
                  <li class="active">交易核心</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-10 fz">可对交易核心进行新增、编辑、删除操作 </span>
                <span class="col-md-2 text-right margin-Top">
                  <button class="btn btn-default" type="submit" @click="addeditData(true)">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                </span>
              </p>
            </div>
            <div class="tb-header table-1">
              <table class="table table-1-1">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 8%">交易核心编码</th>
                    <th style="width: 12%">交易核心名称</th>
                    <th style="width: 10%">交易帐号</th>
                    <th style="width: 10%">服务商代码</th>
                    <th style="width: 10%">服务商名称</th>
                    <th style="width: 10%">授权码</th>
                    <th style="width: 8%">核心状态</th>
                    <th style="width: 22%">服务器地址</th>
                    <th style="width: 5%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="tb-body panel panel-default table-2">
            <table class="table table-hover table-2-1" v-loading="loading">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="width:5%">{{index+1}}</td>
                  <td style="width:8%" class="sub-checked " id="sub-checked">{{item.TradeCoreCode}}</td>
                  <td style="width: 12%">{{item.TradeCoreName}}</td>
                  <td style="width: 10%">{{item.TradeAccount}}</td>
                  <td style="width: 10%">{{item.SpCode}}</td>
                  <td style="width: 10%">{{item.SpName}}</td>
                  <td style="width: 10%">
                    <el-tooltip :content="item.AuthCode" placement="top">
                      <!-- <div slot="content">{{item.AuthCode}}</div> -->
                      <input type="text" v-model="item.AuthCode" readonly class="noticeContent" style="text-align:center !important;cursor:pointer">
                      <el-button size="mini" height="0"></el-button>
                    </el-tooltip>
                  </td>

                  <!-- <td style="width: 10%">{{item.AuthCode == null ? "--" : (item.AuthCode == "" ? "--" : item.AuthCode)}}</td> -->
                  <td style="width: 8%">{{item.RunState == null ? "--" : (item.RunState == "" ? "--" : item.RunState)}}</td>
                  <td style="width: 22%"><input type="text" v-model="item.HostAddress" class="noticeContent" style="text-align:center !important"></td>
                  <td style="width: 5%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" @click.native="BuildNew(item)" :v-show="item.State">
                              创建
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="addeditData(false,item)" :v-show="item.State">
                              编辑
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="RestartCore(item)" :v-show="item.State">
                              重启
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="EnableSpTradeAccount(item)">
                              {{item.RunState == "运行中" ? "退出" : "启动"}}
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="delOne(item.TradeCoreCode)">
                              删除
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="OpenModifySecret(item.TradeCoreCode)">
                              修改密码
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="showSendMsg(item)">
                              发送验证码
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
          </div>
        </div>
      </article>
    </div>
    <div class="mask" id="addddd" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">{{Coretitle}}</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易核心名称
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="getTradeCoreinfo.TradeCoreName" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易账号
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="getTradeCoreinfo.TradeAccount" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  授权码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="getTradeCoreinfo.AuthCode" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  服务商
                </div>
                <span class="selected">
                  <el-select v-model="getTradeCoreinfo.SpCode" clearable placeholder="请选择" style="width:98%">
                    <el-option v-for="item in spCodeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  登录密码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="getTradeCoreinfo.Password" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="confirmPassword" placeholder="请输入">
                </span>
              </div>

              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  服务器地址（含端口，多个时以逗号分隔）
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" type="text" v-model="getTradeCoreinfo.HostAddress" placeholder="请输入"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Adddata(dataType)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="mask" id="ModifySecret">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">修改密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  旧密码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="modifySecret.OldPwd" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  新密码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" v-model="modifySecret.NewPwd" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认新密码
                </div>
                <span class="selected">
                  <input class="input-text ContractNo" type="text" style="width:99%;" v-model="modifySecret.ConfirmNewSecret" placeholder="请输入">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  修改类型
                </div>
                <span class="selected">
                  <el-radio v-model="modifySecret.ModifyType" label="0" border>主动</el-radio>
                  <el-radio v-model="modifySecret.ModifyType" label="1" border>被动</el-radio>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifySecret(TradeCoreCode)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="mask" id="delMainContact" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除交易核心</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3 text-center">
                  确认要删除交易核心吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="delData(TradeCoreCode)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div id="sendMsg" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">发送验证码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易核心编号
                </div>
                <span class="selected">
                  <input class="input-text EditTradeCoreCode" type="text" v-model="EditTradeCoreCode" placeholder="" disabled readonly>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易核心名称
                </div>
                <span class="selected">
                  <input class="input-text EditTradeCoreName" type="text" v-model="EditTradeCoreName" placeholder="" disabled readonly>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  短信验证码
                </div>
                <span class="selected">
                  <input class="input-text smsCode" type="text" v-model="smsCode" placeholder="">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SendVertificateCode()">发送</button>
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
import common from "../../kits/common.js";
import pageination from "../subcom/pageination.vue";

export default {
  name: "TradeCore",
  components: {
    pageination
  },
  data() {
    return {
      loading: "",
      ishow: "",
      loadingsave: "",
      loadingWait: "",
      list: [],
      lists: [],
      obj: {},
      del_list: [],
      TradeCoreCode: "",
      ClassName: "sub-checked",
      selectZLHY: null,
      recordCount: 0,
      smsCode: "",
      EditTopAccountCode: "",
      EditTopAccountName: "",
      EditTradeCoreName: "",
      EditTradeCoreCode: "",

      // 交易核心
      getTradeCoreinfo: {}, //新增交易核心数据
      confirmPassword: "", //确认密码
      modifySecret: {},
      modifytype: "1",

      spCodeList: [
        {
          value: "ES",
          label: "易盛"
        }
      ],
      Coretitle: "",
      dataType: false
    };
  },
  created() {
    this.$store.state.loaction = "/businessparms/TradeCore";
    this.getTradeCore();
    //this.getContractNolist();
  },
  methods: {
    //获取主力合约信息列表
    getTradeCore() {
      this.loading = true;
      var url = "/SpTradeAccount/QuerySpTradeAccountList";
      this.$loginapi.post(url, "", response => {
        this.loading = false;
        if (response.Ret == 0) {
          if (response.Data.length > 0) {
            this.ishow = false;
          } else {
            this.ishow = true;
          }
          this.list = response.Data;
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    //获取合约编号列表
    EnableSpTradeAccount(obj) {
      this.loadingWait = true;
      var url = "/SpTradeAccount/EnableSpTradeAccount";
      if (obj.State) {
        url = "/SpTradeAccount/DisableSpTradeAccount";
      }
      this.$loginapi.post(url, obj.TradeCoreCode, response => {
        this.loadingWait = false;
        if (response.Ret == 0) {
          if (obj.State) {
            this.$alert("退出成功！");
          } else {
            this.$alert("启动成功！");
          }
          this.getTradeCore();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    BuildNew(obj) {
      this.loadingWait = true;
      if (!obj.State) {
        this.$alert("该交易核心已停用，不能进行创建", {});
        return;
      }
      var url = "/SpTradeAccount/RemoteAddSpTradeAccount";
      this.$loginapi.post(url, obj.TradeCoreCode, response => {
        this.loadingWait = false;
        if (response.Ret == 0) {
          this.$alert("创建成功", {});
          this.getTradeCore();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    RestartCore(obj) {
      this.loadingWait = true;
      var url = "/SpTradeAccount/ReStartSpTradeAccount";
      this.$loginapi.post(url, obj.TradeCoreCode, response => {
        this.loadingWait = false;
        if (response.Ret == 0) {
          this.$alert("重启成功！");
          this.getTradeCore();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    OpenModifySecret(code) {
      $("#ModifySecret").fadeIn("fast");
      this.TradeCoreCode = code;
    },
    ModifySecret(code) {
      let postData = $.extend({}, this.modifySecret);
      if (
        !postData.OldPwd ||
        !postData.NewPwd ||
        !postData.ConfirmNewSecret ||
        !postData.ModifyType
      ) {
        this.$alert("带星号为必填（必选）项，请补全内容");
        return;
      }
      if (postData.NewPwd != postData.ConfirmNewSecret) {
        this.$alert("两次密码输入不一致，请重新输入");
        this.modifySecret.ConfirmNewSecret = "";
        return;
      }
      delete postData.ConfirmNewSecret;

      this.loadingWait = true;
      var url = "/SpTradeAccount/ChangeTradeAccountPassword";
      postData.TradeCoreCode = code;
      this.$loginapi.post(url, postData, response => {
        this.loadingWait = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.$message.success("修改成功");
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    Adddata(type) {
      let postData = this.getTradeCoreinfo;
      if (
        !postData.TradeCoreName ||
        !postData.TradeAccount ||
        !postData.AuthCode ||
        !postData.Password ||
        !postData.HostAddress ||
        !postData.SpCode ||
        !this.confirmPassword
      ) {
        this.$alert("请补全空白信息");
        return;
      }
      this.loadingsave = true;
      var url = "/SpTradeAccount/AddSpTradeAccount";
      if (!type) {
        url = "/SpTradeAccount/ModifySpTradeAccount";
      }
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getTradeCore();
          this.$message.success("保存成功");
          $(".mask").fadeOut("fast");
          this.getTradeCoreinfo = {};
          this.confirmPassword = "";
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    showSendMsg(item) {
      this.EditTradeCoreCode = item.TradeCoreCode;
      this.EditTradeCoreName = item.TradeCoreName;
      this.EditTopAccountCode = item.TopAccountCode;
      this.EditTopAccountName = item.TopAccountName;
      $("#sendMsg").fadeIn("fast");
    },
    SendVertificateCode() {
      var url = "/SpTradeAccount/SetVertificateCode";
      var postData = {
        TradeCoreCode: this.EditTradeCoreCode,
        VertificateCode: this.smsCode
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.closeMask();
          this.$message.success({
            message: "发送成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    delData(code) {
      this.loadingsave = true;
      var url = "/SpTradeAccount/DelSpTradeAccount";
      this.$loginapi.post(url, code, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.TradeCoreCode = "";
          this.getTradeCore();
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 800
          });
          $("#delMainContact").fadeOut("fast");
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    addeditData(type, item) {
      if (type) {
        this.Coretitle = "新增交易核心";
        this.dataType = type;
      } else {
        this.Coretitle = "编辑交易核心";
        this.getTradeCoreinfo = item;
      }
      this.dataType = type;
      $("#addddd").fadeIn("fast");
    },
    delOne(code) {
      $("#delMainContact").fadeIn("fast");
      this.TradeCoreCode = code;
    },
    closeMask() {
      $("#addddd,#sendMsg,#ModifySecret").fadeOut("fast");
      this.modifySecret = {};
    },
    closeDelMask() {
      $("#delMainContact").fadeOut("fast");
    },
    choseBox() {
      return {
        allChecked: function(cli, ele) {
          ele.checkedAll = cli.prop("checked"); // 保存当前选中的状态
          ele.find(":checkbox").prop("checked", ele.checkedAll);
        },
        backWord: function(ele, tar) {
          ele.boxs = ele.find(":checkbox").length;
          ele.checkedBoxs = ele.find(":checked").length;
          if (ele.boxs == ele.checkedBoxs) {
            tar.prop("checked", true);
          } else {
            tar.prop("checked", false);
          }
        }
      };
    }
  }
};
</script>

<style scoped>
#addddd .mask_box .no-border .panel-body .form-inline > div {
  width: 50%;
  display: inline-block;
  float: left;
}
#addddd .first-div {
  width: 100% !important;
}
#addddd .input-textarea {
  width: 99% !important;
  height: 70px !important;
  resize: none;
}
</style>
