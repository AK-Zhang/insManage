import "../libs/jquery.min"
export default {
    tabs:$('#agent-tabs > li').click(function () {
      var index=$("#agent-tabs > li").index(this);
      console.log(index)
      $(this).addClass('layui-this').siblings().removeClass('layui-this');
      $('.subagent').css('display','none')
      $('.subagent:eq('+index+')').css('display','block')
    })
}
