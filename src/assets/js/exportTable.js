// 导出表格
let getExplorer = function () {
  var explorer = window.navigator.userAgent;
  //ie
  if (explorer.indexOf("Trident") >= 0) {
    return "ie";
  } else if (explorer.indexOf("Firefox") >= 0) {
    //firefox
    return "Firefox";
  } else if (explorer.indexOf("Chrome") >= 0) {
    //Chrome
    return "Chrome";
  } else if (explorer.indexOf("Opera") >= 0) {
    //Opera
    return "Opera";
  } else if (explorer.indexOf("Safari") >= 0) {
    //Safari
    return "Safari";
  }
};
let exportExcel = function (tableHeadid, tableBodyid, name, filename) {
  if (getExplorer() == "ie") {
    var curTb = document.getElementById(tableHeadid);
    var curTbl = document.getElementById(tableBodyid);
    // 表头
    curTb.style.border = "1px";
    curTb.style.backgroundClip = "padding-box";
    curTb.style.position = "relative";
    // 表体
    curTbl.style.border = "1px";
    curTbl.style.backgroundClip = "padding-box";
    curTbl.style.position = "relative";

    if (curTbl.children[0].children[0].children[0].innerHTML == "暂无数据") {
      curTbl.deleteRow(0)
    }
    var oXL;
    try {
      oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel  
    } catch (e) {
      alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
      return false;
    }
    var fname = oXL.Application.GetSaveAsFilename(
      name + ".xls",
      "Excel Spreadsheets (*.xls), *.xls"
    );

    var oWB = oXL.Workbooks.Add();
    var oSheet = oWB.ActiveSheet;
    var Lenr = curTbl.rows.length;
    var lenl = curTb.rows.length;

    for (let i = 0; i < lenl; i++) {
      let Lend = curTb.rows(i).cells.length;
      for (let j = 0; j < Lend; j++) {
        oSheet.Cells(i + 1, j + 1).value = curTb.rows(i).cells(j).innerText;
      }
    }
    for (let i = 0; i < Lenr; i++) {
      let Lenc = curTbl.rows(i).cells.length;
      for (let j = 0; j < Lenc; j++) {
        oSheet.Cells(i + 2, j + 1).value = curTbl.rows(i).cells(j).innerText;
      }
    }
    oWB.SaveAs(fname);
    oXL.Visible = true;
    idTmr = window.setInterval("Cleanup();", 1);
  } else {
    tableToExcel(tableHeadid, tableBodyid, name, filename);
  }
};
let Cleanup = function () {
  window.clearInterval(idTmr);
  CollectGarbage();
};
let tableToExcel = function (tableHead, tableBody, name, filename) {
  var uri = "data:application/vnd.ms-excel;base64,",
    //Excel样式代码
    template =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
    'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
    "<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
    "</x:ExcelWorkbook></xml><![endif]-->" +
    ' <style type="text/css">' +
    ".excelTable  {" +
    "border-collapse:collapse;" +
    " border:thin solid #999; " +
    "}" +
    "   .excelTable  th {" +
    "   border: thin solid #999;" +
    "  padding:20px;" +
    "  text-align: center;" +
    "  border-top: thin solid #999;" +
    " background-color: #E6E6E6;" +
    " }" +
    " .excelTable  td{" +
    " border:thin solid #999;" +
    "  padding:2px 5px;" +
    "  text-align: center;" +
    " }</style>" +
    '</head><body ><table class="excelTable">{table}</table></body></html>',
    base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
  if (!tableHead.nodeType) tableHead = document.getElementById(tableHead);
  if (!tableBody.nodeType) tableBody = document.getElementById(tableBody);
  if (tableBody.children[0].children[0].children[0].innerHTML == "暂无数据") {
    tableBody.deleteRow(0)
  }
  var ctx = {
    worksheet: name || "Worksheet",
    table: tableHead.innerHTML + tableBody.innerHTML
  };
  document.getElementById("dlink").href =
    uri + base64(format(template, ctx));
  document.getElementById("dlink").download = filename;
  document.getElementById("dlink").click();
}
export default {
  exportExcel
}
