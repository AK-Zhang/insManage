<template>
  <div>
    <div class="template template_sub">
      <article class="main">
        <div class="container-r">
          <!--带表格的面板-->
          <div class="panel panel-default panel-1 panel-11">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye maf1"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">账户</a>
                  </li>
                  <li class="active">子账户</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-7 fz" style="font-size: 12px;">{{PageCount}}个子账户，可进行新增、批量新增、批量修改模板、编辑、删除、设置权限、出入金、重置账户、重置密码、销毁 操作</span>
                <span class="col-md-5 text-right  margin-Top ">
                  <button class="btn btn-default btn-sm btc btc-add" type="submit" @click="ViewAddInsUserDiv()">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <!-- 暂停该功能 -->
                  <!-- <button class="btn btn-default btn-sm btc btc-del" type="submit" @click="ViewDelDiv()">
                    删除
                  </button> -->
                  <button class="btn btn-default btn-sm btc btc-del" type="submit" @click="ViewBatchAddInsUserDiv()">
                    批量新增
                  </button>
                  <button class="btn btn-default btn-sm btc btc-del" type="submit" @click="ViewBatchModifyTpDiv()">
                    批量修改模板
                  </button>
                  <button class="btn btn-default btn-sm btc btc-del addLiminshow" type="submit" @click="ViewMoneyTransferDiv()">
                    出入金
                  </button>
                  <!-- <button class="btn btn-default btc btc-del" type="submit" @click="ViewClearInsUserDiv()">
                    帐户清理
                  </button> -->
                  <button class="btn btn-default btn-sm btc btc-del" type="submit" @click="ViewFlowOrderDiv()">
                    跟单权限
                  </button>
                </span>
              </p>
            </div>
            <div class="table-1">
              <table class="table table-1-1" v-loading="loading">
                <thead>
                  <tr>
                    <th style="width:4%"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th>
                    <th style="width:5%">序号</th>
                    <th style="width:10%">子账户代码</th>
                    <th style="width:11%">子账户名称</th>
                    <th style="width:12%">总账户代码</th>
                    <th style="width:10%">经纪人名称</th>
                    <!-- <th style="width:8%">子账户密码</th> -->
                    <th style="width:14%">开户日期</th>
                    <th style="width:10%">来源</th>
                    <th style="width:5%">开仓权限</th>
                    <th style="width:5%">跟单权限</th>
                    <th style="width:5%">是否在线</th>
                    <th style="width:6%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>

          </div>
          <div class="panel panel-default table-2">
            <table class="table table-hover table-2-1">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="width:4%" class="sub-checked"><input type="checkbox" :class="ClassName+index" @click="selectedSub(item.UserCode,item.UserName,index)"></td>
                  <td style="width:5%">&nbsp;{{ ((pager.PageNo -1) * pager.PageSize) + index+1}}</td>
                  <td style="width:10%">
                    <!-- <router-link to="/accounts/subaccountsinfo" class="super-link">{{item.UserCode}}</router-link> -->
                    <a @click="getDetaillist(item.UserCode)" class="super-link">{{item.UserCode}}</a>
                  </td>
                  <td style="width:11%">{{item.UserName}}</td>
                  <td style="width:12%">{{item.TopAccountCode}}</td>
                  <td style="width:10%">{{item.AgentName == null ? "--":(item.AgentName == "" ? "--" : item.AgentName)}}</td>
                  <!-- <td style="width:8%">{{item.Password}}</td> -->
                  <td style="width:14%">{{item.CreateDate | datefmt("YYYY-MM-DD HH:mm:ss")}}</td>
                  <td style="width:10%">{{getAccountSource(item.Source)}}</td>
                  <td style="width:5%">{{DisplayAllowOrNo(item.OpenPositionPower)}}</td>
                  <td style="width:5%">{{DisplayAllowOrNo(item.FollowPower)}}</td>
                  <td style="width:5%;">
                    <!-- <div class="OnlineState" :class="{'noOnLineState':item.OnlineState}"></div> -->
                    <i :class="{'el-icon-error':!item.OnlineState,'el-icon-success':item.OnlineState,'OnLineState':item.OnlineState,'noOnLineState':!item.OnlineState}"></i>
                  </td>
                  <td style="width:6%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">

                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" @click.native="ViewModifyInsUserDiv(item)">
                              编辑
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <!-- 暂停该功能 -->
                            <!-- <el-dropdown-item class="clearfix" @click.native="DelInsUserById(item.UserCode)">
                              删除
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item> -->
                            <el-dropdown-item class="clearfix" @click.native="SetInsUserOpenRightById(item.UserCode,!item.OpenPositionPower)">
                              {{DisplayAllowOrNo(!item.OpenPositionPower)}}开仓
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="ShowSendPassword(item)" v-show="IsShowPassButton(item.Password)">
                              查看敏感信息
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
            <nav aria-label="Page navigation" class="text-center  page-separation">
              <pageination :pagerPro="pager" @ee="pageFn"></pageination>
            </nav>
          </div>
        </div>
      </article>
    </div>

    <div id="AddInsUser" class="mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
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
                <el-select v-model="selectZZH" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in TopAccountCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <el-select v-model="selectBZJMB" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in MarginTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <el-select v-model="selectZZHSSFMB" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in UserFeeTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <el-select v-model="selectFKMB" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in RiskTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"> </span>
                  风控员
                </div>
                <el-select v-model="selectFKY" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in RiskOprCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户密码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" oncontextmenu="return false;" v-model="AddInsUser.Password" type="password" placeholder="
新密码格式应包含大小写字母及数字，长度不得小于8位">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text AddInsUser" type="password" oncontextmenu="return false;" v-model="SurePassword" placeholder="
新密码格式应包含大小写字母及数字，长度不得小于8位">
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

    <div id="BatchAddInsUser" class="mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">批量新增子账户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <!-- <span class="selected">
                  <input class="input-text BatchAddInsUser TopAccountCode" type="text" placeholder="请选择" @click="topAccountselect()">
                  <div class="fa fa-sort-desc input-list" @click="topAccountselect()"></div>
                  <div class="drop-list TopAccountCodeList hide">
                    <p v-for="item in TopAccountCodeList" @click="topAccountselected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectZZH" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in TopAccountCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户代码前缀
                </div>
                <span class="selected">
                  <input class="input-text BatchAddInsUser" type="text" v-model="BatchAddInsUser.UserCodePre" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户名称前缀
                </div>
                <span class="selected">
                  <input class="input-text BatchAddInsUser" type="text" v-model="BatchAddInsUser.UserNamePre" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  后缀保留位数
                </div>
                <span class="selected">
                  <input class="input-text BatchAddInsUser" type="text" v-model="BatchAddInsUser.SufDigits" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  生成数量
                </div>
                <span class="selected">
                  <input class="input-text BatchAddInsUser" type="text" v-model="BatchAddInsUser.GenerateNumber" placeholder="">
                </span>
              </div>

              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <!-- <span class="selected">
                  <input class="input-text BatchAddInsUser MarginTpCode" type="text" placeholder="请选择" @click="marginTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="marginTpSelect()"></div>
                  <div class="drop-list MarginTpCodeList hide">
                    <p v-for="item in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectBZJMB" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in MarginTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <!-- <span class="selected">
                  <input class="input-text BatchAddInsUser UserFeeTpCode" type="text" placeholder="请选择" @click="userFeeTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="userFeeTpSelect()"></div>
                  <div class="drop-list UserFeeTpCodeList hide">
                    <p v-for="item in UserFeeTpCodeList" @click="userFeeTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectZZHSSFMB" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in UserFeeTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <!-- <span class="selected">
                  <input class="input-text BatchAddInsUser RiskTpCode" type="text" placeholder="请选择" @click="riskTpSelect()">
                  <div class="fa fa-sort-desc input-list" @click="riskTpSelect()"></div>
                  <div class="drop-list RiskTpCodeList hide">
                    <p v-for="item in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectFKMB" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in RiskTpCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"> </span>
                  风控员
                </div>
                <!-- <span class="selected">
                  <input class="input-text BatchAddInsUser RiskOprCode" type="text" placeholder="请选择" @click="riskOprSelect()">
                  <div class="fa fa-sort-desc input-list" @click="riskOprSelect()"></div>
                  <div class="drop-list RiskOprCodeList hide">
                    <p v-for="item in RiskOprCodeList" @click="riskOprSelected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectFKY" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in RiskOprCodeList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="CloseBatchAddInsUser()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveBatchAddInsUser()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="CloseBatchAddInsUser()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="del-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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

    <div class="mask BatchModifyTp-mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">批量修改子账户模板</div>
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
                        <tr v-for="(item,index) in SimpInsUserList" :key="index">
                          <td style="width:40%">{{item.UserCode}}</td>
                          <td style="width:60%">{{item.UserName}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </span>
                <span class="col-md-6">
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      保证金模板
                    </div>
                    <!-- <span class="selected">
                      <input class="input-text BatchModifyTp MarginTpCode" type="text" placeholder="请选择" @click="marginTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="marginTpSelect()"></div>
                      <div class="drop-list MarginTpCodeList hide">
                        <p v-for="item in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectBZJMB" style="width: 98%" value-key="Name" placeholder="请选择">
                      <el-option v-for="(item,index) in MarginTpCodeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      风控模板
                    </div>
                    <!-- <span class="selected">
                      <input class="input-text BatchModifyTp RiskTpCode" type="text" placeholder="请选择" @click="riskTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="riskTpSelect()"></div>
                      <div class="drop-list RiskTpCodeList hide">
                        <p v-for="item in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectFKMB" style="width: 98%" value-key="Name" placeholder="请选择">
                      <el-option v-for="(item,index) in RiskTpCodeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </span>
              </P>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseViewBatchModifyTpDiv()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveBatchModifyTp()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseViewBatchModifyTpDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask MoneyTransfer-mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
                        <tr v-for="(item,index) in SimpInsUserList" :key="index">
                          <td style="width:40%">{{item.UserCode}}</td>
                          <td style="width:60%">{{item.UserName}}</td>
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
                    <!-- <span class="selected">
                      <input class="input-text MoneyTransfer TransferType" type="text" placeholder="请选择" @click="moneyTransferSelect()">
                      <div class="fa fa-sort-desc input-list" @click="moneyTransferSelect()"></div>
                      <div class="drop-list MoneyTransferList hide">
                        <p v-for="item in MoneyTransferTypeList" @click="moneyTransferSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectCRJ" value-key="Name" placeholder="请选择" style="width: 98%;">
                      <el-option v-for="(item,index) in MoneyTransferTypeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
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

    <div class="mask SetFolowOrder-mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:30%">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置子账户跟单权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <p>
                <!-- <span class="selected">
                  <input class="input-text SetFolowOrder FolowOrderName" type="text" placeholder="请选择" @click="flowOrderListSelect()">
                  <div class="fa fa-sort-desc input-list" @click="flowOrderListSelect()"></div>
                  <div class="drop-list FlowOrderList hide">
                    <p v-for="item in FlowOrderList" @click="flowOrderListSelected(item.Code,item.Name)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectGDQX" value-key="Name" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in FlowOrderList" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </P>
            </form>
          </div>
          <div class="closed closed-del" @click="CloseViewFlowOrderDiv()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveFlowOrder()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="CloseViewFlowOrderDiv()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask ModifyInsUser-mask mask_sub" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
                    <!-- <span class="selected">
                      <input class="input-text UserFeeTpCode" type="text" placeholder="请选择" @click="userFeeTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="userFeeTpSelect()"></div>
                      <div class="drop-list UserFeeTpCodeList hide">
                        <p v-for="item in UserFeeTpCodeList" @click="userFeeTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectZZHSSFMB" style="width: 98%" value-key="Name" placeholder="请选择">
                      <el-option v-for="(item,index) in UserFeeTpCodeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
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
                    <!-- <span class="selected">
                      <input class="input-text MarginTpCode" type="text" placeholder="请选择" @click="marginTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="marginTpSelect()"></div>
                      <div class="drop-list MarginTpCodeList hide">
                        <p v-for="item in MarginTpCodeList" @click="marginTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectBZJMB" style="width: 98%" value-key="Name" placeholder="请选择">
                      <el-option v-for="(item,index) in MarginTpCodeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <div class="error3">
                      <span class="error4">*</span>
                      风控模板
                    </div>
                    <!-- <span class="selected">
                      <input class="input-text RiskTpCode" type="text" placeholder="请选择" @click="riskTpSelect()">
                      <div class="fa fa-sort-desc input-list" @click="riskTpSelect()"></div>
                      <div class="drop-list RiskTpCodeList hide">
                        <p v-for="item in RiskTpCodeList" @click="riskTpSelected(item.Code,item.Name)">{{item.Name}}</p>
                      </div>
                    </span> -->
                    <el-select v-model="selectFKMB" style="width: 98%" value-key="Name" placeholder="请选择">
                      <el-option v-for="(item,index) in RiskTpCodeList" :key="index" :label="item.Name" :value="item">
                      </el-option>
                    </el-select>
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

    <div id="showPass" class="mask mask_sub">
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
import pageination from "../subcom/pageination.vue";

export default {
  name: "subaccounts",
  components: {
    pageination
  },
  data() {
    return {
      ishow: "",
      loading: "",
      loadingsave: "",
      FromFlag: "",
      SimpInsUserList: [], //批量修改使用
      InsUserCodes: [], //子帐户代码数组，用于删除时使用
      ClassName: "sub-checked",
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
        Password: "",
        Phone: ""
      },
      BatchAddInsUser: {
        TopAccountNo: "",
        UserCodePre: "",
        UserNamePre: "",
        SufDigits: "",
        GenerateNumber: "",
        FeeTemplateID: "",
        MarginTemplateID: "",
        RiskControlTemplateID: "",
        RiskOprCode: []
      },
      BatchModifyInsUserTp: {
        UserCodeList: [],
        MarginTemplateID: "",
        RiskControlTemplateID: ""
      },
      MoneyTransfer: {
        UserCodeList: [],
        MoneyTransferType: "",
        Money: "",
        Remark: ""
      },
      SetFolowOrderData: {
        UserCodeList: [],
        State: false
      },
      list: [],
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
      MoneyTransferTypeSelectDisplay: false,
      MoneyTransferTypeList: [], //出入金类型
      FlowOrderSelectDisplay: false,
      FlowOrderList: [], //跟单权限列表
      // Pager: {
      //   PageNo: 0,
      //   PageSize: 0,
      //   PageCount: 0,
      //   RecordCount: 0
      // },
      pager: {},
      PageCount: 0,

      selectZZH: null, //选中总帐户
      selectBZJMB: null, //选中保证金模板
      selectZZHSSFMB: null, //选中子账户手续费模板
      selectFKMB: null, //选中风控模板
      selectFKY: null, //选中风控员
      SurePassword: "", //确认密码
      selectCRJ: null, //选中出入金
      selectGDQX: null, //选中跟单权限
      MarkCode: "",
      ChooseUser: null,

      buttonName: "获取验证码",
      isDisabled: false,
      time: 120
    };
  },
  created() {
    this.$store.state.loaction = "/accounts/subaccounts";
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getlist();
  },
  mounted() {
    if (sessionStorage.getItem("isMain") == "true") {
      $(".addLiminshow").css("display", "inline-block");
    } else {
      $(".addLiminshow").css("display", "none");
    }
  },
  methods: {
    getlist(num) {
      if (num == undefined) {
        this.loading = true;
      }
      var url = "/insuser/QueryInsUsers";
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.list = response.Data;
            this.pager = response.Pager;
            if (response.Pager.PageNo == 1) {
              this.PageCount = response.Pager.RecordCount;
            } else {
              this.pager.RecordCount = this.PageCount;
            }
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getlist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
    },

    //弹出验证码框
    ShowSendPassword(item) {
      $("#showPass").fadeIn("slow");
      this.ChooseUser = item;
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
      this.loadingsave = true;
      var url = "userprivacyauth/VerifyAuthInfo";
      var postData = {
        Phone: this.$store.state.userInfo.AccountPhone,
        Code: this.MarkCode,
        UserCode: this.ChooseUser.UserCode,
        Type: 1
      };

      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.ChooseUser.Phone = response.Data.Phone;
          this.ChooseUser.Password = response.Data.Password;
          this.MarkCode = "";
          this.closeMask();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    //是否显示验证按钮
    IsShowPassButton(value) {
      if (value == "******") {
        return true;
      } else {
        return false;
      }
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

    //获取子账户详情
    getDetaillist(id) {
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
      if (this.FromFlag == "BatchAddInsUser") {
        this.BatchAddInsUser.TopAccountNo = code;
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
      if (this.FromFlag == "BatchAddInsUser") {
        this.BatchAddInsUser.MarginTemplateID = code;
      }
      if (this.FromFlag == "BatchModifyTp") {
        this.BatchModifyInsUserTp.MarginTemplateID = code;
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
      if (this.FromFlag == "BatchAddInsUser") {
        this.BatchAddInsUser.FeeTemplateID = code;
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
      if (this.FromFlag == "BatchAddInsUser") {
        this.BatchAddInsUser.RiskControlTemplateID = code;
      }
      if (this.FromFlag == "BatchModifyTp") {
        this.BatchModifyInsUserTp.RiskControlTemplateID = code;
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
      if (this.FromFlag == "BatchAddInsUser") {
        this.BatchAddInsUser.RiskOprCode = [code];
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
      this.clearAddInsUser();
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
        // UserCode: this.AddInsUser.UserCode,
        UserName: this.AddInsUser.UserName,
        FeeTemplateID: this.selectZZHSSFMB.Code,
        MarginTemplateID: this.selectBZJMB.Code,
        RiskControlTemplateID: this.selectFKMB.Code,
        TopAccountNo: this.selectZZH.Code,
        RiskOprCode: [this.selectFKY.Code],
        Password: this.AddInsUser.Password,
        Phone: this.AddInsUser.Phone
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.$message.success({
            message: "新增子账户成功",
            center: true,
            duration: 800
          });
          this.getlist();
          this.CloseAddInsUser();
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    clearAddInsUser() {
      this.selectZZH = null;
      this.selectBZJMB = null;
      this.selectZZHSSFMB = null;
      this.selectFKMB = null;
      this.selectFKY = null;

      this.AddInsUser.UserCode = "";
      this.AddInsUser.UserName = "";
      this.AddInsUser.FeeTemplateID = "";
      this.AddInsUser.MarginTemplateID = "";
      this.AddInsUser.RiskControlTemplateID = "";
      this.AddInsUser.TopAccountNo = "";
      this.AddInsUser.RiskOprCode = [];
      this.AddInsUser.Password = "";
      this.AddInsUser.AgentCode = "";
      this.SurePassword = "";
      this.resetSelectDisplay();
      $(".AddInsUser").val("");
    },
    SaveAndNewAddInsUser() {
      if (this.CheckAddInsUser()) {
        this.addInsUser();
      }
    },

    CheckAddInsUser() {
      // if (this.AddInsUser.UserCode.trim() == "") {
      //   // this.$message.error("子账户代码不能为空");
      //   this.$alert("子账户代码不能为空", {});
      //   return false;
      // }

      if (this.AddInsUser.UserName.trim() == "") {
        // this.$message.error("子账户名称不能为空");
        this.$alert("子账户名称不能为空", {});
        return false;
      }
      if (this.selectZZH == null) {
        // this.$message.error("请选择总帐户");
        this.$alert("请选择总帐户", {});
        return false;
      }
      if (this.selectBZJMB == null) {
        // this.$message.error("请选择保证金模板");
        this.$alert("请选择保证金模板", {});
        return false;
      }

      if (this.selectZZHSSFMB == null) {
        // this.$message.error("请选择子账户手续费模板");
        this.$alert("请选择子账户手续费模板", {});
        return false;
      }

      if (this.selectFKMB == null) {
        // this.$message.error("请选择风控模板");
        this.$alert("请选择风控模板", {});
        return false;
      }
      if (this.selectFKY == null) {
        // this.$message.error("请选择风控员");
        this.$alert("请选择风控员", {});
        return false;
      }

      if (this.AddInsUser.Password.trim() == "") {
        //this.$message.error("子账户密码不能为空");
        this.$alert("子账户密码不能为空", {});
        return false;
      }
      if (this.SurePassword.trim() == "") {
        //this.$message.error("子账户确认密码不能为空");
        this.$alert("子账户确认密码不能为空", {});
        return false;
      }
      if (this.AddInsUser.Password.trim() != this.SurePassword.trim()) {
        //this.$message.error("确认密码与原始密码不一致");
        this.$alert("确认密码与原始密码不一致", {});
        return false;
      }
      if (this.AddInsUser.Phone.trim() == "") {
        this.$alert("请输入手机号码", {});
        return false;
      }

      return true;
    },
    SaveAddInsUser() {
      if (this.CheckAddInsUser()) {
        if (this.AddInsUser.Phone.trim() == "") {
          // this.$message.error("子账户代码不能为空");
          this.$alert("手机号不能为空", {});
          return false;
        }
        this.addInsUser();
      }
    },
    CloseAddInsUser() {
      this.clearAddInsUser();
      $("#AddInsUser").fadeOut("fast");
    },
    //弹出批量新增子帐户
    ViewBatchAddInsUserDiv() {
      this.clearBatchAddInsUser();
      this.FromFlag = "BatchAddInsUser";
      this.GetTopAccountCodeList();
      this.GetMaginTpCodeList();
      this.GetUserFeeTpCodeList();
      this.GetRiskTpCodeList();
      this.GetRiskOprCodeList();
      $("#BatchAddInsUser").fadeIn("fast");
    },
    //批量添加子帐户
    batchAddInsUser() {
      this.loadingsave = true;
      var url = "/insuser/AddBatchInsUsers";
      var postData = {
        TopAccountNo: this.selectZZH.Code,
        UserCodePre: this.BatchAddInsUser.UserCodePre,
        UserNamePre: this.BatchAddInsUser.UserNamePre,
        SufDigits: this.BatchAddInsUser.SufDigits,
        GenerateNumber: this.BatchAddInsUser.GenerateNumber,
        FeeTemplateID: this.selectZZHSSFMB.Code,
        MarginTemplateID: this.selectBZJMB.Code,
        RiskControlTemplateID: this.selectFKMB.Code,
        RiskOprCode: [this.selectFKY.Code]
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.CloseBatchAddInsUser();
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    clearBatchAddInsUser() {
      this.selectZZH = null;
      this.selectBZJMB = null;
      this.selectZZHSSFMB = null;
      this.selectFKMB = null;
      this.selectFKY = null;
      this.BatchAddInsUser.TopAccountNo = "";
      this.BatchAddInsUser.UserCodePre = "";
      this.BatchAddInsUser.UserNamePre = "";
      this.BatchAddInsUser.SufDigits = "";
      this.BatchAddInsUser.GenerateNumber = "";
      this.BatchAddInsUser.FeeTemplateID = "";
      this.BatchAddInsUser.MarginTemplateID = "";
      this.BatchAddInsUser.RiskControlTemplateID = "";
      this.BatchAddInsUser.RiskOprCode = "";
      this.resetSelectDisplay();
      $(".BatchAddInsUser").val("");
    },
    CloseBatchAddInsUser() {
      this.clearBatchAddInsUser();
      $("#BatchAddInsUser").fadeOut("fast");
    },
    SaveBatchAddInsUser() {
      this.batchAddInsUser();
    },
    //弹出批量修改子帐户模板
    ViewBatchModifyTpDiv() {
      if (this.SimpInsUserList.length <= 0) {
        //this.$message.error("请勾选要修改的子帐户");
        this.$alert("请勾选要修改的子帐户", {});
        return;
      }
      this.BatchModifyInsUserTp.UserCodeList.splice(
        0,
        this.BatchModifyInsUserTp.UserCodeList.length
      );
      this.selectBZJMB = null;
      this.selectFKMB = null;
      this.FromFlag = "BatchModifyTp";
      this.GetMaginTpCodeList();
      this.GetRiskTpCodeList();
      this.BatchModifyInsUserTp.UserCodeList = this.InsUserCodes;
      $(".BatchModifyTp-mask").fadeIn("fast");
    },
    clearBatchModifyTp() {
      this.BatchModifyInsUserTp.UserCodeList = [];
      this.BatchModifyInsUserTp.MarginTemplateID = "";
      this.BatchModifyInsUserTp.RiskControlTemplateID = "";
      this.resetSelectDisplay();
      $(".BatchModifyTp").val("");
    },
    //批量修改子帐户模板
    SaveBatchModifyTp() {
      if (this.selectBZJMB == null) {
        //this.$message.error("请选择保证金模板");
        this.$alert("请选择保证金模板", {});
        return;
      }
      if (this.selectFKMB == null) {
        //this.$message.error("请选择风控模板");
        this.$alert("请选择风控模板", {});
        return;
      }

      var url = "/insuser/ModifyBatchInsUsers";
      var postData = {
        UserCodeList: this.BatchModifyInsUserTp.UserCodeList,
        MarginTemplateID: this.selectBZJMB.Code,
        RiskControlTemplateID: this.selectFKMB.Code
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getlist();
          this.CloseViewBatchModifyTpDiv();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    //关闭批量修改面板
    CloseViewBatchModifyTpDiv() {
      this.clearBatchModifyTp();
      $(".BatchModifyTp-mask").fadeOut("fast");
    },

    //弹出修改子帐户面板
    ViewModifyInsUserDiv(item) {
      this.FromFlag = "ModifyInsUser";
      this.GetMaginTpCodeList();
      this.GetRiskTpCodeList();
      this.GetUserFeeTpCodeList();
      // this.userFeeTpSelected(item.FeeTemplateID, item.FeeTemplateName);
      // this.marginTpSelected(item.MarginTemplateID, item.MarginTemplateName);
      // this.riskTpSelected(item.RiskTemplateID, item.RiskTemplateName);

      this.selectZZHSSFMB = {
        Code: item.FeeTemplateID,
        Name: item.FeeTemplateName
      };
      this.selectBZJMB = {
        Code: item.MarginTemplateID,
        Name: item.MarginTemplateName
      };
      this.selectFKMB = {
        Code: item.RiskTemplateID,
        Name: item.RiskTemplateName
      };

      this.UpdateInsUser.UserCode = item.UserCode;
      this.UpdateInsUser.UserName = item.UserName;
      this.UpdateInsUser.TopAccountNo = item.TopAccountCode;
      $(".ModifyInsUser-mask").fadeIn("fast");
    },
    //更新用户信息
    SaveModifyInsUser() {
      this.loadingsave = true;
      var url = "/insuser/ModifyInsUsers";
      var postData = {
        UserCode: this.UpdateInsUser.UserCode,
        UserName: this.UpdateInsUser.UserName,
        FeeTemplateID: this.selectZZHSSFMB.Code,
        MarginTemplateID: this.selectBZJMB.Code,
        RiskControlTemplateID: this.selectFKMB.Code
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.CloseViewModifyInsUserDiv();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
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
    //关闭修改面板
    CloseViewModifyInsUserDiv() {
      this.clearModifyInsUser();
      $(".ModifyInsUser-mask").fadeOut("fast");
    },
    //清理僵尸账户
    clearaccount(LimitMonth, LimitMoney) {
      this.loadingsave = true;
      var url = "/insuser/ClearInsUsers";
      var postData = {
        LimitMonth: LimitMonth,
        LimitMoney: LimitMoney
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      $(".mask").fadeOut("fast");
    },

    //修改子账户开仓权限
    SetInsUserOpenRightById(userCode, state) {
      this.loadingsave = true;
      var url = "/insuser/ModifyInsUsersOpenPositionPower";
      var postData = {
        UserCodeList: [userCode],
        IsAllow: state
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    //显示禁止/允许
    DisplayAllowOrNo(boolFlag) {
      if (boolFlag) {
        return "允许";
      } else {
        return "禁止";
      }
    },

    //修改子账户跟单权限
    ViewFlowOrderDiv() {
      if (this.InsUserCodes.length <= 0) {
        //alert("请勾选要修改跟单权限的子帐户");
        //this.$message.error("请勾选要修改跟单权限的子帐户");
        this.$alert("请勾选要修改跟单权限的子帐户", {});
        return;
      }
      this.SetFolowOrderData.UserCodeList = this.InsUserCodes;
      this.FlowOrderList.push({ Code: "1", Name: "禁止跟单" });
      this.FlowOrderList.push({ Code: "2", Name: "允许跟单" });
      $(".SetFolowOrder-mask").fadeIn("fast");
    },
    flowOrderListSelect() {
      this.FlowOrderSelectDisplay = !this.FlowOrderSelectDisplay;
      if (this.FlowOrderSelectDisplay) {
        $(".FlowOrderList").attr("class", "drop-list FlowOrderList");
      } else {
        $(".FlowOrderList").attr("class", "drop-list FlowOrderList hide");
      }
    },
    flowOrderListSelected(code, name) {
      $(".FolowOrderName").val(name);
      this.FlowOrderSelectDisplay = false;
      $(".FlowOrderList").attr("class", "drop-list FlowOrderList hide");
      if (code == "1") {
        this.SetFolowOrderData.State = false;
      }
      if (code == "2") {
        this.SetFolowOrderData.State = true;
      }
    },
    SaveFlowOrder() {
      if (this.selectGDQX == null) {
        //this.$message.error("请选择跟单权限");
        this.$alert("请选择跟单权限", {});
        return;
      }
      var url = "/insuser/ModifyInsUsersFollowPower";
      var postData = {
        UserCodeList: this.SetFolowOrderData.UserCodeList,
        IsAllow: this.selectGDQX.Code == 1 ? false : true
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getlist();
          this.selectGDQX = null;
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      this.CloseViewFlowOrderDiv();
    },
    clearFlowOrder() {
      this.SetFolowOrderData.UserCodeList = [];
      this.SetFolowOrderData.State = false;
      this.FlowOrderList = [];
      this.FlowOrderSelectDisplay = false;
      $(".FlowOrderList").attr("class", "drop-list FlowOrderList hide");
      $(".FolowOrderName").val("");
    },
    CloseViewFlowOrderDiv() {
      this.clearFlowOrder();
      $(".SetFolowOrder-mask").fadeOut("fast");
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
    //弹出出入金面板
    ViewMoneyTransferDiv() {
      if (this.SimpInsUserList.length <= 0) {
        //this.$message.error("请勾选要出入金的子帐户");
        //this.$message.error("请勾选要出入金的子帐户");
        this.$alert("请勾选要出入金的子帐户", {});
        return;
      }
      this.selectCRJ = null;
      this.MoneyTransferTypeList.push({ Code: "1", Name: "入金" });
      this.MoneyTransferTypeList.push({ Code: "2", Name: "出金" });
      $(".MoneyTransfer-mask").fadeIn("fast");
    },
    clearMoneyTransfer() {
      this.MoneyTransfer.UserCodeList = [];
      this.MoneyTransfer.MoneyTransferType = "";
      this.MoneyTransfer.Money = "";
      this.MoneyTransfer.Remark = "";
      this.MoneyTransferTypeList = [];
      this.MoneyTransferTypeSelectDisplay = false;
      $(".MoneyTransferList").attr("class", "drop-list MoneyTransferList hide");
      $(".MoneyTransfer").val("");
    },
    SaveMoneyTransfer() {
      if (this.selectCRJ == null) {
        // this.$message.error("请选择出入金类型");
        this.$alert("请选择出入金类型", {});
        return;
      }
      if (
        this.MoneyTransfer.Money.trim() == "" ||
        isNaN(this.MoneyTransfer.Money)
      ) {
        // this.$message.error("发生金额不能为空");
        this.$alert("发生金额非数字", {});
        return;
      }

      // if (this.MoneyTransfer.Remark.trim() == "") {
      //   // this.$message.error("备注不能为空");
      //   this.$alert("备注不能为空", {});
      //   return;
      // }
      var url = "";
      if (this.selectCRJ.Code == "1") {
        url = "/agent/ForInsUserBatchPayByMgrBack";
      }
      if (this.selectCRJ.Code == "2") {
        url = "/agent/ForInsUserBatchWithDraw";
      }
      this.loadingsave = true;
      var postData = {
        CodeList: this.MoneyTransfer.UserCodeList,
        Money: this.MoneyTransfer.Money,
        Remark: this.MoneyTransfer.Remark
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.CloseViewMoneyTransferDiv();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    CloseViewMoneyTransferDiv() {
      this.clearMoneyTransfer();
      $(".MoneyTransfer-mask").fadeOut("fast");
    },

    selectedAll() {
      this.InsUserCodes.splice(0, this.InsUserCodes.length);
      this.SimpInsUserList.splice(0, this.SimpInsUserList.length);
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.list.length; i++) {
          this.InsUserCodes.push(this.list[i].UserCode);
          this.SimpInsUserList.push({
            UserCode: this.list[i].UserCode,
            UserName: this.list[i].UserName
          });
          this.MoneyTransfer.UserCodeList.push(this.list[i].UserCode);
        }
      }
    },
    selectedSub(code, name, index) {
      // 1.1 实现让每个旗舰店的里面元素控制旗舰店的头部选框
      var th = $("#total-checked").parent(),
        td = $(".sub-checked");
      this.choseBox().backWord(td, th.find(":input"));
      if ($(".sub-checked" + index)[0].checked) {
        this.InsUserCodes.push(code);
        this.SimpInsUserList.push({ UserCode: code, UserName: name });
        this.MoneyTransfer.UserCodeList.push(code);
      } else {
        this.InsUserCodes.remove(code);
        this.MoneyTransfer.UserCodeList.remove(code);
        //this.SimpInsUserList.remove({ UserCode: code, UserName: name });
        var fIndex = 0;
        var sureIndex = 0;
        this.SimpInsUserList.forEach(item => {
          if (item.UserCode == code) {
            sureIndex = fIndex;
          }
          fIndex++;
        });
        this.SimpInsUserList.splice(sureIndex, 1);
      }
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
    },
    //弹出删除提示
    ViewDelDiv() {
      if (this.SimpInsUserList.length <= 0) {
        // this.$message.error("请勾选要删除的子帐户");
        this.$alert("请勾选要删除的子帐户", {});
        return;
      }
      $(".del-mask").fadeIn("fast");
    },
    DelInsUserById(userCode) {
      this.InsUserCodes = [userCode];
      $(".del-mask").fadeIn("fast");
    },
    //删除
    DeleteInsUsers() {
      this.loadingsave = true;
      var url = "/insuser/DeleteInsUsers";
      var ids = this.InsUserCodes;
      this.$loginapi.post(url, ids, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      this.CloseViewDelDiv();
    },
    //取消删除
    CloseViewDelDiv() {
      this.InsUserCodes = [];
      $(".del-mask").fadeOut("slow");
    },
    closeMask() {
      $(".mask").fadeOut("slow");
    }
  }
};
</script>

<style scoped>
.OnlineState {
  /* width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #fd563c; */
  color: #08d969;
}
.noOnLineState {
  /* background-color: #08d969; */
  color: #fd563c;
}
</style>
