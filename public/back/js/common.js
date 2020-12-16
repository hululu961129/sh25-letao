//进度条
$(document).ajaxStart(function () {
    NProgress.start();
//    在第一个ajax发送时候开启进度条

})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    //    在所有的ajax请求完成时关闭进度条

    },500)
})
//登录拦截功能
//这时候才证明不在登录页面才需要校验 地址栏中没有login。html
if(location.href.indexOf("login.html")===-1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){

            }
            if(info.error===400){
                location.href="login.html"
            }
        }
    })
}

//分类管理的切换功能
$('.nav .category').click(function(){
    $('.nav .child').stop().slideToggle();
})
//侧边栏切换功能
$('.icon-menu').click(function () {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");

})
//显示模态框
$('.icon-logout').click(function () {
    $('#logoutModal').modal('show');
})
//退出功能
$('#logoutBtn').click(function () {
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){
                location.href="login.html"
            }
        }
    })
})