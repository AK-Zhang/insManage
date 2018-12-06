<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">委托</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">成交</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(third,2)">出入金</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(fourth,3)">当日持仓</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>
<script>
import DelegatePage from "../selects/todayreportsSubcom/delegateSelect.vue";
import DealPage from "../selects/todayreportsSubcom/dealSelect.vue";
import InOutMoneyPage from "../selects/todayreportsSubcom/InOutMoneySelect.vue";
import PositionPage from "../selects/todayreportsSubcom/PositionSelect.vue";

export default {
  data() {
    return {
      first: "DelegatePage",
      second: "DealPage",
      third: "InOutMoneyPage",
      fourth: "PositionPage",
      currentView: "DelegatePage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/selects/todayreports";
  },
  components: {
    DelegatePage,
    DealPage,
    InOutMoneyPage,
    PositionPage
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

<style>
</style>

 
