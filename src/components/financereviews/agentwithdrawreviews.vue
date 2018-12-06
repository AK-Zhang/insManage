<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">经纪人提现审核</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">经纪人提现历史</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>

<script>
import agentwithdrawAuditPage from "../financereviews/withdrawSubcom/agentwithdrawAudit.vue";
import agentwithdrawHisPage from "../financereviews/withdrawSubcom/agentwithdrawHis.vue";

export default {
  data() {
    return {
      first: "agentwithdrawAuditPage",
      second: "agentwithdrawHisPage",
      currentView: "agentwithdrawAuditPage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/financereviews/agentwithdrawreviews";
  },
  components: {
    agentwithdrawAuditPage,
    agentwithdrawHisPage
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
