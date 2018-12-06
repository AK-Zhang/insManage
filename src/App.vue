<template>
  <div id="app">
    <!--公共顶部导航-->
    <header class="header" v-show="isShow">
      <nav class="navbar navbar-default no_margin">
        <div class="container-fluid">
          <div class="navbar-header">
            <span class="navbar-brand" v-if="$isShowHtml.isShowHtml.xx">机构管理系统</span>
            <span class="navbar-brand" v-if="!$isShowHtml.isShowHtml.xx">
              <i class="iconfont icon-zhongbiao"></i>&nbsp;{{date|datefmt("HH:mm")}}</span>
          </div>
          <div class="collapse navbar-collapse navbar-color" style="padding-left:0px;" id="bs-example-navbar-collapse-1">
            <el-autocomplete prefix-icon="el-icon-search" v-model="keyword" :fetch-suggestions="querySearch" placeholder="搜索账户或用户" @select="handleSelect" popper-class="my-autocomplete" class="global_query">
              <template slot-scope="{ item }">
                <div class="names">{{ item.Code }}({{ item.Name }})</div>
                <span class="types">{{item.TypeName}}</span>
              </template>
            </el-autocomplete>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="javascript:;">欢迎您，{{$store.state.userInfo.UserName}}</a>
              </li>
              <li>
                <a href="javascript:;" style="padding:10px 25px 5px 0px;">
                  <div class="profile_info"><img src="./assets/images/profile.jpg" alt="暂无图片" class="profile_info_tx"></div>
                </a>
              </li>
              <!-- <li>
                <a href="javascript:;">{{$store.state.userInfo.UserName}}</a>  头像
              </li> -->

              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span class="fa fa-user"></span>个人中心
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu dropdown-menus">
                  <li @click="modifyPWD()">
                    <a href="javascript:;">
                      <span class="fa fa-pencil-square-o"></span>&nbsp;修改密码</a>
                  </li>
                  <li @click="openConfig()">
                    <a href="javascript:;">
                      <span class="fa fa-sign-out"></span>&nbsp;系统信息</a>
                  </li>
                </ul>
              </li>
              <li @click="exit()">
                <a href="javascript:;">
                  <span class="iconfont icon-guanji"></span>&nbsp;退出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!--公共内容部分-->
    <section class="section" v-show="isShow">
      <!--侧边栏-->
      <Aside></Aside>
    </section>
    <router-view class="home-container" ref="routerViewer" v-on:loaded="routerViewLoaded" />
    <!-- 修改密码 -->
    <div class="M-mask" id="dels-mask">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">修改密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3" style="text-align:center">
                  确认要修改密码吗?
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMaskss()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMaskss()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="M-mask" id="confirmModify">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <div class="panel-heading">修改密码</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  旧密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" id="oldPwd">
                </span>
                <div class="error3">
                  <span class="error4">*</span>
                  新密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" id="newPwd" placeholder="
新密码格式应包含大小写字母及数字，长度不得小于8位">
                </span>
                <div class="error3">
                  <span class="error4">*</span>
                  确认新密码
                </div>
                <span class="selected">
                  <input class="input-text" type="password" id="newPwd1" placeholder="
新密码格式应包含大小写字母及数字，长度不得小于8位">
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMaskss()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="modifyPWDSave()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMaskss()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <systemInfo ref="systemInfo"></systemInfo>
  </div>
</template>
<script>
import Aside from "@/components/subcom/aside";
import systemInfo from "@/components/subcom/ConfigInfo";
const hisKey = "selectedHisKey_xparty";
export default {
  name: "App",
  data() {
    return {
      isShow: true,
      isShowlimit: sessionStorage.getItem("isShowM"),
      keyword: "",
      tempKeyword: "",
      typeName: "",
      date: "",
      userType: sessionStorage.getItem("userType"),
      isMainAdmin: sessionStorage.getItem("isMain")
    };
  },
  mounted() {
    $(".financeAuth")
      .css("display", "none")
      .siblings()
      .css("display", "block");
    $(".AdminLimit").css("display", "none");
    if (this.userType == 5) {
      this.$router.push("/financereviews/chargeviews");
      $(".financeAuth")
        .css("display", "block")
        .siblings()
        .css("display", "none");
      $(".global_query").css("display", "none");
    }
    if (this.isMainAdmin == "true") {
      $(".financeAuth,.AdminLimit").css("display", "block");
    }
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
    }, 1000);
    if (
      this.$store.state.userInfo.UserName == null ||
      this.$store.state.userInfo.UserName == ""
    ) {
      this.$store.state.userInfo.UserName = sessionStorage.getItem(
        "insUserName"
      );
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
  },
  components: {
    Aside,
    systemInfo
  },
  methods: {
    exit() {
      var uname = sessionStorage.getItem("uname");
      var token = "token" + uname;
      var inscode = sessionStorage.getItem("inscode");
      // console.log(token);

      sessionStorage.removeItem("uname");
      sessionStorage.removeItem("inscode");
      sessionStorage.removeItem("pwd");
      sessionStorage.removeItem(token);
      sessionStorage.removeItem("pubkey");
      this.$store.state.inscode = "";
      this.$store.state.uname = "";
      this.$store.state.pwd = "";
      this.$store.state.islogin = false;
      this.$store.state.userInfo = {};

      this.$router.push("/login/" + inscode);
    },
    //根据输入内容远程查询
    querySearch: function(queryString, cb) {
      this.tempKeyword = queryString;
      if (!queryString) {
        cb(this.getQueryHistory());
        //  $(".my-autocomplete #searchListCaption").remove();
        //  $(".my-autocomplete>div").prepend("<span id='searchListCaption' style='padding-left:10px;'>最近搜索</span>");
        this.showSearchCaption("最近搜索");
        return;
      }
      let data = {
        QueryString: queryString,
        Type: null
      };
      this.$loginapi.post(
        "XParty/GetList",
        data,
        e => {
          if (e.Ret == 0) {
            cb(e.Data);
            // $(".my-autocomplete #searchListCaption").remove();
            // $(".my-autocomplete>div").prepend("<span id='searchListCaption' style='padding-left:10px;'>搜索结果</span>");
            this.showSearchCaption("搜索结果");
          }
        },
        1,
        30
      );
    },
    showSearchCaption(caption) {
      $(".my-autocomplete #searchListCaption").remove();
      $(".my-autocomplete>div>div:eq(0)").prepend(
        "<span id='searchListCaption' style='padding-left:10px;'>" +
          caption +
          "</span>"
      );
    },
    //选中后处理
    handleSelect(item) {
      this.keyword = this.tempKeyword;
      this.typeName = item.TypeName;
      this.openPage(item);
      this.addToQueryHistory(item);
    },
    //根据选中的过滤数据，打开明细页面
    openPage(item) {
      let routeData = {};
      switch (item.Type) {
        case 1: //系统管理员
          //routeData.name = "";
          //routeData.menuPath = "";
          break;
        case 2: //机构管理员
          routeData.name = "administrators";
          routeData.menuPath = "/administrators/administrators";
          break;
        case 3: //机构经纪人
          routeData.name = "AgentTree";
          break;
        case 4: //子账户
          routeData.name = "subaccountsinfo"; //"subaccountsinfo";//要打开的路由名称
          routeData.menuPath = "/accounts/subaccounts/"; //对应的菜单定义的路由
          break;
        case 5: //机构财务
          routeData.name = "adminFinancer";
          routeData.menuPath = "/administrators/adminFinancer";
          break;
        case 11: //总账户
          routeData.name = "parentsaccoutinfo";
          routeData.menuPath = "/accounts/parentaccounts";
          break;
        case 12: //风控员
          routeData.name = "monitorsinfo";
          routeData.menuPath = "/monitors/monitors";
          break;
        case 13: //保证金模板
          routeData.name = "TemmarginsInfo";
          routeData.menuPath = "/templates/temmargins";
          break;
        case 14: //风控模板
          //routeData.name = "risktemplates";
          //routeData.menuPath = "/templates/risktemplates";
          this.$message.error("暂不支持 风控模板");
          break;
        case 15: //子账户手续费模板
          routeData.name = "commissiontemplatesinfo";
          routeData.menuPath = "/templates/commissiontemplates";
          break;
        case 16: //经纪人手续费模板
          routeData.name = "agentfeetemplatesinfo";
          routeData.menuPath = "/templates/agentfeetemplates";
          break;
      }

      if (routeData.name) {
        routeData.params = {
          InsCode: item.InsCode,
          Code: item.Code
        };
        // routeData.query ={
        //    globalQuery:true,
        // };
        //this.$router.push({name:"subaccountsinfo"});
        //this.$store.state.DetailInfo = null;
        routeData.params.loadingByGlobalQuery = true;
        //console.log("%%%%%%%%%%%%%%");
        //console.log(this.$route);
        let oldPath = this.$route.path;
        this.$router.push(routeData);
        let pathNoChanged = this.$route.path == oldPath;
        //console.log(this.$route);

        if (!routeData.menuPath) {
          routeData.menuPath = routeData.path;
        }
        this.locateMenuItem(routeData.menuPath);
        // console.log("==================================================");
        // console.log(this.$refs.routerViewer);
        // console.log(this.$refs.routerViewer.show);
        //console.log(routeData);
        if (pathNoChanged && this.$refs.routerViewer.loaded) {
          //this.$message.error("4");
          routeData.params.loadingByGlobalQuery = false;
          this.$refs.routerViewer.loaded(routeData.params);
        }
      }
    },
    //当路由嵌入视图加载完成后触发
    routerViewLoaded(route) {
      if (this.$refs.routerViewer.loaded) {
        if (route.params && JSON.stringify(route.params) != "{}") {
          //this.$message.error("5");
          route.params.loadingByGlobalQuery = false;
          this.$refs.routerViewer.loaded(route.params);
        }
      }
    },
    //定位菜单位置
    locateMenuItem(routePath) {
      // console.log($(".el-menu-vertical-demo").children()[0].innerText);
      // routePath = routePath.toLowerCase();
      // if (routePath[routePath.length - 1] == "/")
      //   routePath = routePath.substr(0, routePath.length - 1);
      //let link = $("ul.menu-1>li>ul.menu-2>li[data-to='"+routePath+"']");
      let menu = $(".el-menu-vertical-demo").children();
      var tname = this.typeName;
      switch (tname) {
        case "子账户":
          this.$store.state.loaction = "/accounts/subaccounts";
          break;
        case "总账户":
          this.$store.state.loaction = "/accounts/parentaccounts";
          break;
        case "经纪人":
          this.$store.state.loaction = "/agents/tree";
          break;
        case "经纪人手续费模板":
          this.$store.state.loaction = "/templates/agentfeetemplates";
          break;
        case "子账户手续费模板":
          this.$store.state.loaction = "/templates/commissiontemplates";
          break;
        case "风控模板":
          this.$store.state.loaction = "/templates/risktemplates";
          break;
        case "保证金模板":
          this.$store.state.loaction = "/templates/temmargins";
          break;
        // case "管理员":
        //   this.$store.state.loaction = "/administrators/administrators";
        //   break;
      }
    },

    getHisKey() {
      return hisKey + "_" + this.$store.state.inscode.toLowerCase();
    },
    //获取最近的历史查询选择记录
    getQueryHistory() {
      let temp = localStorage.getItem(this.getHisKey());
      if (temp) {
        return JSON.parse(temp);
      } else {
        return [];
      }
    },
    //将选中的项添加到历史记录
    addToQueryHistory(item) {
      let temp = localStorage.getItem(this.getHisKey());
      if (temp) {
        let list = JSON.parse(temp);
        list.forEach((element, i) => {
          if (element.Type == item.Type && element.Code == item.Code) {
            list.splice(i, 1);
            return false;
          }
        });
        if (list.length > 10) {
          list.pop();
        }
        list.unshift(item);
        localStorage.setItem(this.getHisKey(), JSON.stringify(list));
      } else {
        localStorage.setItem(this.getHisKey(), JSON.stringify([item]));
      }
    },

    //修改密码
    modifyPWD() {
      $("#oldPwd").val("");
      $("#confirmModify").fadeIn();
    },
    closeMaskss() {
      $("#dels-mask,#confirmModify").fadeOut("fast");
      $("#oldPwd").val("");
      $("#newPwd").val("");
      $("#newPwd1").val("");
    },
    closeMaskInfo() {
      this.$refs.systemInfo.closeMask();
    },
    modifyPWDSave() {
      var oldPwd = $("#oldPwd").val(),
        newPwd = $("#newPwd").val(),
        newPwd1 = $("#newPwd1").val();
      // let pwd = this.$store.state.pwd.split("&")[0];
      // if (oldPwd == "" || oldPwd != pwd) {
      //   this.$message.error("旧密码不正确！");
      //   return;
      // }
      if (newPwd == "" || newPwd.length < 6) {
        this.$message.error("新密码长度必须不能低于6位！");
        return;
      }
      if (newPwd == oldPwd) {
        this.$message.error("新密码不能与旧密码相同！");
        return;
      }
      if (newPwd1 != newPwd) {
        this.$message.error("两次输入不一致");
        return;
      }
      let url = "/insbase/ModifyAdminSelfPwd";
      let data = {
        NewPwd: newPwd1,
        OldPwd: oldPwd
      };
      //console.log(data);
      this.$loginapi.post(url, data, e => {
        if (e.Ret == 0) {
          this.$alert("密码修改成功，请重新登录！", "", {
            confirmButtonText: "确定",
            callback: action => {
              $("#confirmModify").fadeOut("fast");
              this.exit();
            }
          });
        } else {
          this.$alert(e.Msg);
        }
      });
    },
    openConfig() {
      this.$refs.systemInfo.configSystem();
    }
  },
  watch: {
    // "$route": 'checkLogin',
    $route: function(newroute, oldroute) {
      let name = newroute.name.toLowerCase();
      if (name == "login") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }
};
</script>

<style>
.uploadImgg {
  display: inline !important;
}
/* .uploadImgg .el-upload-list {
  height: 0px !important;
  overflow: hidden;
} */
.uploadImgg .el-upload__input {
  display: none !important;
}
.el-tooltip__popper {
  max-width: 500px;
  /* height: auto; */
  word-break: break-all;
  overflow: hidden;
}
.abandonTime .el-dialog__body {
  max-height: 450px;
  overflow-y: auto;
}
</style>
