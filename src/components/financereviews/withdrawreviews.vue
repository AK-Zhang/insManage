<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">子账户提现审核</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">子账户提现历史</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>

<script>
import withdrawAuditPage from "../financereviews/withdrawSubcom/withdrawAudit.vue";
import withdrawHisPage from "../financereviews/withdrawSubcom/withdrawHis.vue";

export default {
  data() {
    return {
      first: "withdrawAuditPage",
      second: "withdrawHisPage",
      currentView: "withdrawAuditPage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/financereviews/withdrawreviews";
  },
  components: {
    withdrawAuditPage,
    withdrawHisPage
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
