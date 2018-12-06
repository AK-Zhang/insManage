 <template>
  <div>
    <div class="trees">
      <div
        class="radios"
        v-show="agents"
      >
        <el-radio-group
          v-model="radio9"
          size="small"
          @change="checkTypechange"
        >
          <el-radio
            label="0"
            border
          >单选</el-radio>
          <el-radio
            label="1"
            border
          >全选</el-radio>
        </el-radio-group>
      </div>

      <el-input
        placeholder="输入代理名称进行过滤"
        v-model="filterText"
        v-show="agents"
      >
      </el-input>

      <el-tree
        class="filter-tree"
        :data="agentTreeData"
        :props="defaultProps"
        show-checkbox
        :check-strictly="checkTypes"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2"
        @check="getCheckedNodes"
        v-show="agents"
      >
      </el-tree>
    </div>
    <div class="rigthtable">
      <div class="select_tabs_box">
        <a
          href="javascript:void(0)"
          class="select_tabs active"
          @click="tabChange(first,0)"
        >统计单量</a>
        <a
          href="javascript:void(0)"
          class="select_tabs"
          @click="tabChange(second,1)"
        >统计盈亏</a>
        <a
          href="javascript:void(0)"
          class="select_tabs"
          @click="tabChange(third,2)"
        >出入金统计</a>
      </div>
      <div
        :is="currentView"
        :agentID="agentTreeDataS"
        @esd="expended"
        class="select_box"
      ></div>
    </div>
  </div>
</template>
<script>
import OrderStatistics from "../selects/statisticsSubcom/OrderStatistics.vue";
import ProfitS from "../selects/statisticsSubcom/ProfitS.vue";
import WithdrawCharge from "../selects/statisticsSubcom/WithdrawCharge.vue";

export default {
  name: "statistics",
  data() {
    return {
      first: "OrderStatistics",
      second: "ProfitS",
      third: "WithdrawCharge",
      currentView: "OrderStatistics", // 默认选中第一项

      filterText: "",
      agentTreeData: [],
      agenttrees: [], //获取经纪人树
      //树形结构
      defaultProps: {
        id: "AgentCode",
        children: "Childs",
        label: "AgentName"
      },

      expandedKeys: [], //全局筛选后默认打开的节点

      agentTreeDataS: [],
      radio9: "0",
      agents: true,
      checkTypes: true
    };
  },
  created() {
    this.$store.state.loaction = "/selects/statistics";
  },
  components: {
    OrderStatistics,
    ProfitS,
    WithdrawCharge
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    this.viewAgetnTree();
  },
  methods: {
    checkTypechange(v) {
      if (v == 0) {
        this.checkTypes = true;
      } else {
        this.checkTypes = false;
      }
    },
    expended(val) {
      if (val != "AllAgent") {
        $(".trees").animate({ width: "0px" });
        this.agents = false;
      } else {
        $(".trees").animate({ width: "190px" });
        this.agents = true;
      }
      this.viewAgetnTree();
    },
    tabChange(tabItem, index) {
      this.currentView = tabItem;
      $(".select_tabs:eq(" + index + ")")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.AgentName.indexOf(value) !== -1;
    },
    //    获取经纪人树
    viewAgetnTree() {
      this.loading = true;
      this.$loginapi.post("agent/QueryAgentTree", null, e => {
        this.loading = false;
        if (e.Ret == 0) {
          // this.agenttrees = e.Data.Agents;
          this.agentTreeData = e.Data.Agents;
          if (e.Data.Agents.length > 0) {
            // if (this.toSelectCode != "") {
            //   this.getAllInfo(this.toSelectCode);
            //   setTimeout(this.selectTreeNode, 200);
            // } else {
            //   this.getAllInfo(e.Data.Agents[0].AgentCode);
            //   setTimeout(this.selectTreeNode, 200);
            // }
          }
        }
      });
    },
    getCurrentNode(leafOnly, includeHalfChecked) {
      let ddd = this.$refs.tree2.getCurrentNode();
      console.log(ddd);
    },

    getCheckedNodes(leafOnly, includeHalfChecked) {
      // console.log(includeHalfChecked);
      // console.log(leafOnly);
      // let ddd = this.$refs.tree2.getCheckedNodes();
      // console.log(ddd);

      // console.log(this.$refs.tree2.getCheckedNodes());
      let temagentArray = this.$refs.tree2.getCheckedNodes();
      let agentArray = [];
      temagentArray.forEach(element => {
        agentArray.push(element.AgentCode);
      });
      this.agentTreeDataS = agentArray;
      console.log(this.agentTreeDataS);
    },
    getCheckedAll() {
      return this.flatState
        .filter(function(e) {
          if (e.node.indeterminate) {
            return e.node.indeterminate;
          }
          return e.node.checked;
        })
        .map(function(e) {
          return e.node;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.trees {
  width: 190px;
  // background-color: rgba(0, 0, 0, 0.15);
  height: 100%;
  float: left;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  // .el-input {
  //   background-color: rgba(0, 0, 0, 0.15);
  // }
  // .el-tree {
  //   background-color: rgba(0, 0, 0, 0.15);
  // }
  .el-tree {
    height: calc(100% - 85px);
    overflow-x: scroll;
  }
}
.radios {
  padding: 8px 15px 0px;
}
</style>
