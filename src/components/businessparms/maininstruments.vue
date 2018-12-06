<template>
  <div class="maininstrument_">
    <div class="template">
      <article class="main">
        <div class="container-r">

          <!--带表格的面板-->
          <div class="panel panel-default panel-1 panel-11">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">业务参数</a>
                  </li>
                  <li class="active">主力合约</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-10 fz">可对主力合约进行新增、编辑、删除操作 </span>
                <span class="col-md-2 text-right margin-Top">
                  <button class="btn btn-default" type="submit" @click="addData()">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <button class="btn btn-default" type="submit" @click="del(del_list)">
                    删除
                  </button>
                </span>
              </p>
            </div>
            <div class="tb-header table-1">
              <table class="table table-1-1">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 8%"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th>
                    <th style="width: 22%">品种名称</th>
                    <th style="width: 22%">合约代码</th>
                    <th style="width: 22%">合约名称</th>
                    <th style="width: 21%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="tb-body panel panel-default table-2">
            <table class="table table-hover table-2-1" v-loading="loading">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="width:5%">{{index+1}}</td>
                  <td style="width:8%" class="sub-checked " id="sub-checked">
                    <input type="checkbox" :class="ClassName+index" @click="selectedSub(item.Id,index)"></td>
                  <td style="width: 22%">{{item.CommodityName}}</td>
                  <td style="width: 22%">{{item.CommodityNo}}{{item.ContractNo}}</td>
                  <td style="width: 22%">{{item.ContractName}}</td>
                  <td style="width: 21%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" @click.native="delOne(item.Id)">
                              删除
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
    <div class="mask" id="addddd" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增主力合约</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  合约代码
                </div>
                <!-- <span class="selected">
                  <input class="input-text ContractNo" type="text" placeholder="请选择" @click="select()">
                  <div class="fa fa-sort-desc input-list" @click="select()"></div>
                  <div class="drop-list hide">
                    <p v-for="item in lists" @click="selected(item.Name,item)">{{item.Name}}</p>
                  </div>
                </span> -->
                <el-select v-model="selectZLHY" style="width: 98%" filterable value-key="Name" placeholder="请选择">
                  <el-option v-for="(item,index) in lists" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Adddata()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="mask" id="delMainContact" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除主力合约</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3 text-center">
                  确认要删除主力合约吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="delData(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../kits/common.js";
import pageination from "../subcom/pageination.vue";

export default {
  name: "maininstruments",
  components: {
    pageination
  },
  data() {
    return {
      loading: "",
      ishow: "",
      loadingsave: "",
      list: [],
      lists: [],
      obj: {},
      id_list: [],
      del_list: [],
      isdisplay: true,
      Id: "",
      ClassName: "sub-checked",
      selectZLHY: null,
      pager: {},
      recordCount: 0
    };
  },
  created() {
    this.$store.state.loaction = "/businessparms/maininstruments";
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getMainContractlist();
    //this.getContractNolist();
  },
  methods: {
    //获取主力合约信息列表
    getMainContractlist() {
      this.loading = true;
      var url = "/insargu/GetMainContractList";
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
            //console.log(response.Data); //请求成功，response为成功信息参数
            this.list = response.Data;
            this.pager = response.Pager;
            if (this.pager.PageNo == 1) {
              this.recordCount = this.pager.RecordCount;
            } else {
              this.pager.RecordCount = this.recordCount;
            }
          } else {
            // this.$message.error(response.Msg); //请求失败，response为失败信息
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },
    //获取合约编号列表
    getContractNolist() {
      var url = "/insargu/GetContractNoList";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          this.lists = response.Data;
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },
    Adddata() {
      if (this.selectZLHY == null) {
        //this.$message.error("请选择一个合约");
        this.$alert("请选择一个合约", {});
        return;
      }
      this.loadingsave = true;
      var url = "/insargu/AddMainContractList";
      this.$loginapi.post(url, this.selectZLHY.Code, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getMainContractlist();
          this.$message.success("保存成功");
          $(".mask").fadeOut("fast");
          this.selectZLHY = null;
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //    分页
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getMainContractlist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
      //this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
    },

    delData(code) {
      this.loadingsave = true;
      var url = "/insargu/DeleteMainContractList";
      this.$loginapi.post(url, code, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          if (this.Id == "") {
            this.id_list.splice(0, this.id_list.length);
            $(".total-checked")[0].checked = false;
          }
          this.Id = "";
          this.del_list.splice(0, this.id_list.length);
          this.getMainContractlist();
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 800
          });
          $("#delMainContact").fadeOut("fast");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    addData() {
      this.selectZLHY = null;
      this.lists = [];
      $(".ContractNo").val("");
      this.getContractNolist();
      $("#addddd").fadeIn("fast");
    },

    del() {
      if (this.id_list.length == 0) {
        //this.$message.error("请选择需要删除的数据");
        this.$alert("请选择需要删除的数据", {});
        return;
      }
      $("#delMainContact").fadeIn("fast");
      this.del_list = this.id_list;
    },

    delOne(id) {
      $("#delMainContact").fadeIn("fast");
      this.Id = id;
      this.del_list.push(id);
    },
    closeMask() {
      $("#addddd").fadeOut("fast");
      this.isdisplay = true;
    },
    closeDelMask() {
      $("#delMainContact").fadeOut("fast");
    },
    select() {
      //点击输入框弹出下拉框
      if (this.isdisplay) {
        $(".drop-list").attr("class", "drop-list");
      } else {
        $(".drop-list").attr("class", "drop-list hide");
      }
      this.isdisplay = !this.isdisplay;
    },
    selected(comID, obj) {
      //点击下拉框列表的内容把文字填充到输入框里面
      $(".input-text").val(comID);
      $(".drop-list").attr("class", "drop-list hide");
      this.isdisplay = !this.isdisplay;
      this.obj = obj;
    },

    selectedAll() {
      this.id_list = []; //
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.list.length; i++) {
          this.id_list.push(this.list[i].Id);
        }
      }
    },

    selectedSub(code, index) {
      // 1.1 实现让每个旗舰店的里面元素控制旗舰店的头部选框
      var th = $("#total-checked").parent(),
        td = $(".sub-checked");
      this.choseBox().backWord(td, th.find(":input"));
      if ($(".sub-checked" + index)[0].checked) {
        this.id_list.push(code);
      } else {
        this.id_list.remove(code);
      }
    },
    choseBox() {
      return {
        allChecked: function(cli, ele) {
          ele.checkedAll = cli.prop("checked"); // 保存当前选中的状态
          ele.find(":checkbox").prop("checked", ele.checkedAll);
        },
        backWord: function(ele, tar) {
          ele.boxs = ele.find(":checkbox").length;
          ele.checkedBoxs = ele.find(":checked").length;
          if (ele.boxs == ele.checkedBoxs) {
            tar.prop("checked", true);
          } else {
            tar.prop("checked", false);
          }
        }
      };
    }
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
}
</style>
