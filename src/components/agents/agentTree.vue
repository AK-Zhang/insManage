<template>
  <div class="agent__tree_">
    <div class="template">
      <article class="main">

        <div class="container-r">

          <!--带表格的面板-->
          <div class="panel panel-default panel-1" style="height:100%">
            <!-- Default panel contents -->
            <!-- <div class="panel-heading">
              <h3 class="panel-title">
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">经纪人</a>
                  </li>
                  <li class="active">经纪人</li>
                </ol>
              </h3>
            </div> -->
            <div class="panel-body bg">
              <p>
                <span class="col-md-2 fz center__agent">
                  <ol class="breadcrumb breadcrumb-top">
                    <li>
                      <a href="javascript:;">经纪</a>
                    </li>
                    <li class="active">经纪人</li>
                  </ol>
                </span>
                <span class="col-md-10 text-right">
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="ShowAuth()" style="margin-left:-5px">
                    设置敏感信息权限
                  </button>
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="openAvaliableTem()" style="margin-left:-5px">
                    子账户可用模板
                  </button>
                  <button class="btn btn-default btc btc-del btn-sm" type="submit" @click="edit(selectAgentModel)" style="margin-left:-5px">
                    编辑
                  </button>
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="delAgent()" style="margin-left:-5px">
                    删除
                  </button>
                  <button class="btn btn-default btc btc-del btn-sm" type="submit" @click="add()" style="margin-left:15px">
                    <span class="fa fa-plus pulp"></span>下级经纪人
                  </button>
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="addsubUserShow()" style="margin-left:-5px">
                    <span class="fa fa-plus pulp"></span>子账户
                  </button>
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="addFirst()" style="margin-left:15px">
                    一级经纪人
                  </button>
                  <button class="btn btn-default btc btc-del btn-sm" type="submit" @click="transMoney()" style="margin-left:-6px">
                    经纪人出入金
                  </button>
                  <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="resetAgent()" v-show="false">
                    重置经纪人
                  </button>
                  <button class="btn btn-default btc btc-del btn-sm" type="submit" @click="resetPassword()" style="margin-left:-5px">
                    重置密码
                  </button>
                  <button class="btn btn-info btc btc-add btn-sm" type="submit" @click="frozenAgent(selectAgentModel)" style="margin-left:15px">
                    {{selectAgentModel.IsEnabled == true ? "冻结" : "解冻"}}
                  </button>
                  <button class="btn btn-info btc btc-del btn-sm" type="submit" @click="getAgentPower()" style="margin-left:-3px">
                    经纪人权限
                  </button>
                </span>
              </p>
            </div>
            <div class="agent-wrap" style="height:calc(100% - 49px);overflow:hidden">
              <div class="agent-wrap-left" style="position:relative">
                <!--树形结构-->
                <el-tree class="filter-tree" :data="agenttrees" :default-active="1" node-key="AgentCode" :props="defaultProps" @current-change="handleNodeClick" :default-expanded-keys="expandedKeys" :highlight-current="true" :filter-node-method="filterNode" ref="tree2" v-loading="loading">
                </el-tree>
                <!--树形结构-->
              </div>
              <div class="agent-wrap-right" style="height:100%;border-left:1px solid #ccc">
                <!-- <table class="table account-table-1 table_bottom" >
                  <thead>
                    <tr>
                      <th>当前经纪人代码</th>
                      <th>经纪人名称</th>
                      <th>经纪人等级</th>
                      <th>经纪人手续费模板</th>
                      <th>创建时间</th>
                      <th>密码</th>
                      <th>出金汇率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{selectAgentModel.AgentCode}}</td>
                      <td>{{selectAgentModel.AgentName}}</td>
                      <td>{{selectAgentModel.Level == null ? "" : selectAgentModel.Level + 1}}</td>
                      <td>{{selectAgentModel.AgentFeeTemplateName}}</td>
                      <td>{{selectAgentModel.CreateDate}}</td>
                      <td>{{selectAgentModel.Password}}</td>
                      <td>{{selectAgentModel.OutRate}}</td>
                    </tr>
                  </tbody>
                </table> -->
                <ul style="width:25%;float:right;position:relative;" class="el-ul-agent">
                  <li class="el-ul-agentli">经纪人信息：</li>
                  <li>当前经纪人代码:
                    <span>{{selectAgentModel.AgentCode}}</span>
                  </li>
                  <li>经纪人名称:
                    <span>{{selectAgentModel.AgentName}}</span>
                  </li>
                  <li>经纪人等级:
                    <span>{{toDx(selectAgentModel.Level == null ? "" : (selectAgentModel.Level + 1).toString())}}级</span>
                  </li>
                  <li>经纪人手续费模板:
                    <span>{{selectAgentModel.AgentFeeTemplateName}}</span>
                  </li>
                  <li>创建时间:
                    <span>{{selectAgentModel.CreateDate}}</span>
                  </li>
                  <!-- <li>密码:
                    <span>{{selectAgentModel.Password}}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-info btc btc-add btn-sm" type="submit" v-show="selectAgentModel.Password=='******' ? true : false" @click="ShowSendPassword('',3)">
                      查看密码
                    </button>
                  </li> -->
                  <li>出金汇率:
                    <span>{{selectAgentModel.OutRate}}</span>
                  </li>
                  <!-- <li>风控模板:
                    <span>{{selectAgentModel.OutRate}}</span>
                  </li>
                  <li>保证金模板:
                    <span>{{selectAgentModel.OutRate}}</span>
                  </li> -->
                </ul>
                <div class="layui-tab layui-tab-brief account-tab layui_top" lay-filter="docDemoTabBrief" style="width:75%;float:left">
                  <ul class="layui-tab-title  account-tab-title" id="agent-tabs">
                    <li class="layui-this" @click="subagent(0)">下级经纪人</li>
                    <li @click="subagent(1)">子账户</li>
                    <li @click="subagent(2)">经纪人出入金流水</li>
                    <li @click="subagent(3)">经纪人开户模板</li>
                    <li @click="subagent(4)">下级经纪人手续费模板</li>
                    <li style="float: right;position:absolute;">
                      <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="addDLKH()" v-show="isShows1">
                        新增
                      </button>

                      <button class="btn btn-info btc btc-add btn-sm" type="submit" @click="addDLSXFMB()" v-show="isShows2">
                        新增
                      </button>

                      <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="openPower(0)" v-show="isShows">
                        开仓权限
                      </button>
                      <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="openPower(1)" v-show="isShows" style="margin-left:-5px">
                        跟单权限
                      </button>
                      <button class="btn btn-default btc btc-add btn-sm" type="submit" @click="showInsFeeTemplate()" v-show="isShows" style="margin-left:-6px">
                        编辑手续费模板
                      </button>
                      <button class="btn btn-info btc btc-add btn-sm" type="submit" @click="resetSubPassword()" v-show="isShows" style="margin-right:-30px;margin-left:15px">
                        重置密码
                      </button>
                      <button class="btn btn-info btc btc-add btn-sm" type="submit" v-show="false">
                        转移
                      </button>
                    </li>
                  </ul>
                  <!--下级经纪人-->
                  <div id="subagent" class="subagent">
                    <div class="tb-header">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width:10%">序号</th>
                            <th style="width:25%">经纪人代码</th>
                            <th style="width:20%">经纪人名称</th>
                            <th style="width:25%">经纪人手续费模板</th>
                            <th style="width:20%">创建日期</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body" v-loading="loading">
                      <table class="table table-hover">
                        <tbody>
                          <tr v-for="(item,index) in juniorAgents" :key="index">
                            <td style="width:10%">{{index + 1}}</td>
                            <td style="width:25%">{{item.AgentCode}}</td>
                            <td style="width:20%">{{item.AgentName}}</td>
                            <td style="width:25%">{{item.AgentFeeTemplateName}}</td>
                            <td style="width:20%">{{item.CreateDate | datefmt("YYYY-MM-DD HH:mm")}}</td>
                          </tr>
                          <tr v-show="juniorAgents == null ? false : (juniorAgents.length > 0 ? false : true)">
                            <td>
                              <a href="javascript:;">暂无数据</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--子账户-->
                  <div id="subaccount" class="subagent">
                    <div class="tb-header">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width:5%"><input type="checkbox" class="total-checked" id="total-checked" @click="selectedAll()"></th>
                            <th style="width: 6%">序号</th>
                            <th style="width: 10%">子账户代码</th>
                            <th style="width: 12%">子账户名称</th>
                            <th style="width: 17%">手续费模板</th>
                            <th style="width: 15%">开户日期</th>
                            <th style="width: 10%">开仓权限</th>
                            <th style="width: 10%">跟单权限</th>
                            <!-- <th style="width: 12%">密码</th> -->
                            <th style="width: 11%">来源</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body" v-loading="loading">
                      <table class="table table-hover">
                        <tbody>
                          <tr v-for="(item,index) in juniorAccount" :key="index">
                            <td style="width:5%" class="sub-checked "><input type="checkbox" :class="ClassName+index" @click="selectedSub(item.UserCode,index)"></td>
                            <td style="width: 6%">&nbsp;{{index + 1}}</td>
                            <td style="width: 10%">
                              <a class="super-link" @click="ViewDetail(0,item.UserCode)">{{item.UserCode}}</a>
                            </td>
                            <td style="width: 12%">{{item.UserName}}</td>
                            <td style="width: 17%">
                              <a class="super-link" @click="ViewDetail(1,item.FeeTemplateID)">{{item.FeeTemplateName}}</a>
                            </td>
                            <td style="width: 15%">{{item.CreateDate}}</td>
                            <td style="width: 10%">{{item.OpenPositionPower == false ? "禁止开仓" : "允许开仓"}}</td>
                            <td style="width: 10%">{{item.FollowPower == false ? "禁止跟单" : "允许跟单"}}</td>
                            <!-- <td style="width: 12%">{{item.Password}} &nbsp;
                              <button class="btn btn-info btc btc-add btn-sm" type="submit" v-show="item.Password=='******' ? true:false" @click="ShowSendPassword(item,1)">
                                查看
                              </button>
                            </td> -->
                            <td style="width: 11%">{{getAccountSource(item.Source)}}</td>
                          </tr>
                          <tr v-show="juniorAccount == null ? false : (juniorAccount.length > 0 ? false : true)">
                            <td>
                              <a href="javascript:;">暂无数据</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--经纪人出入金流水-->
                  <div id="bill" class="subagent">
                    <div class="tb-header">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width:4%">序号</th>
                            <th style="width:7%">出入金类型</th>
                            <th style="width:6%">发生金额</th>
                            <th style="width:10%">操作时间</th>
                            <th style="width:7%">操作员代码</th>
                            <th style="width:7%">出入金来源</th>
                            <th style="width:10%">支付订单号</th>
                            <th style="width:10%">支付状态</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body" v-loading="loading">
                      <table class="table table-hover">
                        <tbody>
                          <tr v-for="(item,index) in tempViewModel" :key="index">
                            <td style="width:4%">&nbsp;{{index+1}}</td>
                            <td style="width:7%">{{item.TransferType == 1 ? "入金" : "出金"}}</td>
                            <td style="width:6%">{{item.TransferMoney}}</td>
                            <td style="width:10%">{{item.AddDate | datefmt("YYYY/MM/DD HH:mm:ss")}}</td>
                            <td style="width:7%">{{item.OperatorCode}}</td>
                            <td style="width:7%">{{getAccountSource(item.OperatorType)}}</td>
                            <td style="width:10%">{{item.Id}}</td>
                            <td style="width:10%">{{item.OrderState}}</td>
                          </tr>
                          <tr v-show="tempViewModel == null ? false : (tempViewModel.length > 0 ? false : true)">
                            <td>
                              <a href="javascript:;">暂无数据</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--经纪人开户模板-->
                  <div id="opentem" class="subagent">
                    <div class="tb-header">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width:6%">保证金模板</th>
                            <th style="width:10%">子账户手续费模板</th>
                            <th style="width:7%">风控模板</th>
                            <th style="width:7%">总账户代码</th>
                            <th style="width:5%">风控员</th>
                            <th style="width:5%">操作</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body" v-loading="loading">
                      <table class="table table-hover">
                        <tbody>
                          <tr>
                            <td style="width:6%">
                              <a class="super-link" @click="ViewDetail(2,getOpenAcTps.MarginTemplateID)">{{getOpenAcTps.MarginTpName}}</a>
                            </td>
                            <td style="width:10%">
                              <a class="super-link" @click="ViewDetail(1,getOpenAcTps.FeeTemplateID)">{{getOpenAcTps.FeeTpName}}</a>
                            </td>
                            <td style="width:7%">
                              <a class="super-link" @click="ViewDetail(3,getOpenAcTps.RiskTemplateID)">{{getOpenAcTps.RiskTpName}}</a>
                            </td>
                            <td style="width:7%">
                              {{getOpenAcTps.TopAccountCode}}
                            </td>
                            <td style="width:5%">
                              <span>{{getViewRiskName(getOpenAcTps.RiskOprs)}}</span>
                            </td>
                            <td style="width:5%">
                              <div class="btn-group" role="group" aria-label="...">
                                <div class="btn-group" role="group">
                                  <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <!--Dropdown-->
                                    <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu dropdown-menu-lef">
                                    <li>
                                      <a @click="editDLKH()">编辑</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--经纪人手续费模板-->
                  <div id="comtem" class="subagent">
                    <div class="tb-header">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width:6%">序号</th>
                            <th style="width:10%">模板代码</th>
                            <th style="width:7%">模板名称</th>
                            <th style="width:7%">模板说明</th>
                            <th style="width:5%">可用状态</th>
                            <th style="width:5%">操作</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body" v-loading="loading">
                      <table class="table table-hover">
                        <tbody>
                          <tr v-for="(item,index) in agentsAllFees" :key="index">
                            <td style="width:6%">{{index + 1}}</td>
                            <td style="width:10%">{{item.TpCode}}</td>
                            <td style="width:7%">{{item.Name}}</td>
                            <td style="width:7%">{{item.Remark}}</td>
                            <td style="width:5%">{{item.State ? "正常使用" : "禁用"}}</td>
                            <td style="width:5%">
                              <div class="btn-group" role="group" aria-label="...">
                                <div class="btn-group" role="group">
                                  <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <!--Dropdown-->
                                    <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu dropdown-menu-lef">
                                    <!--<li><a class="param-edit">删除</a></li>-->
                                    <li>
                                      <a @click="editDLSXFMB(item)">编辑</a>
                                    </li>
                                    <li>
                                      <a @click="delDLSXFMB(item)">删除</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr v-show="agentsAllFees.length > 0 ? false : true ">
                            <td>
                              <a href="javascript:;">暂无数据</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <nav aria-label="Page navigation" class="text-center  page-separation">
              <pageination :pagerPro="pager" @ee="pageFn"></pageination>
            </nav> -->
          </div>

        </div>
      </article>
    </div>

    <!--设置可使用的子账户手续费模版-->
    <div id="setSubtem" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置可使用的子账户手续费模版</div>
          <div class="panel-body">
            <div class="bodykan2">
              <div class="kac1 notcheckedItem">
                <div class="spin" @click="checkAllTps()">
                  <span class="spin1 hide"></span>
                  <span class="spin3"></span>
                  <span class="spin2"> 全部</span>
                </div>
              </div>
              <ul class="skac">
                <li v-for="(item,index) in subAccountFeeTps" class="kac2" :class="checkedd+index" :key="index">
                  <div class="spin" @click="checkedTps(index,item.TpCode)">
                    <span class="spin1"></span>
                    <span class="spin3"></span>
                    <span class="spin2">{{item.Name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="setSubTem()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 添加经纪人手续费模板 -->
    <div id="addAgentFeeTemp" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增经纪人手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear first-div">
                  <div class="error3">
                    <span class="error4">*</span>
                    经纪人手续费模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" v-model="AddName" style="width:98%">
                  </span>
                  <div class="error3">
                    <span class="error4"></span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" placeholder="" v-model="AddRemark" style="width:98%"></textarea>
                  </span>
                </div>
              </form>
              <p class="tips">
                <span>说明：</span>经纪人手续费模板是指经纪人的经纪人成本，经纪人实际所得=子账户手续费-经纪人手续费模板</p>
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:20%">品种名称</th>
                    <th style="width:40%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in CommodityList" :key="index">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:20%">{{item.CommodityName}}</td>
                    <td style="width:40%;position: relative;">
                      <el-input v-model="item.Fee" placeholder="请输入内容" size="mini"></el-input>
                      <div class="input-list align-right">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="AddAgentFeeTempNew(selectAgentModel.AgentCode,'',AddName,AddRemark,CommodityList)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifyAgentFeeTemp(selectAgentModel.AgentCode,'',AddName,AddRemark,CommodityList,0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 修改经纪人手续费模板 -->
    <div id="editAgentFeeTemp" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑经纪人手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear first-div">
                  <div class="error3">
                    <span class="error4">*</span>
                    经纪人手续费模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" v-model="EditName" style="width:98%">
                  </span>
                  <div class="error3">
                    <span class="error4"> </span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" placeholder="" v-model="EditRemark" style="width:98%"></textarea>
                  </span>
                </div>
              </form>
              <p class="tips">
                <span>说明：</span>经纪人手续费模板是指经纪人的经纪人成本，经纪人实际所得=子账户手续费-经纪人手续费模板</p>
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:20%">品种名称</th>
                    <th style="width:40%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in CommodityList" :key="index">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:20%">{{item.CommodityName}}</td>
                    <td style="width:40%;position: relative;">
                      <el-input v-model="item.Fee" placeholder="请输入内容" size="mini"></el-input>
                      <div class="input-list align-right">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifyAgentFeeTemp(selectAgentModel.AgentCode,TpCode,EditName,EditRemark,CommodityList,1)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 删除经纪人手续费模板 -->
    <div id="delAgentFeeTemp" class="del-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除经纪人手续费模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除经纪人手续费模板吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeldateAgentFeeTemp()">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 新增一级经纪人 -->
    <div id="addFirstAgent" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增经纪人</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人名称
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.AgentName" type="text" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人密码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.Password" type="password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="Password1" type="password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人手续费模板
                </div>
                <el-select v-model="selectDLSXMB" style="width: 95%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in fristAgentTem" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  出金汇率（单位/美元）
                  <span style="font-size:12px;color:#888;">&nbsp;1元人民币等价的美元</span>
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.OutRate" type="text" placeholder="" maxlength=8>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  手机号码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.Phone" type="number" placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  备注
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" v-model="addmodel.Remark" type="text" placeholder=""></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addAgentMethod(0,1)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addAgentMethod(0,0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--编辑经纪人-->
    <div id="editAgent" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑经纪人</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人代码
                </div>
                <span class="selected">
                  <input class="input-text cursorss" type="text" disabled v-model="editObj.AgentCode">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="请输入经纪人名称" v-model="editObj.AgentName">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人手续费模板
                </div>
                <el-select v-model="selectDLSXMB" style="width: 98%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in fristAgentTem" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  出金汇率（单位/美元）
                  <span style="font-size:12px;color:#888;">&nbsp;1元人民币等价的美元</span>
                </div>
                <span class="selected">
                  <input class="input-text" v-model="editObj.OutRate" type="text" placeholder="" maxlength=8>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  手机号码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="editObj.Phone" type="number" placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  备注
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" type="text" placeholder="" v-model="editObj.Remark"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="editAgent(editObj)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增经纪人-->
    <div id="addAgent" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增下级经纪人</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  上级经纪人
                </div>
                <span class="selected">
                  <input style="width: 99%" v-model="selectAgentModel.AgentCode" class="input-text  cursorss" type="text" disabled placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人名称
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.AgentName" type="text" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人密码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.Password" type="password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="Password1" type="password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人手续费模板
                </div>
                <el-select v-model="selectDLSXMB" value-key="Name" placeholder="请选择" style="width: 98%;">
                  <el-option v-for="(item,index) in agentsAllFees" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  出金汇率（单位/美元）
                  <span style="font-size:12px;color:#888;">&nbsp;1元人民币等价的美元</span>
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.OutRate" type="text" placeholder="" maxlength="8">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  手机号码
                </div>
                <span class="selected">
                  <input class="input-text" v-model="addmodel.Phone" type="number" placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  备注
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" v-model="addmodel.Remark" type="text" placeholder=""></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addAgentMethod(1,1)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addAgentMethod(2,0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 删除经纪人 -->
    <div id="delAgent" class="del-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除经纪人</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除经纪人吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="deleteAgent(selectAgentModel.AgentCode)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增子账户-->
    <div id="addsubUser" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增子账户</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <!-- <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户代码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-model="addSumModel.UserCode" placeholder="">
                </span>
              </div> -->
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-model="addSumModel.UserName" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <el-select v-model="selectZZH" style="width: 98%" value-key="TopAccountName" placeholder="请选择">
                  <el-option v-for="(item,index) in parentList" :key="index" :label="item.TopAccountName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <el-select v-model="selectBZJMB" style="width: 98%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in marginTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <el-select v-model="selectZZHSXFMB" style="width: 98%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in availableSubAccountFeeTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" v-model="addSumModel.Password" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" v-model="Password1" placeholder="">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <el-select v-model="selectFKMB" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in riskTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  手机号码
                </div>
                <span class="selected">
                  <input class="input-text" type="number" v-model="selectPHONE" placeholder="">
                </span>
              </div>
              <div class="bodykan2 first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  指定风控员
                </div>
                <div class="kac1 notcheckedItem">
                  <div class="spin" @click="checkAll()">
                    <span class="spin1 hide"></span>
                    <span class="spin3"></span>
                    <span class="spin2"> 全部</span>
                  </div>
                </div>
                <ul class="skac ul_lis">
                  <li v-for="(item,index) in risker" class="kac2 notcheckedItem" :class="checkedd+index" :key="index">
                    <div class="spin" @click="checkeddd(index,item.RiskOprCode)">
                      <span class="spin1"></span>
                      <span class="spin3"></span>
                      <span class="spin2">{{item.RiskOprName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addSub(1)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addSub(2)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--经纪人出入金-->
    <div id="agentMoney" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">经纪人出入金</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  出入金类型
                </div>
                <!-- <span class="selected">
                  <input class="input-text" type="text" id="choose" @click="select()" placeholder="请选择">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list hide">
                    <p v-for="item in Crj" @click="selected(item.Name,item)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectCRJ" value-key="Name" style="width:98%" placeholder="请选择">
                  <el-option v-for="(item,index) in Crj" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  币种类型
                </div>
                <span class="selected">
                  <input class="input-text cursorss" type="text" placeholder="" style="width:98%" value="美元" disabled>
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  发生金额
                </div>
                <span class="selected">
                  <input class="input-text" type="number" style="width:98%" v-model="AgentTransferModel.Money" @keyup="NumberToChinese(AgentTransferModel.Money)" placeholder="请输入金额">
                </span>
                <div class="error3 color-red">
                  <span class="error4"></span>
                  大写金额：{{text}}
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addAgentTransfer()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--重置经纪人-->
    <div id="resetAgent" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">重置经纪人</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人代码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" disabled placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人新名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  新密码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  确认新密码
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="">
                </span>
                <div class="error3 color-red2">
                  <span class="error4"></span>
                  注：重置经纪人，将解绑经纪人手机号,删除银行卡，重置经纪人名称和登录密码。
                </div>
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
    <!--设置开户模版-->
    <div id="selfTp" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置经纪人自定义模版</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人
                </div>
                <!-- <span class="selected">
                  <input class="input-text" type="text" disabled v-model="selectAgentModel.AgentName" @blur="blurs()" placeholder="">
                  <div class="fa fa-sort-desc input-list"></div>
                </span> -->
                <el-select v-model="selectAgentModel.AgentName" disabled value-key="TopAccountName" placeholder="请选择" style="width: 98%">
                  <!-- <el-option v-for="(item,index) in parentList" :key="index" :label="item.TopAccountName" :value="item">
                  </el-option> -->
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <el-select v-model="selectZZH" value-key="TopAccountName" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in parentList" :key="index" :label="item.TopAccountName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <el-select v-model="selectBZJMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in marginTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <el-select v-model="selectFKMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in riskTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <el-select v-model="selectZZHSXFMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in subAccountTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="bodykan2 first-div">
                <div class="error3">
                  <span class="error4"></span>
                  指定风控员
                </div>
                <div class="kac1 notcheckedItem">
                  <div class="spin" @click="checkAll()">
                    <span class="spin1 hide"></span>
                    <span class="spin3"></span>
                    <span class="spin2"> 全部</span>
                  </div>
                </div>
                <ul class="skac ul_lis">
                  <li v-for="(item,index) in risker" class="kac2 notcheckedItem" :class="checkedd+index" :key="index">
                    <div class="spin" @click="checkeddd(index,item.RiskOprCode)">
                      <span class="spin1"></span>
                      <span class="spin3"></span>
                      <span class="spin2">{{item.RiskOprName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="setAgentcustomTem()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑开户模版-->
    <div id="selfTpEdit" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑经纪人自定义模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  经纪人
                </div>
                <el-select v-model="selectAgentModel.AgentName" disabled placeholder="请选择" style="width: 98%">
                  <!-- <el-option v-for="(item,index) in parentList" :key="index" :label="item.TopAccountName" :value="item">
                  </el-option> -->
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  总账户
                </div>
                <el-select v-model="selectZZH" value-key="TopAccountCode" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in parentList" :key="index" :label="item.TopAccountName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  保证金模板
                </div>
                <el-select v-model="selectBZJMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in marginTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  风控模板
                </div>
                <el-select v-model="selectFKMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in riskTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <el-select v-model="selectZZHSXFMB" value-key="Name" placeholder="请选择" style="width: 98%">
                  <el-option v-for="(item,index) in subAccountTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="bodykan2 first-div">
                <div class="error3">
                  <span class="error4"></span>
                  指定风控员
                </div>
                <div class="kac1 notcheckedItem">
                  <div class="spin" @click="checkAll()">
                    <span class="spin1 hide"></span>
                    <span class="spin3"></span>
                    <span class="spin2"> 全部</span>
                  </div>
                </div>
                <ul class="skac ul_lis">
                  <li v-for="(item,index) in risker" class="kac2 notcheckedItem" :class="checkedd+index" :key="index">
                    <div class="spin" @click="checkeddd(index,item.RiskOprCode)">
                      <span class="spin1"></span>
                      <span class="spin3"></span>
                      <span class="spin2">{{item.RiskOprName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="setAgentcustomTem()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--重置经纪人密码-->
    <div class="del-mask" id="resetAgentPwd" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">重置经纪人{{selectAgentModel.AgentName}}密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认重置密码？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="resetPasswords(selectAgentModel)">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--重置子账户密码-->
    <div class="del-mask" id="resetSubPwd" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:30%;">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">重置{{selectAgentModel.AgentName}}子账户密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认重置密码？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="resetSubPasswords()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑经纪人权限弹窗-->
    <div class="mask" id="Dlqx" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">经纪人权限管理</div>
          <div class="panel-body">
            <div class="modal-body bodyf">
              <ul>
                <!-- <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="Documentary" id="DocumentaryChecked">
                    <span class="bodyf3">跟单权限</span>
                  </p>
                  <p class="bodyf4">启用跟单权限后，经纪人可在经纪人后台看到跟单菜单，具有设置跟单的权限。</p>
                </li> -->
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="ViewChild" id="ViewChildChecked" disabled>
                    <span class="bodyf3">查看经纪人树权限</span>
                  </p>
                  <p class="bodyf4">启用经纪人树权限后，在经纪人后台，下级经纪人将以树结构展示。</p>
                </li>
                <li class="li_ad">
                  <p>
                    <input class="checkboxf" type="checkbox" v-model="AddChild" id="AddChildChecked" disabled>
                    <span class="bodyf3">开下级经纪人权限</span>
                  </p>
                  <p class="bodyf4">启用下级经纪人权限后，在经纪人后台，经纪人可自行管理下级经纪人。</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="setAgentPower()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 开仓权限 -->
    <div id="divKcqx" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置子账户开仓权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  开仓权限
                </div>
                <!-- <span class="selected">
                  <input class="input-text btName4" id="KcqxText" type="text" @click="select()" placeholder="请选择">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list drop-list5 hide">
                    <p v-for="item in Kcqx" @click="selected(item.Name,item)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectQX" style="width: 98%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in Kcqx" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="editPower(0,selectQX.Code)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 跟单权限 -->
    <div id="divGdqx" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置子账户跟单权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  跟单权限
                </div>
                <!-- <span class="selected">
                   <input class="input-text btName4" type="text" id="GdqxText" @click="select()" placeholder="请选择">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list drop-list5 hide">
                    <p v-for="item in Gdqx" @click="selected(item.Name,item)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectQX" style="width: 98%" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in Gdqx" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="editPower(1,selectQX.Code)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 设置子账户手续费模板 -->
    <div id="divSxfmb" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置子账户手续费模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div class="first-div">
                <div class="error3">
                  <span class="error4">*</span>
                  子账户手续费模板
                </div>
                <!-- <span class="selected">
                  <input class="input-text btName4" type="text" id="SxfmbText" @click="select()" placeholder="请选择">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list drop-list5 hide">
                    <p v-for="item in fristAgentTem" @click="selected(item.Name,item)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectZZHSXFMB" style="width: 98%;" value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in availableSubAccountFeeTps" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="setInsFeeTemplate()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 设置敏感信息权限 -->
    <div id="setPrivacyAuth" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置敏感信息权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllAuth" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedAuth" @change="handleCheckedAuthChange">
                  <el-checkbox v-for="item in AuthList" :label="item" :key="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </form>
          </div>
          <div>
            <p class="bodykan10">&nbsp;&nbsp;&nbsp;&nbsp;注：选中则该账户具有查看，编辑选中信息权限。</p>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAuthInfo()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
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
import pageination from "../subcom/pageination.vue";
export default {
  name: "agentTree",
  components: {
    pageination
  },

  data() {
    return {
      pager: {},
      recordCount: 0,

      ishow: "",
      loading: "",
      loadingsave: "",
      isdisplay: true,
      checkedd: "kacc",
      //树形结构
      defaultProps: {
        children: "Childs",
        label: "AgentName"
        //code: 'AgentCode'
      },

      expandedKeys: [], //全局筛选后默认打开的节点

      //      添加修改经纪人信息
      addmodel: {
        ParentID: "",
        AgentCode: "",
        AgentName: "",
        AgentFeeTemplateID: "",
        AgentFeeTemplateName: "",
        OutRate: 0.1369,
        Password: "",
        Phone: "",
        Remark: ""
      },
      Password1: "",
      //        增加经纪人手续费模板
      addAgentFeeTpModel: {
        AgentCode: this.selectAgent,
        TpCode: "",
        Name: "",
        Remark: "",
        Details: []
      },
      //        增加经纪人出入金模板
      AgentTransferModel: {
        UserCode: "",
        UseType: 3 /*3 机构经纪人 4 投资用户 */,
        Remark: "",
        Money: 0,
        TransferType: 0 /*1 入金 2 出金 */
      },
      addAgentbaseTemp: {
        AgentCode: "",
        RiskOprCodes: [],
        MarginTemplateID: "",
        RiskTemplateID: "",
        FeeTemplateID: "",
        TopAccountCode: ""
      },
      //添加子账户信息
      addSumModel: {
        UserCode: "",
        UserName: "",
        FeeTemplateID: "",
        MarginTemplateID: "",
        RiskControlTemplateID: "",
        TopAccountNo: "",
        RiskOprCode: [],
        Password: "",
        AgentCode: ""
      },

      tempViewModel: [],
      tempInput: "",
      agenttrees: [], //获取经纪人树
      selectAgent: "",
      selectAgentModel: {}, //获取经纪人信息    this.newObj = jQuery.extend({}, obj);
      editObj: {},
      juniorAgents: [], //下级经纪人
      juniorAccount: [], //获取子账户
      selectFee: "",
      selectFeeModel: {}, //获取手续费模板详情
      agentsAllFees: [], //获取手续费模板
      getOpenAcTps: {}, //获取经纪人开户模板
      templateList: [], //获取下级经纪人所需的经纪人手续费模板列表
      marginTps: [], //获取保证金模板列表
      riskTps: [], //获取风控模板列表
      subAccountTps: [], //获取子账户手续费模板列表
      AgentFeeTps: [], //获取经纪人手续费模板列表
      risker: [], //获取风控员列表
      text: "",
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      markArr: [],
      subAccountFeeTps: [], //获取可用子账户信息列表
      availableSubAccountFeeTps: [], //获取已经配置子账户信息模板
      kacd: "kacd",
      parentList: [], //总账户列表
      fristAgentTem: [], //获取一级经纪人经纪人模板
      IsExistDLKHMB: false, //是否存在经纪人开户模板
      IsExistDLSXFMB: false, //是否存在经纪人手续费模板
      CommodityList: [],
      TpCode: "",
      AddName: "",
      AddRemark: "",
      EditName: "",
      EditRemark: "",
      Crj: [{ Code: 1, Name: "入金" }, { Code: 2, Name: "出金" }],
      RandomPwd: "", //随机密码
      Documentary: false, //跟单权限
      ViewChild: false, //查看经纪人树权限
      AddChild: false, //开下级经纪人权限
      Tps: [], //设置可用模板保存数据源

      ClassName: "sub-checked", //单选、全选
      id_list: [], //记录子账户代码信息
      Kcqx: [{ Code: 1, Name: "允许开仓" }, { Code: 0, Name: "禁止开仓" }],
      Gdqx: [{ Code: 1, Name: "允许跟单" }, { Code: 0, Name: "禁止跟单" }],
      subPassword: "", //子账户密码
      reSubPassword: "", //子账户确认密码

      selectDLSXMB: null, //选中经纪人手续模板
      selectQX: null, //选中权限
      selectZZH: null, //选中总账户
      selectBZJMB: null, // 选中保证金模版
      selectPHONE: "", //新增子账户手机号
      selectFKMB: null, // 选中风控模版
      selectZZHSXFMB: null, //选中子账户手续费模版
      selectCRJ: null, //选中出入金类型

      isShows: false,
      isShows1: false,
      isShows2: false,
      toSelectCode: "",
      AuthList: [
        { Code: 1, Name: "手机号" },
        { Code: 2, Name: "身份证号" },
        { Code: 3, Name: "密码" },
        { Code: 4, Name: "地址" },
        { Code: 5, Name: "银行卡号" }
      ],
      checkAllAuth: false,
      checkedAuth: [],
      isIndeterminate: true,
      AuthInfo: null,
      AddModifyModel: {
        UserName: "",
        UserAuth: "",
        UserCode: "",
        UserType: 3
      },
      MarkCode: "",
      ChooseUser: null,

      buttonName: "获取验证码",
      isDisabled: false,
      time: 120,

      messates: ""
    };
  },
  created() {
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.$store.state.loaction = "/agents/tree";
    if (this.$store.state.AgentInfo.AgentCode) {
      this.toSelectCode = this.$store.state.AgentInfo.AgentCode;
    }
    this.viewAgetnTree();
    this.$store.state.AgentInfo = {};
  },
  mounted() {
    this.$emit("loaded", this.$route);
  },
  methods: {
    loaded(params) {
      this.toSelectCode = params.Code;
      this.getAllInfo(params.Code);
      this.selectTreeNode();
    },

    //弹出验证码框
    ShowSendPassword(item, type) {
      $("#showPass").fadeIn("slow");
      if (type == 1) {
        this.ChooseUser = item;
      } else {
        this.ChooseUser = null;
      }
    },

    //发送短信验证码
    SendSurePass() {
      var telphone = this.$store.state.userInfo.AccountPhone;
      return;
      if (
        telphone.toString().trim() == "" ||
        telphone.toString().trim() == null
      ) {
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
    MakeSurePass(type) {
      if (this.MarkCode.toString().trim() == "") {
        this.$alert("请输入验证码", {});
        return;
      }

      var url = "userprivacyauth/VerifyAuthInfo";

      var postData = {};
      if (this.ChooseUser == null) {
        postData = {
          Phone: this.$store.state.userInfo.AccountPhone,
          Code: this.MarkCode,
          UserCode: this.selectAgentModel.AgentCode,
          Type: 3
        };
      } else {
        postData = {
          Phone: this.$store.state.userInfo.AccountPhone,
          Code: this.MarkCode,
          UserCode: this.ChooseUser.UserCode,
          Type: 1
        };
      }
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          if (this.ChooseUser == null) {
            this.selectAgentModel.Password = response.Data.Password;
            this.selectAgentModel.Phone = response.Data.Phone;
          } else {
            this.ChooseUser.Phone = response.Data.Phone;
            this.ChooseUser.Password = response.Data.Password;
          }

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

    handleCheckAllChange(val) {
      this.checkedAuth = val ? this.AuthList : [];
      this.isIndeterminate = false;
    },
    handleCheckedAuthChange(value) {
      let checkedCount = value.length;
      this.checkAllAuth = checkedCount === this.AuthList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.AuthList.length;
    },

    //获取用户认证权限
    GetUserPrivacyAuthInfo(code) {
      var url = "/userprivacyauth/QueryUserPrivacyAuth";
      var postData = {
        UserCode: code,
        UserType: 3
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.AuthInfo = response.Data;
          if (this.AuthInfo != null) {
            var list = this.AuthInfo.UserAuth.split(",");
            for (var i = 0; i < list.length; i++) {
              var id = list[i];
              for (var j = 0; j < this.AuthList.length; j++) {
                if (this.AuthList[j].Code == id) {
                  this.checkedAuth.push(this.AuthList[j]);
                  break;
                }
              }
            }
            if (this.checkedAuth.length == this.AuthList.length) {
              this.checkAllAuth = true;
              this.isIndeterminate = false;
            }
          }
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    ShowAuth() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      this.checkAllAuth = false;
      this.checkedAuth = [];
      this.isIndeterminate = true;
      this.GetUserPrivacyAuthInfo(this.selectAgentModel.AgentCode);
      $("#setPrivacyAuth").fadeIn("slow");
    },

    SaveAuthInfo() {
      var url = "";
      var postData = {};

      this.AddModifyModel.UserName = this.selectAgentModel.AgentName;
      this.AddModifyModel.UserCode = this.selectAgentModel.AgentCode;
      var authInfo = "";
      this.checkedAuth.forEach(auth => {
        if (authInfo == "") {
          authInfo = auth.Code;
        } else {
          authInfo += "," + auth.Code;
        }
      });
      this.AddModifyModel.UserAuth = authInfo;
      if (this.AuthInfo == null) {
        //如果是新增
        url = "/userprivacyauth/AddUserPrivacyAuth";
        postData = this.AddModifyModel;
      } else {
        if (this.checkedAuth.length == 0) {
          //如果选中为空 则为删除
          url = "/userprivacyauth/DeleteUserPrivacyAuth";
          postData = [this.AuthInfo.ID];
        } else {
          //修改
          url = "/userprivacyauth/ModifyUserPrivacyAuth";
          postData = this.AddModifyModel;
        }
      }
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          this.closeMask();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    //跳转
    ViewDetail(type, code) {
      var url = ""; //请求地址
      var postDate = code; //发送数据
      var toUrl = ""; //跳转页面
      if (type == 0) {
        //子账户代码跳转子账户详情
        url = "/insuser/GetInsUserDetail";
        toUrl = "/accounts/subaccountsinfo";
      } else if (type == 1) {
        //子账户手续费模板跳转详情
        url = "/instp/GetInsUserFeeTemplateDetail";
        toUrl = "/templates/commissiontemplatesinfo";
      } else if (type == 2) {
        //保证金模板
        url = "/instp/GetMarginTemplateDetail";
        toUrl = "/templates/templatesinfo";
      } else if (type == 3) {
        //风控模板详情
        url = "/instp/GetInsRiskTpDetail";
        toUrl = "/templates/risktemplatesinfo";
      } else if (type == 4) {
        //总帐户详情
      } else if (type == 5) {
      }

      this.$loginapi.post(url, postDate, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.$router.push(toUrl);
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    selectTreeNode() {
      this.expandedKeys.splice(0, this.expandedKeys.length);
      this.agenttrees.forEach(item => {
        if (item.AgentCode == this.toSelectCode) {
          this.$refs.tree2.setCurrentNode(item);
          this.expandedKeys.push(item);
          this.toSelectCode = "";
          return false;
        }
        this.selectNode(item, this.toSelectCode);
      });
    },

    selectNode(item, code) {
      item.Childs.forEach(child => {
        if (child.AgentCode == code) {
          this.$refs.tree2.setCurrentNode(child);
          this.toSelectCode = "";
          if (item.Level == 0) {
            this.expandedKeys.push(child);
          } else {
            this.expandedKeys.push(item);
          }
          return false;
        }
        this.selectNode(child, code);
      });
    },

    //    获取经纪人树
    viewAgetnTree() {
      this.loading = true;
      this.$loginapi.post("agent/QueryAgentTree", null, e => {
        this.loading = false;
        if (e.Ret == 0) {
          this.agenttrees = e.Data.Agents;
          if (e.Data.Agents.length > 0) {
            if (this.toSelectCode != "") {
              this.getAllInfo(this.toSelectCode);
              setTimeout(this.selectTreeNode, 200);
            } else {
              this.getAllInfo(e.Data.Agents[0].AgentCode);
              setTimeout(this.selectTreeNode, 200);
            }
          }
        }
      });
    },

    //获取品种信息 里边包含 品种名称 每手保证金 最低、最高
    getCommoditylist(ID) {
      var url = "/agent/QueryInsAgentFeeTpDetail";
      var post = {
        FeeTpCode: ID,
        AgentFeeTpCode: this.selectAgentModel.AgentFeeTemplateID
      };
      this.$loginapi.post(url, post, response => {
        if (response.Ret == 0) {
          this.CommodityList = response.Data;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //弹出设置子账户手续费模板
    showInsFeeTemplate() {
      if (this.id_list.length == 0) {
        // this.$message.error("请选择一个子账户");
        this.$alert("请选择一个子账户", {});
        return;
      }
      this.selectZZHSXFMB = null;
      if (this.selectAgentModel.Level == 0) {
        this.getAvalibleTem(this.selectAgentModel.AgentCode);
      } else {
        var parents = this.selectAgentModel.ParentIds.split(",");
        this.getAvalibleTem(parents[0]); //获取经纪人手续费模板
      }
      $("#divSxfmb").fadeIn("fast");
    },

    //设置子账户手续费模板
    setInsFeeTemplate() {
      var url = "insuser/UpdateInsFeeTemplate";
      this.id_list.forEach(item => {
        var post = {
          UserCode: item,
          FeeTpCode: this.selectZZHSXFMB.Code
        };
        this.$loginapi.post(url, post, e => {
          if (e.Ret == 0) {
            this.id_list.remove(item);
            this.getJuniorAccount(this.selectAgentModel.AgentCode);
            this.$message.success({
              message: "保存成功",
              center: true,
              duration: 800
            });
          } else {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
        });
      });
      this.closeMask();
      this.selectZZHSXFMB = null;
      $(".total-checked")[0].checked = false;
    },

    //      添加子账户
    addsubUserShow() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      //如果是一级经纪人添加子账户
      if (this.selectAgentModel.Level > 0) {
        var parents = this.selectAgentModel.ParentIds.split(",");
        this.getAvalibleTem(parents[0]);
      }

      this.addSubUser();
      this.addSumModel.UserCode = "";
      this.addSumModel.UserName = "";
      this.addSumModel.FeeTemplateID = "";
      this.addSumModel.MarginTemplateID = "";
      this.addSumModel.RiskControlTemplateID = "";
      this.addSumModel.TopAccountNo = "";
      this.addSumModel.RiskOprCode = [];
      this.addSumModel.Password = "";
      this.addSumModel.AgentCode = "";
      this.selectDLSXMB = null;
      this.selectZZH = null;
      this.selectBZJMB = null;
      this.selectZZHSXFMB = null;
      this.Password1 = "";
      this.selectFKMB = null;

      this.clearDLFK();

      $("#addsubUser").fadeIn("fast");
    },

    //出入金
    addAgentTransfer() {
      if (this.selectCRJ == null) {
        // this.$message.error("请选择出入金类型");
        this.$alert("请选择出入金类型", {});
        return;
      }
      if (
        isNaN(this.AgentTransferModel.Money) ||
        this.AgentTransferModel.Money.toString().trim() == ""
      ) {
        // this.$message.error("金额只能输入数字");
        this.$alert("金额只能输入数字", {});
        return;
      }

      this.AgentTransferModel.TransferType = this.selectCRJ.Code;
      this.AgentTransferModel.UserCode = this.selectAgentModel.AgentCode;
      this.AgentTransferModel.UseType = 3;
      this.$loginapi.post(
        "agent/AddTransferMoney",
        this.AgentTransferModel,
        e => {
          if (e.Ret == 0) {
            this.selectCRJ = null;
            this.queryTransfer(this.selectAgentModel.AgentCode);
            this.closeMask();
            this.$message.success({
              message: "请求已发送",
              center: true,
              duration: 800
            });
          } else {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
        }
      );
    },

    ExistsNode(item, code) {
      for (var i = 0; i < item.Childs.length; i++) {
        if (item.Childs[i].AgentCode == code) {
          return true;
        }
        if (this.ExistsNode(item.Childs[i], code)) {
          return true;
        }
      }
      return false;
    },

    //      添加经纪人
    //oper 0 添加一级经纪人  1 保存并新增下级经纪人  2 保存下级经纪人
    addAgentMethod(oper, type) {
      if (oper == 1 || oper == 2) {
        this.addmodel.ParentID = this.selectAgentModel.AgentCode;
      }
      if (this.addmodel.AgentName.trim() == "") {
        // this.$message.error("经纪人名称不能为空");
        this.$alert("经纪人名称不能为空", {});
        return;
      }
      let textP = this.textPwd.p_len(this.addmodel.Password);
      if (textP == 1) {
        this.$alert("密码长度不能低于8位", {});
        return;
      } else if (textP == 2) {
        this.$alert("密码中必须是字母和数字组合", {});
        return;
      } else if (textP == 3) {
        this.$alert("密码中必须包含大写字母", {});
        return;
      }
      if (this.Password1.trim() == "") {
        // this.$message.error("确认密码不能为空");
        this.$alert("确认密码不能为空", {});
        return;
      }
      if (this.addmodel.Password.trim() != this.Password1.trim()) {
        // this.$message.error("确认密码与密码不一致");
        this.$alert("确认密码与密码不一致", {});
        return;
      }
      if (this.selectDLSXMB == null || this.selectDLSXMB.TpCode.trim() == "") {
        // this.$message.error("请选择经纪人手续费模板");
        this.$alert("请选择经纪人手续费模板", {});
        return;
      }
      if (this.addmodel.OutRate.toString().trim() == "") {
        // this.$message.error("出金汇率不能为空");
        // this.addmodel.OutRate = 0;
        this.$alert("出金汇率不能为空", {});
        return;
      }
      if (isNaN(this.addmodel.OutRate) || this.addmodel.OutRate < 0) {
        this.$alert("出金汇率只能是数字", {});
        return;
      }
      if (this.addmodel.OutRate.toString().indexOf(".") == 0) {
        // this.$message.error("出金汇率只能是数字");
        this.$alert("出金汇率只能是数字", {});
        return;
      }
      if (this.addmodel.OutRate == "") {
        this.addmodel.OutRate = 0;
      }
      if (
        !this.addmodel.Phone.trim().match(/^((1[3,5,7,8][0-9])|(19[9]))\d{8}$/)
      ) {
        this.$alert("请输入合法手机号", {});
        return;
      }

      // let index = 0;
      // if (type == 0) {
      //   //表示新增
      //   for (var i = 0; i < this.agenttrees.length; i++) {
      //     var item = this.agenttrees[i];
      //     if (item.AgentCode == this.addmodel.AgentCode) {
      //       index++;
      //       break;
      //     }
      //     var result = this.ExistsNode(item, this.addmodel.AgentCode);
      //     if (result == true) {
      //       index++;
      //       break;
      //     }
      //   }
      // } else if (type == 1) {
      //   //表示修改
      // }

      // if (index > 0) {
      //   this.$message.error(
      //     "经纪人代码【" + this.addmodel.AgentCode + "】已存在！"
      //   );
      //   return;
      // }

      this.addmodel.AgentFeeTemplateID = this.selectDLSXMB.TpCode;
      this.addmodel.AgentFeeTemplateName = this.selectDLSXMB.Name;

      var url = "/agent/AddAgent";
      let postData = jQuery.extend({}, this.addmodel);
      delete postData.AgentCode;

      this.loadingsave = true;
      this.$loginapi.post(url, postData, e => {
        let _this = this;
        setTimeout(function() {
          _this.loadingsave = false;
          if (e.Ret == 0) {
            if (oper == 1 || oper == 2) {
              _this.toSelectCode = _this.selectAgentModel.AgentCode;
              //this.getjuniorAgent(this.selectAgentModel.AgentCode);
            }
            _this.viewAgetnTree();
            if (type == 0 || type == 2) {
              _this.closeMask();
            }
            _this.$message.success({
              message: "保存成功",
              center: true,
              duration: 800
            });
          } else {
            //this.$message.error(e.Msg);
            _this.$alert(e.Msg, {});
          }
        }, 200);
      });
    },

    deleteAgent(code) {
      var url = "agent/DelAgent";
      this.loadingsave = true;
      this.$loginapi.post(url, code, e => {
        this.loadingsave = false;
        if (e.Ret == 0) {
          this.toSelectCode = "";
          this.viewAgetnTree();
          this.closeMask();
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 500
          });
        } else {
          this.$alert(e.Msg, {});
        }
      });
    },

    //      重置经纪人
    resetAgent() {
      this.$loginapi.post("/agent/AddAgent", this.addmodel, e => {
        //console.log(e);
      });
    },

    UpdateNodeName(item, code, name) {
      for (var i = 0; i < item.Childs.length; i++) {
        if (item.Childs[i].AgentCode == code) {
          item.Childs[i].AgentName = name;
          break;
        }
        this.UpdateNodeName(item.Childs[i], code, name);
      }
    },

    //      编辑经纪人
    editAgent(obj) {
      if (obj.AgentName.trim() == "") {
        // this.$message.error("经纪人名称不能为空");
        this.$alert("经纪人名称不能为空", {});
        return;
      }

      if (this.selectDLSXMB == null) {
        // this.$message.error("请选择经纪人手续费模板");
        this.$alert("请选择经纪人手续费模板", {});
        return;
      }

      if (obj.OutRate.toString().trim() == "") {
        // this.$message.error("出金汇率不能为空");
        obj.OutRate = 0;
        //this.$alert("出金汇率不能为空", {});
        return;
      }
      if (isNaN(obj.OutRate) || obj.OutRate < 0) {
        // this.$message.error("出金汇率只能是数字");

        obj.OutRate = 0;

        //this.$alert("出金汇率只能是数字", {});
        return;
      }

      if (obj.OutRate.toString().indexOf(".") == 0) {
        // this.$message.error("出金汇率只能是数字");
        this.$alert("出金汇率只能是数字", {});
        return;
      }
      if (!obj.Phone.trim().match(/^((1[3,5,7,8][0-9])|(19[9]))\d{8}$/)) {
        this.$alert("请输入合法手机号", {});
        return;
      }

      obj.AgentFeeTemplateID = this.selectDLSXMB.TpCode;
      obj.AgentFeeTemplateName = this.selectDLSXMB.Name;
      this.loadingsave = true;
      this.$loginapi.post("/agent/UpdateAgent", obj, e => {
        this.loadingsave = false;
        this.getAgent(obj.AgentCode);
        this.closeMask();
        this.$message.success({
          message: "保存成功",
          center: true,
          duration: 800
        });
        for (var i = 0; i < this.agenttrees.length; i++) {
          var item = this.agenttrees[i];
          if (item.AgentCode == obj.AgentCode) {
            item.AgentName = obj.AgentName;
            break;
          }
          this.UpdateNodeName(item, obj.AgentCode, obj.AgentName);
        }
      });
    },

    //重置子账户密码
    resetSubPasswords() {
      // if (this.subPassword.trim() != this.reSubPassword.trim()) {
      //   // this.$message.error("确认密码与密码不一致");
      //   this.$alert("确认密码与密码不一致", {});
      //   return;
      // }
      let _this = this;
      if (this.$store.state.userInfo.IsMain == false) {
        this.$message.warning({
          message: "当前账户非主机构管理员,没有权限！",
          center: true,
          duration: 800
        });
        this.closeMask();
        return;
      }
      var url = "insuser/ResetPassword";
      this.id_list.forEach(item => {
        var post = {
          UserCode: itemitem
        };
        this.loadingsave = true;
        this.$loginapi.post(url, post, e => {
          _this.loadingsave = false;
          if (e.Ret == 0) {
            this.$alert(
              "子账户" +
                item +
                "重置密码成功，稍后将以短信发送到手机，请注意查收",
              {}
            );
            // this.$message.success({
            //   message: "子账户" +item +"重置密码成功",
            //   center: true,
            //   duration: 800
            // });
          } else {
            //this.$message.error(e.Msg);
            this.$alert("子账户" + item + e.Msg, {});
          }
        });
      });
      this.getJuniorAccount(this.selectAgentModel.AgentCode);
      this.closeMask();
    },

    //      重置经纪人密码
    resetPasswords(obj) {
      this.$loginapi.post(
        "agent/ResetPwd",
        {
          AgentCode: obj.AgentCode
        },
        e => {
          if (e.Ret == 0) {
            this.closeMask();
            this.$message.success({
              message: "密码已重置，稍后将以短信发送到手机，请注意查收",
              center: true,
              duration: 800
            });
          } else {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
        }
      );
    },
    //      冻结解冻 agent/Frozen
    frozenAgent(obj) {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      this.$loginapi.post(
        "agent/Frozen",
        {
          AgentCode: obj.AgentCode,
          Frozen: obj.IsEnabled
        },
        e => {
          if (e.Ret == 0) {
            this.selectAgentModel.IsEnabled = !obj.IsEnabled;
            if (obj.IsEnabled) {
              this.$message.success({
                message: "经纪人解冻成功。",
                center: true,
                duration: 800
              });
            } else {
              this.$message.success({
                message: "经纪人冻结成功。",
                center: true,
                duration: 800
              });
            }
          } else {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
        }
      );
    },
    //获取经纪人权限
    getAgentPower() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      this.Documentary = false;
      this.ViewChild = true;
      this.AddChild = true;
      var url = "agent/GetAgentPower";
      var code = this.selectAgentModel.AgentCode;
      this.loadingsave = true;
      this.$loginapi.post(url, code, e => {
        this.loadingsave = false;
        if (e.Ret == 0) {
          // 暂时注释
          // this.Documentary = e.Data.Documentary;
          // this.ViewChild = e.Data.ViewChild;
          // this.AddChild = e.Data.AddChild;

          // $("#DocumentaryChecked")[0].checked = this.Documentary; 暂时隐藏
          $("#ViewChildChecked")[0].checked = this.ViewChild; //默认勾选
          $("#AddChildChecked")[0].checked = this.AddChild; //默认勾选

          $("#Dlqx").fadeIn("fast");
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //设置经纪人权限
    setAgentPower() {
      var url = "agent/ConfigAgentPower";

      var post = {
        AgentCode: this.selectAgentModel.AgentCode,
        Documentary: this.Documentary,
        ViewChild: this.ViewChild,
        AddChild: this.AddChild
      };
      console.log(post);
      return;
      this.$loginapi.post(url, post, e => {
        if (e.Ret == 0) {
          this.closeMask();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //      获取指定经纪人详情
    getAgent(code) {
      this.$loginapi.post("agent/GetAgentInfo", code, e => {
        if (e.Ret == 0) {
          this.selectAgentModel = e.Data;
          this.toSelectCode = e.Data.AgentCode;
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },
    //根据经纪人代码获取所有详情
    getAllInfo(code) {
      this.getAgent(code);
      this.getJuniorAccount(code);
      this.queryTransfer(code);
      this.getjuniorAgent(code);
      this.getAgentFees(code);
      this.getOpenAcTp(code);
    },

    //      获取下级经纪人
    getjuniorAgent(code) {
      if (this.juniorAgents != null) {
        this.juniorAgents.splice(0, this.juniorAgents.length);
      }
      this.$loginapi.postWithPage(
        "agent/QueryAgentsByAgent",
        1,
        100,
        code,
        e => {
          this.juniorAgents = e.Data;
        }
      );
    },
    //      获取子账户
    getJuniorAccount(code) {
      if (this.juniorAccount != null) {
        this.juniorAccount.splice(0, this.juniorAccount.length);
      }
      this.$loginapi.postWithPage(
        "agent/QueryUsersByAgent",
        1,
        100,
        code,
        e => {
          if (e.Ret == 0) {
            this.juniorAccount = e.Data;
          } else {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
        }
      );
    },
    //      经纪人出入金流水
    queryTransfer(code) {
      if (this.tempViewModel != null) {
        this.tempViewModel.splice(0, this.tempViewModel.length);
      }
      this.$loginapi.post("agent/QueryMoneyTransfer", code, e => {
        if (e.Ret == 0) {
          this.tempViewModel = e.Data;
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
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

    //      获取经纪人开户模板 agent/GetOpenAcTp
    getOpenAcTp(code) {
      this.getOpenAcTps = {};
      this.$loginapi.post("agent/GetOpenAcTp", code, e => {
        if (e.Ret == 0) {
          this.getOpenAcTps = e.Data;
          this.IsExistDLKHMB = true;
        } else {
          if (e.Msg != "未配置经纪人开户模板") {
            //this.$message.error(e.Msg);
            this.$alert(e.Msg, {});
          }
          this.IsExistDLKHMB = false;
        }
      });
    },

    //获取风控员拼接信息
    getViewRiskName(risks) {
      var riskName = "";
      if (risks == null) {
        return riskName;
      }
      risks.forEach(item => {
        if (riskName == "") {
          riskName = item.RiskOprName;
        } else {
          riskName += "、" + item.RiskOprName;
        }
      });
      return riskName;
    },

    //      获取经纪人手续费模板列表 用于列表展示
    getAgentFees(code) {
      if (this.agentsAllFees != null) {
        this.agentsAllFees.splice(0, this.agentsAllFees.length);
      }
      this.$loginapi.postWithPage("agent/QueryFeeTemplates", 1, 10, code, e => {
        if (e.Ret == 0) {
          this.agentsAllFees = e.Data;
          this.fristAgentTem = e.Data;
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },
    //      获取手续费模板详情
    getFeeTp(code) {
      this.$loginapi.post("agent/GetAgentInfo", code, e => {
        if (e.Ret == 0) {
          this.selectFeeModel = e.Data;
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //获取一级经纪人经纪人手续费模板 用于添加经纪人
    getFirstAgentTemlist() {
      var url = "/instp/QueryAgentFeeTps";
      this.$loginapi.postWithPage(url, 1, 10, "", response => {
        if (response.Ret == 0) {
          this.fristAgentTem = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //加载总帐户
    getTotalAccount() {
      var url = "/instopaccount/QueryTopAccountByIns";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.list = response.Data;
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //删除
    DeldateAgentFeeTemp() {
      this.loadingsave = true;
      var url = "/instp/DelFeeTemplate";
      var post = [this.TpCode];
      this.$loginapi.post(url, post, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getAgentFees(this.selectAgentModel.AgentCode);
          this.closeMask();
          this.TpCode = "";
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
    },

    /** 新增修改为一个方法 TpCode为空 则进行添加操作 经纪人添加经纪人模版*/
    ModifyAgentFeeTemp(AgentCode, TpCode, Name, Remark, Details, Type) {
      if (Name == "") {
        this.$message.error({
          message: "请填写经纪人手续费模板名称",
          center: true,
          duration: 800
        });
        return;
      }
      // if (Remark == "") {
      //   this.$message.error("请填写模板说明");
      //   return;
      // }
      let index = 0;
      if (Type == 0) {
        for (var i = 0; i < this.agentsAllFees.length; i++) {
          var item = this.agentsAllFees[i];
          if (item.Name == Name) {
            index++;
            break;
          }
        }
        if (index > 0) {
          // this.$message.error("模板名称【" + Name + "】已存在！");
          this.$alert("模板名称【" + Name + "】已存在！", {});
          return;
        }
      } else {
        for (var i = 0; i < this.agentsAllFees.length; i++) {
          var item = this.agentsAllFees[i];
          if (item.Name == Name && item.TpCode != TpCode) {
            index++;
            break;
          }
        }
        if (index > 0) {
          // this.$message.error("模板名称【" + Name + "】已存在！");
          this.$alert("模板名称【" + Name + "】已存在！", {});
          return;
        }
      }
      index = 0;
      for (var i = 0; i < Details.length; i++) {
        var item = Details[i];
        if (item.Fee.toString().trim() == "" || isNaN(item.Fee)) {
          index++;
          this.$alert("品种【" + item.CommodityName + "】输入有误！", {});
          break;
        }
      }

      if (index > 0) {
        return;
      }

      var url = "/instp/AddOrUpdateFeeTpByAgent";
      var postData = {
        AgentCode: AgentCode,
        TpCode: TpCode,
        Name: Name,
        Remark: Remark,
        Details: Details
      };
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          //this.viewAgetnTree();
          this.getAgentFees(this.selectAgentModel.AgentCode);
          this.closeMask();
          this.AddName = "";
          this.AddRemark = "";
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
    //保存并新建经纪人手续费模板
    AddAgentFeeTempNew(AgentCode, TpCode, Name, Remark, Details) {
      let index = 0;
      for (var i = 0; i < this.agentsAllFees.length; i++) {
        var item = this.agentsAllFees[i];
        if (item.Name == Name) {
          index++;
          return;
        }
      }

      if (index > 0) {
        // this.$message.error("模板名称【" + Name + "】已存在！");
        this.$alert("模板名称【" + Name + "】已存在！", {});
        return;
      }

      index = 0;
      for (var i = 0; i < Details.length; i++) {
        var item = Details[i];
        if (item.Fee.toString().trim() == "" || isNaN(item.Fee)) {
          index++;
          this.$alert("品种【" + item.CommodityName + "】输入有误！", {});
          break;
        }
      }

      if (index > 0) {
        return;
      }

      var url = "/instp/AddOrUpdateFeeTpByAgent";
      if (Name == "") {
        this.$message.error({
          message: "请填写经纪人手续费模板名称",
          center: true,
          duration: 800
        });
        return;
      }
      // if (Remark == "") {
      //   this.$message.error("请填写模板说明");
      //   return;
      // }
      var postData = {
        AgentCode: AgentCode,
        TpCode: TpCode,
        Name: Name,
        Remark: Remark,
        Details: Details
      };
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.AddName = "";
          this.AddRemark = "";
          this.CommodityList = [];
          this.getCommoditylist("");
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

    //      根据指定经纪人获取下级经纪人所需的经纪人手续费模板列表 agent/QueryFeeTemplates
    getsubTp(code) {
      this.fristAgentTem.slice(0, this.fristAgentTem.length);
      this.$loginapi.post("agent/QueryFeeTemplates", code, e => {
        if (e.Ret == 0) {
          this.templateList = e.Data;
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //添加子账户
    addSub(oper) {
      if (this.addSumModel.UserName.trim() == "") {
        this.$alert("子账户名称不能为空", {});
        return;
      }
      if (this.selectZZH == null) {
        this.$alert("请选择总账户", {});
        return;
      }
      if (this.selectBZJMB == null) {
        this.$alert("请选择保证金模板", {});
        return;
      }
      if (this.selectZZHSXFMB == null) {
        this.$alert("请选择子账户手续费模板", {});
        return;
      }
      let textP = this.textPwd.p_len(this.addSumModel.Password);
      if (textP == 1) {
        this.$alert("密码长度不能低于8位", {});
        return;
      } else if (textP == 2) {
        this.$alert("密码中必须是字母和数字组合", {});
        return;
      } else if (textP == 3) {
        this.$alert("密码中必须包含大写字母", {});
        return;
      }
      if (this.Password1.trim() == "") {
        this.$alert("确认密码不能为空", {});
        return;
      }
      if (this.addSumModel.Password.trim() != this.Password1.trim()) {
        this.$alert("确认密码与交易密码不一致", {});
        return;
      }
      if (this.selectFKMB == null) {
        this.$alert("请选择风控模板", {});
        return;
      }
      if (
        !this.selectPHONE.trim().match(/^((1[3,5,7,8][0-9])|(19[9]))\d{8}$/)
      ) {
        this.$alert("请输入合法手机号", {});
        return;
      }
      if (this.addAgentbaseTemp.RiskOprCodes.length < 1) {
        this.$alert("请指定风控员", {});
        return;
      }
      this.addSumModel.FeeTemplateID = this.selectZZHSXFMB.Code;
      this.addSumModel.MarginTemplateID = this.selectBZJMB.Code;
      this.addSumModel.RiskControlTemplateID = this.selectFKMB.Code;
      this.addSumModel.TopAccountNo = this.selectZZH.TopAccountCode;
      this.addSumModel.RiskOprCode = this.addAgentbaseTemp.RiskOprCodes;
      this.addSumModel.AgentCode = this.selectAgentModel.AgentCode;
      this.addSumModel.Phone = this.selectPHONE;

      let postData = jQuery.extend({}, this.addSumModel);
      delete postData.UserCode;
      this.loadingsave = true;
      this.$loginapi.post("insuser/AddInsUsers", postData, e => {
        this.loadingsave = false;
        if (e.Ret == 0) {
          //this.viewAgetnTree();
          if (oper == 2) {
            this.closeMask();
          }
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          this.getJuniorAccount(this.selectAgentModel.AgentCode);
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //      设置经纪人自定义模版
    setAgentcustomTem() {
      if (this.selectZZH == null) {
        // this.$message.error("请选择总账户");
        this.$alert("请选择总账户", {});
        return;
      }
      if (this.selectBZJMB == null) {
        // this.$message.error("请选择保证金模版");
        this.$alert("请选择保证金模版", {});
        return;
      }
      if (this.selectFKMB == null) {
        // this.$message.error("请选择风控模版");
        this.$alert("请选择风控模版", {});
        return;
      }
      if (this.selectZZHSXFMB == null) {
        // this.$message.error("请选择子账户手续费模版");
        this.$alert("请选择子账户手续费模版", {});
        return;
      }

      this.addAgentbaseTemp.MarginTemplateID = this.selectBZJMB.Code;
      this.addAgentbaseTemp.RiskTemplateID = this.selectFKMB.Code;
      this.addAgentbaseTemp.FeeTemplateID = this.selectZZHSXFMB.Code;
      this.addAgentbaseTemp.TopAccountCode = this.selectZZH.TopAccountCode;
      this.addAgentbaseTemp.AgentCode = this.selectAgentModel.AgentCode;
      this.loadingsave = true;
      this.$loginapi.post("agent/ConfigOpenAcTp", this.addAgentbaseTemp, e => {
        this.loadingsave = false;
        if (e.Ret == 0) {
          this.addAgentbaseTemp.AgentCode = "";
          this.addAgentbaseTemp.RiskOprCodes = [];
          this.addAgentbaseTemp.MarginTemplateID = "";
          this.addAgentbaseTemp.RiskTemplateID = "";
          this.addAgentbaseTemp.FeeTemplateID = "";
          this.addAgentbaseTemp.TopAccountCode = "";
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          this.getOpenAcTp(this.selectAgentModel.AgentCode);
          this.closeMask();
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //      树形经纪人
    filterNode(value, data) {
      if (!value) return true;

      var result1 = data.AgentName.indexOf(value) !== -1;
      var result2 = data.AgentCode.indexOf(value) !== -1;

      if (result1 || result2) {
        return true;
      } else {
        return false;
      }
      // return data.AgentName.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.getAllInfo(data.AgentCode);
    },
    //tab栏切换
    //下级经纪人
    subagent(index) {
      $("#agent-tabs > li:eq(" + index + ")")
        .addClass("layui-this")
        .siblings()
        .removeClass("layui-this");
      $(".subagent").css("display", "none");
      $(".subagent:eq(" + index + ")").css("display", "block");
      if (index == 3) {
        this.addSubUser();
      }
      if (index == 1) {
        this.isShows = true;
        this.isShows2 = false;
        this.isShows1 = false;
        return;
      }
      if (index == 0) {
        this.isShows = false;
        this.isShows1 = false;
        this.isShows2 = false;
        return;
      }
      if (index == 2) {
        this.isShows = false;
        this.isShows1 = false;
        this.isShows2 = false;
        return;
      }
      if (index == 3) {
        this.isShows = false;
        this.isShows1 = true;
        this.isShows2 = false;
        return;
      }
      if (index == 4) {
        this.isShows = false;
        this.isShows1 = false;
        this.isShows2 = true;
        return;
      }
    },

    //计算选中信息
    calcChooseTem() {
      if (this.subAccountFeeTps == null) return;
      var index = 0;
      this.Tps.splice(0, this.Tps.length);
      this.subAccountFeeTps.forEach(item => {
        if (this.availableSubAccountFeeTps == null) {
          index++;
        } else {
          this.availableSubAccountFeeTps.forEach(e => {
            if (e.Code == item.TpCode) {
              this.Tps.push(item.TpCode);
            }
            index++;
          });
        }
      });
      index = 0;
      this.subAccountFeeTps.forEach(item => {
        if (this.Tps.indexOf(item.TpCode) == -1) {
          $(".kacc" + index + "")
            .addClass("notcheckedItem")
            .removeClass("checkedItem");
        } else {
          $(".kacc" + index + "")
            .addClass("checkedItem")
            .removeClass("notcheckedItem");
        }
        index++;
      });

      if (this.subAccountFeeTps.length == this.Tps.length) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
    },

    //开启 可用模板界面
    openAvaliableTem() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      if (this.selectAgentModel.Level != 0) {
        this.$alert("只有一级经纪人可以设置模板信息");
        return;
      }
      this.getSubTem(); //获取全部可用模板
      this.getAvalibleTem(this.selectAgentModel.AgentCode); //获取已经配置模板信息
      $("#setSubtem").fadeIn("fast");
    },

    //风控员全选
    checkAllTps() {
      let index = 0;
      //如果全不选
      if (this.subAccountFeeTps.length == this.Tps.length) {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        this.subAccountFeeTps.forEach(item => {
          this.Tps.remove(item.TpCode);
        });
        this.subAccountFeeTps.forEach(item => {
          $(".kacc" + index + "")
            .addClass("notcheckedItem")
            .removeClass("checkedItem");
          index++;
        });
      } else {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
        this.subAccountFeeTps.forEach(item => {
          this.Tps.remove(item.TpCode);
        });
        this.subAccountFeeTps.forEach(item => {
          this.Tps.push(item.TpCode);
          $(".kacc" + index + "")
            .addClass("checkedItem")
            .removeClass("notcheckedItem");
          index++;
        });
      }
    },

    //风控员部分选择
    checkedTps(index, code) {
      if (this.Tps.indexOf(code) <= -1) {
        this.Tps.push(code);
        $(".kacc" + index + "")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        this.Tps.remove(code);
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
      if (this.Tps.length == this.subAccountFeeTps.length) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
    },

    //获取已经配置模板信息
    getAvalibleTem(code) {
      if (this.availableSubAccountFeeTps != null) {
        this.availableSubAccountFeeTps.splice(
          0,
          this.availableSubAccountFeeTps.length
        );
      }
      var url = "agent/QueryAgentAvailableFeeTemplate";
      this.$loginapi.post(url, code, e => {
        if (e.Ret == 0) {
          this.availableSubAccountFeeTps = e.Data;
          setTimeout(this.calcChooseTem, 50);
          //this.calcChooseTem();
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //获取可设置模板列表
    getSubTem() {
      //this.markArr =
      if (this.subAccountFeeTps != null) {
        this.subAccountFeeTps.splice(0, this.subAccountFeeTps.length);
      }
      this.$loginapi.postWithPage("/instp/QueryUserFeeTps", 1, 50, "", e => {
        if (e.Ret == 0) {
          this.subAccountFeeTps = e.Data;
          setTimeout(this.calcChooseTem, 50);
          //this.calcChooseTem();
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //设置可用模板
    setSubTem() {
      var post = {
        TpsId: this.Tps,
        AgentCode: this.selectAgentModel.AgentCode
      };
      this.loadingsave = true;
      this.$loginapi.post("agent/ConfigAvailableFeeTps", post, e => {
        this.loadingsave = false;
        if (e.Ret == 0) {
          this.Tps.splice(0, this.Tps.length);
          this.$message.success({
            message: "设置成功！",
            center: true,
            duration: 800
          });
          this.closeMask();
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //弹出删除经纪人框
    delAgent() {
      //如果是主机构管理员
      // if (this.$store.state.userInfo.IsMain) {
      $("#delAgent").fadeIn("fast");
      // } else {
      //   this.$alert("无删除权限");
      // }
    },

    edit(obj) {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }

      //如果是一级经纪人
      if (obj.Level == 0) {
        this.getFirstAgentTemlist();
      } else {
        this.getAgentFees(obj.ParentID); //获取经纪人手续费模板
      }
      this.editObj = jQuery.extend({}, obj);
      //this.editObj.Remark = "";
      this.selectDLSXMB = {
        TpCode: this.editObj.AgentFeeTemplateID,
        Name: this.editObj.AgentFeeTemplateName
      };
      $("#editAgent").fadeIn("fast");
    },

    //开仓权限、跟单权限保存
    editPower(oper, code) {
      var result = code == 0 ? false : true;
      if (this.id_list.length == 0) {
        // this.$message.error("请选择子账户");
        this.$alert("请选择子账户", {});
        return;
      }
      var post = (post = {
        UserCodeList: this.id_list,
        IsAllow: result
      });
      var url = "";
      if (oper == 0) {
        url = "insuser/ModifyInsUsersOpenPositionPower";
      } else {
        url = "insuser/ModifyInsUsersFollowPower";
      }

      this.$loginapi.post(url, post, e => {
        if (e.Ret == 0) {
          //this.id_list.splice(0, this.id_list.length);
          $(".total-checked")[0].checked = false;

          this.getJuniorAccount(this.selectAgentModel.AgentCode);
          this.closeMask();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(e.Msg);
          this.$alert(e.Msg, {});
        }
      });
    },

    //显示 开仓或者跟单权限窗口
    openPower(oper) {
      if (this.id_list.length == 0) {
        // this.$message.error("请选择子账户");
        this.$alert("请选择子账户", {});
        return;
      }

      if (oper == 0) {
        this.selectQX = {};
        //开仓权限
        $("#divKcqx").fadeIn("fast");
      } else {
        //跟单权限
        $("#divGdqx").fadeIn("fast");
      }
    },

    add() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }

      if (
        JSON.stringify(this.getOpenAcTps) == "{}" ||
        this.getOpenAcTps.FeeTpName == ""
      ) {
        // this.$message.error("请先配置经纪人开户模版");
        this.$alert("请先配置经纪人开户模版", {});
        return;
      }

      if (this.agentsAllFees == null || this.agentsAllFees.length == 0) {
        // this.$message.error("请先配置经纪人手续费模版");
        this.$alert("请先配置经纪人手续费模版", {});
        return;
      }

      this.addmodel.ParentID = "";
      this.addmodel.AgentCode = "";
      this.addmodel.AgentName = "";
      this.addmodel.AgentFeeTemplateID = "";
      this.addmodel.AgentFeeTemplateName = "";
      this.addmodel.Password = "";
      this.addmodel.Remark = "";
      this.Password1 = "";
      this.selectDLSXMB = null;

      this.getsubTp(this.selectAgentModel.AgentCode); //获取经纪人手续费模板
      $("#addAgent").fadeIn("fast");
    },
    //新增一级经纪人
    addFirst() {
      this.addmodel.ParentID = "";
      this.addmodel.AgentCode = "";
      this.addmodel.AgentName = "";
      this.addmodel.AgentFeeTemplateID = "";
      this.addmodel.AgentFeeTemplateName = "";
      this.addmodel.Password = "";
      this.addmodel.Remark = "";
      this.Password1 = "";
      this.selectDLSXMB = null;
      this.getFirstAgentTemlist(); //获取经纪人手续费模板
      $("#addFirstAgent").fadeIn("fast");
    },

    //经纪人风控全不选
    clearDLFK() {
      let index = 0;
      this.risker.forEach(item => {
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        index++;
      });

      $(".kac1")
        .addClass("notcheckedItem")
        .removeClass("checkedItem");
    },

    //添加经纪人开户模板
    addDLKH() {
      this.selectZZH = null;
      this.selectZZHSXFMB = null;
      this.selectBZJMB = null;
      this.selectFKMB = null;
      if (
        this.getOpenAcTps.MarginTpName != null &&
        this.getOpenAcTps.MarginTpName != ""
      ) {
        // this.$message.error("经纪人开户模板已设置");
        this.$alert("经纪人开户模板已设置", {});
        return;
      }

      this.addSubUser();
      this.clearDLFK();
      $("#selfTp").fadeIn("fast");
    },
    //编辑经纪人开户
    editDLKH() {
      if (
        this.getOpenAcTps.MarginTpName == null ||
        this.getOpenAcTps.MarginTpName == ""
      ) {
        // this.$message.error("暂无需要修改的数据");
        this.$alert("暂无需要修改的数据", {});
        return;
      }

      if (JSON.stringify(this.getOpenAcTps) == "{}") {
        // this.$message.error("暂无需要修改的数据");
        this.$alert("暂无需要修改的数据", {});
        return;
      }
      this.addSubUser();
      this.clearDLFK();
      this.addAgentbaseTemp.RiskOprCodes.splice(
        0,
        this.addAgentbaseTemp.RiskOprCodes.length
      );
      this.getOpenAcTps.RiskOprs.forEach(item => {
        this.addAgentbaseTemp.RiskOprCodes.push(item.RiskOprCode);
      });

      let index = 0;
      // this.risker.forEach(item => {
      //   $(".kacc" + index + "")
      //     .addClass("notcheckedItem")
      //     .removeClass("checkedItem");
      //   index++;
      // });
      index = 0;
      this.risker.forEach(item => {
        for (var i = 0; i < this.addAgentbaseTemp.RiskOprCodes.length; i++) {
          if (this.addAgentbaseTemp.RiskOprCodes[i] == item.RiskOprCode) {
            $(".kacc" + index + "")
              .addClass("checkedItem")
              .removeClass("notcheckedItem");
            break;
          }
        }
        index++;
        // if (this.addAgentbaseTemp.RiskOprCodes.indexOf(item.RiskOprCode) > -1) {
        //   $(".kacc" + index + "")
        //     .addClass("checkedItem")
        //     .removeClass("notcheckedItem");
        //}
      });
      if (
        this.risker.length == this.addAgentbaseTemp.RiskOprCodes.length ||
        this.risker.length < this.addAgentbaseTemp.RiskOprCodes.length
      ) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      }
      this.selectZZH = {
        TopAccountCode: this.getOpenAcTps.TopAccountCode,
        TopAccountName: ""
      };
      this.selectBZJMB = {
        Code: this.getOpenAcTps.MarginTemplateID,
        Name: this.getOpenAcTps.MarginTpName
      };
      this.selectFKMB = {
        Code: this.getOpenAcTps.RiskTemplateID,
        Name: this.getOpenAcTps.RiskTpName
      };
      this.selectZZHSXFMB = {
        Code: this.getOpenAcTps.FeeTemplateID,
        Name: this.getOpenAcTps.FeeTpName
      };

      this.addAgentbaseTemp.MarginTemplateID = this.getOpenAcTps.MarginTemplateID;
      this.addAgentbaseTemp.RiskTemplateID = this.getOpenAcTps.RiskTemplateID;
      this.addAgentbaseTemp.FeeTemplateID = this.getOpenAcTps.FeeTemplateID;
      this.addAgentbaseTemp.TopAccountCode = this.getOpenAcTps.TopAccountCode;
      $("#selfTpEdit").fadeIn("fast");
    },

    //添加经纪人手续费模板
    addDLSXFMB() {
      this.AddName = "";
      this.AddRemark = "";
      this.getCommoditylist("");
      $("#addAgentFeeTemp").fadeIn("fast");
    },
    //编辑经纪人手续费模板
    editDLSXFMB(item) {
      this.getCommoditylist(item.TpCode);
      this.TpCode = item.TpCode;
      this.EditName = item.Name;
      this.EditRemark = item.Remark;
      $("#editAgentFeeTemp").fadeIn("fast");
    },

    //删除经纪人手续费模板
    delDLSXFMB(item) {
      this.TpCode = item.TpCode;
      $("#delAgentFeeTemp").fadeIn("fast");
    },

    addSubUser() {
      //        获取保证金模板列表
      this.$loginapi.postWithPage("/instp/QueryMarginTps", 1, 10, "", e => {
        this.marginTps = e.Data;
      });
      //        获取风控模板列表
      this.$loginapi.postWithPage("/instp/QueryRiskTps", 1, 10, "", e => {
        this.riskTps = e.Data;
      });
      //        获取子账户手续费模板列表
      // this.$loginapi.postWithPage("/instp/QueryUserFeeTps", 1, 10, "", e => {
      //   if (this.selectAgentModel.Level == 0) {
      //     this.availableSubAccountFeeTps = e.Data;
      //     //this.subAccountTps = e.Data;
      //   }
      // });

      var url = "agent/QueryAgentAvailableFeeTemplate";
      var parents = this.selectAgentModel.ParentIds.split(",");
      var code = "";
      if (this.selectAgentModel.Level != 0) {
        code = parents[0];
      } else {
        code = this.selectAgentModel.AgentCode;
      }
      this.$loginapi.post(url, code, e => {
        if (e.Ret == 0) {
          this.subAccountTps = e.Data;
          this.availableSubAccountFeeTps = e.Data;
        }
      });

      //        获取风控员列表
      this.$loginapi.postWithPage(
        "insriskopr/QueryRiskOprsByIns",
        1,
        10,
        "",
        e => {
          this.risker = e.Data;
        }
      );
      //获取总账户代码
      this.$loginapi.postWithPage(
        "/instopaccount/QueryTopAccountByIns",
        1,
        10,
        "",
        e => {
          this.parentList = e.Data;
        }
      );
      //        获取经纪人手续模板
      this.$loginapi.postWithPage("/instp/QueryAgentFeeTps", 1, 10, "", e => {
        this.AgentFeeTps = e.Data;
      });
    },
    transMoney() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }
      $("#agentMoney").fadeIn("fast");
    },
    resetAgent() {
      $("#resetAgent").fadeIn("fast");
    },

    //重置经纪人密码
    resetPassword() {
      if (
        this.selectAgentModel == null ||
        this.selectAgentModel.AgentCode == null ||
        this.selectAgentModel.AgentCode == ""
      ) {
        this.$alert("请选择经纪人");
        return;
      }

      if (this.selectAgentModel.Password == "******") {
        this.$alert("存在隐私信息，不允许重置");
        return;
      }

      // this.getRandomPass();
      $("#resetAgentPwd").fadeIn("fast");
    },

    //重置子账户密码
    resetSubPassword() {
      if (this.id_list.length == 0) {
        //this.$message.error("请选择需要重置密码的子账户");
        this.$alert("请选择需要重置密码的子账户", {});
        return;
      }
      $("#resetSubPwd").fadeIn("fast");
    },

    //      设置经纪人费模板
    setbassTemP() {
      //        获取保证金模板列表
      this.$loginapi.postWithPage("/instp/QueryMarginTps", 1, 10, "", e => {
        this.marginTps = e.Data;
      });
      //        获取风控模板列表
      this.$loginapi.postWithPage("/instp/QueryRiskTps", 1, 10, "", e => {
        this.riskTps = e.Data;
      });
      //        获取子账户保证金模板列表
      this.$loginapi.postWithPage("/instp/QueryUserFeeTps", 1, 10, "", e => {
        this.subAccountTps = e.Data;
      });
      //        获取风控员列表
      this.$loginapi.postWithPage(
        "insriskopr/QueryRiskOprsByIns",
        1,
        10,
        "",
        e => {
          this.risker = e.Data;
        }
      );
      //获取总账户代码
      this.$loginapi.postWithPage(
        "/instopaccount/QueryTopAccountByIns",
        1,
        10,
        "",
        e => {
          this.parentList = e.Data;
        }
      );
      //$("#selfTp").fadeIn("fast");
    },

    //风控员全选
    checkAll() {
      this.addAgentbaseTemp.AgentCode = this.selectAgentModel.AgentCode;
      let index = 0;

      //如果全不选
      if (this.risker.length == this.addAgentbaseTemp.RiskOprCodes.length) {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        this.risker.forEach(item => {
          this.addAgentbaseTemp.RiskOprCodes.remove(item.RiskOprCode);
        });
        this.risker.forEach(item => {
          $(".kacc" + index + "")
            .addClass("notcheckedItem")
            .removeClass("checkedItem");
          index++;
        });
      } else {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
        this.risker.forEach(item => {
          this.addAgentbaseTemp.RiskOprCodes.remove(item.RiskOprCode);
        });
        this.risker.forEach(item => {
          this.addAgentbaseTemp.RiskOprCodes.push(item.RiskOprCode);
          $(".kacc" + index + "")
            .addClass("checkedItem")
            .removeClass("notcheckedItem");
          index++;
        });
      }
    },

    //风控员部分选择
    checkeddd(index, code) {
      this.addAgentbaseTemp.AgentCode = this.selectAgentModel.AgentCode;
      if (this.addAgentbaseTemp.RiskOprCodes.indexOf(code) <= -1) {
        this.addAgentbaseTemp.RiskOprCodes.push(code);
        $(".kacc" + index + "")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        this.addAgentbaseTemp.RiskOprCodes.remove(code);
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
      if (this.addAgentbaseTemp.RiskOprCodes.length == this.risker.length) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
    },

    selectedAll() {
      this.id_list = []; //
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.juniorAccount.length; i++) {
          this.id_list.push(this.juniorAccount[i].UserCode);
        }
      }
    },
    selectedSub(code, index) {
      // 1.1 实现让每个旗舰店的里面元素控制旗舰店的头部选框
      var th = $("#total-checked").parent(),
        td = $(".sub-checked");
      this.choseBox().backWord(td, th.find(":input"));
      if ($(".sub-checked" + index)[0].checked) {
        this.id_list.push(code);
      } else {
        this.id_list.remove(code);
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

    select() {
      //点击输入框弹出下拉框 risker
      if (this.isdisplay) {
        $(".drop-list").attr("class", "drop-list");
      } else {
        $(".drop-list").attr("class", "drop-list hide");
      }
      this.isdisplay = !this.isdisplay;
    },
    selects(index) {
      if (this.isdisplay) {
        $(".drop-list" + index).attr("class", "drop-list" + index);
      } else {
        $(".drop-list" + index).attr("class", "drop-list" + index + " hide");
      }
      this.isdisplay = !this.isdisplay;

      // $(".drop-list" + index + "").toggleClass("hide");
    },
    //    选中之后
    selected(value, obj) {
      //点击下拉框列表的内容把文字填充到输入框里面
      $("#AgentFeeTemplateName").val(value);
      $("#AgentFeeTemplateName1").val(value);
      $("#choose").val(value);
      $("#editTmp").val(value);
      $("#KcqxText").val(value);
      $("#GdqxText").val(value);
      $("#SxfmbText").val(value);
      $(".drop-list").attr("class", "drop-list hide");
      $(".drop-list5").attr("class", "drop-list hide");
      this.isdisplay = !this.isdisplay;
      this.obj = obj;
    },
    blurs() {
      $(".drop-list5").attr("class", "drop-list hide");
      $(".drop-list").attr("class", "drop-list hide");
      this.isdisplay = !this.isdisplay;
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
    },

    toDx(n) {
      //阿拉伯数字转换函数
      switch (n) {
        case "10":
          return "十";
        case "1":
          return "一";
        case "2":
          return "二";
        case "3":
          return "三";
        case "4":
          return "四";
        case "5":
          return "五";
        case "6":
          return "六";
        case "7":
          return "七";
        case "8":
          return "八";
        case "9":
          return "九";
      }
    },
    // 转换算法主函数
    NumberToChinese(n) {
      if (n.toString().length > 10) {
        n = this.AgentTransferModel.Money = this.AgentTransferModel.Money.substring(
          0,
          10
        );
      }
      var fraction = ["角", "分"];
      var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
      var head = n < 0 ? "欠" : "";
      n = Math.abs(n);
      var s = "";
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
      }
      s = s || "整";
      n = Math.floor(n);
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = "";
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
      }
      this.text = s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整");
    },
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getlist();
    }
  }
};
</script>

<style scoped>
</style>
