<template>
    <div class="monitors_">
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
                                    <li class="active">风控员</li>
                                </ol>
                            </h3>
                        </div>
                        <div class="panel-body bg">
                            <p>
                                <span class="col-md-10 fz">
                                    <b>{{list.length}}个&nbsp;</b>风控员，可对风控员进行新增、编辑、删除 操作 </span>
                                <span class="col-md-2 text-right  margin-Top ">
                                    <button class="btn btn-default btc btc-add" type="submit" @click="addData()">
                                        <span class="fa fa-plus pulp"></span>新增
                                    </button>
                                    <!-- <button class="btn btn-default btc btc-del" type="submit" @click="del()">
                                        删除
                                    </button> -->
                                </span>
                            </p>
                        </div>
                        <div class="tb-header">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width:10%">序号</th>
                                        <!-- <th style="width:10%"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th> -->
                                        <th style="width:25%">风控员代码</th>
                                        <th style="width:30%">风控员名称</th>
                                        <th style="width:15%">联系方式</th>
                                        <!-- <th style="width:15%">风控员密码</th> -->
                                        <th style="width:10%">操作</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="tb-body" v-loading="loading">
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <td v-show="ishow">暂无数据</td>
                                    </tr>
                                    <tr v-for="(item,index) in list" :key="index">
                                        <td style="width:10%">&nbsp;{{((pager.PageNo-1)*pager.PageSize)+index+1}}</td>
                                        <!-- <td style="width:10%" class="sub-checked "><input type="checkbox" :class="ClassName+index" @click="selectedSub(item.RiskOprCode,index)"></td> -->
                                        <td style="width:25%">
                                            <a @click="getDetaillist(item.RiskOprCode)" class="super-link">{{item.RiskOprCode}}</a>
                                        </td>
                                        <td style="width:30%">
                                            {{item.RiskOprName}}
                                        </td>
                                        <td style="width:15%">{{item.Phone}}</td>
                                        <!-- <td style="width:15%">{{item.Password}}</td> -->
                                        <td style="width:10%">
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
                                                            <a class="param-del" @click="delOne(item.RiskOprCode)">删除</a>
                                                        </li> -->
                                                    <!--<li><a href="#">Dropdown link</a></li>-->
                                                    <!-- <li v-show="IsShowPassButton(item.Password,item.Phone)">
                                                            <a class="param-set" @click="ShowSendPassword(item)">查看敏感信息</a>
                                                        </li>
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
                                                            <el-dropdown-item class="clearfix" @click.native="delOne(item.RiskOprCode)">
                                                                删除
                                                                <el-badge class="mark">
                                                                </el-badge>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item class="clearfix" @click.native="ShowSendPassword(item)" v-show="IsShowPassButton(item.Password,item.Phone)">
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
                </div>
            </article>
        </div>

        <!--新增风控员弹窗-->
        <div id="add" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
            <div class="mask_box">
                <div class="panel panel-default  no-border">
                    <!-- Default panel contents -->
                    <div class="panel-heading">新增风控员</div>
                    <div class="panel-body">
                        <form class="form-inline form-inline1" novalidate="" role="form">
                            <!-- <div>
                                <div class="error3">
                                    <span class="error4">*</span>
                                    风控员代码
                                </div>
                                <span class="selected">
                                    <input class="input-text" type="text" placeholder="" v-model="AddRiskOprCode">
                                </span>
                            </div> -->
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
                                    <input class="input-text" type="password" oncontextmenu="return false;" placeholder="新密码格式应包含大小写字母及数字，长度不得小于8位" v-model="AddRiskOprPassword">
                                </span>
                            </div>
                            <div>
                                <div class="error3">
                                    <span class="error4">*</span>
                                    确认密码
                                </div>
                                <span class="selected">
                                    <input class="input-text" type="password" oncontextmenu="return false;" placeholder="新密码格式应包含大小写字母及数字，长度不得小于8位" v-model="AddRiskOprConfirmPassword">
                                </span>
                            </div>
                            <div>
                                <div class="error3">
                                    <span class="error4">*</span>
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
                            <button type="button" class="btn btn-info" @click="Modifydata(AddRiskOprCode,AddRiskOprName,AddRiskOprPhone,AddRiskOprPassword,true)">保存</button>
                        </span>
                        <span class="fr">
                            <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <!--编辑风控员弹窗-->
        <div id="edit" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
                                    <input class="input-text" type="text" placeholder="" v-model="EditRiskOprPhone">
                                </span>
                            </div>
                        </form>
                    </div>
                    <div class="closed closed-add" @click="closeMask()">×</div>
                    <!-- Table -->
                    <p>
                        <span class="fr">
                            <button type="button" class="btn btn-info" @click="Modifydata(EditRiskOprCode,EditRiskOprName,EditRiskOprPhone,EditRiskOprPassword,false)">保存</button>
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
                    <div class="panel-heading">删除风控员</div>
                    <div class="panel-body">
                        <form class="form-inline form-inline1" novalidate="" role="form">
                            <div>
                                <div class="error3">
                                    确认要删除风控员吗？
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
  name: "monitors",
  components: {
    pageination
  },
  data() {
    return {
      ishow: "",
      loading: "",
      loadingsave: "",
      list: [],
      //此处声明变量用于V-Model 绑定
      AddRiskOprCode: "",
      AddRiskOprName: "",
      AddRiskOprPhone: "",
      AddRiskOprPassword: "",
      AddRiskOprConfirmPassword: "",
      EditRiskOprCode: "",
      EditRiskOprName: "",
      EditRiskOprPhone: "",
      EditRiskOprPassword: "",
      id_list: [],
      del_list: [],
      ClassName: "sub-checked",
      pager: {},
      recordCount: 0,
      ChooseUser: null,
      MarkCode: "",
      buttonName: "获取验证码",
      isDisabled: false,
      time: 120
    };
  },
  created() {
    this.$store.state.loaction = "/monitors/monitors";
    //this.Deldate("MTP000987734200001");
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getlist();
    //this.getDetaillist("MTP000910718300001");
    //this.Modifydata("MTP000910712100003");
  },
  methods: {
    //弹出验证码框
    ShowSendPassword(item) {
      $("#showPass").fadeIn("fast");
      this.ChooseUser = item;
    },

    //发送短信验证码
    SendSurePass() {
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

      var url = "userprivacyauth/VerifyAuthInfo";
      var postData = {
        Phone: this.$store.state.userInfo.AccountPhone,
        Code: this.MarkCode,
        UserCode: this.ChooseUser.UserCode,
        Type: 2
      };

      this.$loginapi.post(url, postData, response => {
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
    IsShowPassButton(phone, password) {
      if (phone == "******" || password == "******") {
        return true;
      } else {
        return false;
      }
    },

    getlist() {
      this.loading = true;
      var url = "insriskopr/QueryRiskOprsByIns";
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            //console.log(response.Data); //请求成功，response为成功信息参数
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.list = response.Data;
            this.pager = response.Pager;

            if (this.pager.PageNo == 1) {
              this.recordCount = this.pager.RecordCount;
            } else {
              this.pager.RecordCount = this.recordCount;
            }
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    //    分页
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getlist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
    },

    //根据TPCode进行获取
    getDetaillist(ID) {
      this.loadingsave = true;
      var url = "/insriskopr/GetInsRiskOprDetail";
      this.$loginapi.post(url, ID, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/monitors/monitorsinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    Deldate(id) {
      this.loadingsave = true;
      var url = "/insriskopr/Delete";
      this.$loginapi.post(url, id, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.closeDelMask();
          if (response.Data) {
            console.log(response.Data);
            if (response.Data.ErrorCode == 0) {
              this.$alert(response.Data.ErrorMsg, {});
              return;
            }
          }
          this.$message.success("删除成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    /** 新增修改为一个方法 Code为空 则进行添加操作*/
    Modifydata(RiskOprCode, RiskOprName, Phone, Password, isAdd) {
      //   if (RiskOprCode.trim() == "") {
      //     //this.$message.error("风控员代码不能为空");
      //     this.$alert("风控员代码不能为空", {});
      //     return;
      //   }

      //   var reg = new RegExp(/^[a-zA-Z0-9_]{0,}$/);
      //   if (!reg.test(RiskOprCode.trim())) {
      //     //this.$message.error("风控员代码格式错误");
      //     this.$alert("风控员代码格式错误", {});
      //     return false;
      //   }

      if (RiskOprName.trim() == "") {
        //this.$message.error("风控员名称不能为空");
        this.$alert("风控员名称不能为空", {});
        return;
      }

      //编辑的时候 不验证密码
      if (isAdd) {
        if (Password.trim() == "") {
          //this.$message.error("风控员密码不能为空");
          this.$alert("风控员密码不能为空", {});
          return;
        }
        if (this.AddRiskOprConfirmPassword.trim() == "") {
          //this.$message.error("确认密码不能为空");
          this.$alert("确认密码不能为空", {});
          return;
        }
        if (Password.trim() != this.AddRiskOprConfirmPassword.trim()) {
          //this.$message.error("确认密码与密码不一致");
          this.$alert("确认密码与密码不一致", {});
          return;
        }
      }

      if (Phone.trim() == "") {
        //this.$message.error("手机号码不能为空！");
        this.$alert("手机号码不能为空！", {});
        return;
      }
      if (
        !Phone.trim().match(
          /^((1[3,5,7,8,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
        )
      ) {
        //this.$message.error("手机号码格式不正确！");
        this.$alert("手机号码格式不正确！", {});
        return;
      }
      var postData = {
        // RiskOprCode: RiskOprCode,
        RiskOprName: RiskOprName,
        Phone: Phone,
        Password: Password
      };
      var url = "/insriskopr/Add";
      if (isAdd) {
        url = "/insriskopr/Add";
      } else {
        url = "/insriskopr/Modify";
        postData = {
          RiskOprCode: RiskOprCode,
          RiskOprName: RiskOprName,
          Phone: Phone,
          Password: Password
        };
      }

      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.closeMask();
          this.$message.success("保存成功");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //弹出新增框
    addData() {
      this.AddRiskOprCode = "";
      this.AddRiskOprName = "";
      this.AddRiskOprPhone = "";
      this.AddRiskOprPassword = "";
      this.AddRiskOprConfirmPassword = "";
      $("#add").fadeIn("fast");
    },

    //弹出编辑框
    editData(item) {
      if (item.Phone == "******") {
        this.$alert("存在隐私信息，不允许编辑");
        return;
      }
      this.EditRiskOprCode = item.RiskOprCode;
      this.EditRiskOprName = item.RiskOprName;
      this.EditRiskOprPhone = item.Phone;
      this.EditRiskOprPassword = item.Password;
      $("#edit").fadeIn("fast");
    },

    selectedAll() {
      this.id_list = []; //
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.list.length; i++) {
          this.id_list.push(this.list[i].RiskOprCode);
        }
      }
    },

    selectedSub(code, index) {
      // 1.1 实现让每个旗舰店的里面元素控制旗舰店的头部选框
      var th = $("#total-checked").parent(),
        td = $(".sub-checked");
      this.choseBox().backWord(td, th.find(":input"));
      if ($(".sub-checked" + index)[0].checked) {
        //console.log($('.sub-checked'+index)[0].checked)
        this.id_list.push(code);
        //console.log(code);
      } else {
        //console.log(this.id_list.length)
        this.id_list.remove(code);
      }
      //console.log(this.id_list.length);
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

    del() {
      if (this.id_list.length == 0) {
        // this.$message.error("请选择需要删除的数据");
        this.$alert("请选择需要删除的数据", {});
        return;
      }
      $(".del-mask").fadeIn("fast");
      this.del_list = this.id_list;
      //this.id_list.push(code);
    },

    delOne(code) {
      $(".del-mask").fadeIn("fast");
      this.del_list.push(code);
    },

    closeMask() {
      $("#add").fadeOut("fast");
      $("#edit").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $(".mask").fadeOut("fast");
    },
    closeDelMask() {
      this.del_list = [];
      $(".del-mask").fadeOut("fast");
    },
    closeEditMask() {
      $(".edit-mask").fadeOut("fast");
    }
  }
};
</script>

<style scoped>
</style>
