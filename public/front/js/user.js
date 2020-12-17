$(function(){
    //一、一进入页面，请求当前用户数据，进行页面渲染
    //1、第一种情况 用户已经登录 后台返回用户数据，通过模板渲染
    //2，用户没登录，后台返回error 当前用户未登录拦截到登录页
    //二、退出功能
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.erroe===400){
                location.href="login.html";
                return;
            }
            var htmlStr=template("userTpl",info);
            $('#userInfo').html(htmlStr);
        }
    })
            //二、退出功能
        $('.logout').click(function(){
            $.ajax({
                type:"get",
                url:"/user/logout",
                dataType:"json",
                success:function(info){
                    console.log(info);
                    if(info.success){
                    //    说明退出成功
                        location.href="login.html";
                    }
                }
            })
        })
})