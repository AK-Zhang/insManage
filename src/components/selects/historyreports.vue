<template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">资金</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">委托</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(third,2)">成交</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(fourth,3)">历史持仓</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(fiveth,4)">出入金</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>
<script>
import capitalPage from "../selects/historyreportsSubcom/capital.vue";
import delegatePage from "../selects/historyreportsSubcom/delegate.vue";
import tradeDetailPage from "../selects/historyreportsSubcom/tradeDetail.vue";
import positionPage from "../selects/historyreportsSubcom/position.vue";
import InOutMoneyPage from "../selects/historyreportsSubcom/InOutMoney.vue";

export default {
  data() {
    return {
      first: "capitalPage",
      second: "delegatePage",
      third: "tradeDetailPage",
      fourth: "positionPage",
      fiveth: "InOutMoneyPage",
      currentView: "capitalPage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/selects/historyreports";
  },
  components: {
    capitalPage,
    delegatePage,
    tradeDetailPage,
    positionPage,
    InOutMoneyPage
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

