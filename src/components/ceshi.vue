<template>
  <div>
    <div class="mui-bar mui-bar-footer" style="padding: 0px;">
      <div class="fbt" onclick="scanPicture();">从相册选择二维码</div>
      <div class="fbt mui-action-back">取　 消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ffff",
  data() {
    return {};
  },
  created() {},
  methods: {
    getlist() {
      var url = "/insargu/QueryInsExchangeRate";
      this.$loginapi.post(url, "", response => {
        return "";
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
