<template>
  <div class="exchangerate_">
    <div class="template">
      <article class="main">
        <div class="container-r">

          <!--带表格的面板-->
          <div class="panel panel-default panel-1">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">业务参数</a>
                  </li>
                  <li class="active">汇率</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-11 fz">
                  <b>{{lists.length}}个</b>&nbsp;币种，可对币种汇率进行编辑 操作 </span>
                <span class="col-md-1 text-right margin-Top">
                  <button class="btn btn-default" type="submit" @click="getId()">
                    编辑
                  </button>
                </span>
              </p>
            </div>
            <table class="table table-hover" v-loading="loading">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>货币类型</th>
                  <th>货币名称</th>
                  <th>交易汇率</th>
                  <th>入金汇率</th>
                  <th>出金汇率</th>
                  <th>经纪人出金汇率</th>
                  <th>经纪人结算汇率</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in lists" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{item.CurrencyCode}}</td>
                  <td>{{item.CurrencyName}}</td>
                  <td>{{item.TradeRate}} 美元</td>
                  <td>{{item.DepositRate}} 美元</td>
                  <td>{{item.WithdrawRate}} 美元</td>
                  <td>{{item.ProxyWithdrawRate}} 美元</td>
                  <td>{{item.ProxySettlementRate}} 美元</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
    <masks :childMsg="lists" ref="ShowChild" v-on:gitlists="getlist"></masks>
  </div>
</template>

<script>
import common from "../../kits/common.js";
import masks from "../subcom/mask.vue";

export default {
  // name: 'exchangerates',
  components: {
    masks
  },
  data() {
    return {
      ishow: "",
      loading: "",
      lists: []
    };
  },
  created() {
    this.getlist();
    //this.Modifydata(7,"ML","USD","美元",1,8,8,7,7,true);
    this.$store.state.loaction = "/businessparms/exchangerates";
  },
  methods: {
    getlist() {
      this.loading = true;
      var url = "/insargu/QueryInsExchangeRate";
      this.$loginapi.post(url, "", response => {
        this.loading = false;
        if (response.Ret == 0) {
          if (response.Data.length > 0) {
            this.ishow = false;
          } else {
            this.ishow = true;
          }
          this.lists = response.Data;
        } else {
          // alert(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    // //批量更改
    // Modifydata(
    //   ID,
    //   InstitutionCode,
    //   CurrencyCode,
    //   CurrencyName,
    //   TradeRate,
    //   WithdrawRate,
    //   DepositRate,
    //   ProxyDepositRate,
    //   ProxyWithdrawRate,
    //   IsBasicCurrency
    // ) {
    //   var url = "/insargu/ConfigExchangeRate";
    //   var postData = [
    //     {
    //       ID: ID,
    //       InstitutionCode: InstitutionCode,
    //       CurrencyCode: CurrencyCode,
    //       CurrencyName: CurrencyName,
    //       TradeRate: TradeRate,
    //       WithdrawRate: WithdrawRate,
    //       DepositRate: DepositRate,
    //       ProxyDepositRate: ProxyDepositRate,
    //       ProxyWithdrawRate: ProxyWithdrawRate,
    //       IsBasicCurrency: IsBasicCurrency
    //     }
    //   ];
    //   this.$loginapi.post(url, postData, response => {
    //     if (response.Ret == 0) {
    //       this.getlist();
    //     } else {
    //       alert(response.Msg); //请求失败，response为失败信息
    //     }
    //   });
    //   $(".mask").fadeOut("fast");
    // },
    getId() {
      // this.id = ID;
      // this.comName = comName;
      // this.byNumber = byNumber;
      // this.CommodityID = CommodityID;
      // console.log(this.id);
      // console.log(this.comName);
      // console.log(this.byNumber);
      this.$refs.ShowChild.Show(this.lists);
      //点击取消和关闭弹出框
      $("#e-mask").fadeIn("fast");
      //$('.drop-list').attr('class','drop-list hide');
      //isdisplay = true;
    }
  }
};
</script>

<style scoped>
</style>
