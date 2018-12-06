<template>
    <div>
        <div class="template">
            <article class="main">
                <div class="container-r">

                    <!--带表格的面板-->
                    <div class="panel panel-default panel-1  panel-11">
                        <!-- Default panel contents -->
                        <div class="panel-heading">
                            <h3 class="panel-title flex">
                                <span class="maye maf1"></span>
                                <ol class="breadcrumb breadcrumb-top">
                                    <li>
                                        <a href="#">账户</a>
                                    </li>
                                    <li class="active">总账户</li>
                                </ol>
                            </h3>
                        </div>
                        <div class="panel-body bg">
                            <p>
                                <span class="col-md-10 fz">总账户 ，可对总账户进行新增、编辑、删除、冻结/解冻 操作</span>
                                <span class="col-md-2 text-right">
                                    <button class="btn btn-default btc btc-add  margin-Top addLiminshow" type="submit" @click="addData()">
                                        <span class="fa fa-plus pulp"></span>新增
                                    </button>
                                    <!-- <button class="btn btn-default btn-sm btc btc-del" type="submit" @click="del()">
                                删除
                            </button> -->
                                </span>
                            </p>
                        </div>

                        <div class="tb-header">
                            <table class="table" v-loading="loading">
                                <thead>
                                    <tr>
                                        <th style="width:6%">序号</th>
                                        <th style="width:12%">总账户代码</th>
                                        <th style="width:15%">总账户名称</th>
                                        <!-- <th style="width:14%" >交易柜台</th> -->
                                        <th style="width:14%">核心名称</th>
                                        <th style="width:14%">状态</th>
                                        <th style="width:15%">操作</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="tb-body">
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <td v-show="ishow">暂无数据</td>
                                    </tr>
                                    <tr v-for="(item,index) in list" :key="index">
                                        <td style="width:6%">&nbsp;{{index+1}}</td>
                                        <td style="width:12%">
                                            <a @click="getDetaillist(item.TopAccountCode)" class="super-link"> {{item.TopAccountCode}} </a>
                                        </td>
                                        <td style="width:15%">{{item.TopAccountName}}</td>
                                        <!-- <td style="width:14%">{{item.InsName}}</td> -->
                                        <td style="width:14%">{{item.TradeCoreName}}</td>
                                        <td style="width:14%">{{item.State == true ? "正常" : "冻结"}}</td>
                                        <td style="width:15%">
                                            <div class="btn-group" role="group" aria-label="...">
                                                <div class="btn-group" role="group">
                                                    <!-- <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
                                                    <!--Dropdown-->
                                                    <!-- <span class="caret"></span>
                                                    </button>
                                                    <ul class="dropdown-menu dropdown-menu-lef">
                                                        <li>
                                                            <a class="param-edit" @click="editData(item)">编辑</a>
                                                        </li>
                                                        <li>
                                                            <a class="param-del" @click="del(item.TopAccountCode)">删除</a>
                                                        </li>
                                                        <li v-show="item.State">
                                                            <a class="param-del" @click="frozen(item.TopAccountCode,false)">冻结
                                                            </a>
                                                        </li>
                                                        <li v-show="!item.State">
                                                            <a class="param-del" @click="frozen(item.TopAccountCode,true)">解冻
                                                            </a>
                                                            <li/>
                                                    </ul> -->
                                                    <el-dropdown trigger="click" size="mini">
                                                        <span class="el-dropdown-link" size="mini">
                                                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                                                        </span>
                                                        <el-dropdown-menu slot="dropdown" class="dropdownul">
                                                            <el-dropdown-item class="clearfix" @click.native="editData(item)">
                                                                编辑
                                                                <el-badge class="mark">
                                                                </el-badge>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item class="clearfix" @click.native="del(item.TopAccountCode)">
                                                                删除
                                                                <el-badge class="mark">
                                                                </el-badge>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item class="clearfix" @click.native="frozen(item.TopAccountCode,false)" v-show="item.State">
                                                                冻结
                                                                <el-badge class="mark">
                                                                </el-badge>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item class="clearfix" @click.native="frozen(item.TopAccountCode,true)" v-show="!item.State">
                                                                解冻
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
                </div>
            </article>
        </div>
        <!--新增总帐户弹窗-->
        <div id="add" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
                                <!-- <span class="selected">
                                    <input id="TradeCore" class="input-text TradeCore" type="text" placeholder="请选择" @click="select()" v-model="AddTradeCoreName">
                                    <div class="fa fa-sort-desc input-list" @click="select()"></div>
                                    <div class="drop-list hide">
                                        <p v-for="item in lists" @click="selected(item.Name,item)">{{item.Name}}</p>
                                    </div>
                                </span> -->
                                <el-select v-model="selectJYHX" style="width: 98%" value-key="Name" placeholder="请选择">
                                    <el-option v-for="(item,index) in lists" :key="index" :label="item.Name" :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <div class="error3">
                                    <span class="error4">*</span>
                                    总帐户代码
                                </div>
                                <span class="selected">
                                    <input class="input-text" type="text" placeholder="" v-model="AddTopAccountCode">
                                </span>
                            </div>
                            <div>
                                <div class="error3">
                                    <span class="error4">*</span>
                                    总账户名称
                                </div>
                                <span class="selected">
                                    <input class="input-text" type="text" placeholder="" v-model="AddTopAccountName">
                                </span>
                            </div>
                        </form>
                    </div>
                    <div class="closed closed-add" @click="closeMask()">×</div>
                    <!-- Table -->
                    <p>
                        <span class="fr">
                            <button type="button" class="btn btn-info" @click="Modifydata(AddTopAccountCode,AddTopAccountName,obj.Code,obj.Name,0)">保存</button>
                        </span>
                        <span class="fr">
                            <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <!--编辑总帐户弹窗-->
        <div id="edit" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
                                <!-- <span class="selected">
                                    <input id="TradeCore" disabled class="input-text TradeCore" type="text" placeholder="请选择" @click="select()" v-model="EditTradeCoreName">
                                    <div class="fa fa-sort-desc input-list"></div>
                                    <div class="drop-list hide">
                                        <p v-for="item in lists" @click="selected(item.Name,item)">{{item.Name}}</p>
                                    </div>
                                </span> -->
                                <el-select disabled v-model="selectJYHX" style="width: 98%" value-key="Name" placeholder="请选择">
                                    <el-option v-for="(item,index) in lists" :key="index" :label="item.Name" :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <div class="error3">
                                    <span class="error4">*</span>
                                    总帐户代码
                                </div>
                                <span class="selected">
                                    <input class="input-text" type="text" readonly style="cursor: not-allowed;" placeholder="" v-model="EditTopAccountCode">
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
                            <button type="button" class="btn btn-info" @click="Modifydata(EditTopAccountCode,EditTopAccountName,EditTradeCoreCode,EditTradeCoreName,1)">保存</button>
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
                    <div class="closed closed-del" @click="closeDelMask()">×</div>
                    <!-- Table -->
                    <p>
                        <span class="fr">
                            <button type="button" class="btn btn-info" @click="Deldate(id)">删除</button>
                        </span>
                        <span class="fr">
                            <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="frozen-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
            <div class="mask_box">
                <div class="panel panel-default  no-border">
                    <!-- Default panel contents -->
                    <div class="panel-heading">{{State ==true ? "解冻总帐户" : "冻结总帐户"}}</div>
                    <div class="panel-body">
                        <form class="form-inline form-inline1" novalidate="" role="form">
                            <div>
                                <div class="error3">
                                    {{State ==true ? "是否确定要解冻此总帐户？" : "总帐户冻结后无法使用。是否确定要冻结此总账户？"}}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="closed closed-del" @click="closeMask()">×</div>
                    <!-- Table -->
                    <p>
                        <span class="fr">
                            <button type="button" class="btn btn-info" @click="Modifystatedata(id,State)">{{State ==true ? "解冻" : "冻结"}}</button>
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
import common from "../../kits/common.js";

export default {
  name: "parentaccounts",
  data() {
    return {
      smsCode: "",
      ishow: "",
      loading: "",
      loadingsave: "",
      id: "", //删除使用
      AddTopAccountCode: "",
      AddTopAccountName: "",
      InsName: "",
      AddTradeCoreName: "",
      EditTopAccountCode: "",
      EditTopAccountName: "",
      EditTradeCoreName: "",
      EditTradeCoreCode: "",
      State: true,
      id_list: [],
      list: [],
      isdisplay: true,
      obj: {},
      lists: [],
      selectJYHX: null //选中交易核心
    };
  },
  created() {
    this.$store.state.loaction = "/accounts/parentaccounts";
    // this.getlist();
    //this.Modifydata("12345","自造总账户","ml_es_1","易盛001")
    //this.Deldate("12345");
    //this.getDetaillist("ML100001");
  },
  mounted() {
    this.getlist();
    if (sessionStorage.getItem("isMain") == "true") {
      $(".addLiminshow").css("visibility", "visible");
    } else {
      $(".addLiminshow").css("visibility", "hidden");
    }
  },
  methods: {
    getlist() {
      this.loading = true;
      var url = "/instopaccount/QueryTopAccountByIns";
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
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    getDetaillist(id) {
      var url = "/instopaccount/GetInsTopAccountDetail";
      this.$loginapi.post(url, id, response => {
        if (response.Ret == 0) {
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/accounts/parentsaccoutinfo");
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

    /* id  多个用 1,2 */
    Deldate(id) {
      this.loadingsave = true;
      var url = "/instopaccount/DeleteTopAccount";
      this.$loginapi.post(url, id, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.closeMask();
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
          this.getlist();
          this.closeMask();
          this.$message.success({
            message: State == true ? "解冻成功" : "冻结成功",
            center: true,
            duration: 800
          });
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
      $(".mask").fadeOut("fast");
    },
    Modifydata(TopAccountCode, Name, TradeCoreCode, TradeCoreName, oper) {
      if (this.selectJYHX == null) {
        // this.$message.error("请选择交易核心");
        this.$alert("请选择交易核心", {});
        return;
      }
      if (TopAccountCode.trim() == "") {
        // this.$message.error("总帐户代码不能为空");
        this.$alert("总帐户代码不能为空", {});
        return;
      }

      var reg = new RegExp(/^[a-zA-Z0-9_]{0,}$/);
      if (!reg.test(TopAccountCode.trim())) {
        // this.$message.error("总帐户代码格式错误");
        this.$alert("总帐户代码格式错误", {});
        return false;
      }

      if (Name.trim() == "") {
        // this.$message.error("总帐户名称不能为空");
        this.$alert("总帐户名称不能为空", {});
        return;
      }

      var url = "/instopaccount/AddTopAccount";

      if (oper == 0) {
        url = "/instopaccount/AddTopAccount";
      } else {
        url = "/instopaccount/ModifyTopAccount";
      }
      this.loadingsave = true;
      var postData = {
        TopAccountCode: TopAccountCode,
        Name: Name,
        TradeCoreCode: this.selectJYHX.Code,
        TradeCoreName: this.selectJYHX.Name
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.obj = {};
          this.selectJYHX = null;
          this.getlist();
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
    addData() {
      this.selectJYHX = null;
      this.lists = [];
      $(".TradeCore").val("");
      this.gettradecorelist();
      // //点击取消和关闭弹出框
      $("#add").fadeIn("fast");
      //$('.drop-list').attr('class','drop-list hide');
      //isdisplay = true;
    },
    select() {
      //点击输入框弹出下拉框
      if (this.isdisplay) {
        $(".drop-list").attr("class", "drop-list");
      } else {
        $(".drop-list").attr("class", "drop-list hide");
      }
      this.isdisplay = !this.isdisplay;
    },
    selected(comID, obj) {
      //点击下拉框列表的内容把文字填充到输入框里面
      $("#TradeCore").val(comID);
      $(".drop-list").attr("class", "drop-list hide");
      this.isdisplay = !this.isdisplay;
      this.obj = obj;
    },
    editData(item) {
      this.gettradecorelist();
      this.selectJYHX = {
        Code: item.TradeCoreCode,
        Name: item.TradeCoreName
      };
      this.EditTradeCoreCode = item.TradeCoreCode;
      this.EditTradeCoreName = item.TradeCoreName;
      this.EditTopAccountCode = item.TopAccountCode;
      this.EditTopAccountName = item.TopAccountName;
      $("#edit").fadeIn("fast");
    },
    del(Code) {
      $(".del-mask").fadeIn("fast");
      this.id = Code;
    },
    frozen(Code, State) {
      $(".frozen-mask").fadeIn("fast");
      this.id = Code;
      this.State = State;
    },
    showSendMsg(item) {
      this.EditTradeCoreCode = item.TradeCoreCode;
      this.EditTradeCoreName = item.TradeCoreName;
      this.EditTopAccountCode = item.TopAccountCode;
      this.EditTopAccountName = item.TopAccountName;
      $("#sendMsg").fadeIn("fast");
    },
    closeMask() {
      $("#add").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $("#edit").fadeOut("fast");
      $(".frozen-mask").fadeOut("fast");
      $("#sendMsg").fadeOut("fast");
    },
    closeDelMask() {
      $(".del-mask").fadeOut("fast");
    }
  }
};
</script>

<style scoped>
</style>
