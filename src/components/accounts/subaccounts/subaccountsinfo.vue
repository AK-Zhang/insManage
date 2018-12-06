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
                    <a class="active" @click="Back()">子账户</a>
                  </li>
                  <li class="active">子账户详细信息</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <div class="col-md-7">
                <div class="account-icon">
                  <!-- <span class="icon_sub"></span> -->
                  <span class="fz account-info">子账户</span>
                  <span class="account-name">({{UserName}})</span>
                </div>

              </div>
              <div class="col-md-5 text-right">
                <div class="btn-group  btn-group-sm margin-Top" role="group" aria-label="...">
                  <button type="button" class="btn btn-default" @click="ViewAddInsUserDiv()" v-show="false">
                    <span class="fa fa-plus pulp"></span>新增</button>
                  <button type="button" class="btn btn-default" @click="ViewModifyInsUserDiv()">编辑</button>
                  <button type="button" class="btn btn-default" @click="ViewDelDiv()">删除</button>
                  <button type="button" class="btn btn-default" @click="SetInsUserOpenRightById()">{{DisplayAllowOrNo(OpenPositionPower)}}开仓</button>
                  <button type="button" class="btn btn-default" @click="ShowChangeTopAccount()">帐户转移</button>

                  <!-- </div>
              <div class="btn-group  btn-group-sm col-md-3 margin-Top" role="group" aria-label="..."> -->
                  <button type="button" class="btn btn-default" @click="ShowResetPhoneDiv()">重置手机号</button>
                  <button type="button" class="btn btn-default" @click="ShowResetPwdDiv()">重置密码</button>
                  <button type="button" class="btn btn-default" v-show="IsShowPassButton(Phone,Password)" @click="ShowSendPassword()">查看隐私信息</button>
                  <!-- <button type="button" class="btn btn-default">销毁</button> -->
                </div>
              </div>

            </div>
            <div class="panel panel-default account-table">

              <table class="table account-table-1">
                <thead>
                  <tr>
                    <th>子账户代码</th>
                    <th>总账户</th>
                    <th>经纪人</th>
                    <th>保证金模板</th>
                    <th>子账户手续费模板</th>
                    <th>风控模板</th>
                    <th>手机号</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{UserCode}}</td>
                    <td>{{TopAccountName}}</td>
                    <td>{{AgentName}}</td>
                    <td>{{MarginTemplateName}}</td>
                    <td>{{FeeTemplateName}}</td>
                    <td>{{RiskTemplateName}}</td>
                    <td>{{Phone}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-8 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this" @click="tabsC(0)">相关</li>
                    <li @click="tabsC(1)">详细信息</li>
                    <li @click="tabsC(2)"></li>
                  </ul>
                  <div class="layui-tab-content">
                    <nav class="navbar navbar-default nav-other" v-show="isShow5" @click="fold2()">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          出入金流水
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin addLiminshow" type="submit" @click="ViewMoneyTransferDiv()">出入金</button>
                        </p>

                        <div class="children_box_table" v-show="isShow1">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th class="child-table-th">序号</th>
                                <th class="child-table-th">货币类型</th>
                                <th class="child-table-th">出入金方向</th>
                                <th class="child-table-th">发生金额</th>
                                <th class="child-table-th">操作时间</th>
                                <th class="child-table-th">操作员代码</th>
                                <th class="child-table-th">出入金来源</th>
                                <th class="child-table-th">支付订单号</th>
                                <th class="child-table-th"></th>
                                <th class="child-table-th">支付状态</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in MoneyTransfer" :key="index">
                                <td class="child-table-td">&nbsp;{{index+1}}</td>
                                <td class="child-table-td">美元</td>
                                <td class="child-table-td">{{item.TransferType == 1 ? "入金" : "出金"}}</td>
                                <td class="child-table-td">{{item.TransferMoney}}</td>
                                <td class="child-table-td">{{item.AddDate}}</td>
                                <td class="child-table-td">{{item.OperatorCode}}</td>
                                <td class="child-table-td">{{getAccountSource(item.OperatorType)}}</td>
                                <td class="child-table-td">{{item.Id}}</td>
                                <td class="child-table-td"></td>
                                <td class="child-table-td">{{item.OrderState}}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <nav class="navbar navbar-default nav-cursor" v-show="isShow5" @click="fold1()">
                      <div class="container-fluid bgc12 bg-success">
                        <!-- <div class="navbar-header"> -->

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          所属风控员
                          <span>({{RiskOprCount}})</span>
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin" @click="ShowConfigRiskOprDiv()">指定风控员</button>
                        </p>
                        <!-- </div> -->
                      </div>
                    </nav>
                    <div>
                      <div class="account-info-1 flex_wa" v-show="isShow">
                        <div class="account-info-1-box" v-for="(item,index) in RiskOpr" :key="index">
                          <div class="account-icon">
                            <span class="icon_sub"></span>
                          </div>
                          <div class="account-info-1-box-content">
                            <a class="child_link" @click="viewRiskInfo(item.RiskOprCode)">{{item.RiskOprName}}</a>
                            <p class="child_content">风控员代码：{{item.RiskOprCode}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <nav class="navbar navbar-default nav-cursor nav-cursor-1" v-show="isShow5" @click="fold3()">
                      <div class="container-fluid bgc12 bg-success">
                        <!-- <div class="navbar-header"> -->
                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          银行账户
                          <span>({{BankCardCount}})</span>
                        </p>
                        <!--<p class="navbar-text navbar-right btn-right-1">-->
                        <!--<button class="btn btn-default btn-margin" type="submit">新增</button>-->
                        <!--</p>-->
                        <!-- </div> -->
                      </div>
                    </nav>
                    <div v-for="(item,index) in BankCards" :key="index">
                      <div class="account-info-1 flex_wa" v-show="isShow">
                        <div class="account-info-1-box ">
                          <div class="account-icon">
                            <span class="icon_sub"></span>
                          </div>
                          <div class="account-info-1-box-content">
                            <a class="child_link">{{item.BankName}}</a>
                            <p class="child_content">卡号：{{item.CardNO}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="account-info-1 flex_wa" v-show="isShow2">
                      <div class="account-info-1-box ">
                        <div class="account-icon">
                          <span class="icon_sub"></span>
                        </div>
                        <div class="account-info-1-box-content">
                          <a class="child_link">福顺商务01</a>
                          <p class="child_content">子账户代码：000901</p>
                          <p class="child_content">总账户代码：1000019</p>
                        </div>
                      </div>
                    </div> -->

                    <div class="subaccount-info" v-show="isShow6">
                      <ul class="subaccount-info-ul">
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">子账户代码</p>
                          <span class="subaccount-info-li-content">{{UserCode}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">经纪人</p>
                          <span class="subaccount-info-li-content">{{AgentName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">子账户名称</p>
                          <span class="subaccount-info-li-content">{{UserName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">开仓权限</p>
                          <span class="subaccount-info-li-content">{{DisplayAllowOrNo(!OpenPositionPower)}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">总账户代码</p>
                          <span class="subaccount-info-li-content">{{TopAccountCode}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">保证金模板</p>
                          <span class="subaccount-info-li-content">{{MarginTemplateName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">总账户名称</p>
                          <span class="subaccount-info-li-content">{{TopAccountName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">子账户手续费模板</p>
                          <span class="subaccount-info-li-content">{{FeeTemplateName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">交易柜台</p>
                          <span class="subaccount-info-li-content">{{InsName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">风控模板</p>
                          <span class="subaccount-info-li-content">{{RiskTemplateName}}</span>
                        </li>
                        <li class="subaccount-info-li">
                          <p class="subaccount-info-li-title">核心</p>
                          <span class="subaccount-info-li-content">{{TradeCoreName}}</span>
                        </li>
                      </ul>
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
                    <h3 class="account-sub-title">子账户</h3>
                    <p class="account-sub-content">使用子账户代码、密码在交易终端登录成功后，便可进行委托交易。</p>
                    <div class="account-sub-contents">
                      <ul>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">1</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">开仓权限</h3>
                            <p class="account-sub-content-1">可设置子账户的开仓权限为允许或禁止。禁止后，该子账户不可进行开仓交易，但可以进行平仓和撤单操作</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">2</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">子账户销毁</h3>
                            <p class="account-sub-content-1">将消除子账户所有数据，不可恢复。需谨慎操作。</p>
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

    <div id="ResetPwd-mask" class="mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">重置子账户密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div style="width: 100%">
                <div class="error3" style="text-align: center;width: 100%;font-size: 16px;">
                  确认要重置该子账户密码吗?
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseResetPwdDiv()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveResetPwd()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseResetPwdDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="ChangeTopAccount-mask" class="mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">子账户转移</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div style="width: 100%">
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <span class="selected">
                  <input class="input-text ChangeTopAccount TopAccountCode" style="width: 98%" type="text" placeholder="请选择" @click="topAccountselect()">
                  <div class="fa fa-sort-desc input-list" @click="topAccountselect()"></div>
                  <div class="drop-list TopAccountCodeList hide">
                    <p v-for="item in TopAccountCodeList" @click="topAccountselected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseChangeTopAccountDiv()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveChangeTopAccount()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseChangeTopAccountDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="ResetPhone-mask" class="mask mask_subaccountinfo">
      <div class="mask_box" style="width: 30%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">重置手机号</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <!-- <div class="error3">
                <span>子账户代码：
                  <span style="border-bottom:1px solid #ccc;">{{UserCode}}</span>
                </span>
              </div>
              <div class="error3">
                <span>子账户名称：{{UserName}}</span>
              </div> -->
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  新手机号码
                </div>
                <span class="selected">
                  <input class="input-text newPhone" type="text" placeholder="">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseResetPhoneDiv()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveResetPhone()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseResetPhoneDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="del-mask">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除子帐户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除所选子帐户吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseViewDelDiv()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteInsUsers()">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseViewDelDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="AddInsUser" class="mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增子账户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户代码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="text" v-model="AddInsUser.UserCode" placeholder="">
                </span>
              </div>
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
                    <p v-for="item in TopAccountCodeList" @click="topAccountselected(item.Code,item.Name)">{{item.Name}}</p>
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
                    <p v-for="item in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)">{{item.Name}}</p>
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
                    <p v-for="item in UserFeeTpCodeList" @click="userFeeTpSelected(item.Code,item.Name)">{{item.Name}}</p>
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
                    <p v-for="item in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)">{{item.Name}}</p>
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
                    <p v-for="item in RiskOprCodeList" @click="riskOprSelected(item.Code,item.Name)">{{item.Name}}</p>
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
            </form>
          </div>
          <div class="closed closed-add" @click="CloseAddInsUser()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAndNewAddInsUser()">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAddInsUser()">保112112存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="CloseAddInsUser()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask ModifyInsUser-mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑子账户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <p>
                <span class="col-md-6">
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      子账户代码
                    </div>
                    <span class="selected">
                      <input class="input-text" type="text" readonly="true" v-model="UpdateInsUser.UserCode" placeholder="">
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      总账户
                    </div>
                    <span class="selected">
                      <input class="input-text" type="text" readonly="true" v-model="UpdateInsUser.TopAccountNo" placeholder="">
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      子账户手续费模板
                    </div>
                    <span class="selected">
                      <input class="input-text UserFeeTpCode" type="text" placeholder="请选择" @click="userFeeTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="userFeeTpSelect()"></div>
                      <div class="drop-list UserFeeTpCodeList hide">
                        <p v-for="item in UserFeeTpCodeList" @click="userFeeTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span>
                  </div>
                </span>
                <span class="col-md-6">
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      子账户名称
                    </div>
                    <span class="selected">
                      <input class="input-text" type="text" v-model="UpdateInsUser.UserName" placeholder="">
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      保证金模板
                    </div>
                    <span class="selected">
                      <input class="input-text MarginTpCode" type="text" placeholder="请选择" @click="marginTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="marginTpSelect()"></div>
                      <div class="drop-list MarginTpCodeList hide">
                        <p v-for="item in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      风控模板
                    </div>
                    <span class="selected">
                      <input class="input-text RiskTpCode" type="text" placeholder="请选择" @click="riskTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="riskTpSelect()"></div>
                      <div class="drop-list RiskTpCodeList hide">
                        <p v-for="item in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span>
                  </div>
                </span>
              </P>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseViewModifyInsUserDiv()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveModifyInsUser()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseViewModifyInsUserDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask MoneyTransfer-mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">子账户出入金</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <p>
                <span class="col-md-6">
                  <div class="tb-header">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style="width:40%">子账户代码</th>
                          <th style="width:60%">子账户名称</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="tb-body">
                    <table class="table table-hover">
                      <tbody>
                        <tr>
                          <td style="width:40%">{{UserCode}}</td>
                          <td style="width:60%">{{UserName}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </span>
                <span class="col-md-6">
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      出入金类型
                    </div>
                    <span class="selected">
                      <input class="input-text MoneyTransfer TransferType" type="text" placeholder="请选择" @click="moneyTransferSelect()">
                      <div class="fa fa-sort-desc input-list" @click="moneyTransferSelect()"></div>
                      <div class="drop-list MoneyTransferList hide">
                        <p v-for="(item,index) in MoneyTransferTypeList" @click="moneyTransferSelected(item.Code,item.Name)" :key="index">{{item.Name}}</p>
                      </div>
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      币种类型
                    </div>
                    <span class="selected">
                      <input class="input-text MoneyTransfer" type="text" disabled placeholder="美元">
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      发生金额
                    </div>
                    <span class="selected">
                      <input class="input-text MoneyTransfer" type="text" v-model="MoneyTransfer.Money" placeholder="" maxlength="10">
                    </span>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4"></span>
                      备注
                    </div>
                    <span class="selected">
                      <input class="input-text MoneyTransfer" type="text" v-model="MoneyTransfer.Remark" placeholder="">
                    </span>
                  </div>
                </span>
              </P>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseViewMoneyTransferDiv()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveMoneyTransfer()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseViewMoneyTransferDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="ConfigRiskOpr-mask" class="mask mask_subaccountinfo">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">指定风控员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <!-- <div v-for="(item,index) in AllRiskOprList">
                <div class="error3">
                  <button type="button" class="btn btn-info" @click="ConfigRiskOpr(item.Code)">{{item.Code}}({{item.Code}})</button>
                </div>
              </div> -->
              <div class="bodykan2 first-div">
                <div class="error3">
                  <span class="error4"></span>
                  指定风控员
                </div>
                <div class="kac1 notcheckedItem">
                  <div class="pin" @click="checkAll()">
                    <span class="pin1 hide"></span>
                    <span class="pin3"></span>
                    <span class="pin2"> 全部</span>
                  </div>
                </div>
                <ul class="kac ul_lis">
                  <li class="kac2 notcheckedItem" :class="checkedd+index" v-for="(item,index) in AllRiskOprList" :key="index">
                    <div class="pin" @click="checkeddd(index,item.Code)">
                      <span class="pin1"></span>
                      <span class="pin3"></span>
                      <span class="pin2">{{item.Name}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseConfigRiskOprDiv()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveConfigRiskOpr()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseConfigRiskOprDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="showPass" class="mask mask_subaccountinfo">
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
import common from "../../../kits/common.js";

export default {
  name: "parentaccounts",
  data() {
    return {
      UserCode: "",
      UserName: "",
      TopAccountCode: "",
      AgentCode: "",
      AgentName: "",
      Password: "",
      CreateDate: "",
      Source: "",
      OpenPositionPower: false,
      FollowPower: false,
      InsCode: "",
      InsName: "",
      TopAccountName: "",
      TradeCoreCode: "",
      TradeCoreName: "",
      FeeTemplateID: "",
      FeeTemplateName: "",
      MarginTemplateID: "",
      MarginTemplateName: "",
      RiskTemplateID: "",
      RiskTemplateName: "",
      Phone: "",
      MoneyTransfer: [],
      RiskOprCount: 0,
      RiskOpr: [],
      BankCardCount: 0,
      BankCards: [],
      ConfigRiskOprList: [], //指定风控员所需
      AllRiskOprList: [],
      FromFlag: "",
      UpdateInsUser: {
        TopAccountNo: "",
        UserCode: "",
        UserName: "",
        FeeTemplateID: "",
        MarginTemplateID: "",
        RiskControlTemplateID: ""
      },
      AddInsUser: {
        UserCode: "",
        UserName: "",
        FeeTemplateID: "",
        MarginTemplateID: "",
        RiskControlTemplateID: "",
        TopAccountNo: "",
        RiskOprCode: [],
        Password: ""
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
      RiskOprCodeList: [],
      MoneyTransferTypeList: [], //出入金类型
      FlowOrderSelectDisplay: false,
      NewTopAccountCode: "",

      byNumber: "",
      comName: "",
      id: "",
      CommodityID: "",
      list: [],
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow5: true,
      isShow6: false,
      checkedd: "kacc",
      MarkCode: "",

      buttonName: "获取验证码",
      isDisabled: false,
      time: 120
    };
  },
  created() {
    this.$store.state.loaction = "/accounts/subaccounts";
    if (!this.$route.params.loadingByGlobalQuery) {
      this.InitData();
    }
    this.GetCustomRiskOprList();
  },
  mounted() {
    this.$emit("loaded", this.$route);
    if (sessionStorage.getItem("isMain") == "true") {
      $(".addLiminshow").css("visibility", "visible");
    } else {
      $(".addLiminshow").css("visibility", "hidden");
    }
  },
  props: [""],
  methods: {
    loaded(params) {
      this.getDetaillist(params.Code);
    },
    GetCustomRiskOprList() {
      var url = "/insbase/GetRiskOprCodeList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.AllRiskOprList = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    InitData() {
      if (!this.$store.state.DetailInfo.UserCode) {
        this.Back();
        return;
      }
      this.UserCode = this.$store.state.DetailInfo.UserCode;
      this.UserName = this.$store.state.DetailInfo.UserName;
      this.TopAccountCode = this.$store.state.DetailInfo.TopAccountCode;
      this.AgentCode = this.$store.state.DetailInfo.AgentCode;
      this.AgentName = this.$store.state.DetailInfo.AgentName;
      this.Password = this.$store.state.DetailInfo.Password;
      this.CreateDate = this.$store.state.DetailInfo.CreateDate;
      this.Source = this.$store.state.DetailInfo.Source;
      this.OpenPositionPower = this.$store.state.DetailInfo.OpenPositionPower;
      this.FollowPower = this.$store.state.DetailInfo.FollowPower;
      this.InsCode = this.$store.state.DetailInfo.InsCode;
      this.InsName = this.$store.state.DetailInfo.InsName;
      this.TopAccountName = this.$store.state.DetailInfo.TopAccountName;
      this.TradeCoreCode = this.$store.state.DetailInfo.TradeCoreCode;
      this.TradeCoreName = this.$store.state.DetailInfo.TradeCoreName;
      this.FeeTemplateID = this.$store.state.DetailInfo.FeeTemplateID;
      this.FeeTemplateName = this.$store.state.DetailInfo.FeeTemplateName;
      this.MarginTemplateID = this.$store.state.DetailInfo.MarginTemplateID;
      this.MarginTemplateName = this.$store.state.DetailInfo.MarginTemplateName;
      this.RiskTemplateID = this.$store.state.DetailInfo.RiskTemplateID;
      this.RiskTemplateName = this.$store.state.DetailInfo.RiskTemplateName;
      this.Phone = this.$store.state.DetailInfo.Phone;
      this.MoneyTransfer = this.$store.state.DetailInfo.MoneyTransfer;
      this.RiskOprCount = this.$store.state.DetailInfo.RiskOprCount;
      this.RiskOpr = this.$store.state.DetailInfo.RiskOpr;
      this.BankCardCount = this.$store.state.DetailInfo.BankCardCount;
      this.BankCards = this.$store.state.DetailInfo.BankCards;
    },

    Back() {
      this.$router.push("/accounts/subaccounts");
    },

    //弹出验证码框
    ShowSendPassword() {
      $("#showPass").fadeIn("slow");
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
          this.$message.success({
            message: "短信验证码已发送，请注意查收",
            center: true,
            duration: 800
          });
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

      var url = "userprivacyauth/VerifyAuthInfo";
      var postData = {
        Phone: this.$store.state.userInfo.AccountPhone,
        Code: this.MarkCode,
        UserCode: this.UserCode,
        Type: 1
      };

      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.Phone = response.Data.Phone;
          this.Password = response.Data.Password;
          this.MarkCode = "";
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

    //获取子账户详情
    getDetaillist(id) {
      var url = "/insuser/GetInsUserDetail";
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

    //跳转风控员详情
    viewRiskInfo(code) {
      var url = "/insriskopr/GetInsRiskOprDetail";
      this.$loginapi.post(url, code, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/monitors/monitorsinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取子账户数据来源
    getAccountSource(code) {
      if (code == 1) {
        return "系统管理员";
      } else if (code == 2) {
        return "机构管理员";
      } else if (code == 3) {
        return "机构经纪人";
      } else if (code == 4) {
        return "投资用户";
      } else if (code == 5) {
        return "机构财务";
      }
    },
    //重置手机号
    ShowResetPhoneDiv() {
      if (this.Phone == "******") {
        this.$alert("存在隐私信息，不允许重置");
        return;
      }
      $("#ResetPhone-mask").fadeIn("slow");
    },
    SaveResetPhone() {
      var url = "/insuser/ResetPhone";
      var newPhone = $(".newPhone").val();

      if (newPhone.trim() == "") {
        //this.$message.error("手机号码不能为空！");
        this.$alert("手机号码不能为空！", {});
        return;
      }
      if (
        !newPhone
          .trim()
          .match(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/)
      ) {
        //this.$message.error("手机号码格式不正确！");
        this.$alert("手机号码格式不正确！", {});
        return;
      }

      var postData = {
        UserCode: this.UserCode,
        Value: newPhone
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.Phone = postData.Value;
          this.$message.success({
            message: "重置手机号成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      this.CloseResetPhoneDiv();
    },
    CloseResetPhoneDiv() {
      $(".newPhone").val("");
      $("#ResetPhone-mask").fadeOut("fast");
    },

    //重置密码
    ShowResetPwdDiv() {
      $("#ResetPwd-mask").fadeIn("slow");
    },
    SaveResetPwd() {
      var url = "/insuser/ResetPassword";
      var postData = {
        UserCode: this.UserCode
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.Password = postData.Value;
          this.$message.success({
            message: "重置密码成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      this.CloseResetPwdDiv();
    },
    CloseResetPwdDiv() {
      $("#ResetPwd-mask").fadeOut("fast");
    },

    //删除
    ViewDelDiv() {
      $(".del-mask").fadeIn("fast");
    },
    DeleteInsUsers() {
      var url = "/insuser/DeleteInsUsers";
      var ids = [this.UserCode];
      this.$loginapi.post(url, ids, response => {
        if (response.Ret == 0) {
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 800
          });
          this.$router.push("/accounts/subaccountsinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      this.CloseViewDelDiv();
    },
    CloseViewDelDiv() {
      $(".del-mask").fadeOut("fast");
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

    //风控员全选
    checkAll() {
      let index = 0;
      //如果全不选
      if (this.AllRiskOprList.length == this.ConfigRiskOprList.length) {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        this.AllRiskOprList.forEach(item => {
          this.ConfigRiskOprList.remove(item.Code);
        });
        this.AllRiskOprList.forEach(item => {
          $(".kacc" + index + "")
            .addClass("notcheckedItem")
            .removeClass("checkedItem");
          index++;
        });
      } else {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
        this.AllRiskOprList.forEach(item => {
          this.ConfigRiskOprList.remove(item.Code);
        });
        this.AllRiskOprList.forEach(item => {
          this.ConfigRiskOprList.push(item.Code);
          $(".kacc" + index + "")
            .addClass("checkedItem")
            .removeClass("notcheckedItem");
          index++;
        });
      }
    },

    //风控员部分选择
    checkeddd(index, code) {
      if (this.ConfigRiskOprList.indexOf(code) <= -1) {
        this.ConfigRiskOprList.push(code);
        $(".kacc" + index + "")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        this.ConfigRiskOprList.remove(code);
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
      if (this.ConfigRiskOprList.length == this.AllRiskOprList.length) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
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
    //出入金类型选择列表
    moneyTransferSelect() {
      this.MoneyTransferTypeSelectDisplay = !this
        .MoneyTransferTypeSelectDisplay;
      if (this.MoneyTransferTypeSelectDisplay) {
        $(".MoneyTransferList").attr("class", "drop-list MoneyTransferList");
      } else {
        $(".MoneyTransferList").attr(
          "class",
          "drop-list MoneyTransferList hide"
        );
      }
    },
    moneyTransferSelected(code, name) {
      $(".TransferType").val(name);
      this.MoneyTransferTypeSelectDisplay = false;
      $(".MoneyTransferList").attr("class", "drop-list MoneyTransferList hide");
      this.MoneyTransfer.MoneyTransferType = code;
    },

    //修改子帐户
    ViewModifyInsUserDiv() {
      this.FromFlag = "ModifyInsUser";
      this.GetMaginTpCodeList();
      this.GetRiskTpCodeList();
      this.GetUserFeeTpCodeList();
      this.userFeeTpSelected(
        this.$store.state.DetailInfo.FeeTemplateID,
        this.$store.state.DetailInfo.FeeTemplateName
      );
      this.marginTpSelected(
        this.$store.state.DetailInfo.MarginTemplateID,
        this.$store.state.DetailInfo.MarginTemplateName
      );
      this.riskTpSelected(
        this.$store.state.DetailInfo.RiskTemplateID,
        this.$store.state.DetailInfo.RiskTemplateName
      );
      this.UpdateInsUser.UserCode = this.$store.state.DetailInfo.UserCode;
      this.UpdateInsUser.UserName = this.$store.state.DetailInfo.UserName;
      this.UpdateInsUser.TopAccountNo = this.$store.state.DetailInfo.TopAccountCode;
      $(".ModifyInsUser-mask").fadeIn("fast");
    },
    SaveModifyInsUser() {
      var url = "/insuser/ModifyInsUsers";
      var postData = {
        UserCode: this.UpdateInsUser.UserCode,
        UserName: this.UpdateInsUser.UserName,
        FeeTemplateID: this.UpdateInsUser.FeeTemplateID,
        MarginTemplateID: this.UpdateInsUser.MarginTemplateID,
        RiskControlTemplateID: this.UpdateInsUser.RiskControlTemplateID
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getDetaillist(this.UserCode);
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
      this.CloseViewModifyInsUserDiv();
    },
    clearModifyInsUser() {
      this.UpdateInsUser.UserCode = "";
      this.UpdateInsUser.UserName = "";
      this.UpdateInsUser.FeeTemplateID = "";
      this.UpdateInsUser.MarginTemplateID = "";
      this.UpdateInsUser.RiskControlTemplateID = "";
      this.UpdateInsUser.TopAccountNo = "";
      this.resetSelectDisplay();
      $(".ModifyInsUser").val("");
    },
    CloseViewModifyInsUserDiv() {
      this.clearModifyInsUser();
      $(".ModifyInsUser-mask").fadeOut("fast");
    },
    //修改子账户开仓权限
    SetInsUserOpenRightById() {
      var url = "/insuser/ModifyInsUsersOpenPositionPower";
      var postData = {
        UserCodeList: [this.UserCode],
        IsAllow: !this.OpenPositionPower
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.OpenPositionPower = !this.OpenPositionPower;
          this.$message.success({
            message:
              this.DisplayAllowOrNo(!this.OpenPositionPower) + "开仓成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    //显示禁止/允许
    DisplayAllowOrNo(boolFlag) {
      if (boolFlag) {
        return "禁止";
      } else {
        return "允许";
      }
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
    },
    //添加子帐户
    addInsUser() {
      var url = "/insuser/AddInsUsers";
      var postData = {
        UserCode: this.AddInsUser.UserCode,
        UserName: this.AddInsUser.UserName,
        FeeTemplateID: this.AddInsUser.FeeTemplateID,
        MarginTemplateID: this.AddInsUser.MarginTemplateID,
        RiskControlTemplateID: this.AddInsUser.RiskControlTemplateID,
        TopAccountNo: this.AddInsUser.TopAccountNo,
        RiskOprCode: this.AddInsUser.RiskOprCode,
        Password: this.AddInsUser.Password
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.$router.push("/accounts/subaccountsinfo");
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
    //帐户转移
    ShowChangeTopAccount() {
      this.FromFlag = "ChangeTopAccount";
      this.GetTopAccountCodeList();
      $(".ChangeTopAccount").val("");
      $("#ChangeTopAccount-mask").fadeIn("fast");
    },
    SaveChangeTopAccount() {
      var url = "/insuser/ChangeTopAccount";
      var postData = {
        UserCode: this.UserCode,
        TopAccountCode: this.NewTopAccountCode
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getDetaillist(this.UserCode);
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
      this.CloseChangeTopAccountDiv();
    },
    CloseChangeTopAccountDiv() {
      this.TopAccountSelectDisplay = false;
      $(".TopAccountCodeList").attr(
        "class",
        "drop-list TopAccountCodeList hide"
      );
      $(".ChangeTopAccount").val("");
      $("#ChangeTopAccount-mask").fadeOut("fast");
    },

    //弹出出入金面板
    ViewMoneyTransferDiv() {
      this.MoneyTransferTypeList.push({ Code: "1", Name: "入金" });
      this.MoneyTransferTypeList.push({ Code: "2", Name: "出金" });
      $(".MoneyTransfer-mask").fadeIn("fast");
      event.stopPropagation();
    },
    clearMoneyTransfer() {
      this.MoneyTransfer.MoneyTransferType = "";
      this.MoneyTransfer.Money = "";
      this.MoneyTransfer.Remark = "";
      this.MoneyTransferTypeList = [];
      this.MoneyTransferTypeSelectDisplay = false;
      $(".MoneyTransferList").attr("class", "drop-list MoneyTransferList hide");
      $(".MoneyTransfer").val("");
    },
    SaveMoneyTransfer() {
      if (
        this.MoneyTransfer.MoneyTransferType == "" ||
        this.MoneyTransfer.MoneyTransferType == null
      ) {
        this.$alert("请选择出入金类型！", {});
        return;
      }

      if (
        this.MoneyTransfer.Money.toString().trim() == "" ||
        isNaN(this.MoneyTransfer.Money)
      ) {
        this.$alert("输入金额非数字！", {});
        return;
      }

      var url = "";
      if (this.MoneyTransfer.MoneyTransferType == "1") {
        url = "/agent/ForInsUserBatchPayByMgrBack";
      }
      if (this.MoneyTransfer.MoneyTransferType == "2") {
        url = "/agent/ForInsUserBatchWithDraw";
      }
      var postData = {
        CodeList: [this.UserCode],
        Money: this.MoneyTransfer.Money,
        Remark: this.MoneyTransfer.Remark
      };

      // console.log(this.MoneyTransfer.MoneyTransferType);
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getDetaillist(this.UserCode);
          this.MoneyTransfer.MoneyTransferType == "";
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
      this.CloseViewMoneyTransferDiv();
    },
    CloseViewMoneyTransferDiv() {
      this.clearMoneyTransfer();
      $(".MoneyTransfer-mask").fadeOut("fast");
    },

    //指定风控员
    ShowConfigRiskOprDiv() {
      this.InitConfigRiskOprList();
      $("#ConfigRiskOpr-mask").fadeIn("fast");
      event.stopPropagation();
    },

    //经纪人风控全不选
    clearDLFK() {
      let index = 0;
      this.AllRiskOprList.forEach(item => {
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        index++;
      });

      $(".kac1")
        .addClass("notcheckedItem")
        .removeClass("checkedItem");
    },

    InitConfigRiskOprList() {
      this.clearDLFK();
      this.ConfigRiskOprList = [];
      this.RiskOpr.forEach(element => {
        var index = 0;
        for (var i = 0; i < this.AllRiskOprList.length; i++) {
          var item = this.AllRiskOprList[i];
          if (item.Code == element.RiskOprCode) {
            this.checkeddd(index, element.RiskOprCode);
            break;
          }
          index++;
        }

        // if (

        //     //  if()
        //     //  {
        //     //    this.checkeddd(index,element.RiskOprCode)
        //     //  }

        //   this.ConfigRiskOprList.findIndex(e => {
        //     return e == element.RiskOprCode;
        //   }) >= 0
        // ) {
        //   this.ConfigRiskOprList.push(element.RiskOprCode);
        // }
      });
    },
    ConfigRiskOpr(riskCode) {
      if (
        this.ConfigRiskOprList.findIndex(e => {
          return e == riskCode;
        }) < 0
      ) {
        this.ConfigRiskOprList.push(riskCode);
      } else {
        this.ConfigRiskOprList.remove(riskCode);
      }
    },
    SaveConfigRiskOpr() {
      var url = "/insuser/SetRiskOperator";
      var postData = {
        UserCode: this.UserCode,
        RiskOprCodes: this.ConfigRiskOprList
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getDetaillist(this.UserCode);
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
      this.CloseConfigRiskOprDiv();
    },
    CloseConfigRiskOprDiv() {
      $("#ConfigRiskOpr-mask").fadeOut("fast");
    },

    closeMask() {
      $(".mask").fadeOut("slow");
    },

    fold1() {
      this.isShow = !this.isShow;
      event.stopPropagation();
    },
    fold2() {
      this.isShow1 = !this.isShow1;
      event.stopPropagation();
    },
    fold3() {
      this.isShow2 = !this.isShow2;
    },
    fold4() {
      this.isShow3 = !this.isShow3;
    },

    tabsC(index) {
      $(".account-tab-title > li:eq(" + index + ")")
        .addClass("layui-this")
        .siblings()
        .removeClass("layui-this");
      if (index == 0) {
        this.isShow5 = true;
        this.isShow6 = false;
      } else {
        this.isShow5 = false;
        this.isShow6 = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
