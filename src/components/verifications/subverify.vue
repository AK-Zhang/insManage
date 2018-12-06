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
                <span class="maye mamo"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">实名认证</a>
                  </li>
                  <li class="active">子账户实名认证</li>
                </ol>
              </h3>
            </div>
            <div class="layui-tab layui-tab-brief account-tab layui_top" lay-filter="docDemoTabBrief">
              <ul class="layui-tab-title  account-tab-title" id="agent-tabs">
                <li class="layui-this" @click="subagent(0)">待审核个人</li>
                <li @click="subagent(1)" style="visibility: hidden;width:0px;min-width:0px;padding:0">待审核组织</li>
                <li @click="subagent(2)">个人审核（已通过）</li>
                <li @click="subagent(3)" style="visibility: hidden;width:0px;min-width:0px;padding:0">组织审核（已通过）</li>
                <li @click="subagent(4)">个人审核（未通过）</li>
                <li @click="subagent(5)" style="visibility: hidden;width:0px;min-width:0px;padding:0">组织审核（未通过）</li>
              </ul>
              <!--个人-->
              <div id="subagent" class="subagent">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:20%">子账户代码</th>
                        <th style="width:20%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <!-- <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th> -->
                        <th style="width:20%">认证状态</th>
                        <th style="width:14%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow0">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:20%">{{item.InsUserCode}}</td>
                        <td style="width:20%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <!-- <td style="width:15%">{{item.AuditInsUserCode}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td> -->
                        <td style="width:20%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:14%">
                          <a id="param-edit" @click="showUpdatePage(item,0,true)" style="color:#337ab7;">审核</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager0" @ee="pageFn0"></pageination>
                </nav>
              </div>
              <!--组织-->
              <div id="subaccount" class="subagent" style="display:none">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:20%">子账户代码</th>
                        <th style="width:20%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <!-- <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th> -->
                        <th style="width:20%">认证状态</th>
                        <th style="width:14%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow1">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist1" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:20%">{{item.InsUserCode}}</td>
                        <td style="width:20%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <!-- <td style="width:15%">{{item.AuditInsUserCode}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td> -->
                        <td style="width:20%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:14%">
                          <a id="param-edit" @click="showUpdatePage(item,1,true)" style="color:#337ab7;">审核</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager1" @ee="pageFn1"></pageination>
                </nav>
              </div>
              <!-- 个人审核历史已通过 -->
              <div id="subagent" class="subagent" style="display:none">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:15%">子账户代码</th>
                        <th style="width:15%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th>
                        <th style="width:9%">认证状态</th>
                        <th style="width:5%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow2">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist2" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:15%">{{item.InsUserCode}}</td>
                        <td style="width:15%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <td style="width:15%">{{item.AuditInsUserCode == null ? "--" : (item.AuditInsUserCode == "" ? "--" : item.AuditInsUserCode)}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td>
                        <td style="width:9%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:5%">
                          <a id="param-edit" @click="showUpdatePage(item,0,false)" style="color:#337ab7;">审核信息</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager2" @ee="pageFn2"></pageination>
                </nav>
              </div>
              <!-- 组织审核历史已通过 -->
              <div id="subaccount" class="subagent" style="display:none">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:15%">子账户代码</th>
                        <th style="width:15%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th>
                        <th style="width:9%">认证状态</th>
                        <th style="width:5%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow3">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist3" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:15%">{{item.InsUserCode}}</td>
                        <td style="width:15%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <td style="width:15%">{{item.AuditInsUserCode == null ? "--" : (item.AuditInsUserCode == "" ? "--" : item.AuditInsUserCode)}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td>
                        <td style="width:9%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:5%">
                          <a id="param-edit" @click="showUpdatePage(item,0,false)" style="color:#337ab7;">审核信息</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager3" @ee="pageFn3"></pageination>
                </nav>
              </div>
              <!-- 个人审核历史未通过 -->
              <div id="subagent" class="subagent" style="display:none">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:15%">子账户代码</th>
                        <th style="width:15%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th>
                        <th style="width:9%">认证状态</th>
                        <th style="width:5%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow4">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist4" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:15%">{{item.InsUserCode}}</td>
                        <td style="width:15%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <td style="width:15%">{{item.AuditInsUserCode == null ? "--" : (item.AuditInsUserCode == "" ? "--" : item.AuditInsUserCode)}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td>
                        <td style="width:9%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:5%">
                          <a id="param-edit" @click="showUpdatePage(item,0,false)" style="color:#337ab7;">审核信息</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager4" @ee="pageFn4"></pageination>
                </nav>
              </div>
              <!-- 组织审核历史未通过 -->
              <div id="subaccount" class="subagent" style="display:none">
                <div class="tb-header">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width:6%">&nbsp;序号</th>
                        <th style="width:15%">子账户代码</th>
                        <th style="width:15%">子账户名称</th>
                        <th style="width:20%">申请时间</th>
                        <th style="width:15%">审核人员</th>
                        <th style="width:15%">审核时间</th>
                        <th style="width:9%">认证状态</th>
                        <th style="width:5%">操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="tb-body" v-loading="loading">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td v-show="ishow5">暂无数据</td>
                      </tr>
                      <tr v-for="(item,index) in verifylist5" :key="index">
                        <td style="width:6%">&nbsp;{{index+1}}</td>
                        <td style="width:15%">{{item.InsUserCode}}</td>
                        <td style="width:15%">{{item.RealName}}</td>
                        <td style="width:20%">{{item.ApplyDate}}</td>
                        <td style="width:15%">{{item.AuditInsUserCode == null ? "--" : (item.AuditInsUserCode == "" ? "--" : item.AuditInsUserCode)}}</td>
                        <td style="width:15%">{{item.AuditDate}}</td>
                        <td style="width:9%">{{item.Status == 0 ? "已申请" : (item.Status == 1 ? "审核已通过" : "审核未通过")}}</td>
                        <td style="width:5%">
                          <a id="param-edit" @click="showUpdatePage(item,0,false)" style="color:#337ab7;">审核信息</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation" class="text-center  page-separation">
                  <pageination :pagerPro="pager5" @ee="pageFn5"></pageination>
                </nav>
              </div>
            </div>
            <div class="tb-body">
              <!-- <nav aria-label="Page navigation" class="text-center  page-separation">
                <pageination :pagerPro="pager" @ee="pageFn"></pageination>
              </nav> -->
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="mask">
      <div class="mask_box" style="width:55%;">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">审核详情</div>
          <div class="panel-body" style="padding-left:80px;">
            <form class="form-inline form-inline1 ng-untouched ng-pristine ng-valid" novalidate="" role="form">
              <div class="wei6">
                <div class="formin">
                  <div class="form-group group1 groupw">
                    <label class="labelw">经纪人代码：</label>
                    <div class="wei1">{{obj.InsCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">经纪人名称： </label>
                    <div class="wei1">{{obj.InsUserCode}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">姓名： </label>
                    <div class="wei1">{{obj.RealName}}</div>
                  </div>

                </div>
                <div class="formin">
                  <div class="form-group  group1 groupw">
                    <label class="labelw">身份证号： </label>
                    <div class="wei1">{{obj.IDCardNo}}</div>
                  </div>
                  <div class="form-group  group1 groupw">
                    <label class="labelw">申请时间： </label>
                    <div class="wei1">{{obj.ApplyDate}}</div>
                  </div>
                  <div class="form-group group1 groupw">
                    <label class="labelw">认证状态：</label>
                    <div class="wei1">{{obj.Status == 0 ? "已申请" : (obj.Status == 1 ? "审核已通过" : "审核未通过")}}</div>
                  </div>
                  <div class="imgbox">
                    <img :src="frontimgurl" alt="身份证正面" style="width:30%;" @click="frontimgdialog=true">
                    <img :src="Backimgurl" alt="身份证反面" style="margin: 0 3%;width:30%;" @click="Backimgdialog=true">
                    <video :src="Videourl" controls="controls" style="width:30%;display:inline-block;vertical-align: top;  z-index: 99999999;">
                    </video>
                  </div>
                  <div class="imgbox1_B flex" v-if="isShowItem">
                    <div class="checked_B">
                      <el-radio v-model="radioPass1" label="1" @change="pass1">通过</el-radio>
                      <el-radio v-model="radioPass1" label="2" @change="pass2">拒绝</el-radio>
                    </div>
                    <div class="checked_B">
                      <el-radio v-model="radioPass2" label="1" @change="pass1">通过</el-radio>
                      <el-radio v-model="radioPass2" label="2" @change="pass4">拒绝</el-radio>
                    </div>
                    <div class="checked_B">
                      <el-radio v-model="radioPass3" label="1" @change="pass1">通过</el-radio>
                      <el-radio v-model="radioPass3" label="2" @change="pass6">拒绝</el-radio>
                    </div>
                  </div>
                  <!-- <p class="from-p">处理意见：</p>
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="val" resize="none" class="from-textarea">
                  </el-input> -->
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <p>
            <span class="fr" v-if="isShowItem">
              <button type="button" class="btn btn-info" disabled="disabled" id="auditpassd" @click="AuditPass()">审核通过</button>
            </span>
            <span class="fr" v-if="isShowItem">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="AuditNoPass()">拒绝通过</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>

      </div>
      <el-dialog :visible.sync="frontimgdialog" :modal-append-to-body=false width="30%">
        <img :src="frontimgurl" alt="身份证正面" style="width:100%;height:50%">
      </el-dialog>
      <el-dialog :visible.sync="Backimgdialog" :modal-append-to-body=false width="30%">
        <img :src="Backimgurl" alt="手持身份证" style="width:100%;height:50%">
      </el-dialog>
    </div>

  </div>
</template>

<script>
import common from "../../kits/common.js";
import pageination from "../subcom/pageination.vue";

export default {
  name: "agentverify",
  components: {
    pageination
  },
  data() {
    return {
      loading: "",
      loadingsave: "",
      val: "",
      frontimgurl: "",
      Backimgurl: "",
      Videourl: "",
      Backimgdialog: false,
      frontimgdialog: false,
      isShows: false,
      verifylist: [],
      verifylist1: [],
      verifylist2: [],
      verifylist3: [],
      verifylist4: [],
      verifylist5: [],
      UserProperty: "",
      pager0: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      pager1: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      pager2: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      pager3: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      pager4: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      pager5: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 10
      },
      ishow0: "",
      ishow1: "",
      ishow2: "",
      ishow3: "",
      ishow4: "",
      ishow5: "",
      obj: {},
      textarea: "",
      radioPass1: "0",
      radioPass2: "0",
      radioPass3: "0",

      isShowItem: true
    };
  },
  created() {
    this.$store.state.loaction = "/verifications/subverify";
    this.getIndividuallist();
  },
  mounted() {
    this.getCorporationlist();
    this.getHisPassIndividuallist();
    this.getHisPassCorporationlist();
    this.getHisNoPassIndividuallist();
    this.getHisNoPassCorporationlist();
  },
  methods: {
    getIndividuallist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditingList";
      this.$loginapi.postWithPage(
        url,
        this.pager0.PageNo,
        this.pager0.PageSize,
        {
          UserProperty: 0,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow0 = false;
            } else {
              this.ishow0 = true;
            }
            this.verifylist = response.Data;
            this.pager0 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    getCorporationlist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditingList";
      this.$loginapi.postWithPage(
        url,
        this.pager1.PageNo,
        this.pager1.PageSize,
        {
          UserProperty: 1,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow1 = false;
            } else {
              this.ishow1 = true;
            }
            this.verifylist1 = response.Data;
            this.pager1 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 个人实名认证通过
    getHisPassIndividuallist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditSuccessList";
      this.$loginapi.postWithPage(
        url,
        this.pager2.PageNo,
        this.pager2.PageSize,
        {
          UserProperty: 0,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow2 = false;
            } else {
              this.ishow2 = true;
            }
            this.verifylist2 = response.Data;
            this.pager2 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 组织实名认证通过
    getHisPassCorporationlist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditSuccessList";
      this.$loginapi.postWithPage(
        url,
        this.pager3.PageNo,
        this.pager3.PageSize,
        {
          UserProperty: 1,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow3 = false;
            } else {
              this.ishow3 = true;
            }
            this.verifylist3 = response.Data;
            this.pager3 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 个人实名认证未通过
    getHisNoPassIndividuallist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditFailList";
      this.$loginapi.postWithPage(
        url,
        this.pager4.PageNo,
        this.pager4.PageSize,
        {
          UserProperty: 0,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow4 = false;
            } else {
              this.ishow4 = true;
            }
            this.verifylist4 = response.Data;
            this.pager4 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 组织实名认证未通过
    getHisNoPassCorporationlist() {
      this.loading = true;
      var url = "/RealNameAuth/GetAuditSuccessList";
      this.$loginapi.postWithPage(
        url,
        this.pager5.PageNo,
        this.pager5.PageSize,
        {
          UserProperty: 1,
          UserType: 4
        },
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow5 = false;
            } else {
              this.ishow5 = true;
            }
            this.verifylist5 = response.Data;
            this.pager5 = response.Pager;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 获取个人认证信息
    getIndividuallinfo() {
      var url = "/RealNameAuth/GetInfoForMan";
      this.$loginapi.post(
        url,
        {
          InsCode: this.obj.InsCode,
          UserCode: this.obj.InsUserCode,
          UserType: this.obj.UserType
        },
        response => {
          if (response.Ret == 0) {
            let IDCardFrontExt = response.Data.IDCardFrontExt;
            let IDCardFront = response.Data.IDCardFront;
            this.frontimgurl =
              "data:" + IDCardFrontExt + ";base64, " + IDCardFront;
            let IDCardBackExt = response.Data.IDCardBackExt;
            let IDCardBack = response.Data.IDCardBack;
            this.Backimgurl =
              "data:" + IDCardBackExt + ";base64, " + IDCardBack;
            let VideoExt = response.Data.VideoExt;
            let Video = response.Data.Video;
            this.Videourl = "data:" + VideoExt + ";base64, " + Video;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    // 获取组织认证信息
    getCorporationinfo() {
      var url = "/RealNameAuth/GetInfoForCorp";
      this.$loginapi.post(
        url,
        {
          InsCode: this.obj.InsCode,
          UserCode: this.obj.InsUserCode,
          UserType: this.obj.UserType
        },
        response => {
          if (response.Ret == 0) {
            let IDCardFrontExt = response.Data.IDCardFrontExt;
            let IDCardFront = response.Data.IDCardFront;
            this.Backimgurl =
              "data:" + IDCardFrontExt + ";base64, " + IDCardFront;
            let IDCardBackExt = response.Data.IDCardBackExt;
            let IDCardBack = response.Data.IDCardBack;
            this.frontimgurl =
              "data:" + IDCardBackExt + ";base64, " + IDCardBack;
            let VideoExt = response.Data.VideoExt;
            let Video = response.Data.Video;
            this.Videourl = "data:" + VideoExt + ";base64, " + Video;
          } else {
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    pass1() {
      let count = this.radioPass1 + this.radioPass2 + this.radioPass3;
      if (count == "111") {
        $("#auditpassd").removeAttr("disabled");
      }
    },
    pass2() {
      if (this.val.indexOf("身份证审核不通过") == -1) {
        this.val = this.val + "身份证审核不通过";
      }
      $("#auditpassd").attr("disabled", "disabled");
    },
    pass4() {
      if (this.val.indexOf("手持身份证审核不通过") == -1) {
        this.val = this.val + "手持身份证审核不通过";
      }
      $("#auditpassd").attr("disabled", "disabled");
    },
    pass6() {
      if (this.val.indexOf("视频认证审核不通过") == -1) {
        this.val = this.val + "视频认证审核不通过";
      }
      $("#auditpassd").attr("disabled", "disabled");
    },
    //    分页
    pageFn0(size, pageno) {
      this.pager0.PageSize = size;
      this.pager0.PageNo = pageno;
      this.getIndividuallist();
    },
    pageFn1(size, pageno) {
      this.pager1.PageSize = size;
      this.pager1.PageNo = pageno;
      this.getCorporationlist();
    },
    pageFn2(size, pageno) {
      this.pager2.PageSize = size;
      this.pager2.PageNo = pageno;
      this.getHisPassIndividuallist();
    },
    pageFn3(size, pageno) {
      this.pager3.PageSize = size;
      this.pager3.PageNo = pageno;
      this.getHisPassCorporationlist();
    },
    pageFn4(size, pageno) {
      this.pager4.PageSize = size;
      this.pager4.PageNo = pageno;
      this.getHisNoPassIndividuallist();
    },
    pageFn5(size, pageno) {
      this.pager5.PageSize = size;
      this.pager5.PageNo = pageno;
      this.getHisNoPassCorporationlist();
    },
    //tab栏切换
    subagent(index) {
      $("#agent-tabs > li:eq(" + index + ")")
        .addClass("layui-this")
        .siblings()
        .removeClass("layui-this");
      $(".subagent").css("display", "none");
      $(".subagent:eq(" + index + ")").css("display", "block");
    },

    // 弹出审核
    showUpdatePage(obj, type, isShow) {
      this.isShowItem = isShow;
      this.obj = obj;
      this.UserProperty = type;
      $(".mask").fadeIn("fast");
      if (this.UserProperty == 0) {
        this.getIndividuallinfo();
      } else {
        this.getCorporationinfo();
      }
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      this.obj = {};
      this.val = "";
      this.radioPass1 = "0";
      this.radioPass2 = "0";
      this.radioPass3 = "0";
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
            "/RealNameAuth/Audit",
            {
              UserProperty: this.UserProperty,
              RealNameAuthID: this.obj.ID,
              Result: 1,
              ResultRemark: this.val
            },
            response => {
              this.loadingsave = false;
              if (response.Ret == 0) {
                this.$message.success("操作成功！");
                this.getIndividuallist();
                this.getCorporationlist();
                this.val = "";
                this.closeMask();
              } else {
                //this.$message.error(response.Msg);
                this.$alert(response.Msg, {});
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
            "/RealNameAuth/Audit",
            {
              UserProperty: this.UserProperty,
              RealNameAuthID: this.obj.ID,
              Result: 2,
              ResultRemark: this.val
            },
            response => {
              this.loadingsave = false;
              if (response.Ret == 0) {
                this.$message.success("操作成功！");
                this.getIndividuallist();
                this.getCorporationlist();
                this.val = "";
                this.closeMask();
              } else {
                //this.$message.error(response.Msg);
                this.$alert(response.Msg, {});
              }
            }
          );
        })
        .catch(() => {
          this.closeMask();
        });
    }
  }
};
</script>

<style scoped>
.template .main .container-r .panel-1 .tb-header .table {
  margin-bottom: -1px;
}

.template .bg {
  background-color: #dfe9f0;
}
.mask .mask_box .no-border .panel-body {
  margin-bottom: 0px;
}
.mask .mask_box .no-border .panel-body .selected .input-list {
  width: 20px;
}
.mask .mask_box .no-border .panel-body .selected .input3 {
  height: 95px;
  resize: none;
}
.wei6 {
  margin-top: 15px;
}
.formin {
  padding: 0 15px;
  margin-bottom: 20px;
  width: 100%;
}
.form-group {
  margin-bottom: 15px;
}
.group1 {
  vertical-align: top !important;
}
.groupw {
  width: 31.4%;
  margin-right: 2%;
}
.labelw {
  margin-left: 5px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  width: 105px;
  display: inline-block;
  font-size: 15px;
  font-weight: 400;
  color: #444;
}
.labelw {
  background: #fff;
}
.wei1 {
  height: 30px;
  width: 100%;
  padding-left: 110px;
  font-size: 14px;
  word-wrap: break-word;
  line-height: 15px;
  color: #222;
}
.form-group {
  margin-bottom: 15px;
  margin-right: -15px;
  margin-left: -15px;
}
.group1 {
  vertical-align: top !important;
  position: relative;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: top !important;
}
.groupw {
  width: 31.4%;
  margin-right: 2%;
  background: #fff;
  padding-bottom: 7px;
  height: 33px;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.panel-1 {
  margin-bottom: -20px !important;
}
.from-p {
  margin-top: 15px;
  margin-left: -10px;
}
.from-textarea {
  margin-top: 5px;
  margin-left: -10px;
  width: 95%;
}
.imgbox {
  /* width: 600px; */
  height: 180px;
  margin: 10px auto;
}
img,
video {
  width: 200px;
  height: 180px;
}
.layui-tab-brief > .layui-tab-title .layui-this {
  color: #0099ff;
}
.layui-tab-brief > .layui-tab-more li.layui-this:after,
.layui-tab-brief > .layui-tab-title .layui-this:after {
  border-bottom: 2px solid #0099ff;
}
</style>
