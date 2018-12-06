<template>
  <div class="agenttemplate_info">
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
                    <a href="#">模板</a>
                  </li>
                  <a class="active" @click="Back()">经纪人手续费模板</a>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <div class="col-md-9">
                <span class="fz account-info">模板详情</span>
                <span class="account-name">({{Name}})</span>
              </div>
              <div class="col-md-3 text-right">
                <div class="btn-group margin-Top" role="group" aria-label="...">
                  <!-- 暂时屏蔽掉新增功能 需要接口提供新增后返回实体信息 -->
                  <button type="button" class="btn btn-info " @click="addData()" v-show="false">
                    <span class="fa fa-plus pulp"></span>新增</button>
                  <button type="button" class="btn btn-default" @click="edit()">编辑</button>
                  <button type="button" class="btn btn-default" @click="del(TpCode)">删除</button>
                </div>
              </div>
            </div>
            <div class="panel panel-default account-table">
              <table class="table account-table-1">
                <thead>
                  <tr>
                    <th>模板ID </th>
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
              <div class="col-md-8 down-wrap">
                <div class="layui-tab layui-tab-brief account-tab" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title account-tab-title">
                    <li class="layui-this">相关</li>
                    <li></li>
                    <li></li>
                  </ul>

                  <div class="layui-tab-content">
                    <nav class="navbar navbar-default nav-other" @click="foldPz()">
                      <div class="container-fluid bgc12 bg-success modules-bg">
                        <!-- <div class="navbar-header"> -->

                        <p class="navbar-text nav-margin-left">
                          <button type="button" class="btn btn-default dropdown-toggle bg1">
                            <span class="caret"></span>
                          </button>
                          品种手续费
                        </p>

                        <p class="navbar-text navbar-right btn-right-1">
                          <!--<button class="btn btn-default btn-margin" type="submit">出入金</button>-->
                        </p>

                        <div class="children_box_table" v-show="isPzShow">
                          <table class="table table-hover table-bg">
                            <thead>
                              <tr>
                                <th>序号</th>
                                <th>品种代码</th>
                                <th>品种名称</th>
                                <th>按手数</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in ViewCommodityList" :key="index">
                                <td>&nbsp;{{index+1}}</td>
                                <td>{{item.CommodityNo}}</td>
                                <td>
                                  {{item.CommodityName}}
                                </td>
                                <td>{{item.Fee}}{{item.CurrencyName}}/手</td>
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
                          经纪人
                          <span>({{UserCount}})</span>
                        </p>
                        <p class="navbar-text navbar-right btn-right-1">
                          <button class="btn btn-default btn-margin" type="submit" v-show="false">新增</button>
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
                          <a @click="getDetaillistAndTurn(item.AgentCode)" class="super-link">{{item.AgentName}}</a>
                          <p class="child_content">经纪人代码：{{item.AgentCode}}</p>
                        </div>
                      </div>
                      <p class="navbar-text navbar-right btn-right-2">
                        <button class="btn btn-default btn-margin" v-show="UserCount >= 4 ? true : false" type="submit" @click="More()">查看更多</button>
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
                    <h3 class="account-sub-title">经纪人手续费模板</h3>
                    <p class="account-sub-content">经纪人手续费模板用于计算经纪人成本。设置时根据品种按手数进行设置。</p>
                    <div class="account-sub-contents">
                      <ul>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">1</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">子账户手续费</h3>
                            <p class="account-sub-content-1">子账户手续费= 成交手数*按手数值</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">2</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">经纪人成本</h3>
                            <p class="account-sub-content-1">经纪人成本=成交手数*按手数值</p>
                          </div>
                        </li>
                        <li class="flex padd">
                          <div class="account-index-wrap">
                            <span class="account-index">3</span>
                          </div>
                          <div>
                            <h3 class="account-sub-title-1">佣金</h3>
                            <p class="account-sub-content-1">佣金=子账户手续费-经纪人成本</p>
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
    <div class="mask">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增经纪人手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear">
                  <div class="error3">
                    <span class="error4">*</span>
                    模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" placeholder="" v-model="AddName">
                  </span>
                  <div class="error3">
                    <span class="error4"> </span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" placeholder="" v-model="AddRemark"></textarea>
                  </span>
                </div>
              </form>
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:25%">品种名称</th>
                    <th style="width:35%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in CommodityList">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:25%">{{item.CommodityName}}</td>
                    <td style="width:35%">
                      <input type="text" class="input-text" v-model="item.Fee">
                      <div class="input-list">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
              <span>说明：</span>经纪人手续费模板是指经纪人的经纪人成本，经纪人实际所得=子账户手续费-经纪人手续费模板</p>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="AddNew('',AddName,AddRemark,CommodityList)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata('',AddName,AddRemark,CommodityList)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="edit-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑经纪人手续费模板</div>
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
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:25%">品种名称</th>
                    <th style="width:35%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in CommodityList">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:25%">{{item.CommodityName}}</td>
                    <td style="width:35%">
                      <input type="text" class="input-text" v-model="item.Fee">
                      <div class="input-list">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <p class="tips">说明：子账户实收手续费 = 按手数收取的金额</p> -->
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifydataAdmin(TpCode,EditName,EditRemark,CommodityList)">保存</button>
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
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../kits/common.js";

export default {
  name: "agentfeetemplatesinfo",
  data() {
    return {
      loadingsave: "",
      TpCode: "",
      Name: "",
      Remark: "",
      AddName: "",
      AddRemark: "",
      EditName: "",
      EditRemark: "",
      list: [],
      del_list: [],
      //用于编辑
      CommodityList: [],
      //用于数据展示
      ViewCommodityList: [],
      UserCount: 0,
      isShow: false,
      isPzShow: true
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
  methods: {
    loaded(params) {
      this.getDetaillist(params.Code);
    },
    InitData() {
      if (!this.$store.state.DetailInfo.TpCode) {
        this.Back();
        return;
      }
      this.ViewCommodityList = this.$store.state.DetailInfo.FeeDetails;
      this.CommodityList = this.$store.state.DetailInfo.FeeDetails;
      this.list = this.$store.state.DetailInfo.InsAgents;
      this.TpCode = this.$store.state.DetailInfo.TpCode;
      this.Name = this.$store.state.DetailInfo.Name;
      this.Remark = this.$store.state.DetailInfo.Remark;
      this.UserCount = this.$store.state.DetailInfo.InsAgentCount;
    },

    //根据TPCode进行获取
    getDetaillist(ID) {
      var url = "/instp/GetInsAgentFeeTemplateDetail";
      var postData = {};
      this.$loginapi.post(url, ID, response => {
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

    //查看更多 跳转子账户
    More() {
      this.$router.push("/monitors/monitors");
    },

    Back() {
      this.$router.push("/templates/agentfeetemplates");
    },

    //删除操作
    Deldate(id) {
      var url = "/instp/DelFeeTemplate";
      this.loadingsave = true;
      this.$loginapi.post(url, id, response => {
        this.loadingsave = false;
        this.closeMask();
        if (response.Ret == 0) {
          if (response.Msg != "success") {
            this.$alert(response.Msg, {});
          } else {
            this.$message.success("删除成功");
            this.$router.push("/templates/agentfeetemplates");
          }
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    /** 新增修改为一个方法 Code为空 则进行添加操作 超管添加经纪人模版*/
    ModifydataAdmin(TpCode, Name, Remark, Details) {
      if (Name.trim() == "") {
        // this.$message.error("经纪人手续费模板名称不能为空");
        this.$alert("经纪人手续费模板名称不能为空", {});
        return;
      }

      var index = 0;
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

      this.loadingsave = true;
      var url = "/instp/AoUAgentFeeTpByInsAdmin";
      var postData = {
        TpCode: TpCode,
        Name: Name,
        Remark: Remark,
        Details: Details
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getDetaillist(TpCode);
          this.closeMask();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取经纪人详情并跳转
    getDetaillistAndTurn(id) {
      this.$store.state.AgentInfo.AgentCode = id;
      this.$router.push("/agents/tree");
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
      this.TpCode = this.$store.state.DetailInfo.TpCode;
      this.EditName = this.$store.state.DetailInfo.Name;
      this.EditRemark = this.$store.state.DetailInfo.Remark;
      $(".edit-mask").fadeIn("fast");
    },
    del(Code) {
      this.del_list.splice(0, this.del_list.length);
      $(".del-mask").fadeIn("fast");
      this.del_list.push(Code);
    },

    closeMask() {
      $(".mask").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $(".edit-mask").fadeOut("fast");
    },
    closeDelMask() {
      $(".del-mask").fadeOut("fast");
    },
    closeEditMask() {
      $(".edit-mask").fadeOut("fast");
    },

    fold() {
      this.isShow = !this.isShow;
    },

    foldPz() {
      this.isPzShow = !this.isPzShow;
    }
  }
};
</script>

<style scoped>
</style>

