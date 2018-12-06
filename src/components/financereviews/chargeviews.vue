<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">子账户充值审核</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">子账户充值历史</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>

<script>
import chargeAuditPage from "../financereviews/withdrawSubcom/chargeAuditPage.vue";
import chargeHisPage from "../financereviews/withdrawSubcom/chargeHis.vue";

export default {
  data() {
    return {
      first: "chargeAuditPage",
      second: "chargeHisPage",
      currentView: "chargeAuditPage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/financereviews/chargeviews";
  },
  components: {
    chargeAuditPage,
    chargeHisPage
  },
  methods: {
    tabChange(tabItem, index) {
      this.currentView = tabItem;
      $(".select_tabs:eq(" + index + ")")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  }
};
</script> 
