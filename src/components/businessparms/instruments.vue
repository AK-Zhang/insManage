<template>
  <div class="instrument_">
    <div class="template">
      <article class="main">
        <div class="container-r">

          <!--带表格的面板-->
          <div class="panel panel-default panel-1 pr">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <h3 class="panel-title flex">
                <span class="maye"></span>
                <ol class="breadcrumb breadcrumb-top">
                  <li>
                    <a href="#">业务参数</a>
                  </li>
                  <li class="active">合约信息</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-8 fz">可显示合约、品种信息 </span>
                <span class="col-md-4 text-right margin-Top">
                  <button class="btn btn-default" type="submit" v-show="isShhshow" @click="openSetDialog()">
                    <span class="f">禁止交易时间</span>
                  </button>
                </span>
              </p>
            </div>
            <div class="panel-body-z pr">
              <div class="layui-tab">
                <ul class="layui-tab-title pr">
                  <li class="layui-this title-1" @click="tab1()">合约</li>
                  <li class="title-2" @click="tab2()">品种</li>
                </ul>
                <div class="layui-tab-content">
                  <div class="layui-tab-item layui-show item1">
                    <div class="tb-head pr">
                      <table class="table table-hover table-header">
                        <thead>
                          <tr>
                            <th style="width: 8%;">序号</th>

                            <th style="width: 10%">品种代码</th>
                            <th style="width: 10%">合约代码</th>
                            <th style="width: 10%">合约名称</th>
                            <th style="width: 10%">合约乘数</th>
                            <th style="width: 15%">最小变动价位</th>
                            <th style="width: 10%">最后交易日</th>
                            <th style="width: 10%">强平时间</th>
                            <th style="width: 13%">交易所名称</th>
                            <th style="width: 4%">操作</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body pa" v-loading="loading">
                      <div class="tb-body-box">
                        <table class="table table-hover table-content">
                          <tbody>
                            <tr>
                              <td v-show="ishow">暂无数据</td>
                            </tr>
                            <tr v-for="(item,index) in Contractlist" :key="index">
                              <td style="width: 8%;">{{index+1}}</td>

                              <td style="width: 10%">{{item.CommodityNo == null ? "--" : (item.CommodityNo == "" ? "--" : item.CommodityNo)}}</td>
                              <td style="width: 10%">{{item.CommodityNo == null ? "--" : (item.CommodityNo == "" ? "--" : item.CommodityNo)}}{{item.ContractNo == null ? "--" : (item.ContractNo == "" ? "--" : item.ContractNo)}}</td>
                              <td style="width: 10%">{{item.ContractName}}</td>
                              <td style="width: 10%">{{item.ContactMultiplier}}</td>
                              <td style="width: 15%">{{scientificToNumber(item.CommodityTickSize)}}</td>
                              <td style="width: 10%">{{item.LastTradingDate | datefmt("YYYY-MM-DD")}}</td>
                              <td style="width: 10%">{{item.ForcedLiquidationTime}}</td>
                              <td style="width: 13%">{{item.ExchangeName == null ? "--" : (item.ExchangeName == "" ? "--" : item.ExchangeName)}}</td>
                              <td style="width: 4%">
                                <el-dropdown trigger="click" size="mini">
                                  <span class="el-dropdown-link" size="mini">
                                    <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                                  </span>
                                  <el-dropdown-menu slot="dropdown" class="dropdownul">
                                    <el-dropdown-item class="clearfix" @click.native="openEditPage(item,true)">
                                      编辑
                                      <el-badge class="mark">
                                      </el-badge>
                                    </el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation" class="text-center  page-separation">
                          <pageinstrument :pagerPro="InstrumentPager" @ee="instrumentpageFn"></pageinstrument>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div class="layui-tab-item item2">
                    <div class="tb-head pr">
                      <table class="table table-hover table-header">
                        <thead>
                          <tr>
                            <th style="width: 5%; text-indent: 1em;">序号</th>
                            <th style="width: 5%"><input type="checkbox" id="total-checked" class="total-checked" @click="selectedAll()"></th>
                            <th style="width: 10%">品种代码</th>
                            <th style="width: 15%">品种名称</th>
                            <th style="width: 15%">交易所名称</th>
                            <th style="width: 13%">合约乘数</th>
                            <th style="width: 13%">最小变动价位</th>
                            <th style="width: 10%">品种类型</th>
                            <th style="width: 10%">币种类型</th>
                            <th style="width: 4%">操作</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="tb-body pa" v-loading="loading">
                      <div class="tb-body-box">
                        <table class="table table-hover table-content">
                          <tbody>
                            <tr>
                              <td v-show="ishow">暂无数据</td>
                            </tr>
                            <tr v-for="(item,index) in Commoditylist" :key="index">
                              <td style="width: 5%; text-indent: 1em;">{{index+1}}</td>
                              <td style="width:5%" class="sub-checked " id="sub-checked">
                                <input type="checkbox" :class="ClassName+index" @click="selectedSub(item.SysCommodityID,index)"></td>
                              <td style="width: 10%">{{item.CommodityCode == null ? "--" : (item.CommodityCode == "" ? "--" : item.CommodityCode)}}</td>
                              <td style="width: 15%">{{item.CommodityName == null ? "--" : (item.CommodityName == "" ? "--" : item.CommodityName)}}</td>
                              <td style="width: 15%">{{item.ExchangeName == null ? "--" : (item.ExchangeName == "" ? "--" : item.ExchangeName)}}</td>
                              <td style="width: 13%">{{item.ContactMultiplier}}</td>
                              <td style="width: 13%">{{scientificToNumber(item.CommodityTickSize)}}</td>
                              <td style="width: 10%">{{item.CommodityType == 2 ? "期货":"其它"}}</td>
                              <td style="width: 10%">{{item.CurrencyName}}</td>
                              <td style="width: 4%">
                                <el-dropdown trigger="click" size="mini">
                                  <span class="el-dropdown-link" size="mini">
                                    <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                                  </span>
                                  <el-dropdown-menu slot="dropdown" class="dropdownul">
                                    <el-dropdown-item class="clearfix" @click.native="openEditPage(item,false)">
                                      编辑
                                      <el-badge class="mark">
                                      </el-badge>
                                    </el-dropdown-item>
                                    <el-dropdown-item class="clearfix" @click.native="QueryTime(item)">
                                      禁止交易时间
                                      <el-badge class="mark">
                                      </el-badge>
                                    </el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation" class="text-center  page-separation">
                          <pagecommodity :pagerPro="CommodityPager" @ee="commoditypageFn"></pagecommodity>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="mask" id="editName" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading" id="maskTitleName">编辑合约名称</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3" v-show="!Datatype">
                  品种名称
                </div>
                <div class="error3" v-show="Datatype">
                  合约名称
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-if="Datatype" v-model="currentRowInfo.ContractName" style="width:98%">
                  <input class="input-text" type="text" v-if="!Datatype" v-model="currentRowInfo.CommodityName" style="width:98%">
                </span>
              </div>
              <div v-if="Datatype">
                <div class="error3">
                  最后交易日
                </div>
                <span class="selected">
                  <input class="input-text" type="text" v-model="currentRowInfo.LastTradingDate" readonly style="width:98%">
                </span>
              </div>
              <div v-if="Datatype">
                <div class="error3">
                  强平时间
                </div>
                <span class="selected">
                  <div class="block">
                    <el-date-picker v-model="currentRowInfo.ForcedLiquidationTime" type="datetime" default-time="12:00:00" align="center" :end-placeholder="currentRowInfo.LastTradingDate" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:98%">
                    </el-date-picker>
                  </div>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="modifyName(Datatype)">保存</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 修改夏季交易时间 -->
    <el-dialog title="禁止交易时间" center :visible.sync="dialogFormVisible1" custom-class="abandonTime" @close="closedeleteDtat()" width="645px">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'时间段' + (index+1)" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
      required: true, message: '时间段不能为空', trigger: 'blur'
    }">
          <!-- <el-input v-model="domain.value"></el-input> -->
          <el-date-picker v-model="domain.value" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click="addDomain">新增时间段</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer text-right">
        <el-button @click="addDomain">新增时间段</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import common from "../../kits/common.js";
import pageinstrument from "../subcom/pageination.vue";
import pagecommodity from "../subcom/pageination.vue";
export default {
  name: "instruments",
  components: {
    pageinstrument,
    pagecommodity
  },
  data() {
    return {
      isShhshow: false,
      ishow: "",
      loading: "",
      loadingsave: "",
      Contractlist: [], //获取合约信息列表
      Commoditylist: [], //获取品种信息
      InstrumentPager: {},
      InstruemntRecordCount: 0,
      CommodityPager: {},
      CommodityRecordCount: 0,
      currentRowInfo: {},
      Datatype: true,

      ClassName: "sub-checked",
      id_list: [],
      dialogFormVisible1: false,
      Timevalue: [],
      TimeList: [],
      wintertimeList: [],

      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ]
      }
    };
  },
  created() {
    this.InstrumentPager.PageNo = 1;
    this.InstrumentPager.PageSize = 20;
    this.CommodityPager.PageNo = 1;
    this.CommodityPager.PageSize = 20;
    this.getContractlist();
    //this.getCommoditylist();
    this.$store.state.loaction = "/businessparms/instruments";
  },
  methods: {
    //获取合约信息列表
    getContractlist() {
      this.loading = true;
      var url = "/insbase/GetContractInfoList";
      this.$loginapi.postWithPage(
        url,
        this.InstrumentPager.PageNo,
        this.InstrumentPager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.Contractlist = response.Data;

            this.InstrumentPager = response.Pager;
            if (this.InstrumentPager.PageNo == 1) {
              this.InstruemntRecordCount = this.InstrumentPager.RecordCount;
            } else {
              this.InstrumentPager.RecordCount = this.InstruemntRecordCount;
            }
          } else {
            // this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    scientificToNumber(num) {
      var str = num.toString();
      var reg = /^(\d+)(e)([\-]?\d+)$/;
      var arr,
        len,
        zero = "";

      /*6e7或6e+7 都会自动转换数值*/
      if (!reg.test(str)) {
        return num;
      } else {
        /*6e-7 需要手动转换*/
        arr = reg.exec(str);
        len = Math.abs(arr[3]) - 1;
        for (var i = 0; i < len; i++) {
          zero += "0";
        }

        return "0." + zero + arr[1];
      }
    },
    //获取品种信息
    getCommoditylist() {
      this.loading = true;
      var url = "/insbase/GetCommodityInfoList";
      this.$loginapi.postWithPage(
        url,
        this.CommodityPager.PageNo,
        this.CommodityPager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            if (response.Data.length > 0) {
              this.ishow = false;
            } else {
              this.ishow = true;
            }
            this.Commoditylist = response.Data;
            this.CommodityPager = response.Pager;
            if (this.CommodityPager.PageNo == 1) {
              this.CommodityRecordCount = this.CommodityPager.RecordCount;
            } else {
              this.CommodityPager.RecordCount = this.CommodityRecordCount;
            }
          } else {
            // this.$message.error(response.Msg); //请求失败，response为失败信息
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    //    分页
    instrumentpageFn(size, pageno) {
      this.InstrumentPager.PageSize = size;
      this.InstrumentPager.PageNo = pageno;
      this.getContractlist();
    },
    //    分页
    commoditypageFn(size, pageno) {
      this.CommodityPager.PageSize = size;
      this.CommodityPager.PageNo = pageno;
      this.getCommoditylist();

      $(".total-checked")[0].checked = false;
      this.selectedAll();
    },
    openEditPage(obj, type) {
      this.Datatype = type;
      if (type == true) {
        $("#editName").fadeIn("fast");
        $("#maskTitleName").html("编辑合约");
        this.currentRowInfo = jQuery.extend({}, obj);
      } else {
        $("#editName").fadeIn("fast");
        $("#maskTitleName").html("编辑品种");
        this.currentRowInfo = jQuery.extend({}, obj);
      }
    },
    modifyName(type) {
      this.loadingsave = true;
      let PrepostData = jQuery.extend({}, this.currentRowInfo);
      if (type == true) {
        let url = "/insbase/ModifyInsContractName";
        let postData = {
          Id: PrepostData.SysContractID,
          Name: PrepostData.ContractName,
          LastTradingDate: PrepostData.LastTradingDate,
          ForcedLiquidationTime: PrepostData.ForcedLiquidationTime
        };
        this.$loginapi.post(url, postData, response => {
          this.loadingsave = false;
          if (response.Ret == 0) {
            this.closeMask();
            this.getContractlist();
            this.$message.success({
              message: "合约修改成功！",
              center: true,
              duration: 800
            });
          } else {
            this.$alert(response.Msg, {});
          }
        });
      } else {
        let url = "/insbase/ModifyInsCommodityName";
        let postData = {
          Id: PrepostData.SysCommodityID,
          Name: PrepostData.CommodityName
        };
        this.$loginapi.post(url, postData, response => {
          this.loadingsave = false;
          if (response.Ret == 0) {
            this.closeMask();
            this.getCommoditylist();
            this.$message.success({
              message: "品种名称修改成功！",
              center: true,
              duration: 800
            });
          } else {
            this.$alert(response.Msg, {});
          }
        });
      }
    },
    closeMask() {
      $("#editName").fadeOut("fast");
    },
    tab1() {
      this.getContractlist();
      this.isShhshow = false;
      $(".title-1").addClass("layui-this");
      $(".title-2").removeClass("layui-this");
      $(".item1").addClass("layui-show");
      $(".item2").removeClass("layui-show");
    },
    tab2() {
      this.getCommoditylist();
      this.isShhshow = true;
      $(".title-2").addClass("layui-this");
      $(".title-1").removeClass("layui-this");
      $(".item2").addClass("layui-show");
      $(".item1").removeClass("layui-show");
    },
    selectedAll() {
      this.id_list = []; //
      // 1.0 实现每个旗舰店, 头部选项控制内部选项
      this.choseBox().allChecked($("#total-checked"), $(".sub-checked"));
      if ($(".total-checked")[0].checked) {
        for (var i = 0; i < this.Commoditylist.length; i++) {
          this.id_list.push(this.Commoditylist[i].SysCommodityID);
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
    // 设置禁止交易时间
    openSetDialog() {
      if (this.id_list.length == 0) {
        vue.$alert("请至少选择一个品种！");
        return;
      }
      this.dialogFormVisible1 = true;
    },
    // 获取品种禁止交易时间
    QueryTime(item) {
      let a = this.id_list.push(item.SysCommodityID);
      let url = "/insbase/QryInsCommodityLimiteTradingDay";
      this.$loginapi.post(url, item.SysCommodityID, response => {
        if (response.Ret == 0) {
          if(response.Data == null){
            this.dialogFormVisible1 = true;
          }else{
           let arr = response.Data.split(",");
           this.setAbandonTime(arr);           
          }
        } else {
          this.$message.error(response.Msg);
        }
      });
    },
    // 修改获取的时间格式赋值到弹出框
    setAbandonTime(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var obj = {};
        let dataArr = [];
        dataArr.push(arr[i].split("|")[0]);
        dataArr.push(arr[i].split("|")[1]);
        obj.value = dataArr;
        newArr.push(obj);
      }
      this.dynamicValidateForm.domains = [];
      this.dynamicValidateForm.domains = newArr;
      this.dialogFormVisible1 = true;
    },
    // 添加交易时间数组
    addTimeList() {
      this.dynamicValidateForm.domains.forEach(element => {
        this.Timevalue.push(element.value.join("|"));
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTimeList();
          this.loading = true;
          let url = "/insbase/SetInsCommodityLimiteTradingDay";
          let Data = {
            SysCommodityId: this.id_list,
            DayRange: this.Timevalue
          };
          this.$loginapi.post(url, Data, response => {
            this.loading = false;
            if (response.Ret == 0) {
              this.$message.success("修改成功！");
              this.dialogFormVisible1 = false;
              this.TimeList = [];
              this.id_list = [];
              this.Timevalue = [];
              this.resetForm("dynamicValidateForm");
            } else {
              this.$message.error(response.Msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除添加的禁止交易时间
    removeDomain(item) {
      if (this.dynamicValidateForm.domains.length == 1) {
        this.$message.error("请至少添加一个禁止交易时间");
        return;
      }
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    // 关闭弹窗清空数据
    closedeleteDtat() {
      this.id_list = [];
      this.Timevalue = [];
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
