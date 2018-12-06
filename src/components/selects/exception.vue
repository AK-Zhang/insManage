 <template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">委托</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(second,1)">交易</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(third,2)">黑名单</a>
      <a href="javascript:void(0)" class="select_tabs" @click="tabChange(forth,3)">黑名单触发记录</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>
<script>
import exceptiondelegatePage from "../selects/exceptionSubcom/exceptiondelegateSub.vue";
import exceptiondealPage from "../selects/exceptionSubcom/exceptiondealSub.vue";
import blackList from "../selects/exceptionSubcom/blackList.vue";
import triggerRecord from "../selects/exceptionSubcom/triggerRecord.vue";

export default {
  name: "exception",
  data() {
    return {
      first: "exceptiondelegatePage",
      second: "exceptiondealPage",
      third: "blackList",
      forth: "triggerRecord",
      currentView: "exceptiondelegatePage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/selects/exception";
  },
  components: {
    exceptiondelegatePage,
    exceptiondealPage,
    blackList,
    triggerRecord
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