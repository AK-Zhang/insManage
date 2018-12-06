<template>
  <div class="orgnotice_">
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
                  <li class="active">机构通知</li>
                </ol>
              </h3>
            </div>
            <div class="panel-body bg">
              <p>
                <span class="col-md-10 fz">可查看，新增机构通知 </span>
                <span class="col-md-2 text-right  margin-Top">
                  <button class="btn btn-default" type="submit" @click="addData()">
                    <span class="fa fa-plus pulp"></span>新增
                  </button>
                  <!-- <button class="btn btn-default" type="submit" @click="tests()">
                    <span class="fa fa-plus pulp"></span>测试按钮勿带点
                  </button> -->
                </span>
              </p>
            </div>
            <div class="table-1">
              <table class="table table-1-1">
                <thead>
                  <tr>
                    <th style="width: 5%">序号</th>
                    <th style="width: 15%" class="textalignL">通知标题</th>
                    <th style="width: 5%"></th>
                    <th style="width: 30%" class="textalignL">通知内容</th>
                    <th style="width: 15%">创建时间</th>
                    <th style="width: 15%">发布时间</th>
                    <th style="width:7%">通知对象</th>
                    <th style="width:8%">操作</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="panel panel-default table-2" v-loading="loading">
            <table class="table table-hover table-2-1">
              <tbody class="m-tbody">
                <tr>
                  <td v-show="ishow">暂无数据</td>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="width: 5%">{{index+1}}</td>
                  <td style="width: 15%;text-align:left;"><input type="text" class="noticeContent" v-model="item.Title" disabled> </td>
                  <td style="width: 5%">
                    <span class="iconfont icon-caogao drafts" v-if="item.State == 0 ? true:false"></span>
                  </td>
                  <td style="30%;text-align:left;">
                    <input type="text" class="noticeContent" v-model="item.Content" disabled> </td>
                  <td style="width: 15%">{{item.CreateTime | datefmt("YYYY-MM-DD HH:mm:ss")}}</td>
                  <td style="width: 15%">{{RevertTimeInfo(item.SendTime)}}</td>
                  <td style="width: 8%">{{item.ReceiveType == 3 ? "经纪人": (item.ReceiveType == 4 ? "客户" : "--")}}</td>
                  <td style="width:7%">
                    <div class="btn-group" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <el-dropdown trigger="click" size="mini">
                          <span class="el-dropdown-link" size="mini">
                            <el-button class="el-icon-caret-bottom el-icon--right opera_btn" type="primary" size="mini"></el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="dropdownul">
                            <el-dropdown-item class="clearfix" v-show="item.State == 0 ? false : true" @click.native="ViewNotice(item)">
                              查看
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" v-show="item.State == 0 ? true : false" @click.native="edit(item)">
                              发送通知
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" v-show="item.State == 0 ? true : false" @click.native="edit(item)">
                              编辑
                              <el-badge class="mark">
                              </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" v-show="item.State == 0 ? true : false" @click.native="del(item)">
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
    <div class="mask" id="addNotice" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">新增机构通知</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  指定对象
                </div>
                <!-- <span class="selected">
                  <el-select v-model="notice.keyWords" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" @change="addItem" :loading="loading" style="width:98%">
                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </span> -->
                <el-select v-model="selectFilterType" @change="FilterChangeType" ref="chooseFilter" value-key="Name" placeholder="请选择通知对象（经纪人或者子账户）" style="width:98%">
                  <el-option value="经纪人">
                  </el-option>
                  <el-option value="子账户">
                  </el-option>
                </el-select>
                <div>&nbsp;</div>
                <el-select v-show="selectType" v-model="userType" @change="FilterChangeUserType" multiple filterable :filter-method="remoteMethod" ref="chooseFilter" value-key="Name" placeholder="请选择经纪人" style="width:98%">
                  <el-option v-for="(item,index) in displaylists" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>

                <el-select v-show="!selectType" v-model="selectFilter" @change="FilterChange" ref="chooseFilter" value-key="Name" placeholder="请选择所属经纪人" style="width:98%">
                  <el-option v-for="(item,index) in filterlists" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
                <div>&nbsp;</div>
                <span class="selected">
                  <el-select v-show="!selectType" v-model="userTypeB" @change="FilterChangeUserType" multiple filterable :filter-method="remoteMethodU" ref="chooseFilter" value-key="Name" placeholder="请选择该经纪人下子账户，可输入关键字拼音搜索" style="width:98%">
                    <el-option v-for="(item,index) in displaylistsU" :key="index" :label="item.Name" :value="item">
                    </el-option>
                  </el-select>

                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  通知标题
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="title" maxlength="100" style="width:98%">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  通知内容
                </div>
                <span class="selected">
                  <textarea class="input-text input3" type="textarea" placeholder="" v-model="content" maxlength="500" style="width:98%"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addDataToDraft()">保存至草稿</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="AddDataToSend(ReceiveType)">保存并发布</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="mask" id="upNotice" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">修改机构通知</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  指定对象
                </div>
                <el-select v-model="selectFilterType" @change="FilterChangeType" ref="chooseFilter" value-key="Name" placeholder="请选择通知对象（经纪人或者子账户）" style="width:98%">
                  <el-option value="经纪人">
                  </el-option>
                  <el-option value="子账户">
                  </el-option>
                </el-select>
                <div>&nbsp;</div>
                <el-select v-show="selectType" v-model="userType" @change="FilterChangeUserType" multiple filterable :filter-method="remoteMethod" ref="chooseFilter" value-key="Name" placeholder="请选择经纪人" style="width:98%">
                  <el-option v-for="(item,index) in displaylists" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>

                <el-select v-show="!selectType" v-model="selectFilter" @change="FilterChange" ref="chooseFilter" value-key="Name" placeholder="请选择所属经纪人" style="width:98%">
                  <el-option v-for="(item,index) in filterlists" :key="index" :label="item.Name" :value="item">
                  </el-option>
                </el-select>
                <div>&nbsp;</div>
                <span class="selected">
                  <el-select v-show="!selectType" v-model="userTypeB" @change="FilterChangeUserType" multiple filterable :filter-method="remoteMethodU" ref="chooseFilter" value-key="Name" placeholder="请选择该经纪人下子账户，可输入关键字拼音搜索" style="width:98%">
                    <el-option v-for="(item,index) in displaylistsU" :key="index" :label="item.Name" :value="item">
                    </el-option>
                  </el-select>

                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  通知标题
                </div>
                <span class="selected">
                  <input class="input-text" type="text" placeholder="" v-model="title" maxlength="100" style="width:98%">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4">*</span>
                  通知内容
                </div>
                <span class="selected">
                  <textarea class="input-text input3" type="textarea" placeholder="" v-model="content" maxlength="500" style="width:98%"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="addDataToDraft()">保存至草稿</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="AddDataToSend(ReceiveType)">保存并发布</button>
            </span>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">取消</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask" id="viewNotice" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">通知内容</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  通知标题：
                </div>
                <span class="selected">
                  <input class="input-text viewWindow" type="text" placeholder="" v-model="title" readonly maxlength="100" style="width:98%">
                </span>
              </div>
              <div>
                <div class="error3">
                  <span class="error4"></span>
                  通知内容：
                </div>
                <span class="selected">
                  <textarea class="input-text input3 viewWindow textareH" type="textarea" placeholder="" v-model="content" readonly maxlength="500" style="width:98%;height:auto"></textarea>
                </span>
              </div>
            </form>
          </div>
          <div class="closed closed-add" @click="closeMask()">×</div>
          <p>
            <span class="fr">
              <button type="button" class="btn btn-default btn-q btn-q-add" @click="closeMask()">关闭</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mask" v-loading="loadingsave" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)" id="delNotice">
      <div class="mask_box">
        <div class="panel panel-default  no-border">
          <!-- Default panel contents -->
          <div class="panel-heading">删除通知</div>
          <div class="panel-body">
            <form class="form-inline form-inline1" novalidate="" role="form">
              <div>
                <div class="error3">
                  确认要删除此通知信息吗？
                </div>
              </div>
            </form>
          </div>
          <div class="closed closed-del" @click="closeMask()">×</div>
          <!-- Table -->
          <p>
            <span class="fr">
              <button type="button" class="btn btn-info" @click="Deldate()">删除</button>
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
  name: "orgnotices",
  components: {
    pageination
  },
  data() {
    return {
      loading: "",
      ishow: "",
      selectType: true,
      loadingsave: "",
      list: [],
      displaylists: [],
      displaylistsU: [],
      title: "",
      content: "",
      Id: -1,
      pager: {},
      recordCount: 0,
      CodeList: [],
      options4: [],
      lists: [],

      filterlists: [],
      loading: false,
      notice: {
        title: "",
        content: "",
        keyWords: []
      },
      djsd: "a",
      del_list: [],
      selectFilterType: { Code: "", Name: "经纪人" }, //选中筛选项
      selectFilter: {}, //选中筛选项
      userType: [],
      userTypeB: [],
      ReceiveType: 1, //4子账户 3经纪人
      cacheList: []
    };
  },
  created() {
    this.$store.state.loaction = "/businessparms/orgnotices";

    this.pager.PageNo = 1;
    this.pager.PageSize = 20;
    this.getNoticeList();
  },
  methods: {
    //选中列表进行切换
    FilterChange(val) {
      this.getUserList(val.Code);
    },
    FilterChangeType(val) {
      this.lists = [];
      this.displaylists = [];
      this.displaylistsU = [];
      this.selectFilter = {};
      this.userType = [];
      this.userTypeB = [];
      this.notice.keyWords = [];
      if (val == "经纪人") {
        this.lists = [{ Code: "", Name: "机构下所有经纪人" }];
        this.ReceiveType = 3;
        this.selectType = true;
      } else {
        this.lists = [
          { Code: "", Name: "机构及经纪人全部子账户" },
          { Code: "AllAgent", Name: "经纪人全部客户" },
          { Code: "AllIns", Name: "机构直属客户" }
        ];
        this.ReceiveType = 4;
        this.selectType = false;
      }
      this.getAgentList();
    },
    FilterChangeUserType(val) {
      // this.getUserList();
      val.forEach(item => {
        if (item.Code == "") {
          this.userType = [item];
          this.userTypeB = [item];
        }
      });
    },
    //日期过滤
    RevertTimeInfo(value) {
      // console.log(value.indexOf("0001"));
      if (value.indexOf("0001") > -1) {
        return "--";
      } else {
        return value;
      }
    },
    //获取通知列表
    getNoticeList() {
      this.loading = true;
      var url = "/insargu/GetInsNoticeList";
      this.$loginapi.postWithPage(
        url,
        this.pager.PageNo,
        this.pager.PageSize,
        "",
        response => {
          this.loading = false;
          if (response.Ret == 0) {
            //请求成功，response为成功信息参数
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
            // alert(response.Msg); //请求失败，response为失败信息
            //this.$message.error(response.Msg);
            this.$alert(response.Msg, {});
          }
        }
      );
    },

    /* 测试用 */
    tests() {
      this.$loginapi.post(
        "/InitPassword/InitInsAdminPassword",
        "",
        response => {
          if (response.Ret == 0) {
            console.log(response.Msg);
          }
        }
      );
    },

    //获取经纪人
    getAgentList() {
      this.$loginapi.post("/insbase/GetAgentCodeList", "", response => {
        if (response.Ret == 0) {
          response.Data.forEach(item => {
            this.lists.push({
              Code: item.Code,
              Name: item.Code + "(" + item.Name + ")"
            });
          });
          this.displaylists = jQuery.extend([], this.lists);
          this.filterlists = jQuery.extend([], this.lists);
          // .map(item => {
          //   return { value: item.Name, label: item.Code };
          // });
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //      获取子账户
    getUserList(Codes) {
      this.lists = [];
      this.userTypeB = [];
      var url = "/insbase/GetInsUserCodeList";
      var postData = {
        type: 0,
        AgentCode: ""
      };
      if (Codes == "") {
        postData = {
          type: 0,
          AgentCode: ""
        };
      } else if (Codes == "AllIns") {
        postData = {
          type: 1,
          AgentCode: ""
        };
      } else if (Codes == "AllAgent") {
        postData = {
          type: 2,
          AgentCode: ""
        };
      } else {
        postData = {
          type: 3,
          AgentCode: Codes
        };
      }
      this.$loginapi.post(url, postData, response => {
        if (response.Ret == 0) {
          if (response.Data.length > 0) {
            this.lists = [{ Code: "", Name: "所有子账户" }];
          }
          response.Data.forEach(item => {
            this.lists.push({
              Code: item.Code,
              Name: item.Code + "(" + item.Name + ")"
            });
          });
          // this.lists = response.Data;
          this.cacheList = jQuery.extend([], this.lists);
          this.displaylistsU = jQuery.extend([], this.lists);
          // this.filterlists = jQuery.extend([], this.lists);
          // .map(item => {
          //   return { value: item.Name, label: item.Code };
          // });
          // this.listOldRight = response.Data;
        } else {
          //this.$message.error(response.Msg);
          this.$alert(response.Msg, {});
        }
      });
    },

    //获取模糊匹配用户信息
    getUserInfo(queryString) {
      var postData = {
        QueryString: queryString,
        Type: 4
      };
      this.$loginapi.post(
        "XParty/GetList",
        postData,
        e => {
          if (e.Ret == 0) {
            this.lists = e.Data.map(item => {
              return { value: item.Code, label: item.Name };
            });
            // console.log(e.Data);
          }
        },
        1,
        30
      );
    },

    //保存至草稿
    addDataToDraft() {
      if (this.title.toString().trim() == "") {
        // this.$message.error("通知标题不能为空");
        this.$alert("通知标题不能为空", {});
        return;
      }
      if (this.content.toString().trim() == "") {
        // this.$message.error("通知内容不能为空");
        this.$alert("通知内容不能为空", {});
        return;
      }
      this.loadingsave = true;

      let url = "/insargu/UpdateNoticeDraft";
      if (this.Id == -1) {
        url = "/insargu/AddNoticeDraft";
      }
      let postData = {
        Title: this.title,
        Content: this.content,
        Id: this.Id
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.title = "";
          this.content = "";
          this.Id = -1;
          this.getNoticeList();
          this.closeMask();
          this.$message.success({
            message: "保存成功",
            center: true,
            duration: 800
          });
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    //保存并发送
    AddDataToSend(RType) {
      if (RType == 1) {
        this.$alert("请选择通知对象，经纪人或者子账户", {});
        return;
      } else if (RType == 3) {
        this.userType.forEach(item => {
          if (item.Code == "") {
            this.CodeList = [];
          } else {
            this.CodeList.push(item.Code);
          }
        });
        if (this.userType.length < 1) {
          this.$alert("请选择经纪人", {});
          return;
        }
      } else if (RType == 4) {
        this.userTypeB.forEach(item => {
          if (item.Code == "") {
            this.CodeList = [];
          } else {
            this.CodeList.push(item.Code);
          }
        });
        if (this.userTypeB.length < 1) {
          this.$alert("请选择经纪人", {});
          return;
        }
      } else {
        this.$alert("请选择通知对象", {});
        return;
      }

      if (this.title.toString().trim() == "") {
        // this.$message.error("通知标题不能为空");
        this.$alert("通知标题不能为空", {});
        return;
      }
      if (this.content.toString().trim() == "") {
        // this.$message.error("通知内容不能为空");
        this.$alert("通知内容不能为空", {});
        return;
      }

      // this.loadingsave = true;
      let url = "/insargu/SendNotice";
      let postData = {
        Title: this.title,
        Content: this.content,
        SendType: 2,
        ReceiveType: RType, //4是子账户 3是经纪人
        UserCodes: this.CodeList,
        Id: this.Id
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.title = "";
          this.content = "";
          this.Id = -1;
          this.getNoticeList();
          this.closeMask();
          this.$message.success({
            message: "通知成功",
            center: true,
            duration: 800
          });
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    Deldate() {
      this.loadingsave = true;
      var url = "/insargu/DeleteNoticeDraft";
      var postData = {
        Id: this.Id
      };
      this.$loginapi.post(url, postData, response => {
        this.loadingsave = false;
        if (response.Ret == 0) {
          this.getNoticeList();
          this.closeMask();
          this.$message.success("删除成功");
        } else {
          this.$alert(response.Msg, {});
        }
      });
    },

    addItem(value) {},
    // remoteMethod(query) {
    //   this.getUserInfo(query);
    //   if (query !== "") {
    //     setTimeout(() => {
    //       this.options4 = this.lists;
    //     }, 200);
    //   } else {
    //     this.options4 = [];
    //   }
    // },
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.displaylists = this.filterlists.filter(item => {
            return item.Code.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.displaylists = jQuery.extend([], this.lists);
      }
    },
    remoteMethodU(query) {
      if (query !== "") {
        setTimeout(() => {
          this.displaylistsU = this.cacheList.filter(item => {
            return item.Code.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.displaylistsU = jQuery.extend([], this.lists);
      }
    },

    //    分页
    pageFn(size, pageno) {
      this.pager.PageSize = size;
      this.pager.PageNo = pageno;
      this.getNoticeList();
    },

    addData() {
      this.title = "";
      this.content = "";
      this.selectFilterType = { Code: "", Name: "" };
      this.selectFilter = {};
      this.userType = [];
      this.userTypeB = [];
      this.displaylists = [];
      this.displaylistsU = [];
      $("#addNotice").fadeIn("fast");
    },

    edit(item) {
      this.Id = item.ID;
      this.title = item.Title;
      this.content = item.Content;
      $("#upNotice").fadeIn("fast");
    },
    ViewNotice(item) {
      this.title = item.Title;
      this.content = item.Content;
      $("#viewNotice").fadeIn("fast");
    },
    del(item) {
      this.Id = item.ID;
      $("#delNotice").fadeIn("fast");
    },

    closeMask() {
      $(".mask").fadeOut("fast");
      this.ReceiveType = 1;
      this.lists = [];
      this.selectFilterType = { Code: "", Name: "" };
      this.displaylists = [];
      this.displaylistsU = [];
      this.selectFilter = {};
      this.userType = [];
      this.userTypeB = [];
      this.notice.keyWords = [];
    }
  }
};
</script>

<style scoped>
</style>
