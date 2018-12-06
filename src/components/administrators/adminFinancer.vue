<template>
  <div class="adminFinance">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye icon_admin"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">管理员</a>
                  </li>
                  <li class="active">机构财务管理员</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-10 fz">
                  <b>{{list.length}}个&nbsp;</b>机构财务管理员，进行新增、编辑、删除、设置权限和重置密码 操作 </span>
                <span class="col-md-2 text-right margin-Top">
                  <button class="btn btn-default btc btc-add" type="submit" @click="addData()">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <!-- <button class="btn btn-default btc btc-set" type="submit" @click="ShowAuth()">
                                        设置敏感信息查看权限
                                    </button> -->
                  <button class="btn btn-default btc btc-del" type="submit" @click="del()" v-show="false">
                    删除
                  </button>
                </span>
              </p>
            </div>
            <div class="table-1">
              <table class="table table-1-1">
                <thead>
                  <tr>
                    <th style="width:5%">序号</th>
                    <!-- <th style="width:6%" v-show="false"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th> -->
                    <th style="width:10%">财务员代码</th>
                    <th style="width:10%">财务员名称</th>
                    <th style="width:10%">联系方式</th>
                    <th style="width:55%">备注</th>
                    <th style="width:10%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="panel panel-default table-2" v-loading="loading">
            <table class="table table-hover table-2-1">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="width:5%">&nbsp;{{index+1}}</td>
                  <!-- <td style="width:6%" class="sub-checked " v-show="false"><input type="checkbox" :class="ClassName+index" @click="selectedSub(item.UserCode,index)"></td> -->
                  <td style="width:10%">
                    {{item.UserCode}}
                  </td>
                  <td style="width:10%">
                    {{item.UserName}}
                  </td>
                  <td style="width:10%">{{item.Phone}}</td>
                  <td style="width:55%">{{item.Remark}}</td>
                  <td style="width:10%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
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
                            <el-dropdown-item class="clearfix" @click.native="resetPassword(item)">
                              重置密码
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="delOne(item)">
                              删除
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" @click.native="ShowAuth(item)" v-show="IsShowSet()">
                              设置敏感信息权限
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
            <nav aria-label="Page navigation" class="text-center page-separation">
              <pageination :pagerPro="pager" @ee="pageFn"></pageination>
            </nav>
          </div>
        </div>
      </article>
    </div>

    <div id="add" class="mask mask_admin" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增机构财务管理员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  财务员名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddName">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  财务员密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" oncontextmenu="return false;" v-model="AddPassword" placeholder="包含大小写字母及数字，长度不得小于8位！">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  确认密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" oncontextmenu="return false;" v-model="AddConfirmPassword" placeholder="请再次输入密码">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  联系方式
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="AddPhone">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  备注
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" type="text" v-model="AddRemark" placeholder="请输入"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata('',AddName,AddPassword,AddPhone,AddRemark,true,0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!--编辑管理员弹窗-->
    <div id="edit" class="mask mask_admin" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑机构财务管理员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  财务员名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="EditName">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  联系方式
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="EditPhone">
                </span>
              </div>
              <div class="first-div">
                <div class="error3">
                  <span class="error4"></span>
                  备注
                </div>
                <span class="selected">
                  <textarea class="input-text input-textarea" type="text" v-model="EditRemark" placeholder="请输入"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(EditUserCode,EditName,EditPassword,EditPhone,EditRemark,true,1)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="del-mask deladminF" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除管理员</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除管理员吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate(EditUserCode)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="setPrivacyAuth" class="mask mask_admin" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置敏感信息权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedAuth" @change="handleCheckedAuthChange">
                  <el-checkbox v-for="item in AuthList" :label="item" :key="item.Code">{{item.Name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </form>
          </div>
          <div>
            <p class="bodykan10_">&nbsp;&nbsp;&nbsp;&nbsp;注：选中则该账户具有查看，编辑选中信息权限。</p>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="SaveAuthInfo(ChooseUser)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="showPass" class="mask mask_admin">
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

    <!--重置管理员密码-->
    <div class="del-mask" id="resetAgentPwd" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">重置管理员密码</div>
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
              <button type="button" class="btn btn-info" @click="resetPasswords(adminCode)">确定</button>
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
import pageination from "../subcom/pageination.vue";
export default {
  name: "adminFinancer",

  data() {
    return {
      loading: "",
      ishow: "",
      loadingsave: "",
      list: [],
      //此处声明变量用于V-Model 绑定
      InstitutionCode: "ML",
      AddName: "",
      AddPhone: "",
      AddPassword: "",
      AddConfirmPassword: "",
      AddRemark: "",
      EditUserCode: "",
      EditName: "",
      EditPhone: "",
      EditPassword: "",
      EditRemark: "",
      id_list: [],
      del_list: [],
      ClassName: "sub-checked",

      globalQuery_List: false,
      globalQuery_AdminCode: false,

      AuthList: [
        { Code: 1, Name: "手机号" },
        { Code: 2, Name: "身份证号" },
        { Code: 3, Name: "密码" },
        { Code: 4, Name: "地址" },
        { Code: 5, Name: "银行卡号" }
      ],
      checkAll: false,
      checkedAuth: [],
      isIndeterminate: true,
      AuthInfo: null,
      AddModifyModel: {
        UserName: "",
        UserAuth: "",
        UserCode: "",
        UserType: 2
      },
      ChooseUser: {},
      MarkCode: "",

      buttonName: "获取验证码",
      isDisabled: false,
      time: 120,
      adminCode: "", // 管理员代码
      pager: {
        PageNo: 1,
        PageSize: 20,
        RecordCount: 0
      }
    };
  },
  components: {
    pageination
  },
  created() {
    this.$store.state.loaction = "/administrators/adminFinancer";
    this.InstitutionCode = this.$store.state.inscode;
    this.getlist();
    // console.log(this.$store.state.userInfo);
  },
  mounted() {
    this.$emit("loaded", this.$route);
  },
  watch: {
    $route: function(to, from) {
      let toPath = to.path.toLowerCase();
      if (
        toPath == "/administrators/adminFinancer" ||
        toPath == "/administrators/administratorsinfo"
      ) {
        if (toPath == "/administrators/adminFinancer") {
          this.globalQuery_AdminCode = false;
          this.globalQuery_List = false;
          this.getlist();
        }
        this.$emit("loaded", this.$route);
      }
    }
  },
  methods: {
    //弹出验证码框
    ShowSendPassword(item) {
      $("#showPass").fadeIn("fast");
      this.ChooseUser = item;
    },

    //发送短信验证码
    SendSurePass() {
      if (
        this.$store.state.userInfo.Phone == null ||
        this.$store.state.userInfo.Phone == ""
      ) {
        this.$alert("该管理员尚未绑定手机号，请先设置手机号！");
        return;
      }
      var telphone = this.$store.state.userInfo.Phone;
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
        Phone: this.$store.state.userInfo.Phone,
        Code: this.MarkCode,
        UserCode: this.ChooseUser.UserCode,
        Type: 4
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
    IsShowPassButton(value) {
      if (value == "******") {
        return true;
      } else {
        return false;
      }
    },

    //是否显示隐私权限设置
    IsShowSet() {
      var result = this.$store.state.userInfo.IsMain;
      if (result == null) {
        return false;
      }
      return result;
    },

    handleCheckAllChange(val) {
      this.checkedAuth = val ? this.AuthList : [];
      this.isIndeterminate = false;
    },
    handleCheckedAuthChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.AuthList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.AuthList.length;
    },

    //获取用户认证权限
    GetUserPrivacyAuthInfo(code) {
      var url = "/userprivacyauth/QueryUserPrivacyAuth";
      var postData = {
        UserCode: code,
        UserType: 2
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
              this.checkAll = true;
              this.isIndeterminate = false;
            }
          }
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    ShowAuth(item) {
      this.checkAll = false;
      this.checkedAuth = [];
      this.isIndeterminate = true;
      this.ChooseUser = item;
      this.GetUserPrivacyAuthInfo(item.UserCode);
      $("#setPrivacyAuth").fadeIn("fast");
    },

    SaveAuthInfo(item) {
      var url = "";
      var postData = {};

      this.AddModifyModel.UserName = item.Name;
      this.AddModifyModel.UserCode = item.UserCode;
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

      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          this.getlist();
          this.closeMask();
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    loaded(params) {
      this.globalQuery_AdminCode = params.Code;
      this.globalQuery_ShowAdmin();
    },
    globalQuery_ShowAdmin() {
      if (this.globalQuery_List && this.globalQuery_AdminCode) {
        this.globalQuery_List.forEach(element => {
          if (element.UserCode == this.globalQuery_AdminCode) {
            this.list = [element];
            return false;
          }
        });
      }
    },
    getlist() {
      this.loading = true;
      var url = "/insbase/QueryFinancialStaffs";
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
            if (this.pager.PageNo == 1) {
              this.pager = response.Pager;
            }
            this.globalQuery_List = this.list;
            this.globalQuery_ShowAdmin();
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    Deldate(id) {
      this.loadingsave = true;
      var url = "/insbase/DelFinancialStaff";
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

    /** 新增修改为一个方法 Code为空 则进行添加操作*/
    Modifydata(code, Name, Password, Phone, Remark, IsEnable, Type) {
      if (Name.trim() == "") {
        this.$alert("管理员名称不能为空", {});
        return;
      }

      if (Type == 0) {
        if (Password.trim() == "") {
          // this.$message.error("密码不能为空");
          this.$alert("密码不能为空", {});
          return;
        }
        if (this.AddConfirmPassword.trim() == "") {
          // this.$message.error("确认密码不能为空");
          this.$alert("确认密码不能为空", {});
          return;
        }
        if (this.AddConfirmPassword.trim() != Password.trim()) {
          // this.$message.error("确认密码与密码不一致");
          this.$alert("确认密码与密码不一致", {});
          return;
        }
        if (
          !this.AddConfirmPassword.trim().match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
          )
        ) {
          if (Type == 0) {
            this.$alert("密码必须包含大小写字母及数字，长度不得小于8位！", {});
            return;
          }
        }
      }
      if (Phone.trim() == "") {
        // this.$message.error("联系方式不能为空！");
        this.$alert("联系方式不能为空！", {});
        return;
      }
      if (
        !Phone.trim().match(
          /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
        )
      ) {
        //this.$message.error("联系方式格式不正确！");
        this.$alert("联系方式格式不正确！", {});
        return;
      }

      var url = "/insbase/AddFinancialStaff";
      if (Type == 0) {
        url = "/insbase/AddFinancialStaff";
      } else {
        url = "/insbase/UpdateFinancialStaff";
      }
      var postData = {
        Password: Password,
        UserName: Name,
        Phone: Phone,
        Remark: Remark
      };
      if (Type == 1) {
        postData = {
          UserCode: code,
          UserName: Name,
          Phone: Phone,
          Remark: Remark
        };
      }
      this.loadingsave = true;
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
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
    //弹出新增框
    addData() {
      this.AddName = "";
      this.AddPhone = "";
      this.AddPassword = "";
      this.AddConfirmPassword = "";
      this.AddRemark = "";
      $("#add").fadeIn("fast");
    },

    //弹出编辑框
    editData(item) {
      this.EditUserCode = item.UserCode;
      this.EditName = item.UserName;
      this.EditPhone = item.Phone;
      this.EditRemark = item.Remark;
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

    del() {
      $(".del-mask").fadeIn("fast");
      this.del_list = this.id_list;
      //this.id_list.push(code);
    },

    delOne(item) {
      $(".deladminF").fadeIn("fast");
      this.EditUserCode = item.UserCode;
    },
    //打开重置管理员密码窗口
    resetPassword(obj) {
      this.adminCode = obj.UserCode;
      $("#resetAgentPwd").fadeIn("fast");
    },
    //      重置管理员密码
    resetPasswords(code) {
      this.$loginapi.post("/insbase/ResetFinancialStaffPwd", code, e => {
        if (e.Ret == 0) {
          this.closeMask();
          this.$message.success({
            message: "密码已重置，稍后将以短信发送到手机，请注意查收",
            center: true,
            duration: 800
          });
        } else {
          this.$alert(e.Msg, {});
        }
      });
    },

    closeMask() {
      $("#add").fadeOut("fast");
      $("#edit").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $(".mask").fadeOut("fast");
    },
    closeDelMask() {
      $(".del-mask").fadeOut("fast");
      $(".mask").fadeOut("fast");
    },
    closeEditMask() {
      $(".edit-mask").fadeOut("fast");
      $(".mask").fadeOut("fast");
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
.adminFinance
  .template
  > .main
  > .container-r
  > .panel
  > .table-1
  > .table-1-1 {
  margin-bottom: 0px;
}
#add .first-div,
#edit .first-div {
  width: 100% !important;
}
#add .input-textarea,
#edit .input-textarea {
  width: 99% !important;
  height: 70px !important;
  resize: none;
}
</style>
