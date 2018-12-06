<template>
  <div>
    <div class="template">
      <article class="main">
        <div class="container-r">
          <!--带表格的面板-->
          <div class="panel panel-default panel-1">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye maf1"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    账户
                  </li>
                  <li>
                    <a class="active" @click="Back()">总账户</a>
                  </li>
                  <li class="active">总账户详细信息</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <div class="col-md-12 ">
                <div class="col-md-9">
                  <!--<span class="iconfont icon-mokuaiguanli icon-bg"></span>-->
                  <span class="fz account-info">总账户</span>
                  <span class="account-name">({{TopAccountName}})</span>
                </div>
                <div class="col-md-3 text-right">
                  <div class="btn-group  margin-Top" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" v-show="false">
                      新增
                    </button>
                    <button type="button" class="btn btn-default" @click="editData()">编辑</button>
                    <button type="button" class="btn btn-default" @click="del()">删除</button>
                    <button type="button" class="btn btn-default" @click="frozen(TopAccountCode,!State)">
                      {{State == true ? "冻结" : "解冻"}}
                    </button>
                  </div>
                </div>
                <!-- <div class="btn-group col-md-3" role="group" aria-label="...">
                <button type="button" class="btn btn-default" @click="frozen(TopAccountCode,State)">
                  {{State == true ? "冻结" : "解冻"}}</button>
                <button type="button" class="btn btn-default" v-show="false">重置密码</button>
                <button type="button" class="btn btn-default" v-show="false">销毁</button>
              </div> -->

                <!-- <button type="button" class="btn btn-default">
                  <span class="fa fa-plus pulp"></span>新增
                </button>
                <button type="button" class="btn btn-default" @click="addData()">编辑</button>
                <button type="button" class="btn btn-default" @click="del()">删除</button>
                <button type="button" class="btn btn-default">
                  冻结
                </button>
                <button type="button" class="btn btn-default">重置密码</button>
                <button type="button" class="btn btn-default">销毁</button> -->
              </div>
            </div>
            <div class="panel panel-default account-table">
              <table class="table account-table-1">
                <thead>
                  <tr>
                    <th>总账户代码</th>
                    <th>交易核心</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{TopAccountCode}}</td>
                    <td>{{TradeCoreName}}</td>
                    <td>{{State == true ? "正常" : "冻结"}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-8 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this">相关</li>
                    <li></li>
                    <li></li>
                  </ul>
                  <div class="layui-tab-content">

                    <nav class="navbar navbar-default nav-cursor" @click="fold()">
                      <div class="container-fluid bgc12 bg-success">
                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          子账户
                          <span>({{UserCount}})</span>
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin" type="submit" @click="ViewAddInsUserDiv()">
                            <span class="fa fa-plus pulp"></span>新增
                          </button>
                        </p>
                      </div>
                    </nav>
                    <div class="account-info-1 flex_wa" v-show="isShow">
                      <div class="account-info-1-box " v-for="(item,index) in list" :key="index">
                        <div class="account-icon">
                          <span class="icon_sub"></span>
                        </div>
                        <div class="account-info-1-box-content">
                          <a @click="getDetaillistAndTurn(item.InsUserCode)" class="super-link">{{item.InsUserName}}</a>
                          <p class="child_content">子账户代码：{{item.InsUserCode}}</p>
                          <p class="child_content">总账户代码：{{item.InsTopAccount}}</p>
                        </div>
                      </div>
                      <p class="navbar-text navbar-right btn-right-2">
                        <button class="btn btn-default btn-margin" type="submit" v-show="UserCount >= 4 ? true : false" @click="More()">查看更多
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this">使用说明</li>
                    <li></li>
                    <li></li>
                  </ul>
                  <div class="layui-tab-content ">
                    <h3 class="account-sub-title">总账户</h3>
                    <p class="account-sub-content">总账户用来做母账户，创建多个子账户进行交易</p>
                    <div class="account-sub-contents">
                      <ul>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">1</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">总账户冻结</h3>
                            <p class="account-sub-content-1">冻结后，前置机启动时将不会去交易柜台登录总账户。</p>
                          </div>
                        </li>
                        <!-- <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">2</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">总账户销毁</h3>
                            <p class="account-sub-content-1">将消除总账户及其所有子账户信息，不可恢复。需谨慎操作。</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">3</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">总账户密码</h3>
                            <p class="account-sub-content-1">总账户密码必须与总账户在交易柜台的登录密码一致。</p>
                          </div>
                        </li> -->
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="mask">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增总帐户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易核心
                </div>
                <span class="selected">
                  <input id="ATradeCore" class="input-text TradeCore" type="text" placeholder="请选择" @click="select()" v-model="AddTradeCoreName">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list hide">
                    <p v-for="(item,index) in lists" @click="selected(item.Name,item)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
                <div class="error3">
                  <span class="error4">*</span>
                  总帐户代码
                </div>
                <span class="selected">
                  <input class="input-text input3" type="text" v-model="AddTopAccountCode" placeholder="">
                </span>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户名称
                </div>
                <span class="selected">
                  <input class="input-text input3" type="text" v-model="AddTopAccountName" placeholder="">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(AddTopAccountCode,AddTopAccountName,obj.Code,obj.Name)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑总帐户弹窗-->
    <div id="edit" class="mask mask_accountinfo" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑总帐户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易核心
                </div>
                <span class="selected">
                  <input id="TradeCore" disabled class="input-text TradeCore" type="text" placeholder="请选择" @click="select()" v-model="EditTradeCoreName">
                  <div class="fa fa-sort-desc input-list"></div>
                  <div class="drop-list hide">
                    <p v-for="(item,index) in lists" @click="selected(item.Name,item)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总帐户代码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" disabled placeholder="" v-model="EditTopAccountCode">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  总账户名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="EditTopAccountName">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(EditTopAccountCode,EditTopAccountName,EditTradeCoreCode,EditTradeCoreName)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="del-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除总帐户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除总账户吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate(id)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="frozen-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">{{State ==true ? "冻结总帐户" : "解冻总帐户"}}</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  {{State ==true ? "总帐户冻结后无法使用。是否确定要冻结此总账户？" : "是否确定要解冻此总帐户？"}}
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifystatedata(id,!State)">{{State ==true ? "冻结" : "解冻"}}</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="AddInsUser" class="mask mask_accountinfo" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增子账户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户名称
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="text" v-model="AddInsUser.UserName" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser TopAccountCode" type="text" placeholder="请选择" @click="topAccountselect()">
                  <div class="fa fa-sort-desc input-list" @click="topAccountselect()"></div>
                  <div class="drop-list TopAccountCodeList hide">
                    <p v-for="(item,index) in TopAccountCodeList" @click="topAccountselected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser MarginTpCode" type="text" placeholder="请选择" @click="marginTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="marginTpSelect()"></div>
                  <div class="drop-list MarginTpCodeList hide">
                    <p v-for="(item,index) in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser UserFeeTpCode" type="text" placeholder="请选择" @click="userFeeTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="userFeeTpSelect()"></div>
                  <div class="drop-list UserFeeTpCodeList hide">
                    <p v-for="(item,index) in UserFeeTpCodeList" @click="userFeeTpSelected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <span class="selected">
                  <input class="input-text RiskTpCode AddInsUser" type="text" placeholder="请选择" @click="riskTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="riskTpSelect()"></div>
                  <div class="drop-list RiskTpCodeList hide">
                    <p v-for="(item,index) in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"> </span>
                  风控员
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser RiskOprCode" type="text" placeholder="请选择" @click="riskOprSelect()">
                  <div class="fa fa-sort-desc input-list" @click="riskOprSelect()"></div>
                  <div class="drop-list RiskOprCodeList hide">
                    <p v-for="(item,index) in RiskOprCodeList" @click="riskOprSelected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                  </div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户密码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="text" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="text" v-model="AddInsUser.Password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  手机号码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="text" v-model="AddInsUser.Phone" placeholder="">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="CloseAddInsUser()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAndNewAddInsUser()">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAddInsUser()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="CloseAddInsUser()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import common from "../../../kits/common.js";

export default {
  name: "parentaccounts",
  data() {
    return {
      loadingsave: "",
      id: "",
      TopAccountCode: "",
      TopAccountName: "",
      TradeCoreCode: "",
      TradeCoreName: "",
      InsName: "",
      InsCode: "",
      State: true,
      ModifyState: true,
      AddTopAccountCode: "",
      AddTopAccountName: "",
      AddTradeCoreName: "",
      EditTopAccountCode: "",
      EditTopAccountName: "",
      EditTradeCoreName: "",
      EditTradeCoreCode: "",
      UserCount: 0,
      list: [],
      lists: [],
      isShow: true,
      FromFlag: "",
      AddInsUser: {
        UserCode: "",
        UserName: "",
        FeeTemplateID: "",
        MarginTemplateID: "",
        RiskControlTemplateID: "",
        TopAccountNo: "",
        RiskOprCode: [],
        Password: "",
        Phone: ""
      },
      TopAccountSelectDisplay: false,
      TopAccountCodeList: [],
      MarginTpSelectDisplay: false,
      MarginTpCodeList: [],
      UserFeeTpSelectDisplay: false,
      UserFeeTpCodeList: [],
      RiskTpSelectDisplay: false,
      RiskTpCodeList: [],
      RiskOprSelectDisplay: false,
      RiskOprCodeList: []
    };
  },
  created() {
    //this.getlist();
    //this.Modifydata("12345","自造总账户","ml_es_1","易盛001")
    //this.Deldate("12345");
    //this.getDetaillist("ML100001");
    if (this.$route.params.loadingByGlobalQuery) return;
    this.InitData();
  },
  mounted() {
    this.$emit("loaded", this.$route);
  },
  // methods: {
  //   loaded(params) {
  //     this.getDetaillist(params.Code);
  //   },
  //   InitData() {
  //     this.list = this.$store.state.DetailInfo.InsUsers;
  //     this.InsCode = this.$store.state.DetailInfo.InsCode;
  //     this.InsName = this.$store.state.DetailInfo.InsName;
  //     this.TopAccountCode = this.$store.state.DetailInfo.TopAccountCode;
  //     this.TopAccountName = this.$store.state.DetailInfo.TopAccountName;
  //     this.TradeCoreCode = this.$store.state.DetailInfo.TradeCoreCode;
  //     this.TradeCoreName = this.$store.state.DetailInfo.TradeCoreName;
  //     this.UserCount = this.$store.state.DetailInfo.InsUserCount;
  //     this.State = this.$store.state.DetailInfo.State;
  //   },
  //   created() {
  //     //this.getlist();
  //     //this.Modifydata("12345","自造总账户","ml_es_1","易盛001")
  //     //this.Deldate("12345");
  //     //this.getDetaillist("ML100001");
  //     //this.$message.error("1");
  //     if(this.$route.params.loadingByGlobalQuery)
  //       return;
  //     //this.$message.error("2");
  //     this.InitData();
  //   },
  //   mounted(){
  //     this.$emit("loaded",this.$route);
  //   },
  methods: {
    loaded(params) {
      //this.$message.error("3");
      this.getDetaillist(params.Code);
    },
    InitData() {
      if (!this.$store.state.DetailInfo.TopAccountCode) {
        this.Back();
        return;
      }
      this.list = this.$store.state.DetailInfo.InsUsers;
      this.InsCode = this.$store.state.DetailInfo.InsCode;
      this.InsName = this.$store.state.DetailInfo.InsName;
      this.TopAccountCode = this.$store.state.DetailInfo.TopAccountCode;
      this.TopAccountName = this.$store.state.DetailInfo.TopAccountName;
      this.TradeCoreCode = this.$store.state.DetailInfo.TradeCoreCode;
      this.TradeCoreName = this.$store.state.DetailInfo.TradeCoreName;
      this.UserCount = this.$store.state.DetailInfo.InsUserCount;
      this.State = this.$store.state.DetailInfo.State;
    },

    getDetaillist(id) {
      var url = "/instopaccount/GetInsTopAccountDetail";
      this.$loginapi.post(url, id, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.InitData();
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    //获取子账户详情
    getDetaillistAndTurn(id) {
      var url = "/insuser/GetInsUserDetail";
      this.$loginapi.post(url, id, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/accounts/subaccountsinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取交易核心
    gettradecorelist() {
      var url = "/insbase/QueryInsTradeCores";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.lists = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    Deldate() {
      this.loadingsave = true;
      var url = "/instopaccount/DeleteTopAccount";
      this.$loginapi.post(url, this.TopAccountCode, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.$message.success("删除成功");
          this.Back();
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    /* 更改解冻、冻结状态 */
    Modifystatedata(TopAccountCode, State) {
      this.loadingsave = true;
      var url = "/instopaccount/SetTopAccountState";
      var postData = {
        TopAccountCode: TopAccountCode,
        State: State
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(TopAccountCode);
          this.closeMask();
          this.$message.success(State == true ? "解冻成功" : "冻结成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    Modifydata(TopAccountCode, Name, TradeCoreCode, TradeCoreName) {
      var url = "/instopaccount/ModifyTopAccount";
      var postData = {
        TopAccountCode: TopAccountCode,
        Name: Name,
        TradeCoreCode: TradeCoreCode,
        TradeCoreName: TradeCoreName
      };
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(TopAccountCode);
          this.closeMask();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取自定义总帐号代码列表
    GetTopAccountCodeList() {
      var url = "/insbase/GetTopAccountCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.TopAccountCodeList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    topAccountselect() {
      this.TopAccountSelectDisplay = !this.TopAccountSelectDisplay;
      if (this.TopAccountSelectDisplay) {
        $(".TopAccountCodeList").attr("class", "drop-list TopAccountCodeList");
      } else {
        $(".TopAccountCodeList").attr(
          "class",
          "drop-list TopAccountCodeList hide"
        );
      }
    },
    topAccountselected(code, name) {
      $(".TopAccountCode").val(name);
      this.TopAccountSelectDisplay = false;
      $(".TopAccountCodeList").attr(
        "class",
        "drop-list TopAccountCodeList hide"
      );
      if (this.FromFlag == "AddInsUser") {
        this.AddInsUser.TopAccountNo = code;
      }
      if (this.FromFlag == "ChangeTopAccount") {
        this.NewTopAccountCode = code;
      }
    },
    //获取保证金模板代码列表
    GetMaginTpCodeList() {
      var url = "/insbase/GetMaginTpCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.MarginTpCodeList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    marginTpSelect() {
      this.MarginTpSelectDisplay = !this.MarginTpSelectDisplay;
      if (this.MarginTpSelectDisplay) {
        $(".MarginTpCodeList").attr("class", "drop-list MarginTpCodeList");
      } else {
        $(".MarginTpCodeList").attr("class", "drop-list MarginTpCodeList hide");
      }
    },
    marginTpSelected(code, name) {
      $(".MarginTpCode").val(name);
      this.MarginTpSelectDisplay = false;
      $(".MarginTpCodeList").attr("class", "drop-list MarginTpCodeList hide");
      if (this.FromFlag == "AddInsUser") {
        this.AddInsUser.MarginTemplateID = code;
      }
      if (this.FromFlag == "ModifyInsUser") {
        this.UpdateInsUser.MarginTemplateID = code;
      }
    },
    //获取子帐户手续费模板代码列表
    GetUserFeeTpCodeList() {
      var url = "/insbase/GetUserFeeTpCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.UserFeeTpCodeList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    userFeeTpSelect() {
      this.UserFeeTpSelectDisplay = !this.UserFeeTpSelectDisplay;
      if (this.UserFeeTpSelectDisplay) {
        $(".UserFeeTpCodeList").attr("class", "drop-list UserFeeTpCodeList");
      } else {
        $(".UserFeeTpCodeList").attr(
          "class",
          "drop-list UserFeeTpCodeList hide"
        );
      }
    },
    userFeeTpSelected(code, name) {
      $(".UserFeeTpCode").val(name);
      this.UserFeeTpSelectDisplay = false;
      $(".UserFeeTpCodeList").attr("class", "drop-list UserFeeTpCodeList hide");
      if (this.FromFlag == "AddInsUser") {
        this.AddInsUser.FeeTemplateID = code;
      }
      if (this.FromFlag == "ModifyInsUser") {
        this.UpdateInsUser.FeeTemplateID = code;
      }
    },
    //获取风控模板代码列表
    GetRiskTpCodeList() {
      var url = "/insbase/GetRiskTpCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.RiskTpCodeList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    riskTpSelect() {
      this.RiskTpSelectDisplay = !this.RiskTpSelectDisplay;
      if (this.RiskTpSelectDisplay) {
        $(".RiskTpCodeList").attr("class", "drop-list RiskTpCodeList");
      } else {
        $(".RiskTpCodeList").attr("class", "drop-list RiskTpCodeList hide");
      }
    },
    riskTpSelected(code, name) {
      $(".RiskTpCode").val(name);
      this.RiskTpSelectDisplay = false;
      $(".RiskTpCodeList").attr("class", "drop-list RiskTpCodeList hide");
      if (this.FromFlag == "AddInsUser") {
        this.AddInsUser.RiskControlTemplateID = code;
      }
      if (this.FromFlag == "ModifyInsUser") {
        this.UpdateInsUser.RiskControlTemplateID = code;
      }
    },
    //获取风控员
    GetRiskOprCodeList() {
      var url = "/insbase/GetRiskOprCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.RiskOprCodeList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    riskOprSelect() {
      this.RiskOprSelectDisplay = !this.RiskOprSelectDisplay;
      if (this.RiskOprSelectDisplay) {
        $(".RiskOprCodeList").attr("class", "drop-list RiskOprCodeList");
      } else {
        $(".RiskOprCodeList").attr("class", "drop-list RiskOprCodeList hide");
      }
    },
    riskOprSelected(code, name) {
      $(".RiskOprCode").val(name);
      this.RiskOprSelectDisplay = false;
      $(".RiskOprCodeList").attr("class", "drop-list RiskOprCodeList hide");
      if (this.FromFlag == "AddInsUser") {
        this.AddInsUser.RiskOprCode = [code];
      }
    },
    resetSelectDisplay() {
      this.TopAccountSelectDisplay = false;
      $(".TopAccountCodeList").attr(
        "class",
        "drop-list TopAccountCodeList hide"
      );
      this.UserFeeTpSelectDisplay = false;
      $(".UserFeeTpCodeList").attr("class", "drop-list UserFeeTpCodeList hide");
      this.MarginTpSelectDisplay = false;
      $(".MarginTpCodeList").attr("class", "drop-list MarginTpCodeList hide");
      this.RiskTpSelectDisplay = false;
      $(".RiskTpCodeList").attr("class", "drop-list RiskTpCodeList hide");
      this.RiskOprSelectDisplay = false;
      $(".RiskOprCodeList").attr("class", "drop-list RiskOprCodeList hide");
    },
    //弹出新增子帐户
    ViewAddInsUserDiv() {
      this.FromFlag = "AddInsUser";
      this.GetTopAccountCodeList();
      this.GetMaginTpCodeList();
      this.GetUserFeeTpCodeList();
      this.GetRiskTpCodeList();
      this.GetRiskOprCodeList();
      $(".AddInsUser").val("");
      $("#AddInsUser").fadeIn("fast");
      event.stopPropagation();
    },
    //添加子帐户
    addInsUser() {
      this.loadingsave = true;
      var url = "/insuser/AddInsUsers";
      var postData = {
        UserName: this.AddInsUser.UserName,
        FeeTemplateID: this.AddInsUser.FeeTemplateID,
        MarginTemplateID: this.AddInsUser.MarginTemplateID,
        RiskControlTemplateID: this.AddInsUser.RiskControlTemplateID,
        TopAccountNo: this.AddInsUser.TopAccountNo,
        RiskOprCode: this.AddInsUser.RiskOprCode,
        Password: this.AddInsUser.Password,
        Phone: this.AddInsUser.Phone
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(this.TopAccountCode);
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    clearAddInsUser() {
      this.AddInsUser.UserCode = "";
      this.AddInsUser.UserName = "";
      this.AddInsUser.FeeTemplateID = "";
      this.AddInsUser.MarginTemplateID = "";
      this.AddInsUser.RiskControlTemplateID = "";
      this.AddInsUser.TopAccountNo = "";
      this.AddInsUser.RiskOprCode = [];
      this.AddInsUser.Password = "";
      this.AddInsUser.AgentCode = "";
      this.resetSelectDisplay();
      $(".AddInsUser").val("");
    },
    SaveAddInsUser() {
      this.addInsUser();
      this.CloseAddInsUser();
    },
    SaveAndNewAddInsUser() {
      this.addInsUser();
      this.clearAddInsUser();
    },
    CloseAddInsUser() {
      this.clearAddInsUser();
      $("#AddInsUser").fadeOut("fast");
    },

    //查看更多 跳转子账户
    More() {
      this.$router.push("/accounts/subaccounts");
    },

    Back() {
      this.$router.push("/accounts/parentaccounts");
    },

    addData() {
      // //点击取消和关闭弹出框
      $(".mask").fadeIn("fast");
      //$('.drop-list').attr('class','drop-list hide');
      //isdisplay = true;
    },
    del() {
      $(".del-mask").fadeIn("fast");
    },
    editData() {
      //this.gettradecorelist();
      this.EditTradeCoreCode = this.TradeCoreCode;
      this.EditTradeCoreName = this.TradeCoreName;
      this.EditTopAccountCode = this.TopAccountCode;
      this.EditTopAccountName = this.TopAccountName;
      $("#edit").fadeIn("fast");
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $("#edit").fadeOut("fast");
      $(".frozen-mask").fadeOut("fast");
    },

    frozen(Code, State) {
      $(".frozen-mask").fadeIn("fast");
      this.id = Code;
      this.ModifyState = State;
    },

    fold() {
      this.isShow = !this.isShow;
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
</style>
