<template>
  <div class="config-mask" id="configName" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="mask_box" style="width:60%;min-width:980px">
      <div class="panel panel-default  no-border">
        <!-- Default panel contents -->
        <div class="panel-heading" id="maskTitleName">系统信息</div>
        <div class="panel-body">
          <form class="form-inline form-inline1" novalidate="" role="form">
            <div>
              <div class="error3">
                机构代码：
                <span style="display:inline-block;border-bottom:1px solid #ccc;padding:0 5px;">{{insinfo.InsCode}}</span>
              </div>
              <span class="selected">
                <!-- <input class="input-text" type="text" placeholder="请输入" style="width:98%"> -->
              </span>
            </div>
            <div>
              <div class="error3">
                机构名称：
                <span style="display:inline-block;border-bottom:1px solid #ccc;padding:0 5px;">{{insinfo.Name}}</span>
              </div>
              <span class="selected">
                <!-- <input class="input-text" type="text" placeholder="请输入" style="width:98%"> -->
              </span>
            </div>
            <div>
              <div class="error3">
                提现回调地址：
              </div>
              <span class="selected">
                <input class="input-text" type="text" placeholder="请输入" style="width:98%" v-model="InsConfigInfo.WithDrawCallbackUrl">
              </span>
            </div>
            <div>
              <div class="error3">
                支付回调地址：
              </div>
              <span class="selected">
                <input class="input-text" type="text" placeholder="请输入" style="width:98%" v-model="InsConfigInfo.PayCallbackUrl">
              </span>
            </div>
            <div>
              <div class="error3">
                充值密钥：
              </div>
              <span class="selected">
                <input class="input-text" type="text" placeholder="请输入" style="width:98%" v-model="InsConfigInfo.PaySecretKey">
              </span>
            </div>
            <div>
              <div class="error3">
                机构Logo图片地址：<span class="el-upload__tip" style="color:#ff4040">只能上传jpg/png文件，且不超过500kb</span>
              </div>
              <span class="selected">
                <input class="input-text" type="text" placeholder="请输入" readonly style="width:78%" v-model="InsConfigInfo.InsLogoUrl">
                <el-upload class="avatar-uploader uploadImgg" action="" :show-file-list="false" :auto-upload="false" :on-change="changeFileBack">
                  <el-button size="normal" type="primary">点击上传</el-button>
                </el-upload>
              </span>
            </div>
            <div class="first-div">
              <div class="imgbox">
                <img :src="InsConfigInfo.InsLogoUrl" alt="机构LOGO" @click="frontimgdialog=true">
                  </div>
              </div>
          </form>
        </div>
        <div class="closed closed-add" @click="closeMask()">×</div>
        <!-- Table -->
        <p>
          <span class="fr">
            <button type="button" class="btn btn-info" @click="ModifyInsConfig()">保存</button>
          </span>
          <span class="fr">
            <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["childMsg"],
  data() {
    return {
      loadingsave: "",
      insinfo: {},
      InsConfigInfo: {}
    };
  },
  methods: {
    Show(item) {
      this.list = jQuery.extend(true, [], item);
    },
    closeMask() {
      $("#configName").fadeOut("fast");
    },

    configSystem() {
      $("#configName").fadeIn("fast");
      let url = "/sysbaseinfo/QueryInsInfo";
      let url_ = "/insbase/GetInsConfigInfo";
      this.$loginapi.post(url, "", e => {
        if (e.Ret == 0) {
          this.insinfo = e.Data;
        } else {
          this.$alert(e.Msg, {});
        }
      });
      this.$loginapi.post(url_, "", e => {
        if (e.Ret == 0) {
          this.InsConfigInfo = e.Data;
          this.InsConfigInfo.InsLogoUrl =
            "data:" +
            this.InsConfigInfo.InsLogoUrlExt +
            ";base64, " +
            this.InsConfigInfo.InsLogoUrl;
        } else {
          this.$alert(e.Msg, {});
        }
      });
    },
    ModifyInsConfig() {
      let url = "/insbase/ModifyInsConfigInfo";
      let postData = this.InsConfigInfo;
      postData.InsLogoUrl = postData.InsLogoUrl.substring(
        postData.InsLogoUrl.indexOf(",") + 1
      );
      this.$loginapi.post(url, postData, e => {
        if (e.Ret == 0) {
          this.$alert("保存成功！", {});
          this.closeMask();
        } else {
          this.$alert(e.Msg, {});
        }
      });
    },
    changeFileBack(file, fileList) {
      let isJPG = file.raw.type === "image/jpeg";
      let isPNG = file.raw.type === "image/png";
      let isBMP = file.raw.type === "image/bmp";
      let isLt2M = file.raw.size / 1024 / 1024 < 2;

      this.InsConfigInfo.InsLogoUrlExt = file.raw.type;

      if (!isJPG && !isPNG && !isBMP) {
        this.$message.warning("上传图片必须是JPG/PNG/BMP 格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.warning("上传图片大小不能超过 1MB!");
        return;
      }

      let This = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        //this.result;这个就是base64编码了
        This.InsConfigInfo.InsLogoUrl = this.result;
      };
    }
  }
};
</script>

<style scoped>
.config-mask .mask_box .no-border .panel-body .form-inline > div {
  width: 50%;
  display: inline-block;
  float: left;
}
.config-mask .first-div {
  width: 100% !important;
}
.imgbox {
  /* width: 600px; */
  text-align: center;
  height: 100px;
  margin: 10px auto;
}
img {
  width: 100px;
  height: 100px;
}
</style>
