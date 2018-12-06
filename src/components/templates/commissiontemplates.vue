<template>
  <div class="commissiontemp_">
    <div class="template">
      <article class="main">

        <div class="container-r">

          <!--带表格的面板-->
          <div class="panel panel-default panel-1">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye mamo"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">模板</a>
                  </li>
                  <li class="active">子账户手续费模板</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-10 fz">子账户手续费模板，可对子账户手续费模板进行新增、编辑、删除 操作 </span>
                <span class="col-md-2 text-right margin-Top">
                  <button class="btn btn-default" type="submit" @click="addData()">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <button class="btn btn-default btc btc-del" type="submit" @click="del()">
                    删除
                  </button>
                </span>
              </p>
            </div>
            <div class="tb-header">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width:6%">序号</th>
                    <th style="width:6%">
                      <input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()">
                    </th>
                    <th style="width:15%">模板ID</th>
                    <th style="width:15%">模板名称</th>
                    <th style="width:33%">模板说明</th>
                    <th style="width:15%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tb-body" v-loading="loading">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td v-show="ishow">暂无数据</td>
                  </tr>
                  <tr v-for="(item,index) in list">
                    <td style="width:6%">&nbsp;{{((pager.PageNo-1)*pager.PageSize)+index+1}}</td>
                    <td style="width:6%" class="sub-checked "><input type="checkbox" :class="ClassName+index" @click="selectedSub(item.TpCode,index)"></td>
                    <td style="width:15%">{{item.TpCode}}</td>
                    <td style="width:15%">
                      <a @click="getDetaillist(item.TpCode)" class="super-link">{{item.Name}}</a>
                    </td>
                    <td style="width:33%">{{item.Remark}}</td>
                    <td style="width:15%">
                      <div class="btn-group" role="group" aria-label="...">
                        <div class="btn-group" role="group">
                          <!-- <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
                          <!--Dropdown-->
                          <!-- <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-lef">
                            <li>
                              <a class="param-edit" @click="edit(item)">编辑</a>
                            </li>
                            <li>
                              <a class="param-del" @click="delOne(item.TpCode)">删除</a>
                            </li> -->
                          <!--<li><a href="#">Dropdown link</a></li>-->
                          <!-- </ul> -->
                          <el-dropdown trigger="click" size="mini">
                            <span class="el-dropdown-link" size="mini">
                              <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="dropdownul">
                              <el-dropdown-item class="clearfix" @click.native="edit(item)">
                                编辑
                                <el-badge class="mark">
                                </el-badge>
                              </el-dropdown-item>
                              <el-dropdown-item class="clearfix" @click.native="delOne(item.TpCode)">
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
        </div>
      </article>
    </div>
    <div class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">新增子账户手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear">
                  <div class="error3">
                    <span class="error4">*</span>
                    模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" style="width:100%" placeholder="" v-model="AddName">
                  </span>
                  <div class="error3">
                    <span class="error4"> </span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" style="width:100%" placeholder="" v-model="AddRemark"></textarea>
                  </span>
                </div>
              </form>
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:20%">品种名称</th>
                    <th style="width:40%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in CommodityList">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:20%">{{item.CommodityName}}</td>
                    <td style="width:40%">
                      <input type="text" class="input-text" v-model="item.Fee">
                      <div class="input-list">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
              <p class="tips">说明：子账户实收手续费 = 按手数收取的金额</p>
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="AddNew('',AddName,AddRemark,CommodityList)">保存并新建</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata('',AddName,AddRemark,CommodityList)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="edit-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box clear">
        <div class="panel panel-default  no-border clear">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑子账户手续费模板</div>
          <div class="panel-body">
            <div class="content clear">
              <form class="form-inline form-inline1" novalidate="" role="form">
                <div class="clear">
                  <div class="error3">
                    <span class="error4">*</span>
                    模板名称
                  </div>
                  <span class="selected">
                    <input class="input-text" type="text" style="width:100%" placeholder="" v-model="EditName">
                  </span>
                  <div class="error3">
                    <span class="error4"> </span>
                    模板说明
                  </div>
                  <span class="selected">
                    <textarea class="input-text input3" type="textarea" style="width:100%" placeholder="" v-model="EditRemark"></textarea>
                  </span>
                </div>
              </form>
              <table class="table table-hover clear">
                <thead>
                  <tr>
                    <th style="width:20%">品种代码</th>
                    <th style="width:20%">品种名称</th>
                    <th style="width:40%">按手数</th>
                    <th style="width:10%">最小值</th>
                    <th style="width:10%">最大值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in CommodityList">
                    <td style="width:20%">{{item.CommodityNo}}</td>
                    <td style="width:20%">{{item.CommodityName}}</td>
                    <td style="width:40%">
                      <input type="text" class="input-text" v-model="item.Fee">
                      <div class="input-list">{{item.CurrencyName}}</div>
                    </td>
                    <td style="width:10%">{{item.MinFee}}</td>
                    <td style="width:10%">{{item.MaxFee}}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <p class="tips">说明：子账户实收手续费 = 按手数收取的金额</p> -->
            </div>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Modifydata(TpCode,EditName,EditRemark,CommodityList)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="del-mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除子账户手续费模板</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除子账户手续费模板吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate(del_list)">删除</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeMask()">取消</button>
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
  name: "commissiontemplates",
  components: {
    pageination
  },
  data() {
    return {
      ishow: "",
      loading: "",
      loadingsave: "",
      TpCode: "",
      AddName: "", //添加名称
      AddRemark: "", //添加备注
      EditName: "", //编辑名称
      EditRemark: "", //编辑备注
      id_list: [], //主键数组 用于删除
      del_list: [], //删除列表
      list: [], //列表数据源
      CommodityList: [],
      ClassName: "sub-checked",
      pager: {},
      recordCount: 0
    };
  },
  created() {
    this.$store.state.loaction = "/templates/commissiontemplates";
    //this.getCommoditylist();
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getlist();
    //this.Modifydata("","","");
    //this.Deldate("FTP000927780200001");
    //this.getDetaillist("FTP000927821300001");
  },
  methods: {
    getlist(num) {
      if (num == undefined) {
        this.loading = true;
      }
      var url = "/instp/QueryUserFeeTps";
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            //console.log(response.Data); //请求成功，response为成功信息参数
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

    //    分页
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getlist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
    },

    //根据TPCode进行获取
    getDetaillist(ID) {
      var url = "/instp/GetInsUserFeeTemplateDetail";
      this.$loginapi.post(url, ID, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.$store.state.DetailInfo = response.Data;
          this.$router.push("/templates/commissiontemplatesinfo");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取品种信息 里边包含 品种名称 每手保证金 最低、最高
    getCommoditylist(ID) {
      var url = "/instp/QueryInsUserFeeTpDetail";
      this.$loginapi.post(url, ID, response => {
        if (response.Ret == 0) {
          //console.log(response.Data); //请求成功，response为成功信息参数
          this.CommodityList = response.Data;
        } else {
          // this.$message.error(response.Msg);
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //删除操作
    Deldate(id) {
      this.loadingsave = true;
      var url = "/instp/DelFeeTemplate";
      this.$loginapi.post(url, id, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          $(".del-mask").fadeOut("fast");
          // if (this.del_list.length == this.id_list.length) {
          //   $(".sub-checked" + index)[0].checked = false;
          //   this.del_list.splice(0, this.del_list.length);
          // }
          if (this.list.length == 0) {
            $(".total-checked")[0].checked = false;
          }
          if (response.Msg != "success") {
            this.$alert(response.Msg, {});
          } else {
            this.$message.success("删除成功");
          }
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    AddNew(TpCode, Name, Remark, ListDetail) {
      if (Name.trim() == "") {
        // this.$message.error("模板名称不能为空");
        this.$alert("模板名称不能为空", {});
        return;
      }

      var index = 0;
      for (var i = 0; i < ListDetail.length; i++) {
        var item = ListDetail[i];
        if (item.Fee.toString().trim() == "" || isNaN(item.Fee)) {
          index++;
          this.$alert("品种【" + item.CommodityName + "】输入有误！", {});
          break;
        }
      }

      if (index > 0) {
        return;
      }

      this.loadingsave = true;
      var url = "/instp/AoUUserFeeTp";
      var postData = {
        TpCode: TpCode,
        Name: Name,
        Remark: Remark,
        Details: ListDetail
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.AddName = "";
          this.AddRemark = "";
          this.CommodityList = [];
          this.getlist(1);
          this.getCommoditylist("");
          this.$message.success("保存成功");
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    /** 新增修改为一个方法 TpCode为空 则进行添加操作 ListDetail 为数组 里边包含两个属性 */
    Modifydata(TpCode, Name, Remark, ListDetail) {
      if (Name.trim() == "") {
        // this.$message.error("模板名称不能为空");
        this.$alert("模板名称不能为空", {});
        return;
      }

      var index = 0;
      for (var i = 0; i < ListDetail.length; i++) {
        var item = ListDetail[i];
        if (item.Fee.toString().trim() == "" || isNaN(item.Fee)) {
          index++;
          this.$alert("品种【" + item.CommodityName + "】输入有误！", {});
          break;
        }
      }

      if (index > 0) {
        return;
      }

      this.loadingsave = true;
      var url = "/instp/AoUUserFeeTp";
      var postData = {
        TpCode: TpCode,
        Name: Name,
        Remark: Remark,
        Details: ListDetail
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getlist();
          this.$message.success("保存成功");
          this.closeMask();
        } else {
          // this.$message.error(response.Msg); //请求失败，response为失败信息
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    selectedAll() {
      this.id_list = []; //
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.list.length; i++) {
          this.id_list.push(this.list[i].TpCode);
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
    },

    addData() {
      this.AddName = "";
      this.AddRemark = "";
      this.getCommoditylist("");
      // //点击取消和关闭弹出框
      $(".mask").fadeIn("fast");
      //$('.drop-list').attr('class','drop-list hide');
      //isdisplay = true;
    },
    del() {
      if (this.id_list.length == 0) {
        //this.$message.error("请选择需要删除的数据");
        this.$alert("请选择需要删除的数据", {});
        return;
      }
      $(".del-mask").fadeIn("fast");
      this.del_list = this.id_list;
    },
    delOne(code) {
      this.del_list.splice(0, this.del_list.length);
      $(".del-mask").fadeIn("fast");
      this.TpCode = code;
      this.del_list.push(code);
    },
    edit(item) {
      this.getCommoditylist(item.TpCode);
      this.EditName = item.Name;
      this.EditRemark = item.Remark;
      this.TpCode = item.TpCode;

      $(".edit-mask").fadeIn("fast");
    },
    closeMask() {
      $(".mask").fadeOut("fast");
      $(".del-mask").fadeOut("fast");
      $(".edit-mask").fadeOut("fast");
    }
  }
};
</script>

<style scoped>
</style>
