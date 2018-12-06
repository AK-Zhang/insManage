<template>
  <div class="monitorsInfo_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <!--带表格的面板-->
          <div class="panel panel-default panel-1">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye icon_monitor"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">风控员</a>
                  </li>
                  <li>
                    <a class="active" @click="Back()">风控员</a>
                  </li>
                  <li class="active">风控员信息</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <div class="col-md-8">
                <!--<span class="iconfont icon-mokuaiguanli icon-bg"></span>-->
                <span class="fz account-info">风控员</span>
                <span class="account-name">({{RiskOprName}})</span>
              </div>
              <div class="col-md-4 text-right ">
                <div class="btn-group margin-Top" role="group" aria-label="...">
                  <button type="button" class="btn btn-default " @click="add()" v-show="false">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <button type="button" class="btn btn-default" @click="editMonitor()">编辑</button>
                  <button type="button" class="btn btn-default" @click="reset(1)">删除</button>
                  <button type="button" class="btn btn-default" @click="reset(2)">重置密码</button>
                  <button type="button" class="btn btn-default" v-show="IsShowPassButton(Phone,Password)" @click="ShowSendPassword()">查看隐私信息</button>
                </div>
              </div>
            </div>
            <div class="panel panel-default account-table">

              <table class="table account-table-1">
                <thead>
                  <tr>
                    <th>风控员代码</th>
                    <th>风控员名称</th>
                    <th>联系方式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{RiskOprCode}}</td>
                    <td>{{RiskOprName}}</td>
                    <td>{{Phone}}</td>
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

                    <nav class="navbar navbar-default nav-other" @click="fold2()">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          风控员权限
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin" type="submit" @click="edit()">编辑</button>
                        </p>
                        <div class="children_box_table" v-show="isShow2">
                          <ul class="monitor-permission">
                            <li class="monitor-permission-sort">
                              <div class="monitor-sort-check">
                                <span class="m-span-box" v-show="MoneyTransferPower"></span>
                                <span class="m-span-box1" v-show="!MoneyTransferPower"></span>
                              </div>
                              <div class="monitor-sort-explain">
                                <h3>出入金权限</h3>
                                <p>对子账户进行出金、入金的操作管理权限</p>
                              </div>
                            </li>
                            <li class="monitor-permission-sort">
                              <div class="monitor-sort-check">
                                <span class="m-span-box" v-show="CancelOrderPower"></span>
                                <span class="m-span-box1" v-show="!CancelOrderPower"></span>
                              </div>
                              <div class="monitor-sort-explain">
                                <h3>撤单权限</h3>
                                <p>对子账户的挂单进行撤单操作</p>
                              </div>
                            </li>
                            <li class="monitor-permission-sort">
                              <div class="monitor-sort-check">
                                <span class="m-span-box" v-show="ClosePositionPower"></span>
                                <span class="m-span-box1" v-show="!ClosePositionPower"></span>
                              </div>
                              <div class="monitor-sort-explain">
                                <h3>委托权限</h3>
                                <p>对子账户的持仓进行手工平仓</p>
                              </div>
                            </li>
                            <li class="monitor-permission-sort">
                              <div class="monitor-sort-check">
                                <span class="m-span-box" v-show="UserRiskPower"></span>
                                <span class="m-span-box1" v-show="!UserRiskPower"></span>
                              </div>
                              <div class="monitor-sort-explain">
                                <h3>权限控制</h3>
                                <p>查看及设置子账户的权限及风控指标、定时仓位控制</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <nav class="navbar navbar-default nav-cursor" @click="fold()">
                      <div class="container-fluid bgc12 bg-success">
                        <!-- <div class="navbar-header"> -->

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          子账户
                          <span>({{UserCount}})</span>
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin" type="submit" @click="bind($event)">绑定子账户
                          </button>
                        </p>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <div class="account-info-1 flex_wa" v-show="isShow">
                      <div class="account-info-1-box " v-for="(item,index) in list" :key="index">
                        <div class="account-icon">
                          <span class="icon_sub"></span>
                        </div>
                        <div class="account-info-1-box-content">
                          <a @click="getDetaillistAndTurn(item)" class="super-link">{{item.InsUserName}}</a>
                          <p class="child_content">子账户代码：{{item.InsUserCode}}</p>
                          <p class="child_content">总账户代码：{{item.InsTopAccount}}</p>
                        </div>
                      </div>
                      <p class="navbar-text navbar-right btn-right-2">
                        <button class="btn btn-default btn-margin" type="submit" v-show="UserCount >= 4 ? true: false" @click="getMore()">查看更多</button>
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
                    <h3 class="account-sub-title">风控员</h3>
                    <p class="account-sub-content">风控员登录风控终端，对绑定的子账户可进行风控设置、权限设置、出入金、补单、委托、撤单操作。</p>
                    <div class="account-sub-contents">
                      <ul>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">1</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">绑定子账户</h3>
                            <p class="account-sub-content-1">在绑定窗口，可绑定更多子账户到风控员下，同时可以取消子账户与风控员的绑定。</p>
                          </div>
                        </li>
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
    <!--编辑经纪人权限弹窗-->
    <div class="mask" id="edit" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑风控员权限</div>
          <div class="panel-body">
            <div class="modal-body bodyf">
              <ul>
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="EditMoneyTransferPower">
                    <span class="bodyf3">出入金权限</span>
                  </p>
                  <p class="bodyf4">对子账户进行出入金操作</p>
                </li>
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="EditCancelOrderPower">
                    <span class="bodyf3">撤单权限</span>
                  </p>
                  <p class="bodyf4">对子账户的挂单进行撤单操作</p>
                </li>
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="EditClosePositionPower">
                    <span class="bodyf3">委托权限</span>
                  </p>
                  <p class="bodyf4">对子账户的持仓进行手工平仓</p>
                </li>
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="EditUserRiskPower">
                    <span class="bodyf3">权限控制</span>
                  </p>
                  <p class="bodyf4">查看及设置子账户的权限及风控指标、定时仓位控制</p>
                </li>
              </ul>
              <p class="bodyf5">特别说明：风控员权限是指风控员在风控员终端能够具有的操作权限</p>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SetMonitorRole(EditRiskOprCode, EditMoneyTransferPower,      EditCancelOrderPower, EditClosePositionPower, EditUserRiskPower)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--新增风控员弹窗-->
    <div id="add" class="mask">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增风控员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控员代码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddRiskOprCode">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控员名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddRiskOprName">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控员密码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddRiskOprPassword">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddRiskOprConfirmPassword">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  联系方式
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddRiskOprPhone">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑风控员弹窗-->
    <div id="editMonitor" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑风控员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控员代码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" disabled placeholder="" v-model="EditRiskOprCode">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控员名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="EditRiskOprName">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  联系方式
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="EditPhone">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(EditRiskOprCode,EditRiskOprName,EditPhone,EditPassword)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--绑定子账户弹窗-->
    <div id="bind-subaccount" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">风控员绑定子账户</div>
          <div class="panel-body text-center">

            <div class="bodyfb1">
              <table align="center" class="table tablefbd" width="100%">
                <thead>
                  <tr>
                    <th class="thfb1">
                      <div class="bodyfb2">
                        <div class="bodyfb4">
                          <p class="bodyfb6">已绑定子账户</p>
                          <div class="bodyfb41">
                            <table align="center" class="table table-bordered tablefb0">
                              <thead>
                                <tr>
                                  <th>子账户名称</th>
                                  <th>子账户代码</th>
                                  <th>解绑</th>
                                </tr>
                              </thead>
                            </table>
                          </div>
                          <div class="bodyfb42">
                            <table align="center" class="table table-bordered  tablefb2" width="100%">
                              <tbody>
                                <tr v-for="(item,index) in listLeft" :key="index">
                                  <td>{{item.InsUserName}}</td>
                                  <td>{{item.InsUserCode}}</td>
                                  <td>
                                    <button class=" btn btn2" :class="item.InsUserCode" type="button" @click="cancel(item)">
                                      <span class="bodyfb47"></span>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th class="thfb2">
                      <div class="bodyfb5">
                        <div class="bodyfb51">
                          <button class="btnfb2" id="bindingall" type="button" @click="bindingall()">
                            <span class="bodyfb53"></span>
                          </button>
                        </div>
                        <div class="bodyfb52">
                          <button class="btnfb1" type="button" id="cancelall" @click="cancelall()">
                            <span class="bodyfb54"></span>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th>
                      <div class="bodyfb9">
                        <div class="bodyfb7">
                          <div class="bodyfb8">
                            <form novalidate="" ng-reflect-form="[object Object]" class="ng-untouched ng-valid ng-dirty">
                              <div class=" groupfb">
                                <div class="hide">[object Object]</div>
                                <div class="drop1">
                                  <div>
                                    <!-- <input class="form-control input_text" disabled type="text" placeholder="机构及经纪人全部子账户">
                                    <div class="drop_icon">
                                      <span class="drop_down"></span>
                                    </div> -->
                                    <el-select v-model="selectFilter" @change="FilterChange" ref="chooseFilter" value-key="Name" placeholder="请选择" size="small">
                                      <el-option v-for="(item,index) in lists" :key="index" :label="item.Name" :value="item">
                                      </el-option>
                                    </el-select>
                                  </div>
                                </div>
                              </div>
                              <div class="bodyfb83">
                                <input class="form-control textfb2 ng-untouched ng-pristine ng-valid" placeholder="输入子账户代码" type="text" @keyup="change()" v-model="filter" ng-reflect-form="[object Object]">
                              </div>
                            </form>
                          </div>
                          <div class="bodyfb43">
                            <table align="center" class="table table-bordered tablefb" width="100%">
                              <thead>
                                <tr>
                                  <th>绑定</th>
                                  <th>子账户名称</th>
                                  <th>子账户代码</th>
                                </tr>
                              </thead>
                            </table>
                          </div>
                          <div class="bodyfb42" id="untarget">
                            <table align="center" class="table table-bordered  tablefb1" width="100%">
                              <tbody>
                                <tr v-for="(item,index) in listRight" :key="index">
                                  <td>
                                    <button class="btn btn2" :class="item.Code" type="button" @click="binding(item)">
                                      <span class="bodyfb46"></span>
                                    </button>
                                  </td>
                                  <td>{{item.Name}}</td>
                                  <td>{{item.Code}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" v-show="false">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()" v-show="false">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--删除风控员和重置密码弹窗-->
    <div class="del-mask" id="del_reset" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">

          <div class="panel-heading" id="alert-title">删除经纪人手续费模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3" id="alert-content">
                  确认要删除经纪人手续费模板吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>

          <p>
            <span class="fr">
              <button id="btnName" type="button" class="btn btn-info" @click="DelOrReset(ChooseNo,RiskOprCode)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="showPass" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">验证码确认</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="width_phoneCode">
                <div class="error3">
                  <span class="error4">*</span>
                  验证码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="MarkCode">
                </span>
              </div>
              <div class="width_phoneCode_1">
                <div class="error3">
                  <span class="error4"></span>

                </div>
                <span class="selected">
                  <button type="button" class="btn btn-info btnH" :disabled="isDisabled" @click="SendSurePass()">{{buttonName}}</button>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="MakeSurePass()">确认</button>
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
import "../../assets/less/transfor.css";
import SeachConPage from "../selects/SeachConditionSubCom.vue";

export default {
  name: "monitorsinfo",
  components: {
    SeachConPage
  },
  data() {
    return {
      loadingsave: "",
      isShow: false,
      isShow2: true,
      RiskOprCode: "",
      RiskOprName: "",
      Phone: "",
      Password: "",
      CancelOrderPower: false,
      ClosePositionPower: false,
      MoneyTransferPower: false,
      UserRiskPower: false,

      AddRiskOprCode: "",
      AddRiskOprName: "",
      AddRiskOprPhone: "",
      AddRiskOprPassword: "",
      AddRiskOprConfirmPassword: "",

      EditRiskOprCode: "",
      EditRiskOprName: "",
      EditPhone: "",
      EditPassword: "",
      EditCancelOrderPower: false,
      EditClosePositionPower: false,
      EditMoneyTransferPower: false,
      EditUserRiskPower: false,

      list: [],
      UserCount: 0,
      ChooseNo: 0,
      listLeft: [], //已绑定风控员子账户
      listRight: [], //筛选风控员子账户
      listOldRight: [], //筛选前数据源
      filterlist: [], //符合条件的数据源
      filter: "",
      lists: [
        { Code: "", Name: "机构及经纪人全部子账户" },
        { Code: "AllAgent", Name: "经纪人全部客户" },
        { Code: "AllIns", Name: "机构直属客户" }
      ],
      selectFilter: { Code: "", Name: "机构及经纪人全部子账户" }, //选中筛选项
      listNotBind: [], //未绑定子账户信息
      UserCodeList: [], //用户编号
      MarkCode: "",

      buttonName: "获取验证码",
      isDisabled: false,
      time: 120
    };
  },
  created() {
    this.$store.state.loaction = "/monitors/monitors";
    if (this.$route.params.loadingByGlobalQuery) return;
    this.InitData();
  },
  mounted() {
    this.$emit("loaded", this.$route);
  },
  methods: {
    loaded(params) {
      this.getDetaillist(params.Code);
    },
    InitData() {
      if (!this.$store.state.DetailInfo.RiskOprCode) {
        this.Back();
        return;
      }

      this.RiskOprCode = this.$store.state.DetailInfo.RiskOprCode;
      this.RiskOprName = this.$store.state.DetailInfo.RiskOprName;
      this.Phone = this.$store.state.DetailInfo.Phone;
      this.Password = this.$store.state.DetailInfo.Password;
      this.list = this.$store.state.DetailInfo.InsUsers;
      this.UserCount = this.$store.state.DetailInfo.InsUserCount;
      this.CancelOrderPower = this.$store.state.DetailInfo.CancelOrderPower;
      this.ClosePositionPower = this.$store.state.DetailInfo.ClosePositionPower;
      this.MoneyTransferPower = this.$store.state.DetailInfo.MoneyTransferPower;
      this.UserRiskPower = this.$store.state.DetailInfo.UserRiskPower;
    },

    //弹出验证码框
    ShowSendPassword() {
      $("#showPass").fadeIn("fast");
      this.ChooseUser = {
        UserCode: this.RiskOprCode,
        UserName: this.RiskOprName,
        Phone: this.Phone,
        Password: this.Password
      };
    },

    //发送短信验证码
    SendSurePass() {
      if (
        this.$store.state.userInfo.AccountPhone == null ||
        this.$store.state.userInfo.AccountPhone == ""
      ) {
        this.$alert("该管理员尚未绑定手机号，请先设置手机号！");
        return;
      }
      var telphone = this.$store.state.userInfo.AccountPhone;
      if (telphone.toString().trim() == "") {
        this.$alert("请先维护操作员手机号", {});
        return;
      }

      var url = "/login/SendVerifyCodeToPhone/" + this.$store.state.inscode;
      var postData = "phone=" + telphone + "&id=" + this.$store.state.inscode;

      this.$indexapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.$message.success("短信验证码已发送，请注意查收");
          this.sendMsg();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },
    sendMsg() {
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
        me.buttonName = me.time + "S后重新发送";
        --me.time;
        if (me.time < 0) {
          me.buttonName = "发送短信验证码";
          me.time = 10;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    //核实确认验证码
    MakeSurePass() {
      if (this.MarkCode.toString().trim() == "") {
        this.$alert("请输入验证码", {});
        return;
      }
      this.loadingsave = true;
      var url = "userprivacyauth/VerifyAuthInfo";
      var postData = {
        Phone: this.$store.state.userInfo.AccountPhone,
        Code: this.MarkCode,
        UserCode: this.ChooseUser.UserCode,
        Type: 2
      };

      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.ChooseUser.Phone = response.Data.Phone;
          this.ChooseUser.Password = response.Data.Password;
          this.MarkCode = "";
          this.Phone = this.ChooseUser.Phone;
          this.closeMask();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    //是否显示验证按钮
    IsShowPassButton(phone, password) {
      if (phone == "******" || password == "******") {
        return true;
      } else {
        return false;
      }
    },

    //根据TPCode进行获取
    getDetaillist(ID) {
      var url = "/insriskopr/GetInsRiskOprDetail";
      this.$loginapi.post(url, ID, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.$store.state.DetailInfo = response.Data;
          this.InitData();
          $("#bindingall").attr("disabled", false);
          $("#cancelall").attr("disabled", false);
        } else {
          $("#bindingall").attr("disabled", false);
          $("#cancelall").attr("disabled", false);
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //选中列表进行切换
    FilterChange() {
      this.getUserList();
    },

    //获取子级用户
    getUserList() {
      this.listRight.splice(0, this.listRight.length);
      var url = "/insbase/GetInsUserCodeList";
      var postData = {
        type: 0,
        AgentCode: ""
      };
      if (this.selectFilter.Code == "") {
        postData = {
          type: 0,
          AgentCode: ""
        };
      } else if (this.selectFilter.Code == "AllIns") {
        postData = {
          type: 1,
          AgentCode: ""
        };
      } else if (this.selectFilter.Code == "AllAgent") {
        postData = {
          type: 2,
          AgentCode: ""
        };
      } else {
        // this.getJuniorAccount(this.selectFilter.Code);
        // return;
        postData = {
          type: 3,
          AgentCode: this.selectFilter.Code
        };
      }
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.listRight = response.Data;
          this.listOldRight = response.Data;
          this.getFinalNotBindInfo();
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //      获取子账户
    getJuniorAccount(code) {
      this.$loginapi.postWithPage(
        "agent/QueryUsersByAgent",
        1,
        100,
        code,
        e => {
          if (e.Ret == 0) {
            e.Data.forEach(item => {
              this.listRight.push({ Code: item.UserCode, Name: item.UserName });
            });
            this.listOldRight = this.listRight;
            this.getFinalNotBindInfo();
          } else {
            //this.$message.error(e.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    //获取经纪人
    getAgentList() {
      this.lists.splice(3, this.lists.length - 3);

      this.$loginapi.post("/insbase/GetAgentCodeList", "", response => {
        if (response.Ret == 0) {
          response.Data.forEach(item => {
            this.lists.push({
              Code: item.Code,
              Name: item.Code + "(" + item.Name + ")"
            });
          });
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取已绑定子账户信息
    getBindingAgentInfo(ID) {
      this.listLeft.splice(0, this.listLeft.length);
      var url = "/insriskopr/GetRiskOprBinds";
      this.$loginapi.post(url, ID, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数

          this.listLeft = response.Data;
          this.getFinalNotBindInfo();
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    getFinalNotBindInfo() {
      var result = [];
      let index = 0;
      if (this.listLeft.length > 0 && this.listRight.length > 0) {
        this.listRight.forEach(right => {
          index = 0;
          this.listLeft.forEach(left => {
            if (left.InsUserCode == right.Code) {
              index++;
            }
          });

          if (index == 0) {
            result.push({ Code: right.Code, Name: right.Name });
          }
        });

        this.listRight = result;
        this.listOldRight = result;
      }
    },

    //获取未绑定子账户信息
    getNotBindingAgentInfo(ID) {
      this.listNotBind.splice(0, this.listNotBind.length);
      var url = "/insriskopr/GetRiskOprUnBinds";
      this.$loginapi.post(url, ID, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.listNotBind = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //绑定
    binding(item) {
      if (item != null) {
        $("." + item.Code).attr("disabled", "disabled");
        this.UserCodeList.splice(0, this.UserCodeList.length);
        this.UserCodeList.push(item.Code);
      }

      var url = "/insriskopr/RiskOprBindInsUser";
      var postData = {
        UserCodes: this.UserCodeList,
        RiskOprCode: this.RiskOprCode
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          if (item != null) {
            $("." + item.Code).removeAttr("disabled", "disabled");
          }

          //console.log(response.Data); //请求成功，response为成功信息参数
          this.UserCodeList.splice(0, this.UserCodeList.length);
          if (item != null) {
            this.listLeft.push({
              InsUserCode: item.Code,
              InsUserName: item.Name
            });
            this.listRight.remove(item);
            this.listOldRight.remove(item);
          } else {
            this.getUserList();
            this.getBindingAgentInfo(this.RiskOprCode);
          }
          this.$message.success("绑定成功");
          this.getDetaillist(this.RiskOprCode);
        } else {
          if (item != null) {
            $("." + item.Code).removeAttr("disabled", "disabled");
          }

          $("#bindingall").attr("disabled", false);
          $("#cancelall").attr("disabled", false);
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //全部绑定
    bindingall() {
      $("#bindingall").attr("disabled", true);
      $("#cancelall").attr("disabled", true);
      this.UserCodeList.splice(0, this.UserCodeList.length);
      if (this.listRight.length == 0) {
        $("#bindingall").attr("disabled", false);
        $("#cancelall").attr("disabled", false);
        // this.$message.error("暂无需要绑定的数据");
        this.$alert("暂无需要绑定的数据", {});
        return;
      }

      this.listRight.forEach(item => {
        this.UserCodeList.push(item.Code);
      });

      this.binding(null);
    },

    //解绑
    cancel(item) {
      if (item != null) {
        $("." + item.InsUserCode).attr("disabled", "disabled");
        this.UserCodeList.splice(0, this.UserCodeList.length);
        this.UserCodeList.push(item.InsUserCode);
      }

      var url = "/insriskopr/RiskOprUnBindInsUser";
      var postData = {
        UserCodes: this.UserCodeList,
        RiskOprCode: this.RiskOprCode
      };

      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          if (item != null) {
            $("." + item.InsUserCode).removeAttr("disabled", "disabled");
          }
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.UserCodeList.splice(0, this.UserCodeList.length);
          if (item != null) {
            this.listLeft.remove(item);
            this.listRight.push({
              Code: item.InsUserCode,
              Name: item.InsUserName
            });
            this.listOldRight = this.listRight;
          } else {
            this.getUserList();
            this.getBindingAgentInfo(this.RiskOprCode);
          }
          this.$message.success("解绑成功");
          this.getDetaillist(this.RiskOprCode);
        } else {
          if (item != null) {
            $("." + item.InsUserCode).removeAttr("disabled", "disabled");
          }
          $("#bindingall").attr("disabled", false);
          $("#cancelall").attr("disabled", false);
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    //全部解绑
    cancelall() {
      $("#bindingall").attr("disabled", true);
      $("#cancelall").attr("disabled", true);
      this.UserCodeList.splice(0, this.UserCodeList.length);
      if (this.listLeft.length == 0) {
        $("#bindingall").attr("disabled", false);
        $("#cancelall").attr("disabled", false);
        // this.$message.error("暂无需要解绑的数据");
        this.$alert("暂无需要解绑的数据", {});
        return;
      }
      this.listLeft.forEach(item => {
        this.UserCodeList.push(item.InsUserCode);
      });

      this.cancel(null);
    },

    //获取更多
    getMore() {
      this.$router.push("/accounts/subaccounts");
    },

    change() {
      this.listRight = [];
      this.filterlist = [];
      this.listOldRight.forEach(item => {
        this.listRight.push(item);
      });

      if (this.filter.trim().length > 0) {
        this.listRight.forEach(element => {
          if (element.Code.indexOf(this.filter) > -1) {
            this.filterlist.push(element);
          }
        });

        this.listRight = this.filterlist;
      }
    },

    //设置风控员权限
    SetMonitorRole(
      RiskOprCode,
      MoneyTransferPower,
      CancelOrderPower,
      ClosePositionPower,
      UserRiskPower
    ) {
      var url = "/insriskopr/SetRiskOprPower";
      this.loadingsave = true;
      var postData = {
        RiskOprCode: RiskOprCode,
        MoneyTransferPower: MoneyTransferPower,
        CancelOrderPower: CancelOrderPower,
        ClosePositionPower: ClosePositionPower,
        UserRiskPower: UserRiskPower
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(RiskOprCode);
          this.closeMask();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    //获取子账户详情
    getDetaillistAndTurn(obj) {
      var url = "/insuser/GetInsUserDetail";
      this.$loginapi.post(url, obj.InsUserCode, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/accounts/subaccountsinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    /** 新增修改为一个方法 Code为空 则进行添加操作*/
    Modifydata(RiskOprCode, RiskOprName, Phone, Password) {
      if (RiskOprName.trim() == "") {
        //this.$message.error("风控员名称不能为空");
        this.$alert("风控员名称不能为空", {});
        return;
      }
      var url = "/insriskopr/Modify";
      var postData = {
        RiskOprCode: RiskOprCode,
        RiskOprName: RiskOprName,
        Phone: Phone,
        Password: Password
      };
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(RiskOprCode);
          this.closeMask();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    DelOrReset(no, id) {
      let url = "";
      if (no == 1) {
        let idList = [];
        idList.push(id);
        url = "/insriskopr/Delete";
        this.loadingsave = true;
        this.$loginapi.post(url, idList, response => {
          this.loadingsave = false;
          if (response.Ret == 0) {
            this.$message.success("删除成功");
            this.Back();
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        });
      } else if (no == 2) {
        url = "insriskopr/ResetPassword";
        this.$loginapi.post(url, { UserCode: id }, response => {
          if (response.Ret == 0) {
            this.getDetaillist(this.RiskOprCode);
            this.closeMask();
            this.$message.success("重置密码成功");
            //this.Back();
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        });
      }
    },

    //回退
    Back() {
      this.$router.push("/monitors/monitors");
    },

    //      风控员权限编辑
    edit() {
      this.EditRiskOprCode = this.RiskOprCode;
      this.EditCancelOrderPower = this.CancelOrderPower;
      this.EditClosePositionPower = this.ClosePositionPower;
      this.EditMoneyTransferPower = this.MoneyTransferPower;
      this.EditUserRiskPower = this.UserRiskPower;
      $("#edit").fadeIn("fast");
      event.stopPropagation();
    },
    //      新增风控员
    add() {
      $("#add").fadeIn("fast");
    },
    //      编辑风控员信息
    editMonitor() {
      if (this.Phone == "******") {
        this.$alert("存在隐私信息，不允许编辑");
        return;
      }
      this.EditRiskOprCode = this.RiskOprCode;
      this.EditRiskOprName = this.RiskOprName;
      this.EditPhone = this.Phone;
      this.EditPassword = this.Password;
      $("#editMonitor").fadeIn("fast");
    },
    //      关闭弹窗方法
    closeMask() {
      $("#add").fadeOut("fast");
      $("#edit").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $("#editMonitor").fadeOut("fast");
      $("#bind-subaccount").fadeOut("fast");
      $(".mask").fadeOut("fast");
    },

    //代开绑定弹窗
    bind(e) {
      this.getNotBindingAgentInfo(this.RiskOprCode);
      this.filter = "";
      this.selectFilter = { Code: "", Name: "机构及经纪人全部子账户" };
      this.getAgentList(); //获取筛选列表信息
      this.OperClick = 0;

      this.getBindingAgentInfo(this.RiskOprCode);
      this.getUserList();
      //this.getNotBindingAgentInfo(this.RiskOprCode);

      $("#bind-subaccount").fadeIn("fast");

      var event = window.event || e;

      event.stopPropagation();
    },

    //      打开子账户折叠板
    fold() {
      this.isShow = !this.isShow;
    },
    //      打开风控员权限折叠板
    fold2() {
      this.isShow2 = !this.isShow2;
    },
    //      重置风控员密码，或者删除风控员弹窗
    reset(No) {
      this.ChooseNo = No;
      //        如果No 等于1 打开删除弹窗
      if (No == 1) {
        //          如果该风控员不能删除再进行判断

        $("#alert-title").html("删除风控员");
        $("#alert-content").html("确认要删除风控员吗？");
        $("#btnName").html("删除");
      } else if (No == 2) {
        //        如果No 等于2 打开重置密码弹窗
        $("#alert-title").html("重置风控员密码");
        $("#alert-content").html("确认要重置该风控员密码吗？");
        $("#btnName").html("确定");
      }
      $("#del_reset").fadeIn("fast");
    }
  }
};
</script>

<style scoped>
</style>
