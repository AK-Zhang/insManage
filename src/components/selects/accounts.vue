 <template>
  <div>
    <div class="select_tabs_box">
      <a href="javascript:void(0)" class="select_tabs active" @click="tabChange(first,0)">子账户</a>
    </div>
    <div :is="currentView" class="select_box"></div>
  </div>
</template>
<script>
import accountPage from "../selects/accountSubcom/accountSub.vue";

export default {
  data() {
    return {
      first: "accountPage",
      currentView: "accountPage" // 默认选中第一项
    };
  },
  created() {
    this.$store.state.loaction = "/selects/accounts";
  },
  components: {
    accountPage
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