<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">经纪人佣金</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">经纪人佣金结余</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(third,2)">机构佣金</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>
<script>
import AgentFeePage from "../selects/feereportsSubcom/AgentFee.vue";
import AgentFeeBalancePage from "../selects/feereportsSubcom/AgentFeeBalance.vue";
import InsFeePage from "../selects/feereportsSubcom/InsFee.vue";

export default {
  data() {
    return {
      first: "AgentFeePage",
      second: "AgentFeeBalancePage",
      third: "InsFeePage",
      currentView: "AgentFeePage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/selects/feereports";
  },
  components: {
    AgentFeePage,
    AgentFeeBalancePage,
    InsFeePage
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