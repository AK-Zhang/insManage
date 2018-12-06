<template>
  <div class="home__common">
    <div class="template">
      <div class="mainz clearfix" v-if="$isShowHtml.isShowHtml.xx">
        <div class="maz1 clearfix">
          <div class="mz1">
            <p class="a">机构设置流程</p>
            <div class="xian1">
              <i aria-hidden="true" class="fa fa-circle-o right1"></i>
            </div>
          </div>
          <div class="mz2">
            <router-link to="/accounts/parentaccounts">
              <p class="a">设置总账户</p>
            </router-link>
          </div>
          <div class="mza0">
            <div class="xian2">
              <i aria-hidden="true" class="fa fa-circle-o right1"></i>
            </div>
            <div class="xian3"></div>
            <div class="xian4">
            </div>
            <div class="xian5">
            </div>
          </div>
          <div class="mz3">
            <div class="mz31">
              <div class="az">
                <p class="a1">设置账户</p>
              </div>
              <div class="az1">
                <ul>
                  <li class="l1">
                    <router-link to="/administrators/administrators">管理账户
                      <span class="san"></span>
                    </router-link>
                  </li>
                  <li class="l2">
                    <router-link to="/monitors/monitors">
                      风控账户
                      <span class="san"></span>
                    </router-link>
                  </li>
                  <li class="l3">
                    <router-link to="/agents/tree">
                      经纪人账户
                      <span class="san"></span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mz32">
              <div class="az">
                <p class="a1">设置模板</p>
              </div>
              <div class="az1_index">
                <ul>
                  <li>
                    <router-link to="/businessparms/basemargins">
                      基准保证金
                    </router-link>
                  </li>
                  <li class="l4">
                    <router-link to="/templates/temmargins">
                      保证金模板
                      <span class="san"></span>
                    </router-link>
                  </li>
                  <li class="l5">
                    <router-link to="/templates/commissiontemplates">
                      手续费模板
                      <span class="san"></span>
                    </router-link>
                  </li>
                  <li class="l6">
                    <router-link to="/templates/risktemplates">
                      风控模板
                      <span class="san"></span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/templates/agentfeetemplates">
                      经纪人手续费模板</router-link>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div class="mza">
            <div class="xian6"></div>
            <div class="xian7"></div>
            <div class="xian8"></div>
            <div class="xian9">
              <i aria-hidden="true" class="fa fa-circle-o right1"></i>
            </div>
          </div>
          <div class="mz4">
            <div class="mz41">
              子账户开户
              <span class="san1"></span>

            </div>
            <div class="mz42">
              <ul>
                <li>指定经纪人</li>
                <li>指定风控员</li>
                <li>指定保证金，手续费 ，风控模板</li>
              </ul>
            </div>
          </div>

          <div class="mza1">
            <div class="xian11">
              <i aria-hidden="true" class="fa fa-circle-o right1"></i>
            </div>
          </div>
          <div class="mz5">
            <p class="a">子账户出入金</p>
            <span class="san2"></span>

            <div class="xian12">
              <i aria-hidden="true" class="fa fa-circle-o right1"></i>
            </div>
          </div>
          <div class="mz6">
            <p class="a">终端交易</p>
          </div>
        </div>

      </div>
      <div class="mainz mainz00 clearfix" v-if="!$isShowHtml.isShowHtml.xx">
        <div class="FlowChart flex">
          <div class="FlowChart_box No_01">
            <div class="vvvv">
              <span class="iconfont icon-yuandiankuang"></span> 机构设置流程</div>
          </div>
          <div class="FlowChart_box No_02">
            <div class="vvvv">
              <div class="rowLine"></div>
            </div>
          </div>
          <div class="FlowChart_box No_03">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_04">
            <div class="vvvv">
              <div class="settingAccount">
                <div class="settingTitle">
                  <span class="iconfont icon-yuandiankuang"></span> 设置账户
                </div>
                <div class="setOption_01">风控账户</div>
                <div class="setOption_02">管理账户</div>
                <div class="setOption_03">经纪人账户</div>
              </div>
            </div>
          </div>
          <div class="FlowChart_box No_05">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_06">
            <div class="vvvv">
              <div class="rowLine"></div>
            </div>
          </div>
          <div class="FlowChart_box No_07">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_08">
            <div class="vvvv">
              <div class="settingAccount">
                <div class="settingTitle">
                  <span class="iconfont icon-yuandiankuang"></span> 设置模板
                </div>
                <div class="flex temp_01">
                  <div class="setOption_04">基准保证金</div>
                  <div class="setOption_05">保证金模板</div>

                </div>
                <div class="flex temp_02">
                  <div class="setOption_06">手续费模板</div>
                  <div class="setOption_07">风控模板</div>
                  <div class="setOption_08">经纪人手续费模板</div>
                </div>
              </div>
            </div>
          </div>
          <div class="FlowChart_box No_09">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_10">
            <div class="vvvv">
              <div class="rowLine"></div>
            </div>
          </div>
          <div class="FlowChart_box No_11">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_12">
            <div class="vvvv">
              <div class="settingAccount">
                <div class="settingTitle">
                  <span class="iconfont icon-yuandiankuang"></span> 子账户开户
                </div>
                <div class="flex temp_01">
                  <div class="setOption_04">指定经纪人</div>
                  <div class="setOption_05">指定风控员</div>

                </div>
                <div class="flex temp_02">
                  <div class="setOption_06">&nbsp;指定保证金&nbsp;</div>
                  <div class="setOption_07">&nbsp;手续费&nbsp;</div>
                  <div class="setOption_08">&nbsp;风控模板&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
          <div class="FlowChart_box No_13">
            <div class="vvvv">
              <div class="linerow"></div>
            </div>
          </div>
          <div class="FlowChart_box No_14">
            <div class="vvvv">
              <div class="rowLine"></div>
            </div>
          </div>
          <div class="FlowChart_box No_15">
            <div class="vvvv">
              <span class="iconfont icon-yuandiankuang"></span> 子账户出入金
            </div>
          </div>
          <div class="FlowChart_box No_16">
            <div class="vvvv">
              <div class="rowLine"></div>
            </div>
          </div>
          <div class="FlowChart_box No_17">
            <div class="vvvv">
              <span class="iconfont icon-yuandiankuang"></span> 终端交易
            </div>
          </div>

        </div>
      </div>
      <div class="mainz2 clearfix">
        <div class="ma3">
          <p class="ma31"></p>
          <p class="ma32">机构管理设置向导区</p>
        </div>

        <div class="ma4 clearfix">

          <ul class="clearfix">
            <li>
              <p class="ma41">
                <router-link to="/businessparms/basemargins">
                  <span class="ma4t ma4t7"></span>
                  <span class="ma4w">业务参数</span>
                </router-link>
              </p>
              <p class="ma42">进行汇率、基准保证金、行情涨跌设置等机构及参数设置。</p>
            </li>
            <li>
              <p class="ma41">
                <router-link to="/templates/temmargins">
                  <span class="ma4t ma4t8"></span>
                  <span class="ma4w">模板</span>
                </router-link>
              </p>
              <p class="ma42">进行保证金模板、子账户手续费模板、风控模板及经纪人手续费模板的模板设置。
              </p>
            </li>
            <li class="ma4-list3">
              <p class="ma41">
                <router-link to="/accounts/parentaccounts">
                  <span class="ma4t ma4t9"></span>
                  <span class="ma4w">总账户</span>
                </router-link>
              </p>
              <p class="ma42">
                进行总账户的新增、编辑、重置密码、冻结、删除、销毁等操作。</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li>
              <p class="ma41">
                <router-link to="/accounts/subaccounts/">
                  <span class="ma4t ma4t10"></span>
                  <span class="ma4w">子账户</span>
                </router-link>
              </p>
              <p class="ma42">进行子账户的新增、编辑、重置密码、出入金、删除、销毁等操作。</p>
            </li>
            <li>
              <p class="ma41">
                <router-link to="/monitors/monitors">
                  <span class="ma4t ma4t11"></span>
                  <span class="ma4w">风控员</span>
                </router-link>
              </p>
              <p class="ma42">
                进行风控员的新增、编辑、权限、绑定子账户、删除等操作。</p>
            </li>
            <li class="ma4-list3">
              <p class="ma41">
                <router-link to="/agents/tree">
                  <span class="ma4t ma4t12"></span>
                  <span class="ma4w">经纪人</span>
                </router-link>
              </p>
              <p class="ma42">
                进行经纪人的新增、编辑、绑定经纪人手续费模板、删除等操作。</p>
            </li>
          </ul>
          <ul class="ul-list clearfix">
            <li>
              <p class="ma41">
                <router-link to="/administrators/administrators">
                  <span class="ma4t ma4t13"></span>
                  <span class="ma4w">管理员</span>
                </router-link>
              </p>
              <p class="ma42">
                进行管理员的新增、编辑、删除等操作。</p>
            </li>
            <li>
              <p class="ma41">
                <router-link to="/selects/todayreports">
                  <span class="ma4t ma4t5"></span>
                  <span class="ma4w">查询</span>
                </router-link>
              </p>
              <p class="ma42">行进当日、历史、佣金等数据报表的查询操作</p>
            </li>
            <li class="ma4-list3">
              <p class="ma41">
                <router-link to="/financereviews/withdrawreviews">
                  <span class="ma4t ma4t12"></span>
                  <span class="ma4w">财务审核</span>
                </router-link>
              </p>
              <p class="ma42">
                进行财务审核的确认转账、拒绝转账、线下转账等操作。</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    this.$store.state.loaction = "/home";
    this.getlist();
  },
  methods: {
    getlist() {
      var url = "/insargu/QueryInsExchangeRate";
      this.$loginapi.post(url, "", response => {
        return "";
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
