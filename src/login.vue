<template>
  <el-container class="login_inde">
    <el-header height="0px"></el-header>
    <el-main>
      <div id="loginz" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
        <div class="login_container flex">
          <div class="login_container_left">
            <div class="login_container_left_title">
              <h3 class="title_color">登录</h3>
            </div>
            <div class="login_form">
              <label for="">用户名：</label><br>
              <input type="text" class="input_box" v-model="name"><br>
              <label for="">密码：</label><br>
              <input type="password" class="input_box" v-model="pwd" @keydown.enter="login()"><br>
              <span class="circle1 flex">
                <el-checkbox v-model="checked">记住用户名</el-checkbox>

                <el-checkbox :v-model="$store.state.accountChecked" @change="switchTpye()">机构财务员登录</el-checkbox>
              </span>
              <a href="javascript:;" @click="login()" class="btn btn__submit">登录
                <span class="circle">
                  <i class="fa fa-long-arrow-right"></i>
                </span>
              </a>
              <hr>
              <p class="modify_pwd">
                <a href="javascript:;" class="m">忘记密码</a>
              </p>
            </div>
          </div>
          <div class="login_container_right">
            <div class="m_title">
              <h3 class="m_title_name">环球国际</h3>
              <p class="m_title_p">Global International</p>
            </div>
            <div class="m_brief">
              <h4 class="m_b_title">投资有风险，入市需谨慎</h4>
              <p>There is a risk in investment and caution in entering the market</p>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loading: "",
      isShow: true,
      checked: false,
      name: "",
      pwd: "",
      inscode: "",
      dd: ""
    };
  },
  created() {
    this.getusername();
    this.clearCache();
  },
  methods: {
    getusername() {
      var cat = localStorage.getItem("username");
      if (typeof cat == undefined) {
        return;
      } else {
        this.name = cat;
        this.checked = true;
      }
    },
    rememberusername() {
      if (this.checked == false) {
        localStorage.setItem("username", "");
        return;
      } else {
        var username = this.name;
        localStorage.setItem("username", username);
        var cat = localStorage.getItem("username");
      }
    },
    switchTpye() {
      this.$store.state.accountChecked = !this.$store.state.accountChecked;
    },
    clearCache() {
      var uname = sessionStorage.getItem("uname");
      var token = "token" + uname;
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
      this.$store.state.accountChecked = false;
    },
    login() {
      let timestap = Math.round(new Date().getTime() * 0.001);
      this.inscode = window.location.hash.slice(8, 100);
      if (this.inscode == "") {
        this.$alert("请在地址栏输入正确链接地址，按回车键进入系统！");
        return;
      }
      localStorage.setItem("url", window.location.href);
      if (this.name == null || this.name == "") {
        this.$alert("请输入正确的账号", {
          confirmButtonText: "确定",
          center: "true",
          callback: action => {
            this.name = "";
          }
        });
        return;
      }
      if (this.pwd == null || this.pwd == "") {
        this.$alert("请输入正确的密码", {
          confirmButtonText: "确定",
          center: "true",
          callback: action => {
            this.pwd = "";
          }
        });
        return;
      }
      this.$store.state.inscode = this.inscode;
      this.$store.state.uname = this.name;
      this.$store.state.pwd = this.pwd + "&" + timestap;
      this.loading = true;
      this.$loginapi.login(
        this.inscode,
        this.name,
        this.pwd + "&" + timestap,
        e => {
          this.loading = false;
          if (e.Ret == 0) {
            this.$store.state.pwd = "";
            localStorage.setItem("CacheHide", true);
            // console.log("----- login result is -----");
            this.$router.push("/home");
            $(".financeAuth")
              .css("display", "none")
              .siblings()
              .css("display", "block");
            $(".AdminLimit").css("display", "none");
            let userType = this.$store.state.userInfo.UserType;
            let isMainAdmin = this.$store.state.userInfo.IsMain;
            sessionStorage.setItem("userType", userType);
            sessionStorage.setItem("isMain", isMainAdmin);

            if (userType == 5) {
              this.$router.push("/financereviews/chargeviews");
              $(".financeAuth")
                .css("display", "block")
                .siblings()
                .css("display", "none");
              $(".global_query").css("display", "none");
            } else {
              $(".global_query").css("display", "block");
            }
            if (isMainAdmin) {
              $(".financeAuth,.AdminLimit").css("display", "block");
            }
          } else {
            this.$alert(e.Msg, {
              confirmButtonText: "确定",
              center: "true",
              callback: action => {
                this.pwd = "";
              }
            });
            return;
          }
        }
      );
      this.rememberusername();
    }
  }
};
</script>

<style scoped>
</style>
