<template>
  <div class="marketupdown_">
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
                  <li class="active">行情涨跌</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">

              <div class="panel panel-default">
                <!-- Default panel contents -->
                <!-- <div class="panel-heading">
                  <p>
                    <span class="col-md-10 fz">机构涨跌开仓限制</span>
                  </p>
                  <button class="btn btn-default btc btc-del" type="submit" @click="addOrgSet()">
                    设置
                  </button>
                  <button class="btn btn-default btc btc-del" type="submit" @click="delOrgSet()">
                    清除
                  </button>
                </div> -->
                <!-- <div class="panel-body th-bg">
                  <table class="table table_no_margin">
                    <tr>
                      <th style="width:25%">涨跌类型</th>
                      <th style="width:25%">涨跌参数</th>
                      <th style="width:25%">开仓权限</th>
                      <th style="width:25%">仓位调整</th>
                    </tr>
                  </table>
                </div> -->
                <!-- <div class="tb-body">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td style="width:25%">{{ExistsOrg() == false ? "": (OrgObject.UpDownType == "1" ? "涨跌幅" : "")}}</td>
                        <td style="width:25%">{{ExistsOrg() == false ? "":OrgObject.UpDownPara}}{{ExistsOrg() == false ? "":Dw}}</td>
                        <td style="width:25%">{{ExistsOrg() == false ? "":getJzkc(OrgObject.OpenRight)}}</td>
                        <td style="width:23%">{{ExistsOrg() == false ? "":getCwtz(OrgObject.PositionTransfer)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> -->
                <!-- Table -->

                <!-- Default panel contents -->

                <p>
                  <span class="col-md-10 fz">品种涨跌开仓限制</span>
                  <span class="col-md-2 text-right margin-Top">
                    <button class="btn btn-default" type="submit" @click="addCommoditySet()">
                      <span class="fa fa-plus pulp"></span>新增
                    </button>
                    <button class="btn btn-default" type="submit" @click="delAllCommidity()">
                      删除
                    </button>
                  </span>
                </p>
              </div>
            </div>
            <div class="tb-header" v-loading="loading">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 8%"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th>
                    <th style="width: 10%">交易所名称</th>
                    <th style="width: 10%">品种代码</th>
                    <th style="width: 10%">品种名称</th>
                    <th style="width: 10%">涨跌类型</th>
                    <th style="width: 10%">涨跌参数</th>
                    <th style="width: 10%">开仓权限</th>
                    <th style="width: 10%">仓位调整</th>
                    <th style="width: 5%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tb-body">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td v-show="ishow">暂无数据</td>
                  </tr>
                  <tr v-for="(item,index) in list" :key="index">
                    <td style="width:5%">{{index+1}}</td>
                    <td style="width:8%" class="sub-checked " id="sub-checked">
                      <input type="checkbox" :class="ClassName+index" @click="selectedSub(item.ID,index)"></td>
                    <td style="width: 10%">{{item.ExchangeNo == "all" ? "全部交易所" :item.ExchangeNo}}</td>
                    <td style="width: 10%">{{item.CommodityNo == "all" ? "全部品种": item.CommodityNo}}</td>
                    <td style="width: 10%">{{item.CommodityName == "all" ? "全部品种": item.CommodityName }}</td>
                    <td style="width: 10%">{{item.UpDownType == "1" ? "涨跌幅":""}}</td>
                    <td style="width: 10%">{{parseFloat(item.UpDownPara)}}%</td>
                    <td style="width: 10%">{{getJzkc(item.OpenRight)}}</td>
                    <td style="width: 10%">{{getCwtz(item.PositionTransfer)}}</td>
                    <td style="width: 5%">
                      <div class="btn-group" role="group" aria-label="...">
                        <div class="btn-group" role="group">
                          <!-- <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
                          <!--Dropdown-->
                          <!-- <span class="caret"></span> -->
                          <!-- </button> -->
                          <!-- <ul class="dropdown-menu dropdown-menu-lef"> -->
                          <!-- <li> -->
                          <!-- <a class="param-edit" @click="EditCommoditySet(item)">编辑</a> -->
                          <!-- </li> -->
                          <!-- <li> -->
                          <!-- <a class="param-edit" @click="delOneCommodity(item.ID)">删除</a> -->
                          <!-- </li> -->
                          <!--<li><a href="#">Dropdown link</a></li>-->
                          <!-- </ul> -->
                          <el-dropdown trigger="click" size="mini">
                            <span class="el-dropdown-link" size="mini">
                              <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="dropdownul">
                              <el-dropdown-item class="clearfix" @click.native="EditCommoditySet(item)">
                                编辑
                                <el-badge class="mark">
                                </el-badge>
                              </el-dropdown-item>
                              <el-dropdown-item class="clearfix" @click.native="delOneCommodity(item.ID)">
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
              <!-- <nav aria-label="Page navigation" class="text-center  page-separation">
                <pageination :pagerPro="pager" @ee="pageFn"></pageination>
              </nav> -->
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="mask" id="SetOrg">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">设置机构涨跌开仓权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  涨跌幅
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="UpDownPara" maxlength="3">
                  <div class="input-list">%</div>
                </span>
                <div class="error3">
                  <span class="error4">*</span>
                  是否禁止开仓
                </div>
                <el-select v-model="selectJZKC" value-key="Name" placeholder="请选择" style="width:95%">
                  <el-option v-for="(item,index) in listJZKC" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
                <div class="error3">
                  <span class="error4">*</span>
                  仓位调整
                </div>
                <el-select v-model="selectCWTZ" value-key="Name" placeholder="请选择" style="width:95%">
                  <el-option v-for="(item,index) in listCWTZ" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifyOrgData()">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="del-mask" id="delOrg">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">清除机构涨跌开仓权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要清除机构涨跌开仓权限吗?
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="delOrgData()">确定</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-del" @click="closeDelMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--新增品种涨跌开仓限制-->
    <div id="addCommodity" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增品种涨跌开仓限制</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易所名称
                </div>
                <el-select v-model="selectJYS" value-key="ExchangeNo" style="width:98%" placeholder="请选择" @change="changeCommodity">
                  <el-option v-for="(item,index) in listJYS" :key="index" :label="item.ExchangeName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  品种名称
                </div>
                <el-select v-model="selectPZDM" value-key="CommodityNo" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listPZDM" :key="index" :label="item.CommodityName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  是否禁止开仓
                </div>
                <el-select v-model="selectJZKC" value-key="Name" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listJZKC" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  涨跌幅
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-model="UpDownPara" placeholder="" style="width:98%">
                  <div class="input-list">%</div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  仓位调整
                </div>
                <el-select v-model="selectCWTZ" value-key="Name" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listCWTZ" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifyCommodityData(0)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 编辑品种涨跌开仓限制 -->
    <div id="editCommodity" class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">编辑品种涨跌开仓限制</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  交易所名称
                </div>
                <el-select v-model="selectJYS" disabled value-key="ExchangeNo" style="width:98%" placeholder="请选择" @change="changeCommodity">
                  <el-option v-for="(item,index) in listJYS" :key="index" :label="item.ExchangeName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  品种名称
                </div>
                <el-select v-model="selectPZDM" disabled value-key="CommodityNo" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listPZDM" :key="index" :label="item.CommodityName" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  是否禁止开仓
                </div>
                <el-select v-model="selectJZKC" value-key="Name" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listJZKC" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  涨跌幅
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-model="UpDownPara" placeholder="" style="width:98%">
                  <div class="input-list">%</div>
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  仓位调整
                </div>
                <el-select v-model="selectCWTZ" value-key="Name" placeholder="请选择" style="width:98%">
                  <el-option v-for="(item,index) in listCWTZ" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="ModifyCommodityData(1)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask" id="delCommodity" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除品种涨跌开仓权限</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3" style="text-align:center">
                  确认要删除品种涨跌开仓权限吗?
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeDelMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="DeleteCommodityData()">确定</button>
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
  name: "marketupdown",
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
      pager: {},
      del_list: [],
      isdisplay: true,
      OrgObject: {},
      listJZKC: [
        { Code: 0, Name: "允许开仓" },
        { Code: 1, Name: "禁止开仓" },
        { Code: 2, Name: "禁止反向开仓" }
      ],
      selectJZKC: null,
      listCWTZ: [
        { Code: 0, Name: "不调整" },
        { Code: 1, Name: "全部清仓" },
        { Code: 2, Name: "清反向仓" }
      ],
      selectCWTZ: null,
      listPZDM: [
        {
          SysCommodityID: "all",
          CommodityNo: "all",
          CommodityName: "全部品种"
        }
      ],
      listJYS: [
        {
          ExchangeNo: "all",
          ExchangeName: "全部交易所"
        }
      ],
      selectPZDM: null,
      UpDownPara: "",
      Dw: "",
      SaveModel: {
        ID: 0,
        SysCommodityID: "all",
        UpDownType: "",
        UpDownPara: "",
        OpenRight: 0,
        PositionTransfer: 0,
        ExchangeNo: "all"
      },
      ClassName: "sub-checked",
      selectJYS: null //选中交易所
    };
  },
  created() {
    this.$store.state.loaction = "/businessparms/marketupdown";
    //this.getOrgUpDownlist();
    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getCommodityUpDownlist();

    this.GetExchangeInfo("");
    this.GetCommodityInfo("");
  },
  methods: {
    //获取机构涨跌开仓限制
    getOrgUpDownlist() {
      this.OrgObject = {};
      this.Dw = "";
      var url = "/insargu/QueryOrgUpDownLimit";
      this.$loginapi.post(url, "", response => {
        if (response.Ret == 0) {
          if (response.Data != null) {
            this.OrgObject = response.Data;
            this.Dw = "%";
          }
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    //选择交易所更改品种信息
    changeCommodity(item) {
      if (item.ExchangeNo == "all") {
        this.GetCommodityInfo("");
      } else {
        this.GetCommodityInfo(item.ExchangeNo);
      }
    },

    //获取交易所信息
    GetExchangeInfo(code) {
      this.listJYS.splice(1, this.listJYS.length);
      var url = "insbase/QueryAllSysExchange";
      var postData = {
        InsCode: this.$store.state.inscode,
        ExchangeNo: code
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          response.Data.forEach(item => {
            this.listJYS.push({
              ExchangeNo: item.ExchangeNo,
              ExchangeName: item.ExchangeName + "(" + item.ExchangeNo + ")"
            });
          });
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //根据交易所获取品种信息
    GetCommodityInfo(exchangeNo) {
      this.selectPZDM = null;
      this.listPZDM.splice(1, this.listPZDM.length);
      var url = "insbase/QueryAllSysCommodityByExchange";
      var postData = {
        CommodityNo: "",
        CommodityType: 1,
        InsCode: this.$store.state.inscode,
        ExchangeNo: exchangeNo
      };
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          response.Data.forEach(item => {
            this.listPZDM.push({
              SysCommodityID:
                item.ExchangeNo +
                "-" +
                item.CommodityNo +
                "-" +
                item.CommodityType,
              CommodityNo: item.CommodityNo,
              CommodityName: item.CommodityName + "(" + item.CommodityNo + ")"
            });
          });
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //判断对象是否未空
    ExistsOrg() {
      if (!this.OrgObject.UpDownType) {
        return false;
      }
      return true;
    },

    //打开清除弹出框
    delOrgSet() {
      $("#delOrg").fadeIn("fast");
    },

    ModifyOrgData() {
      if (this.UpDownPara.trim() == "") {
        // this.$message.error("涨跌幅不能为空");
        this.$alert("涨跌幅不能为空", {});
        return;
      }
      if (isNaN(this.UpDownPara.trim())) {
        // this.$message.error("涨跌幅只能是数字");
        this.$alert("涨跌幅只能是数字", {});
        return;
      }
      if (this.selectJZKC == null) {
        // this.$message.error("请选择是否禁止开仓");
        this.$alert("请选择是否禁止开仓", {});
        return;
      }
      if (this.selectCWTZ == null) {
        // this.$message.error("请选择仓位调整");
        this.$alert("请选择仓位调整", {});
        return;
      }

      var url = "insargu/ConfigOrgUpDownLimit";

      var postData = {
        UpDownType: "1",
        UpDownPara: this.UpDownPara,
        OpenRight: this.selectJZKC.Code,
        PositionTransfer: this.selectCWTZ.Code
      };

      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          this.getOrgUpDownlist();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
          $(".mask").fadeOut("fast");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },
    delOrgData() {
      this.loadingsave = true;
      var url = "insargu/DeleteOrgUpDownLimit";
      this.$loginapi.post(url, "", response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getOrgUpDownlist();
          this.$message.success({
            message: "删除成功",
            center: true,
            duration: 800
          });
          $(".del-mask").fadeOut("fast");
        } else {
          //this.$message.error(response.Msg); //请求失败，response为失败信息
          this.$alert(response.Msg, {});
        }
      });
    },

    getJzkc(Code) {
      var name = "";
      this.listJZKC.forEach(item => {
        if (item.Code == Code) {
          name = item.Name;
        }
      });
      return name;
    },
    getCwtz(Code) {
      var name = "";
      this.listCWTZ.forEach(item => {
        if (item.Code == Code) {
          name = item.Name;
        }
      });
      return name;
    },

    addOrgSet() {
      if (!this.OrgObject.UpDownType) {
        this.selectJZKC = null;
        this.selectCWTZ = null;
        this.UpDownPara = "";
      } else {
        var jzkc = this.getJzkc(this.OrgObject.OpenRight);
        var cwtz = this.getCwtz(this.OrgObject.PositionTransfer);
        this.UpDownPara = this.OrgObject.UpDownPara;
        this.selectJZKC = { Code: this.OrgObject.OpenRight, Name: jzkc };
        this.selectCWTZ = { Code: this.OrgObject.PositionTransfer, Name: cwtz };
      }
      $("#SetOrg").fadeIn("fast");
    },

    //获取品种涨跌开仓限制信息
    getCommodityUpDownlist() {
      this.loading = true;
      var url = "insargu/QueryCommodityUpDownLimit";
      this.$loginapi.post(url, "", response => {
        this.loading = false;
        if (response.Ret == 0) {
          if (response.Data.length > 0) {
            this.ishow = false;
          } else {
            this.ishow = true;
          }
          this.list = response.Data;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    // //获取品种信息
    // getCommodityList() {
    //   var url = "insargu/GetCommodityNoList";
    //   this.$loginapi.post(url, "", response => {
    //     if (response.Ret == 0) {
    //       this.listPZDM = response.Data;
    //     } else {
    //       this.$message.error(response.Msg);
    //     }
    //   });
    // },

    //打开新增品种涨跌开仓限制
    addCommoditySet() {
      this.UpDownPara = "";
      //this.getCommodityList();
      this.selectJZKC = null;
      this.selectCWTZ = null;
      this.selectPZDM = null;
      this.selectJYS = null;
      $("#addCommodity").fadeIn("fast");
    },

    //打开编辑品种涨跌开仓限制
    EditCommoditySet(item) {
      //this.getCommodityList();
      var jzkc = this.getJzkc(item.OpenRight);
      var cwtz = this.getCwtz(item.PositionTransfer);

      this.SaveModel.ID = item.ID;
      this.UpDownPara = parseFloat(item.UpDownPara);
      this.selectPZDM = {
        CommodityName: item.CommodityName,
        CommodityNo: item.CommodityNo,
        SysCommodityID: item.SysCommodityID
      };
      this.selectJYS = {
        ExchangeNo: item.ExchangeNo,
        ExchangeName: item.ExchangeName
      };
      this.selectJZKC = { Code: item.OpenRight, Name: jzkc };
      this.selectCWTZ = { Code: item.PositionTransfer, Name: cwtz };

      $("#editCommodity").fadeIn("fast");
    },

    //保存品种涨跌开仓限制
    ModifyCommodityData(type) {
      if (this.selectJYS == null) {
        // this.$message.error("请选择交易所");
        this.$alert("请选择交易所", {});
        return;
      }

      if (this.selectPZDM == null) {
        // this.$message.error("请选择品种信息");
        this.$alert("请选择品种信息", {});
        return;
      }
      if (this.selectJZKC == null) {
        // this.$message.error("请选择是否禁止开仓");
        this.$alert("请选择是否禁止开仓", {});
        return;
      }
      if (this.UpDownPara.toString().trim() == "") {
        // this.$message.error("涨跌幅不能为空");
        this.$alert("涨跌幅不能为空", {});
        return;
      }
      if (isNaN(this.UpDownPara.toString().trim())) {
        // this.$message.error("涨跌幅只能是数字");
        this.$alert("涨跌幅只能是数字", {});
        return;
      }
      if (this.selectCWTZ == null) {
        // this.$message.error("请选择仓位调整");
        this.$alert("请选择仓位调整", {});
        return;
      }

      if (type == 0) {
        let index = 0;
        for (var i = 0; i < this.list.length; i++) {
          var item = this.list[i];
          if (
            item.ExchangeNo == this.selectJYS.ExchangeNo &&
            item.SysCommodityID == this.selectPZDM.SysCommodityID
          ) {
            index++;
            break;
          }
        }

        if (index > 0) {
          //this.$message.error("品种设置已存在");
          this.$alert("品种设置已存在", {});
          return;
        }
      }

      this.SaveModel.SysCommodityID = this.selectPZDM.SysCommodityID;
      this.SaveModel.UpDownType = "1";
      this.SaveModel.UpDownPara = this.UpDownPara;
      this.SaveModel.OpenRight = this.selectJZKC.Code;
      this.SaveModel.PositionTransfer = this.selectCWTZ.Code;
      this.SaveModel.ExchangeNo = this.selectJYS.ExchangeNo;
      var url = "insargu/SaveCommodityUpDownLimit";
      var post = this.SaveModel;
      this.loadingsave = true;
      this.$loginapi.post(url, post, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getCommodityUpDownlist();
          this.closeMask();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          // this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    DeleteCommodityData() {
      this.loadingsave = true;
      var url = "insargu/DeleteCommodityUpDownLimit";
      var post = this.del_list;

      this.$loginapi.post(url, post, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getCommodityUpDownlist();
          this.closeMask();
          if (this.del_list.length == this.id_list.length) {
            this.id_list.splice(0, this.id_list.length);
          }
          this.del_list.splice(0, this.del_list.length);
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    del(id) {
      $(".del-mask").fadeIn("fast");
      this.id_list.push(id);
    },

    delOneCommodity(id) {
      $("#delCommodity").fadeIn("fast");
      this.del_list.push(id);
    },

    delAllCommidity() {
      if (this.id_list.length == 0) {
        // this.$message.error("请选择需要删除的品种信息");
        this.$alert("请选择需要删除的品种信息", {});
        return;
      }
      $("#delCommodity").fadeIn("fast");

      this.id_list.forEach(Id => {
        this.del_list.push(Id);
      });
    },

    closeMask() {
      $(".mask").fadeOut("fast");
      this.isdisplay = true;
    },
    closeDelMask() {
      $(".del-mask,#delCommodity").fadeOut("fast");
    },
    selectedAll() {
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      for (var i = 0; i < this.list.length; i++) {
        this.id_list.push(this.list[i].ID);
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
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getMainContractlist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
      //this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
    }
  }
};
</script>

<style scoped>
</style>
