<template>
  <div class="basemargin_">
    <div class="template">
      <article class="main">
        <div class="container-r">
          <div class="panel panel-default panel-1 panel-11">
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">业务参数</a>
                  </li>
                  <li class="active">品种基准保证金及手续费</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <b>{{list.length}}个</b>&nbsp;品种基准保证金及手续费，可对品种基准证金及手续费进行编辑 操作</p>
            </div>
            <div class="table-1" v-loading="loading">
              <table class="table table-1-1">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 20%">品种代码</th>
                    <th style="width: 25%">品种名称</th>
                    <th style="width: 20%">保证金/手</th>
                    <!-- <th style="width: 10%">手续费最小值</th> -->
                    <th style="width: 15%">手续费最大值</th>
                    <th style="width: 15%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="panel panel-default table-2">
            <table class="table table-hover table-2-1">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="5%">{{index+1}}</td>
                  <td style="width: 20%">{{item.CommodityCode}}</td>
                  <td style="width: 25%">{{item.CommodityName}}</td>
                  <td style="width: 20%">{{item.Margin}}{{item.CurrencyName}}/手</td>
                  <!-- <td style="width: 10%">{{item.MinFee}}{{item.CurrencyName}}/手</td> -->
                  <td style="width: 15%">{{item.MaxFee}}{{item.CurrencyName}}/手</td>
                  <td style="width: 15%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <!-- <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
                        <!--Dropdown-->
                        <!-- <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lef">
                          <li>
                            <a id="param-edit" @click="getId(item)">编辑</a>
                          </li> 
                        </ul>-->
                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" @click.native="getId(item)">
                              编辑
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation" class="text-center  page-separation">
              <pageination :pagerPro="pager" @ee="pageFn"></pageination>
            </nav>
          </div>
        </div>
      </article>
    </div>
    <masks :objs="obj" ref="toShow" v-on:gitlists="getlist"></masks>
  </div>
</template>

<script>
import common from "../../kits/common.js";
import masks from "../subcom/mask-base.vue";
import pageination from "../subcom/pageination.vue";

export default {
  name: "basemargins",
  components: {
    masks,
    pageination
  },
  data() {
    return {
      ishow: "",
      loading: "",
      list: [],
      obj: {},
      pager: {},
      recordCount: 0
    };
  },
  created() {
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getlist();
    //this.Modifydata("9",460,5,10);
    this.$store.state.loaction = "/businessparms/basemargins";
  },
  methods: {
    getlist() {
      this.loading = true;
      var url = "/insargu/QueryMargin";
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.list = response.Data;
            this.pager = response.Pager;
            if (this.pager.PageNo == 1) {
              this.recordCount = this.pager.RecordCount;
            } else {
              this.pager.RecordCount = this.recordCount;
            }
          } else {
            //this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    getId(obj) {
      this.obj = obj;
      //console.log(obj);
      //点击取消和关闭弹出框
      this.$refs.toShow.Show(obj);
      //console.log(masks.methods.Show(obj));
      //masks.methods.Show(obj);
      $("#b-mask").fadeIn("fast");
    },
    //    分页
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getlist();
    },

    closeMask() {
      $("#b-mask").fadeOut("fast");
    }
  }
};
</script>
<style scoped>
</style>
