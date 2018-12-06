<template>
  <div class="hello aside_comm">
    <el-row class="tac">
      <el-menu :default-active="$store.state.loaction" v-if="$isShowHtml.isShowHtml.xx" unique-opened router class="el-menu-vertical-demo tac_menue" background-color="#112955" text-color="#fff" active-text-color="#fff" @select="handleSelect">
        <!-- <el-menu :default-active="$store.state.loaction" unique-opened router class="el-menu-vertical-demo tac_menue" background-color="#4a5a71" text-color="#fff" active-text-color="#fff" @select="handleSelect"> -->
        <el-menu-item index="/home">
          <i class="el-icon-home iconfont icon-home1"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="业务参数">
          <template slot="title">
            <i class="el-icon-location iconfont icon-fuzhi"></i>
            <span>业务参数</span>
          </template>
          <el-menu-item index="/businessparms/basemargins">品种基准保证金</el-menu-item>
          <el-menu-item index="/businessparms/exchangerates">汇率</el-menu-item>
          <el-menu-item index="/businessparms/marketupdown">行情涨跌</el-menu-item>
          <el-menu-item index="/businessparms/instruments">合约信息</el-menu-item>
          <el-menu-item index="/businessparms/maininstruments">主力合约</el-menu-item>
          <el-menu-item index="/businessparms/TradeCore">交易核心</el-menu-item>
          <el-menu-item index="/businessparms/orgnotices">机构通知</el-menu-item>
        </el-submenu>
        <el-submenu index="模板">
          <template slot="title">
            <i class="el-icon-location iconfont icon-shuju"></i>
            <span>模板</span>
          </template>
          <el-menu-item index="/templates/temmargins">保证金模板</el-menu-item>
          <el-menu-item index="/templates/commissiontemplates">子账户手续费模板</el-menu-item>
          <el-menu-item index="/templates/risktemplates">风控模板</el-menu-item>
          <el-menu-item index="/templates/agentfeetemplates">一级经纪人手续费模板</el-menu-item>
        </el-submenu>
        <el-submenu index="账户">
          <template slot="title">
            <i class="el-icon-location iconfont icon-Account"></i>
            <span>账户</span>
          </template>
          <el-menu-item index="/accounts/parentaccounts">总账户</el-menu-item>
          <el-menu-item index="/accounts/subaccounts">子账户</el-menu-item>
        </el-submenu>
        <el-menu-item index="/monitors/monitors">
          <i class="el-icon-location iconfont icon-svg"></i>
          <span slot="title">风控员</span>
        </el-menu-item>
        <el-menu-item index="/agents/tree">
          <template slot="title">
            <i class="el-icon-location iconfont icon-user-agent"></i>
            <span>经纪人</span>
          </template>
        </el-menu-item>
        <!-- <el-menu-item index="/administrators/administrators">
          <template slot="title">
            <i class="el-icon-location iconfont icon-zhanghuguanli"></i>
            <span>管理员</span>
          </template>
        </el-menu-item> -->
        <el-submenu index="管理员" class="AdminLimit">
          <template slot="title">
            <i class="el-icon-location iconfont icon-zhanghuguanli"></i>
            <span>管理员</span>
          </template>
          <el-menu-item index="/administrators/administrators">机构管理员</el-menu-item>
          <el-menu-item index="/administrators/adminFinancer">机构财务管理员</el-menu-item>
        </el-submenu>
        <el-submenu index="查询">
          <template slot="title">
            <i class="el-icon-location iconfont icon-fangdajing"></i>
            <span>查询</span>
          </template>
          <el-menu-item index="/selects/todayreports">当日查询</el-menu-item>
          <el-menu-item index="/selects/historyreports">历史查询</el-menu-item>
          <el-menu-item index="/selects/feereports">佣金查询</el-menu-item>
          <el-menu-item index="/selects/accounts">账户查询</el-menu-item>
          <el-menu-item index="/selects/exception">异常查询</el-menu-item>
        </el-submenu>
        <el-submenu index="财务审核" class="financeAuth">
          <template slot="title">
            <i class="el-icon-location iconfont icon-deal-icon"></i>
            <span>财务审核</span>
          </template>
          <el-menu-item index="/financereviews/chargeviews">子账户充值</el-menu-item>
          <el-menu-item index="/financereviews/withdrawreviews">子账户提现</el-menu-item>
          <el-menu-item index="/financereviews/agentwithdrawreviews">经纪人提现</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/followaccounts/followaccounts">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>跟单</span>
          </template>
        </el-menu-item> -->
        <el-submenu index="实名认证">
          <template slot="title">
            <i class="el-icon-location iconfont icon-renzheng"></i>
            <span>实名认证</span>
          </template>
          <el-menu-item index="/verifications/subverify">子账户实名认证</el-menu-item>
          <el-menu-item index="/verifications/agentverify">经纪人实名认证</el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- <el-menu :default-active="$store.state.loaction" unique-opened router class="el-menu-vertical-demo tac_menue" background-color="#112955" text-color="#fff" active-text-color="#fff" @select="handleSelect"> -->
      <el-menu :default-active="$store.state.loaction" v-if="!$isShowHtml.isShowHtml.xx" unique-opened router class="el-menu-vertical-demo tac_menue" background-color="#3b5170" text-color="#eee" active-text-color="#fff" @select="handleSelect">
        <el-menu-item index="/home">
          <i class="el-icon-home iconfont icon-home1"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="业务参数">
          <template slot="title">
            <i class="el-icon-location iconfont icon-fuzhi"></i>
            <span>业务参数</span>
          </template>
          <el-menu-item index="/businessparms/basemargins">品种基准保证金</el-menu-item>
          <el-menu-item index="/businessparms/exchangerates">汇率</el-menu-item>
          <el-menu-item index="/businessparms/marketupdown">行情涨跌</el-menu-item>
          <el-menu-item index="/businessparms/instruments">合约信息</el-menu-item>
          <el-menu-item index="/businessparms/maininstruments">主力合约</el-menu-item>
          <el-menu-item index="/businessparms/TradeCore">交易核心</el-menu-item>
          <el-menu-item index="/businessparms/orgnotices">机构通知</el-menu-item>
        </el-submenu>
        <el-submenu index="模板">
          <template slot="title">
            <i class="el-icon-location iconfont icon-shuju"></i>
            <span>模板</span>
          </template>
          <el-menu-item index="/templates/temmargins">保证金模板</el-menu-item>
          <el-menu-item index="/templates/commissiontemplates">子账户手续费模板</el-menu-item>
          <el-menu-item index="/templates/risktemplates">风控模板</el-menu-item>
          <el-menu-item index="/templates/agentfeetemplates">一级经纪商手续费模板</el-menu-item>
        </el-submenu>
        <el-submenu index="账户">
          <template slot="title">
            <i class="el-icon-location iconfont icon-Account"></i>
            <span>账户</span>
          </template>
          <el-menu-item index="/accounts/parentaccounts">总账户</el-menu-item>
          <el-menu-item index="/accounts/subaccounts">子账户</el-menu-item>
        </el-submenu>
        <el-menu-item index="/monitors/monitors">
          <i class="el-icon-location iconfont icon-svg"></i>
          <span slot="title">风控员</span>
        </el-menu-item>
        <el-menu-item index="/agents/tree">
          <template slot="title">
            <i class="el-icon-location iconfont icon-user-agent"></i>
            <span>经纪人</span>
          </template>
        </el-menu-item>
        <!-- <el-menu-item index="/administrators/administrators">
          <template slot="title">
            <i class="el-icon-location iconfont icon-zhanghuguanli"></i>
            <span>管理员</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/administrators/administrators">
          <template slot="title">
            <i class="el-icon-location iconfont icon-zhanghuguanli"></i>
            <span>机构财务用户</span>
          </template>
        </el-menu-item> -->

        <el-submenu index="管理员" class="AdminLimit">
          <template slot="title">
            <i class="el-icon-location iconfont icon-zhanghuguanli"></i>
            <span>管理员</span>
          </template>
          <el-menu-item index="/administrators/administrators">机构管理员</el-menu-item>
          <el-menu-item index="/administrators/adminFinancer">机构财务管理员</el-menu-item>
        </el-submenu>

        <el-submenu index="查询">
          <template slot="title">
            <i class="el-icon-location iconfont icon-fangdajing"></i>
            <span>查询</span>
          </template>
          <el-menu-item index="/selects/todayreports">当日查询</el-menu-item>
          <el-menu-item index="/selects/historyreports">历史查询</el-menu-item>
          <el-menu-item index="/selects/feereports">佣金查询</el-menu-item>
          <el-menu-item index="/selects/accounts">账户查询</el-menu-item>
          <el-menu-item index="/selects/exception">异常查询</el-menu-item>
          <el-menu-item index="/selects/statistics">统计查询</el-menu-item>
        </el-submenu>
        <el-submenu index="财务审核" class="financeAuth">
          <template slot="title">
            <i class="el-icon-location iconfont icon-deal-icon"></i>
            <span>财务审核</span>
          </template>
          <el-menu-item index="/financereviews/chargeviews">子账户充值</el-menu-item>
          <el-menu-item index="/financereviews/withdrawreviews">子账户提现</el-menu-item>
          <el-menu-item index="/financereviews/agentwithdrawreviews">经纪人提现</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/followaccounts/followaccounts">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>跟单</span>
          </template>
        </el-menu-item> -->
        <el-submenu index="实名认证">
          <template slot="title">
            <i class="el-icon-location iconfont icon-renzheng"></i>
            <span>实名认证</span>
          </template>
          <el-menu-item index="/verifications/subverify">子账户实名认证</el-menu-item>
          <el-menu-item index="/verifications/agentverify">经纪人实名认证</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  //
  name: "asides",
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath, text) {
      this.$store.state.breadnav2 = text.$el.innerText;
      if (keyPath[0].length > 5) {
        this.$store.state.breadnav1 = 0;
      } else if (keyPath[0] == "/home") {
        this.$store.state.breadnav1 = 0;
        this.$store.state.breadnav2 = 0;
      } else {
        this.$store.state.breadnav1 = keyPath[0];
      }
    }
  }
};
</script>

<style scoped>
</style>


