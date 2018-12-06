<template>
  <div class="risktemplates_info">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <!--带表格的面板-->
          <div class="panel panel-default panel-1">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye mamo"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="javascript:;">模板</a>
                  </li>
                  <li class="active">
                    <a class="active" @click="Back()">风控模板</a>
                  </li>
                  <li class="active">风控模板信息</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <div class="col-md-9">
                <!--<span class="iconfont icon-mokuaiguanli icon-bg"></span>-->
                <span class="fz account-info">模板详情</span>
                <span></span>
                <span class="account-name">({{Name}})</span>
              </div>
              <div class="col-md-3 text-right">
                <div class="btn-group margin-Top" role="group" aria-label="...">
                  <!-- 暂时屏蔽掉新增功能 需要接口提供新增后返回实体信息 -->
                  <button type="button" class="btn btn-info" @click="addData()" v-show="false">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <button type="button" class="btn btn-default" @click="edit()">编辑</button>
                  <button type="button" class="btn btn-default" @click="del(TpCode)">删除</button>
                </div>
              </div>
            </div>
            <div class="panel panel-default account-table">
              <table class="table account-table-1">
                <thead>
                  <tr>
                    <th>模板ID</th>
                    <th>模板说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{TpCode}}</td>
                    <td>{{Remark}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-9 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this">相关</li>
                    <li></li>
                    <li></li>
                  </ul>

                  <div class="layui-tab-content">

                    <nav class="navbar navbar-default nav-other positon-r">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->
                        <div class="folded" @click="foldPz()">
                        </div>

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          可交易品种
                        </p>

                        <p class="navbar-text navbar-right btn-right-1">
                          <!--<button class="btn btn-default btn-margin" type="submit">出入金</button>-->
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;" @click="showCommodityAdd()">
                            <span class="fa fa-plus pulp"></span>新增
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;margin-right: 15px;" @click="showCommodityDel('')">删除</button>
                        </p>

                        <div class="children_box_table" v-show="isPzShow">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th style="width:4%" class="child-table-th">序号</th>
                                <th style="width:4%"><input type="checkbox" id="total-checked1" class="total-checked1" @click="selectedAll(1)"></th>
                                <th style="width:6%" class="child-table-th">品种代码</th>
                                <th style="width:6%" class="child-table-th">品种名称</th>
                                <th style="width:6%" class="child-table-th">合约类型</th>
                                <th style="width:6%" class="child-table-th">开仓手数</th>
                                <th style="width:6%" class="child-table-th">撤单笔数</th>
                                <th style="width:6%" class="child-table-th">净持仓手数</th>
                                <th style="width:6%" class="child-table-th">总持仓手数</th>
                                <th style="width:8%" class="child-table-th">单笔开仓最大数量</th>
                                <th style="width:4%" class="child-table-th">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in ListRiskCommodity">
                                <td style="width:4%">&nbsp;{{index+1}}</td>
                                <td style="width:4%" class="sub-checked1" id="sub-checked1">
                                  <input type="checkbox" :class="ClassName+index + '1'" @click="selectedSub(item.ID,index,1)">
                                </td>
                                <td style="width:6%">{{item.SysCommodityInfo.CommodityNo}}</td>
                                <td style="width:6%">
                                  {{item.SysCommodityInfo.CommodityName}}
                                </td>
                                <td style="width:6%">{{item.ToMainContract == true ? "主力合约" : "全部合约"}}</td>
                                <td style="width:6%">
                                  {{item.OpenPosition}}
                                </td>
                                <td style="width:6%">{{item.CancelPosition}}</td>
                                <td style="width:6%">
                                  {{item.NetPosition}}
                                </td>
                                <td style="width:6%">{{item.TotalPosition}}</td>
                                <td style="width:8%">
                                  {{item.SingleOpenPositionMax}}
                                </td>
                                <td style="width:4%">
                                  <div class="btn-group" role="group" aria-label="...">
                                    <div class="btn-group" role="group">
                                      <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <!--Dropdown-->
                                        <span class="caret"></span>
                                      </button>
                                      <ul class="dropdown-menu dropdown-menu-lef">
                                        <li>
                                          <a class="param-edit" @click="showCommodityEdit(item)">编辑</a>
                                        </li>
                                        <li>
                                          <a class="param-del" @click="showCommodityDel(item.ID)">删除</a>
                                        </li>
                                        <!--<li><a href="#">Dropdown link</a></li>-->
                                      </ul>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <nav class="navbar navbar-default nav-other positon-r">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->
                        <div class="folded" @click="foldRm()">
                        </div>
                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          资金风控指标设置
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <!--<button class="btn btn-default btn-margin" type="submit">出入金</button>-->
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px; margin-right: 15px;" v-show="Fkzbsz == '暂无设置' ? true:false" @click="showRmSetAdd()">
                            <span class="fa fa-plus pulp"></span>设置
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;" v-show="Fkzbsz == '暂无设置' ? false:true" @click="showRmSetEdit()">
                            <span class="fa fa-plus pulp"></span>编辑
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;margin-right: 15px;" v-show="Fkzbsz == '暂无设置' ? false:true" @click="showRmSetDel()">删除</button>
                        </p>

                        <div class="children_box_table" v-show="isRmShow">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th style="width:100%" class="child-table-th">
                                  <h2>{{Fkzbsz}}</h2>
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <nav class="navbar navbar-default nav-other positon-r">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->
                        <div class="folded" @click="foldLo()">
                        </div>
                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          亏损风控指标设置
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <!--<button class="btn btn-default btn-margin" type="submit">出入金</button>-->
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px; margin-right: 15px;" v-show="Fkkssz == '暂无设置' ? true:false" @click="showLoSetAdd()">
                            <span class="fa fa-plus pulp"></span>设置
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;" v-show="Fkkssz == '暂无设置' ? false:true" @click="showLoSetEdit()">
                            <span class="fa fa-plus pulp"></span>编辑
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;margin-right: 15px;" v-show="Fkkssz == '暂无设置' ? false:true" @click="showLoSetDel()">删除</button>
                        </p>

                        <div class="children_box_table" v-show="isLoShow">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th style="width:100%" class="child-table-th">
                                  <h2>{{Fkkssz}}</h2>
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <nav class="navbar navbar-default nav-other positon-r">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->
                        <div class="folded" @click="foldKC()">
                        </div>

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          定时砍仓设置
                        </p>

                        <p class="navbar-text navbar-right btn-right-1">
                          <!--<button class="btn btn-default btn-margin" type="submit">出入金</button>-->
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;" @click="showCutPositionAdd()">
                            <span class="fa fa-plus pulp"></span>新增
                          </button>
                          <button type="button" class="btn btn-default btn-sm" style="margin-top: 8px;margin-right: 15px;" @click="showCutPositionDel('')">删除</button>
                        </p>

                        <div class="children_box_table" v-show="isKcShow">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th style="width:4%" class="child-table-th">序号</th>
                                <th style="width:4%"><input type="checkbox" id="total-checked2" class="total-checked2" @click="selectedAll(2)"></th>
                                <th style="width:6%" class="child-table-th">开始时间</th>
                                <th style="width:6%" class="child-table-th">结束时间</th>
                                <th style="width:6%" class="child-table-th">品种代码</th>
                                <th style="width:6%" class="child-table-th">开仓权限</th>
                                <th style="width:4%" class="child-table-th">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in ListRiskCutPosition">
                                <td style="width:4%">&nbsp;{{index+1}}</td>
                                <td style="width:4%" class="sub-checked2" id="sub-checked2">
                                  <input type="checkbox" :class="ClassName+index + '2'" @click="selectedSub(item.ID,index,2)">
                                </td>
                                <td style="width:6%">{{FromatView(item,0)}}</td>
                                <td style="width:6%">{{FromatView(item,1)}}</td>
                                <!-- <td style="width:6%">{{FromatView(item,0) item.From | datefmt("HH:mm")}}</td>
                                <td style="width:6%">{{FromatView(item,1)item.To | datefmt("HH:mm")}}</td> -->
                                <td style="width:6%">
                                  {{item.CommodityNos == "all" ? "全部" : item.CommodityNos}}
                                </td>
                                <td style="width:6%">{{item.PositionOpType == true ? "允许开仓":"禁止开仓"}}</td>
                                <td style="width:4%">
                                  <div class="btn-group" role="group" aria-label="...">
                                    <div class="btn-group" role="group">
                                      <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <!--Dropdown-->
                                        <span class="caret"></span>
                                      </button>
                                      <ul class="dropdown-menu dropdown-menu-lef">
                                        <li>
                                          <a class="param-edit" @click="showCutPositionEdit(item)">编辑</a>
                                        </li>
                                        <li>
                                          <a class="param-del" @click="showCutPositionDel(item.ID)">删除</a>
                                        </li>
                                        <!--<li><a href="#">Dropdown link</a></li>-->
                                      </ul>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                          <button class="btn btn-default btn-margin" type="submit" v-show="false">新增</button>
                        </p>
                        <!-- </div> -->
                      </div>
                    </nav>

                    <div class="account-info-1 flex_wa" v-show="isShow">
                      <div class="account-info-1-box " v-for="item in list">
                        <div class="account-icon">
                          <span class="icon_sub"></span>
                        </div>
                        <div class="account-info-1-box-content">
                          <a class="child_link" @click="subaccountinfo(item.InsUserCode)">{{item.InsUserName}}</a>
                          <p class="child_content">子账户代码：{{item.InsUserCode}}</p>
                          <p class="child_content">总账户代码：{{item.InsTopAccount}}</p>
                        </div>
                      </div>
                      <p class="navbar-text navbar-right btn-right-2">
                        <button class="btn btn-default btn-margin" v-show="UserCount >= 4 ? true : false" type="submit" @click="More()">查看更多
                        </button>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
              <div class="col-md-3 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this">使用说明</li>
                    <li></li>
                    <li></li>
                  </ul>
                  <div class="layui-tab-content ">
                    <h3 class="account-sub-title">风控模板</h3>
                    <p class="account-sub-content">子账户通过选择风控模板来决定其风控权限。风控模板提供可交易品种、资金指标、定时砍仓3种风控设置。</p>
                    <div class="account-sub-contents">
                      <ul>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">1</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">可交易品种</h3>
                            <p class="account-sub-content-1">设置可交易品种权限，分主力合约和全部合约。同时限制该品种的开仓手数、撤单笔数、净持仓手数和总持仓手数。</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">2</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">资金指标风控</h3>
                            <p class="account-sub-content-1">当子账户的动态权益、风险度或可用资金在达到设置条件时，设置子账户的开仓权限。</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">3</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">定时砍仓开仓限制</h3>
                            <p class="account-sub-content-1">设置子账户在某一段时间内，如果达到设置的指标条件，就进行仓位调整使参数达到设置值为止，或不进行仓位调整。</br> 设置子账户在某一段时间内，进行仓位调整使参数达到设置值为止，或不进行仓位调整。
                            </p>
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
    <!--新增品种权限-->
    <div id="addCommodity" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增品种权限</div>
          <div class="panel-body">
            <div class="content clear">
              <div class="headmo0">
                <div class="headmo1">
                  <ul>
                    <li>品种</li>
                    <li>合约</li>
                    <li>开仓手数</li>
                    <li>撤单笔数</li>
                    <li>净持仓手数</li>
                    <li>总持仓手数</li>
                    <li>单笔开仓最大手数</li>
                    <li></li>
                  </ul>
                </div>

              </div>
              <form class="form-inline form-inline1" novalidate="" role="form">

                <div class="bodymo2">
                  <ul class="bodymo1" v-for="item in AddCommodityList">
                    <li>
                      <el-select v-model="item.SysCommodityID" value-key="CommodityNO" size="small" style="width:91%" placeholder="请选择品种">
                        <el-option v-for="(itemC,index) in CommidityTypeList" :key="index" :label="itemC.CommodityName + '(' + itemC.CommodityNO + ')'" :value="itemC.SysCommodityID">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <el-select v-model="item.ToMainContract" value-key="Code" size="small" style="width:91%">
                        <el-option v-for="(itemC,index) in ContractTypeList" :key="index" :label="itemC.Name" :value="itemC.Code">
                        </el-option>
                      </el-select>
                    </li>
                    <li><input class="text2" type="text" v-model="item.OpenPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.CancelPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.NetPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.TotalPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.SingleOpenPositionMax" maxlength="7"></li>
                    <li>
                      <button aria-label="Left Align" class="btn btnjia" type="button" @click="DelNewCommodity(item)" v-show="AddCommodityList.length > 1 ? true : false">
                        <span class="bodymo6"></span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="bodymo3">
                  <button type="button" class="btn btn-default " @click="AddNewCommodity()">
                    <span class="fa fa-plus pulp"></span>新增品种
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveCommodityInfo(0,0)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveCommodityInfo(1,0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑品种权限-->
    <div id="editCommodity" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑品种权限</div>
          <div class="panel-body">
            <div class="content clear">
              <div class="headmo0">
                <div class="headmo1">
                  <ul>
                    <li>品种</li>
                    <li>合约</li>
                    <li>开仓手数</li>
                    <li>撤单笔数</li>
                    <li>净持仓手数</li>
                    <li>总持仓手数</li>
                    <li>单笔开仓最大手数</li>
                    <li></li>
                  </ul>
                </div>

              </div>
              <form class="form-inline form-inline1" novalidate="" role="form">

                <div class="bodymo2">
                  <ul class="bodymo1" v-for="item in AddCommodityList">
                    <li>
                      <el-select v-model="item.SysCommodityID" disabled value-key="CommodityNO" placeholder="请选择品种">
                        <el-option v-for="(itemC,index) in CommidityTypeList" :key="index" :label="itemC.CommodityName + '(' + itemC.CommodityNO + ')'" :value="itemC.SysCommodityID">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <el-select v-model="item.ToMainContract" value-key="Code">
                        <el-option v-for="(itemC,index) in ContractTypeList" :key="index" :label="itemC.Name" :value="itemC.Code">
                        </el-option>
                      </el-select>
                    </li>
                    <li><input class="text2" type="text" v-model="item.OpenPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.CancelPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.NetPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.TotalPosition" maxlength="7"></li>
                    <li><input class="text2" type="text" v-model="item.SingleOpenPositionMax" maxlength="7"></li>
                    <li>
                      <button aria-label="Left Align" class="btn btnjia" type="button" @click="DelNewCommodity(item)" v-show="AddCommodityList.length > 1 ? true : false">
                        <span class="bodymo6"></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveCommodityInfo(1,1)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--删除品种权限-->
    <div id="delCommodity" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:40%">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除品种权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确定要删除该品种权限吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteCommodityInfo(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增资金风控指标-->
    <div id="addRmSet" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增资金风控指标</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="modal-body bodyzf">
                  <div class="bodyzf1">
                    <p class="bodyzf10">先决条件</p>
                    <div class="bodyzf12">
                      <span> 当风险度高于</span>
                      <span class="bodyzf13">
                        <input class="textzf5 ng-untouched ng-pristine ng-invalid" v-model="RiskRm.RmRevenueRate" name="ParamValue" maxlength="10">
                      </span> %时
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">开仓权限</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="forbidopen" type="radio" checked="true" @click="SetKcqx(true)">
                        <span class="bodyzf24">允许开仓</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" name="forbidopen" checked="true" type="radio" @click="SetKcqx(false)">
                        <span class="bodyzf26">禁止开仓</span>
                      </p>
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">执行动作</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="adjustposition" type="radio" @click="SetZxdz(0)">
                        <span class="bodyzf24">不调整</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" checked="true" name="adjustposition" type="radio" @click="SetZxdz(1)">
                        <span class="bodyzf26">全部清仓</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveRmSetInfo()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--编辑资金风控指标-->
    <div id="editRmSet" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑资金风控指标</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="modal-body bodyzf">
                  <div class="bodyzf1">
                    <p class="bodyzf10">先决条件</p>
                    <div class="bodyzf12">
                      <span> 当风险度高于</span>
                      <span class="bodyzf13">
                        <input class="textzf5 ng-untouched ng-pristine ng-invalid" v-model="RiskRm.RmRevenueRate" name="ParamValue" maxlength="10">
                      </span> %时
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">开仓权限</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input id="Yxkc" class="radio4" name="forbidopen" type="radio" checked="true" @click="SetKcqx(true)">
                        <span class="bodyzf24">允许开仓</span>
                      </p>
                      <p class="bodyzf23"><input id="Jzkc" class="radio5" checked="true" name="forbidopen" type="radio" @click="SetKcqx(false)">
                        <span class="bodyzf26">禁止开仓</span>
                      </p>
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">执行动作</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input id="Btz" class="radio4" name="adjustposition" type="radio" @click="SetZxdz(0)">
                        <span class="bodyzf24">不调整</span>
                      </p>
                      <p class="bodyzf23"><input id="Qbqc" class="radio5" checked="true" name="adjustposition" type="radio" @click="SetZxdz(1)">
                        <span class="bodyzf26">全部清仓</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveRmSetInfo()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--删除资金风控指标-->
    <div id="delRmSet" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:40%">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除资金风控指标</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除该资金风控指标吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteRmSetInfo()">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增亏损资金风控指标-->
    <div id="addLoSet" class="mask">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增亏损资金风控指标</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="modal-body bodyzf">
                  <div class="bodyzf1">
                    <p class="bodyzf10">先决条件</p>
                    <div class="bodyzf12">
                      <span> 当
                        <el-select v-model="RiskLo.LossType" value-key="Code" size="mini" @change="changeLossType">
                          <el-option v-for="(item,index) in LossTypeList" :key="index" :label="item.Name" :value="item.Code">
                          </el-option>
                        </el-select>
                        高于</span>
                      <span class="bodyzf13">
                        <input class="textzf5 ng-untouched ng-pristine ng-invalid" v-model="RiskLo.LossRevenueRate" name="ParamValue" maxlength="10">
                      </span> {{LossTypeUnit}}时
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">开仓权限</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="forbidopen" type="radio" checked="true" @click="SetLoKcqx(true)">
                        <span class="bodyzf24">允许开仓</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" name="forbidopen" checked="true" type="radio" @click="SetLoKcqx(false)">
                        <span class="bodyzf26">禁止开仓</span>
                      </p>
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">执行动作</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="adjustposition" type="radio" @click="SetLoZxdz(0)">
                        <span class="bodyzf24">不调整</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" checked="true" name="adjustposition" type="radio" @click="SetLoZxdz(1)">
                        <span class="bodyzf26">全部清仓</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveLoSetInfo()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--编辑亏损资金风控指标-->
    <div id="editLoSet" class="mask">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增亏损资金风控指标</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="modal-body bodyzf">
                  <div class="bodyzf1">
                    <p class="bodyzf10">先决条件</p>
                    <div class="bodyzf12">
                      <span> 当
                        <el-select v-model="RiskLo.LossType" value-key="Code" @change="changeLossType">
                          <el-option v-for="(item,index) in LossTypeList" :key="index" :label="item.Name" :value="item.Code">
                          </el-option>
                        </el-select>
                        高于</span>
                      <span class="bodyzf13">
                        <input class="textzf5 ng-untouched ng-pristine ng-invalid" v-model="RiskLo.LossRevenueRate" name="ParamValue" maxlength="10">
                      </span> {{LossTypeUnit}}时
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">开仓权限</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="forbidopen" type="radio" checked="true" @click="SetLoKcqx(true)">
                        <span class="bodyzf24">允许开仓</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" name="forbidopen" checked="true" type="radio" @click="SetLoKcqx(false)">
                        <span class="bodyzf26">禁止开仓</span>
                      </p>
                    </div>
                  </div>
                  <div class="bodyzf2">
                    <p class="bodyzf21">执行动作</p>
                    <div class="bodyzf22">
                      <p class="bodyzf23">
                        <input class="radio4" name="adjustposition" type="radio" @click="SetLoZxdz(0)">
                        <span class="bodyzf24">不调整</span>
                      </p>
                      <p class="bodyzf23"><input class="radio5" checked="true" name="adjustposition" type="radio" @click="SetLoZxdz(1)">
                        <span class="bodyzf26">全部清仓</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveLoSetInfo()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--删除亏损资金风控指标-->
    <div id="delLoSet" class="mask">
      <div class="mask_box" style="width:40%">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除亏损资金风控指标</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除该亏损资金风控指标吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteLoSetInfo()">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增定时砍仓设置-->
    <div id="addCutPosition" class="mask addcutpostion" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增定时砍仓设置</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="bodykan1">
                  <p class="bodykan10">时间设置（例如：11:02:00），如果不设定时间 默认不限制时间(最多一条)</p>
                  <div class="bodykan11">
                    <div class="bodykan12">
                      <span class="bodykan17">时间从</span>
                      <div class="bodykan14">
                        <div class="selectshi">
                          <el-time-picker v-model="From" value-format="HH:mm" size="small" :picker-options="{selectableRange: '00:00:00 - 23:59:59',format:'HHmm'}" placeholder="任意时间点">
                          </el-time-picker>
                        </div>
                      </div>
                      <span class="bodykan16">到</span>
                      <div class="bodykan14">
                        <el-time-picker v-model="To" value-format="HH:mm" size="small" :picker-options="{selectableRange: '00:00:00 - 23:59:59' ,format:'HHmm'}" placeholder="任意时间点">
                        </el-time-picker>
                      </div>
                    </div>
                    <div class="bodykan13">
                      <input class="checkboxkan ng-untouched ng-pristine ng-valid" name="ForbidOpen" type="checkbox" ng-reflect-name="ForbidOpen" ng-reflect-model="false" v-model="PositionOpType">
                      <span class="bodykan15">在设定时间段内禁止开仓</span>
                    </div>
                  </div>
                </div>
                <div class="bodykan2">
                  <p class="bodykan21">监控品种</p>
                  <div class="kac1 notcheckedItem">
                    <div class="pin" @click="checkAllTps()">
                      <span class="pin1 hide"></span>
                      <span class="pin3"></span>
                      <span class="pin2"> 全部</span>
                    </div>
                  </div>
                  <ul class="kac">
                    <li class="kac2 notcheckedItem" :class="checkedd+item.SysCommodityID" v-for="(item,index) in CutCommidityTypeList" :key="index">
                      <div class="pin" @click="checkedTps(item.SysCommodityID,item.SysCommodityID,item.CommodityNO)">
                        <span class="pin1 hide"></span>
                        <span class="pin3"></span>
                        <span class="pin2"> {{item.CommodityName}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="bodykan3">
                  <p class="bodykan31">指标设置</p>
                  <div class="bodykan30">
                    <table align="center" class="tablekanc" width="100%">
                      <tbody>
                        <tr v-for="(item,index) in AddCutPositionList" :key="index">
                          <td class="bodykan321">
                            <el-select v-model="item.QuotaType" value-key="Code" size="small">
                              <el-option v-for="(itemC,index) in QuotaTypeList" :key="index" :label="itemC.Name" :value="itemC.Code">
                              </el-option>
                            </el-select>
                          </td>
                          <td class="bodykan35">大于</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Begin" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <!-- <td class="bodykan35">在</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Begin" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <td class="bodykan35">至</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.End" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td> -->
                          <!-- <td class="bodykan36">范围内</td> -->
                          <td class="bodykan32">
                            <span>
                              <el-select v-model="item.RmOpTyp" value-key="Code" size="small">
                                <el-option v-for="(itemC,index) in RmOpTypList" :key="index" :label="itemC.Name" :value="itemC.Code">
                                </el-option>
                              </el-select>
                            </span>
                          </td>
                          <td class="bodykan37">使得</td>
                          <td class="bodykan32">
                            <el-select v-model="item.Condition" value-key="Code" size="small">
                              <el-option v-for="(itemC,index) in ConditionList" :key="index" :label="itemC.Name" :value="itemC.Code">
                              </el-option>
                            </el-select>
                          </td>
                          <td class="bodykan38">小于等于</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Result" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <td class="closeBtn">
                            <button aria-label="Left Align" class="btn btnjia" type="button" @click="DelNewQuota(item)" v-show="AddCutPositionList.length > 1 ? true : false">
                              <span class="bodymo6"></span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="bodykan4">
                    <button type="button" class="btn btn-default " @click="AddNewQuota()">
                      <span class="fa fa-plus pulp"></span>新增指标
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveCutPositionInfo(0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--编辑定时砍仓设置-->
    <div id="editCutPosition" class="mask">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑定时砍仓设置</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="bodykan1">
                  <p class="bodykan10">时间设置（例如：11:02）</p>
                  <div class="bodykan11">
                    <div class="bodykan12">
                      <span class="bodykan17">时间从</span>
                      <div class="bodykan14">
                        <div class="selectshi">
                          <el-time-picker v-model="From" value-format="HH:mm" :picker-options="{selectableRange: '00:00:00 - 23:59:59',format:'HHmm'}" placeholder="任意时间点" disabled size="small">
                          </el-time-picker>
                        </div>
                      </div>
                      <span class="bodykan16">到</span>
                      <div class="bodykan14">
                        <el-time-picker v-model="To" value-format="HH:mm" :picker-options="{selectableRange: '00:00:00 - 23:59:59' ,format:'HHmm'}" placeholder="任意时间点" disabled size="small">
                        </el-time-picker>
                      </div>
                    </div>
                    <div class="bodykan13">
                      <input class="checkboxkan ng-untouched ng-pristine ng-valid" name="ForbidOpen" type="checkbox" ng-reflect-name="ForbidOpen" ng-reflect-model="false" v-model="PositionOpType">
                      <span class="bodykan15">在设定时间段内禁止开仓</span>
                    </div>
                  </div>
                </div>
                <div class="bodykan2">
                  <p class="bodykan21">监控品种</p>
                  <div class="kac1 notcheckedItem">
                    <div class="pin" @click="checkAllTps()">
                      <span class="pin1 hide"></span>
                      <span class="pin3"></span>
                      <span class="pin2"> 全部</span>
                    </div>
                  </div>
                  <ul class="kac">
                    <li class="kac2 notcheckedItem" :class="checkedd+item.SysCommodityID" v-for="(item,index) in CutCommidityTypeList" :key="index">
                      <div class="pin" @click="checkedTps(item.SysCommodityID,item.SysCommodityID,item.CommodityNO)">
                        <span class="pin1 hide"></span>
                        <span class="pin3"></span>
                        <span class="pin2"> {{item.CommodityName}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="bodykan3">
                  <p class="bodykan31">指标设置</p>
                  <div class="bodykan30">
                    <table align="center" class="tablekanc" width="100%">
                      <tbody>
                        <tr v-for="(item,index) in AddCutPositionList" :key="index">
                          <td class="bodykan321">
                            <el-select v-model="item.QuotaType" value-key="Code" size="small">
                              <el-option v-for="(itemC,index) in QuotaTypeList" :key="index" :label="itemC.Name" :value="itemC.Code">
                              </el-option>
                            </el-select>
                          </td>
                          <td class="bodykan35">大于</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Begin" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <!-- <td class="bodykan35">在</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Begin" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <td class="bodykan35">至</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.End" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td> -->
                          <!-- <td class="bodykan36">范围内</td> -->
                          <td class="bodykan32">
                            <span>
                              <el-select v-model="item.RmOpTyp" value-key="Code" size="small">
                                <el-option v-for="(itemC,index) in RmOpTypList" :key="index" :label="itemC.Name" :value="itemC.Code">
                                </el-option>
                              </el-select>
                            </span>
                          </td>
                          <td class="bodykan37">使得</td>
                          <td class="bodykan32">
                            <el-select v-model="item.Condition" value-key="Code" size="small">
                              <el-option v-for="(itemC,index) in ConditionList" :key="index" :label="itemC.Name" :value="itemC.Code">
                              </el-option>
                            </el-select>
                          </td>
                          <td class="bodykan38">小于等于</td>
                          <td class="bodykan33">
                            <input class="form-control textkan ng-untouched ng-pristine ng-valid" v-model="item.Result" maxlength="5">
                            <span class="zdfu2">%</span>
                          </td>
                          <td>
                            <button aria-label="Left Align" class="btn btnjia" type="button" @click="DelNewQuota(item)" v-show="AddCutPositionList.length > 1 ? true : false">
                              <span class="bodymo6"></span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="bodykan4">
                    <button type="button" class="btn btn-default " @click="AddNewQuota()">
                      <span class="fa fa-plus pulp"></span>新增指标
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveCutPositionInfo(1)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--删除品种权限-->
    <div id="delCutPosition" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box" style="width:40%">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除定时砍仓设置</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确定要删除定时砍仓设置吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteCutPositionInfo(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 编辑模板信息 -->
    <div class="edit-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑子账户手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear">
                  <div class="error3">
                    <span class="error4">*</span>
                    模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" placeholder="" v-model="EditName">
                  </span>
                  <div class="error3">
                    <span class="error4"> </span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" placeholder="" v-model="EditRemark"></textarea>
                  </span>
                </div>
              </form>
              <!-- <p class="tips">说明：子账户实收手续费 = 按手数收取的金额</p> -->
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(TpCode,EditName,EditRemark)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="del-mask">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除风控模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除风控模板吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "risktemplatesinfo",
  data() {
    return {
      loadingsave: "",
      ListRiskCommodity: [],
      ListRiskCutPosition: [],
      TpCode: "",
      Name: "",
      Remark: "",
      AddName: "",
      AddRemark: "",
      EditName: "",
      EditRemark: "",
      list: [],
      UserCount: 0,
      isShow: false,
      isPzShow: true,
      isKcShow: false,
      isRmShow: false,
      isLoShow: false,
      ClassName: "sub-checked",
      checkedd: "kacc",
      Fkzbsz: "暂无设置", //风控资金设置
      Fkkssz: "暂无设置", //风控亏损设置
      ContractTypeList: [
        { Code: true, Name: "主力合约" },
        { Code: false, Name: "全部合约" }
      ], //合约类型
      CommidityTypeList: [
        { CommodityNO: "all", CommodityName: "全部品种", SysCommodityID: "all" }
      ], //品种信息
      CutCommidityTypeList: [],
      AddCommodityList: [], //添加品种设置数组
      RiskCommodity: {
        ID: 0,
        RiskTpCode: "",
        SysCommodityID: "",
        ToMainContract: true,
        OpenPosition: 0,
        CancelPosition: 0,
        NetPosition: 0,
        TotalPosition: 0,
        SingleOpenPositionMax: 0
      },
      id_list: [],
      del_list: [],
      cutId_list: [],
      cutDel_list: [],
      //资金风控指标设置
      RiskRm: {
        Code: "",
        RmRevenueRate: "",
        RmOpenPosition: false,
        RmOpType: 0
      },
      //亏损资金风控指标设置
      RiskLo: {
        Code: "",
        LossType: 1,
        LossRevenueRate: "",
        LossOpenPosition: false,
        LossOpType: 1
      },
      SysCommodityId: [], //记录选中的品种主键
      CommodityNo: [], //记录选中品种代码
      QuotaTypeList: [{ Code: 0, Name: "无条件" }, { Code: 1, Name: "风险度" }], //指标
      RmOpTypList: [
        { Code: 0, Name: "不调整" },
        { Code: 1, Name: "全部清仓" },
        { Code: 3, Name: "调整仓位" }
      ],
      ConditionList: [
        { Code: 1, Name: "风险度" },
        { Code: 2, Name: "占用保证金" }
      ],
      AddCutPositionList: [], //砍仓指标信息
      CutPositionDetail: {
        QuotaType: 1,
        Begin: "0",
        End: "0",
        RmOpTyp: 0,
        Condition: 1,
        Result: ""
      },
      From: "", //开始时间
      To: "", //结束时间
      PositionOpType: false, //是否禁止开仓 默认false
      AddCutPosition: {
        ID: 0,
        RiskTpCode: "",
        From: "",
        To: "",
        PositionOpType: true,
        SysCommodityIds: "",
        CommodityNos: "",
        Indexs: "",
        ListRiskCutPositionDetail: []
      },
      LossTypeList: [{ Code: 1, Name: "亏损值" }, { Code: 2, Name: "亏损度" }],
      selectLossType: 1,
      LossTypeUnit: "" // 亏损单位
    };
  },
  created() {
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

    //格式化显示
    FromatView(item, type) {
      if (
        item.To.toString()
          .substring(10)
          .trim() == "00:00:00" &&
        item.From.toString()
          .substring(10)
          .trim() == "00:00:00"
      ) {
        return "不限制";
      }

      if (type == 0) {
        return item.From.toString()
          .substring(11)
          .trim();
      } else {
        return item.To.toString()
          .substring(11)
          .trim();
      }
    },

    InitData() {
      if (!this.$store.state.DetailInfo.TpCode) {
        this.Back();
        return;
      }
      this.ListRiskCommodity = this.$store.state.DetailInfo.ListRiskCommodity;
      this.ListRiskCutPosition = this.$store.state.DetailInfo.ListRiskCutPosition;
      this.list = this.$store.state.DetailInfo.InsUsers;
      this.TpCode = this.$store.state.DetailInfo.TpCode;
      this.Name = this.$store.state.DetailInfo.Name;
      this.Remark = this.$store.state.DetailInfo.Remark;
      this.UserCount = this.$store.state.DetailInfo.InsUserCount;

      this.RiskRm.Code = this.$store.state.DetailInfo.TpCode;
      this.RiskLo.Code = this.$store.state.DetailInfo.TpCode;

      if (this.$store.state.DetailInfo.RmRevenueRate != "") {
        this.Fkzbsz =
          "当风险度高于 " +
          parseFloat(this.$store.state.DetailInfo.RmRevenueRate) +
          "%时， " +
          (this.$store.state.DetailInfo.RmOpenPosition == true
            ? "允许开仓"
            : "禁止开仓") +
          "并 " +
          (this.$store.state.DetailInfo.RmOpType == 0 ? "不调整" : "全部清仓");

        // this.Fkzbsz =
        //   "当动态权益小于保证金的 " +
        //   this.$store.state.DetailInfo.RmRevenueRate +
        //   "%时， " +
        //   (this.$store.state.DetailInfo.RmOpenPosition == true
        //     ? "允许开仓"
        //     : "禁止开仓") +
        //   "并 " +
        //   (this.$store.state.DetailInfo.RmOpType == 0 ? "不调整" : "全部清仓");
      } else {
        this.Fkzbsz = "暂无设置";
      }

      if (
        this.$store.state.DetailInfo.LossType != "" &&
        this.$store.state.DetailInfo.LossType != 0
      ) {
        this.changeLossType(this.$store.state.DetailInfo.LossType);

        this.Fkkssz =
          "当" +
          (this.$store.state.DetailInfo.LossType == 1 ? "亏损值" : "亏损度") +
          "高于 " +
          parseFloat(this.$store.state.DetailInfo.LossRevenueRate) +
          this.LossTypeUnit +
          " 时， " +
          (this.$store.state.DetailInfo.LossOpenPosition == true
            ? "允许开仓"
            : "禁止开仓") +
          "并 " +
          (this.$store.state.DetailInfo.LossOpType == 0
            ? "不调整"
            : "全部清仓");
      } else {
        this.Fkkssz = "暂无设置";
      }

      this.getCommodityList();
    },

    //获取风控模板详情
    getDetaillist(code) {
      var url = "instp/GetInsRiskTpDetail";
      this.$loginapi.post(url, code, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.$store.state.DetailInfo = response.Data;
          this.InitData();
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取品种信息
    getCommodityList() {
      this.CommidityTypeList.splice(1, this.CommidityTypeList.length);
      this.CutCommidityTypeList.splice(0, this.CutCommidityTypeList.length);
      var url = "insargu/GetCommodityNoList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          response.Data.forEach(item => {
            this.CommidityTypeList.push({
              CommodityNO: item.CommodityNO,
              CommodityName: item.CommodityName,
              SysCommodityID: item.SysCommodityID
            });

            this.CutCommidityTypeList.push({
              CommodityNO: item.CommodityNO,
              CommodityName: item.CommodityName,
              SysCommodityID: item.SysCommodityID
            });
          });
          //this.CommidityTypeList = response.Data;
        } else {
          // this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //查看更多 跳转子账户
    More() {
      this.$router.push("/accounts/subaccounts");
    },

    Back() {
      this.$router.push("/templates/risktemplates");
    },

    //跳转子账户详情
    subaccountinfo(Code) {
      var url = "/insuser/GetInsUserDetail";
      this.$loginapi.post(url, Code, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/accounts/subaccountsinfo");
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    /** 新增修改为一个方法 Code为空 则进行添加操作*/
    Modifydata(Code, Name, Remark) {
      if (Name.trim() == "") {
        //this.$message.error("风控模板名称不能为空");
        this.$alert("风控模板名称不能为空");
        return;
      }
      var url = "/instp/AoURiskTp";
      var postData = {
        Code: Code,
        Name: Name,
        Remark: Remark
      };
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(Code);
          this.closeMask();
          this.$message.success("保存成功");
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //删除操作
    Deldate(id) {
      this.loadingsave = true;
      var url = "/instp/DelRiskTemplate";
      this.$loginapi.post(url, id, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          if (response.Msg != "success") {
            this.$alert(response.Msg, {});
          } else {
            this.$router.push("/templates/risktemplates");
          }
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示品种设置
    showCommodityAdd() {
      this.RiskCommodity.RiskTpCode = this.TpCode;
      this.AddCommodityList.splice(0, this.AddCommodityList.length);
      this.AddCommodityList.push(jQuery.extend(true, {}, this.RiskCommodity));
      $("#addCommodity").fadeIn("fast");
      event.stopPropagation();
    },

    //新增品种
    AddNewCommodity() {
      this.RiskCommodity.RiskTpCode = this.TpCode;
      this.AddCommodityList.push(jQuery.extend(true, {}, this.RiskCommodity));
    },

    //移除新增品种
    DelNewCommodity(item) {
      this.AddCommodityList.remove(item);
    },

    //显示品种设置修改
    showCommodityEdit(item) {
      this.AddCommodityList.splice(0, this.AddCommodityList.length);
      this.AddCommodityList.push(jQuery.extend(true, {}, item));

      this.RiskCommodity.RiskTpCode = item.RiskTpCode;
      $("#editCommodity").fadeIn("fast");
    },

    //判断存在品种信息
    ExistsCommodity(code) {
      if (this.ListRiskCommodity != null) {
        return this.ListRiskCommodity.find(function(x) {
          return x.SysCommodityID == code;
        });
      } else {
        return undefined;
      }
    },

    //判断列表中新增数据重重复
    ExistsCommonCommodity(code) {
      if (this.CommidityTypeList != null) {
        return this.CommidityTypeList.find(function(x) {
          return x.SysCommodityID == code;
        });
      } else {
        return undefined;
      }
    },

    //保存品种设置信息
    SaveCommodityInfo(type, oper) {
      //判断信息
      //type 0 保存新增 1 新增
      //oper 0 新增  1 修改
      var index = 0;
      var arr = [];
      let allCount = 0;
      for (var i = 0; i < this.AddCommodityList.length; i++) {
        var item = this.AddCommodityList[i];
        if (item.SysCommodityID == "") {
          // this.$message.error("请选择品种");
          this.$alert("请选择品种");
          index++;
          break;
        }

        if (item.SysCommodityID == "all") {
          allCount++;
        }

        if (item.OpenPosition.toString().trim() == "") {
          item.OpenPosition = 0;
        }

        if (isNaN(item.OpenPosition) || item.OpenPosition < 0) {
          // this.$message.error("开仓手数只能是数字");
          this.$alert("开仓手数只能是数字");
          index++;
          break;
        }

        if (item.CancelPosition.toString().trim() == "") {
          item.CancelPosition = 0;
        }

        if (isNaN(item.CancelPosition) || item.CancelPosition < 0) {
          // this.$message.error("撤单笔数只能是数字");
          this.$alert("撤单笔数只能是数字");
          index++;
          break;
        }

        if (item.NetPosition.toString().trim() == "") {
          item.NetPosition = 0;
        }

        if (isNaN(item.NetPosition) || item.NetPosition < 0) {
          // this.$message.error("净持仓手数只能是数字");
          this.$alert("净持仓手数只能是数字");
          index++;
          break;
        }

        if (item.TotalPosition.toString().trim() == "") {
          item.TotalPosition = 0;
        }

        if (isNaN(item.TotalPosition) || item.TotalPosition < 0) {
          // this.$message.error("总持仓手数只能是数字");
          this.$alert("总持仓手数只能是数字");
          index++;
          break;
        }

        if (item.SingleOpenPositionMax.toString().trim() == "") {
          item.SingleOpenPositionMax = 0;
        }

        if (
          isNaN(item.SingleOpenPositionMax) ||
          item.SingleOpenPositionMax < 0
        ) {
          //this.$message.error("单笔开仓最大手数只能是数字");
          this.$alert("单笔开仓最大手数只能是数字");
          index++;
          break;
        }
        if (oper == 0) {
          var result = this.ExistsCommodity(item.SysCommodityID);
          if (result != undefined) {
            // this.$message.error(
            //   "品种【" + result.SysCommodityInfo.CommodityName + "】已存在"
            // );
            this.$alert(
              "品种【" + result.SysCommodityInfo.CommodityName + "】已存在"
            );
            index++;
            break;
          }

          //如果已经存在
          if (arr.indexOf(item.SysCommodityID) > -1) {
            result = this.ExistsCommonCommodity(item.SysCommodityID);
            if (result != undefined) {
              // this.$message.error(
              //   "列表中品种【" + result.CommodityName + "】信息重复"
              // );

              this.$alert("列表中品种【" + result.CommodityName + "】信息重复");
              index++;
              break;
            }
          } else {
            arr.push(item.SysCommodityID);
          }
        }
      }
      if (index > 0) {
        return;
      }

      if (allCount > 1 || (allCount > 0 && this.AddCommodityList.length > 1)) {
        // this.$message.error("列表中品种信息重复");
        this.$alert("列表中品种信息重复");
        return;
      }
      this.loadingsave = true;
      var url = "instp/SetRiskCommodity";
      this.$loginapi.post(url, this.AddCommodityList, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          if (type == 0) {
            //保存并新增

            // this.showCommodityAdd();
            this.RiskCommodity.RiskTpCode = this.TpCode;
            this.AddCommodityList.splice(0, this.AddCommodityList.length);
            this.AddCommodityList.push(
              jQuery.extend(true, {}, this.RiskCommodity)
            );
            $("#addCommodity").fadeIn("fast");
          } else {
            //保存
            this.AddCommodityList.splice(0, this.AddCommodityList.length);
            this.closeMask();
          }
          this.$message.success("保存成功");
          this.getDetaillist(this.TpCode);
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示可交易品种删除信息
    showCommodityDel(ID) {
      if (ID == "") {
        if (this.id_list.length == 0) {
          // this.$message.error("请选择需要删除的品种信息");
          this.$alert("请选择需要删除的品种信息");
          return;
        }
        this.id_list.forEach(item => {
          this.del_list.push(item);
        });
      } else {
        this.del_list.push(ID);
      }

      $("#delCommodity").fadeIn("fast");
    },

    //删除品种设置信息
    DeleteCommodityInfo() {
      this.loadingsave = true;
      var url = "instp/DelRiskCommodity";
      this.$loginapi.post(url, this.del_list, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          if (
            this.ListRiskCommodity.length == 0 ||
            this.ListRiskCommodity.length == this.del_list.length
          ) {
            $("#total-checked1")[0].checked = false;
          }

          this.del_list.forEach(item => {
            this.id_list.remove(item);
          });
          this.del_list.splice(0, this.del_list.length);
          this.$message.success("删除成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //选择开仓权限
    SetKcqx(result) {
      this.RiskRm.RmOpenPosition = result;
    },

    //选择执行动作
    SetZxdz(code) {
      this.RiskRm.RmOpType = code;
    },

    //选择开仓权限
    SetLoKcqx(result) {
      this.RiskLo.LossOpenPosition = result;
    },

    //选择执行动作
    SetLoZxdz(code) {
      this.RiskLo.LossOpType = code;
    },

    //显示资金风控指标设置
    showRmSetAdd() {
      this.RiskRm.RmRevenueRate = "";
      this.RiskRm.RmOpenPosition = false;
      this.RiskRm.RmOpType = 1;

      $("#addRmSet").fadeIn("fast");
      event.stopPropagation();
    },

    //保存资金风控指标设置
    SaveRmSetInfo() {
      if (
        isNaN(this.RiskRm.RmRevenueRate) ||
        this.RiskRm.RmRevenueRate.toString().trim() == "" ||
        this.RiskRm.RmRevenueRate < 0
      ) {
        // this.$message.error("输入数值必须是大于等于0的数字");
        this.$alert("输入数值必须是大于等于0的数字");
        return;
      }

      if (this.RiskRm.RmOpenPosition.toString().trim() == "") {
        // this.$message.error("请选择开仓权限");
        this.$alert("请选择开仓权限");
        return;
      }
      if (this.RiskRm.RmOpType.toString().trim() == "") {
        // this.$message.error("请选择执行动作");
        this.$alert("请选择执行动作");
        return;
      }
      this.loadingsave = true;
      var url = "instp/UpdateRmInfo";
      this.$loginapi.post(url, this.RiskRm, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示资金风控指标设置
    showRmSetEdit() {
      this.RiskRm.RmRevenueRate = this.$store.state.DetailInfo.RmRevenueRate;
      this.RiskRm.RmOpenPosition = this.$store.state.DetailInfo.RmOpenPosition;
      this.RiskRm.RmOpType = this.$store.state.DetailInfo.RmOpType;
      if (this.RiskRm.RmOpenPosition == true) {
        $("#Yxkc")[0].checked = true;
      } else {
        $("#Jzkc")[0].checked = true;
      }
      if (this.RiskRm.RmOpType == 0) {
        $("#Btz")[0].checked = true;
      } else {
        $("#Qbqc")[0].checked = true;
      }
      $("#editRmSet").fadeIn("fast");
      event.stopPropagation();
    },

    //显示资金风控指标
    showRmSetDel() {
      this.RiskRm.Code = this.TpCode;
      $("#delRmSet").fadeIn("fast");
      event.stopPropagation();
    },

    //删除资金风控指标设置
    DeleteRmSetInfo() {
      this.loadingsave = true;
      this.RiskRm.RmRevenueRate = 0;
      var url = "instp/UpdateRmInfo";
      this.$loginapi.post(url, this.RiskRm, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          this.$message.success("删除成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //亏损单位 显示
    changeLossType(item) {
      if (item == 1) {
        this.LossTypeUnit = "";
      } else {
        this.LossTypeUnit = "%";
      }
    },

    //显示亏损资金风控指标设置
    showLoSetAdd() {
      this.RiskLo.LossRevenueRate = "";
      this.RiskLo.LossOpenPosition = false;
      this.RiskLo.LossOpType = 1;

      $("#addLoSet").fadeIn("fast");
      event.stopPropagation();
    },

    //保存亏损资金风控指标设置
    SaveLoSetInfo() {
      if (
        isNaN(this.RiskLo.LossRevenueRate) ||
        this.RiskLo.LossRevenueRate.toString().trim() == "" ||
        this.RiskLo.LossRevenueRate < 0
      ) {
        // this.$message.error("输入数值必须是大于等于0的数字");
        this.$alert("输入数值必须是大于等于0的数字");
        return;
      }

      if (this.RiskLo.LossOpenPosition.toString().trim() == "") {
        // this.$message.error("请选择开仓权限");
        this.$alert("请选择开仓权限");
        return;
      }
      if (this.RiskLo.LossOpType.toString().trim() == "") {
        // this.$message.error("请选择执行动作");
        this.$alert("请选择执行动作");
        return;
      }

      var url = "instp/UpdateLossInfo";
      this.$loginapi.post(url, this.RiskLo, response => {
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示资金风控指标设置
    showLoSetEdit() {
      this.RiskLo.LossType = this.$store.state.DetailInfo.LossType;
      this.RiskLo.LossRevenueRate = this.$store.state.DetailInfo.LossRevenueRate;
      this.RiskLo.LossOpenPosition = this.$store.state.DetailInfo.LossOpenPosition;
      this.RiskLo.LossOpType = this.$store.state.DetailInfo.LossOpType;

      if (this.RiskLo.LossOpenPosition == true) {
        $("#Yxkc")[0].checked = true;
      } else {
        $("#Jzkc")[0].checked = true;
      }
      if (this.RiskLo.LossOpType == 0) {
        $("#Btz")[0].checked = true;
      } else {
        $("#Qbqc")[0].checked = true;
      }
      $("#editLoSet").fadeIn("fast");
      event.stopPropagation();
    },

    //显示资金风控指标
    showLoSetDel() {
      this.RiskLo.Code = this.TpCode;
      $("#delLoSet").fadeIn("fast");
      event.stopPropagation();
    },

    //删除亏损资金风控指标设置
    DeleteLoSetInfo() {
      this.RiskLo.LossRevenueRate = 0;
      this.RiskLo.LossType = 0;
      this.RiskLo.LossOpenPosition = false;
      this.RiskLo.LossOpType = 0;
      var url = "instp/UpdateLossInfo";
      this.$loginapi.post(url, this.RiskLo, response => {
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          this.$message.success("删除成功");
          this.RiskLo.LossType = 1;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示新增定时砍仓设置
    showCutPositionAdd() {
      this.AddCutPosition.ID = "0";
      this.clearChoose();
      this.From = "";
      this.To = "";
      this.PositionOpType = false;
      this.AddCutPositionList.splice(0, this.AddCutPositionList.length);
      this.AddCutPositionList.push(
        jQuery.extend(true, {}, this.CutPositionDetail)
      );
      $("#addCutPosition").fadeIn("fast");
      event.stopPropagation();
    },

    //新增指标
    AddNewQuota() {
      this.AddCutPositionList.push(
        jQuery.extend(true, {}, this.CutPositionDetail)
      );
    },

    //移除新增指标
    DelNewQuota(item) {
      this.AddCutPositionList.remove(item);
    },

    //保存砍仓设置
    SaveCutPositionInfo(type) {
      // if (this.From.toString().trim() == "") {
      //   this.$message.error("请选择开始时间");
      //   return;
      // }
      // if (this.To.toString().trim() == "") {
      //   this.$message.error("请选择结束时间");
      //   return;
      // }
      if (
        this.To.toString().trim() != "" ||
        this.From.toString().trim() != ""
      ) {
        if (this.From >= this.To) {
          this.$alert("开始时间应早于结束时间");
          return;
        }
      }
      if (this.SysCommodityId.length == 0) {
        this.$message.error("请选择品种信息");
        return;
      }
      //判断区间是否存在
      let index = 0;
      let errorMsg = "";
      if (this.ListRiskCutPosition != null) {
        for (var i = 0; i < this.ListRiskCutPosition.length; i++) {
          var item = this.ListRiskCutPosition[i];
          if (
            this.From.toString().trim() + ":00" >
              item.To.toString()
                .substring(10)
                .trim() ||
            this.To.toString().trim() + ":00" <
              item.From.toString()
                .substring(10)
                .trim()
          ) {
            if (
              this.From.toString().trim() == "" &&
              this.To.toString().trim() == "" &&
              item.From.toString()
                .substring(10)
                .trim() == "00:00:00" &&
              item.To.toString()
                .substring(10)
                .trim() == "00:00:00" &&
              type == 0
            ) {
              index++;
              break;
              // if (item.CommodityNos == "all" || this.CommodityNo == "all") {
              //   errorMsg = "【全部品种】";
              //   index++;
              //   break;
              // }
              // for (var c = 0; c < this.CommodityNo.length; c++) {
              //   if (
              //     item.CommodityNos.split("|").contains(this.CommodityNo[c])
              //   ) {
              //     errorMsg = "品种【" + this.CommodityNo[c] + "】";
              //     index++;
              //     break;
              //   }
              // }
            }
          } else {
            if (type == 1) {
              //本条记录参与不判断
              if (item.ID == this.AddCutPosition.ID) {
                continue;
              }
            }

            // if (item.CommodityNos == "all" || this.CommodityNo == "all") {
            //   errorMsg = "【全部品种】";
            //   index++;
            //   break;
            // }

            // for (var c = 0; c < this.CommodityNo.length; c++) {
            //   if (item.CommodityNos.split("|").contains(this.CommodityNo[c])) {
            //     errorMsg = "品种【" + this.CommodityNo[c] + "】";
            //     index++;
            //     break;
            //   }
            // }
            index++;
            break;
          }
        }

        if (index > 0) {
          this.$alert("该区间" + errorMsg + "已经重复存在");
          return;
        }
      }

      var noConditionCount = 0; //无条件
      var cutQuotaList = [];
      index = 0;
      for (var i = 0; i < this.AddCutPositionList.length; i++) {
        var item = this.AddCutPositionList[i];
        if (item.QuotaType == 0) {
          //无条件
          noConditionCount++;
        } else if (item.QuotaType == 1) {
          //风险率
          if (
            item.Begin.toString().trim() == "" ||
            isNaN(item.Begin) ||
            item.Begin < 0
          ) {
            index++;
            // this.$message.error("起始范围只能是数字");
            this.$alert("起始范围只能是数字");
            break;
          }
          // if (
          //   item.End.toString().trim() == "" ||
          //   isNaN(item.End) ||
          //   item.End < 0
          // ) {
          //   index++;
          //   // this.$message.error("结束范围只能是数字");
          //   this.$alert("结束范围只能是数字");
          //   break;
          // }
          // if (item.Begin >= item.End) {
          //   index++;
          //   // this.$message.error("起始范围应小于结束范围");
          //   this.$alert("起始范围应小于结束范围");
          //   break;
          // }
        }
        cutQuotaList.push(item);
        if (item.RmOpTyp == 3) {
          if (
            item.Result.toString().trim() == "" ||
            isNaN(item.Result) ||
            item.Result < 0
          ) {
            index++;
            // this.$message.error("结果只能是数字");
            this.$alert("结果只能是数字");
            break;
          }
        } else {
          item.Result = "0";
        }
      }
      if (index > 0) {
        return;
      }

      if (
        noConditionCount > 1 ||
        (noConditionCount != 0 &&
          noConditionCount != this.AddCutPositionList.length)
      ) {
        //this.$message.error("无条件只能存在一条范围信息");
        this.$alert("无条件只能存在一条范围信息");
        return;
      }

      index = 0;
      //判断参数区间是否重合
      for (var i = 0; i < cutQuotaList.length; i++) {
        var iItem = cutQuotaList[i];
        for (var j = i + 1; j < cutQuotaList.length; j++) {
          var jItem = cutQuotaList[j];
          if (iItem.Begin > jItem.End || iItem.End <= jItem.Begin) {
          } else {
            console.log(
              iItem.Begin +
                "," +
                jItem.End +
                "|" +
                iItem.End +
                "," +
                jItem.Begin
            );
            index++;
            break;
          }
        }
        if (index > 0) {
          break;
        }
      }

      if (index > 0) {
        // this.$message.error("参数区间重合");
        this.$alert("参数区间重合");
        return;
      }

      // this.AddCutPosition.CommodityNos = "all";
      // this.AddCutPosition.SysCommodityIds = "all";

      if (this.CommodityNo.length == this.CutCommidityTypeList.length) {
        this.AddCutPosition.CommodityNos = "all";
        this.AddCutPosition.SysCommodityIds = "all";
      } else {
        this.CommodityNo.forEach(item => {
          if (this.AddCutPosition.CommodityNos.toString().trim() == "") {
            this.AddCutPosition.CommodityNos = item;
          } else {
            this.AddCutPosition.CommodityNos += "|" + item;
          }
        });

        this.SysCommodityId.forEach(item => {
          if (this.AddCutPosition.SysCommodityIds.toString().trim() == "") {
            this.AddCutPosition.SysCommodityIds = item;
          } else {
            this.AddCutPosition.SysCommodityIds += "|" + item;
          }
        });
      }

      var url = "instp/SetRiskCutPosition";

      this.AddCutPosition.RiskTpCode = this.TpCode;
      this.AddCutPosition.From = this.From;
      this.AddCutPosition.To = this.To;
      this.AddCutPosition.PositionOpType = !this.PositionOpType;
      this.AddCutPosition.Indexs = "";
      this.AddCutPosition.ListRiskCutPositionDetail = this.AddCutPositionList;
      this.loadingsave = true;
      this.$loginapi.post(url, this.AddCutPosition, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          this.AddCutPosition.CommodityNos = "";
          this.AddCutPosition.SysCommodityIds = "";
          this.AddCutPosition.RiskTpCode = "";
          this.AddCutPosition.From = "";
          this.AddCutPosition.To = "";
          this.AddCutPosition.PositionOpType = true;
          this.AddCutPosition.ListRiskCutPositionDetail = [];
          this.SysCommodityId.splice(0, this.SysCommodityId.length);
          this.CommodityNo.splice(0, this.CommodityNo.length);
          this.AddCutPosition.ID = "0";
          this.clearChoose();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //显示编辑定时砍仓设置
    showCutPositionEdit(item) {
      console.log(item);
      this.AddCutPositionList.splice(0, this.AddCutPositionList.length);
      this.From = item.From.substring(10);
      if (this.From.toString().trim() == "00:00:00") {
        this.From = "";
      }
      this.To = item.To.substring(10);
      if (this.To.toString().trim() == "00:00:00") {
        this.To = "";
      }
      this.PositionOpType = !item.PositionOpType;
      this.AddCutPosition.ID = item.ID;
      this.SysCommodityId.splice(0, this.SysCommodityId.length);
      this.CommodityNo.splice(0, this.CommodityNo.length);
      //this.CutCommidityTypeList.splice(0,this.CutCommidityTypeList.length);

      $(".kac1")
        .addClass("notcheckedItem")
        .removeClass("checkedItem");

      this.CutCommidityTypeList.forEach(item => {
        $(".kacc" + item.SysCommodityID + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      });

      if (item.SysCommodityIds == "all") {
        for (var i = 0; i < this.CutCommidityTypeList.length; i++) {
          this.checkedTps(
            this.CutCommidityTypeList[i].SysCommodityID,
            this.CutCommidityTypeList[i].SysCommodityID,
            this.CutCommidityTypeList[i].CommodityNO
          );
        }
      } else {
        var sysIdArray = item.SysCommodityIds.split("|");
        var sysNoArray = item.CommodityNos.split("|");
        for (var i = 0; i < sysIdArray.length; i++) {
          this.checkedTps(sysIdArray[i], sysIdArray[i], sysNoArray[i]);
        }
      }

      if (
        item.ListRiskCutPositionDetail != null &&
        item.ListRiskCutPositionDetail.length > 0
      ) {
        item.ListRiskCutPositionDetail.forEach(detail => {
          var cutPositionDetail = jQuery.extend(
            true,
            {},
            this.CutPositionDetail
          );
          cutPositionDetail.QuotaType = detail.QuotaType;
          cutPositionDetail.Begin = detail.Begin;
          cutPositionDetail.End = detail.End;
          cutPositionDetail.RmOpTyp = detail.RmOpTyp;
          cutPositionDetail.Condition = detail.Condition;
          cutPositionDetail.Result = detail.Result;
          this.AddCutPositionList.push(cutPositionDetail);
        });
      } else {
        this.AddCutPositionList.push(
          jQuery.extend(true, {}, this.CutPositionDetail)
        );
      }

      $("#editCutPosition").fadeIn("fast");
      event.stopPropagation();
    },

    //显示可交易品种删除信息
    showCutPositionDel(ID) {
      this.cutDel_list.splice(0, this.cutDel_list.length);
      if (ID == "") {
        if (this.cutId_list.length == 0) {
          // this.$message.error("请选择需要删除的定时砍仓设置信息");
          this.$alert("请选择需要删除的定时砍仓设置信息");
          return;
        }
        this.cutId_list.forEach(item => {
          this.cutDel_list.push(item);
        });
      } else {
        this.cutDel_list.push(ID);
      }

      $("#delCutPosition").fadeIn("fast");
    },

    //删除砍仓设置信息
    DeleteCutPositionInfo() {
      this.loadingsave = true;
      var url = "instp/DelRiskCutPosition";
      this.$loginapi.post(url, this.cutDel_list, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.closeMask();
          this.getDetaillist(this.TpCode);
          if (
            this.ListRiskCutPosition.length == 0 ||
            this.ListRiskCutPosition.length == this.cutId_list.length
          ) {
            $("#total-checked2")[0].checked = false;
          }
          this.cutDel_list.forEach(item => {
            this.cutId_list.remove(item);
          });
          this.cutDel_list.splice(0, this.cutDel_list.length);
          this.$message.success("删除成功");
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //清空选中信息
    clearChoose() {
      $(".kac1")
        .addClass("notcheckedItem")
        .removeClass("checkedItem");
      this.CutCommidityTypeList.forEach(item => {
        $(".kacc" + item.SysCommodityID + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      });
    },

    selectedAll(type) {
      if (type == 1) {
        this.cutId_list.splice(0, this.id_list.length);
      } else if (type == 2) {
        this.cutId_list.splice(0, this.cutId_list.length);
      }

      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked(
        $("#total-checked" + type),
        $(".sub-checked" + type)
      );
      if ($(".total-checked" + type)[0].checked) {
        if (type == 1) {
          for (var i = 0; i < this.ListRiskCommodity.length; i++) {
            this.id_list.push(this.ListRiskCommodity[i].ID);
          }
        } else if (type == 2) {
          for (var i = 0; i < this.ListRiskCutPosition.length; i++) {
            this.cutId_list.push(this.ListRiskCutPosition[i].ID);
          }
        }
      }
    },
    selectedSub(code, index, type) {
      // 1.1 实现让每个旗舰店的里面元素控制旗舰店的头部选框
      var th = $("#total-checked" + type).parent(),
        td = $(".sub-checked" + type);
      this.choseBox().backWord(td, th.find(":input"));
      if ($(".sub-checked" + index + "" + type)[0].checked) {
        if (type == 1) {
          this.id_list.push(code);
        } else if (type == 2) {
          this.cutId_list.push(code);
        }
      } else {
        if (type == 1) {
          this.id_list.remove(code);
        } else if (type == 2) {
          this.cutId_list.remove(code);
        }
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

    //品种全选
    checkAllTps() {
      //如果全不选
      if (this.CutCommidityTypeList.length == this.SysCommodityId.length) {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
        this.CutCommidityTypeList.forEach(item => {
          this.SysCommodityId.remove(item.SysCommodityID);
          this.CommodityNo.remove(item.CommodityNO);
        });
        this.CutCommidityTypeList.forEach(item => {
          $(".kacc" + item.SysCommodityID + "")
            .addClass("notcheckedItem")
            .removeClass("checkedItem");
        });
      } else {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
        this.CutCommidityTypeList.forEach(item => {
          this.SysCommodityId.remove(item.SysCommodityID);
          this.CommodityNo.remove(item.CommodityNO);
        });
        this.CutCommidityTypeList.forEach(item => {
          this.SysCommodityId.push(item.SysCommodityID);
          this.CommodityNo.push(item.CommodityNO);
          $(".kacc" + item.SysCommodityID + "")
            .addClass("checkedItem")
            .removeClass("notcheckedItem");
        });
      }
    },

    //品种部分选择
    checkedTps(index, code, no) {
      if (this.SysCommodityId.indexOf(code) <= -1) {
        this.SysCommodityId.push(code);
        this.CommodityNo.push(no);
        $(".kacc" + index + "")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        this.SysCommodityId.remove(code);
        this.CommodityNo.remove(no);
        $(".kacc" + index + "")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
      if (this.SysCommodityId.length == this.CutCommidityTypeList.length) {
        $(".kac1")
          .addClass("checkedItem")
          .removeClass("notcheckedItem");
      } else {
        $(".kac1")
          .addClass("notcheckedItem")
          .removeClass("checkedItem");
      }
    },

    addData() {
      this.AddName = "";
      this.AddRemark = "";
      // //点击取消和关闭弹出框
      $(".mask").fadeIn("fast");
      //$('.drop-list').attr('class','drop-list hide');
      //isdisplay = true;
    },
    edit() {
      //this.TpCode = this.$store.state.DetailInfo.TpCode;
      this.EditName = this.$store.state.DetailInfo.Name;
      this.EditRate = this.$store.state.DetailInfo.Rate * 100;
      this.EditRemark = this.$store.state.DetailInfo.Remark;
      $(".edit-mask").fadeIn("fast");
    },
    del(Code) {
      this.del_list.splice(0, this.del_list.length);
      if (this.UserCount > 0) {
        //this.$message.error("风控模板已经绑定子账户，不能删除");
        this.$alert("风控模板已经绑定子账户，不能删除");
        return;
      }
      this.del_list.push(Code);
      $(".del-mask").fadeIn("fast");
    },

    closeMask() {
      $(".mask").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $(".edit-mask").fadeOut("fast");
    },

    fold() {
      this.isShow = !this.isShow;
    },

    foldPz() {
      this.isPzShow = !this.isPzShow;
    },

    foldKC() {
      this.isKcShow = !this.isKcShow;
    },

    foldRm() {
      this.isRmShow = !this.isRmShow;
    },

    foldLo() {
      this.isLoShow = !this.isLoShow;
    }
  }
};
</script>

<style scoped>
</style>

