$(function(){
    //登录功能
    //1，给登录按钮注册点击事件
    //2，获取用户名和密码
    //3，发送ajax请求，进行登录验证 分两种情况
    // 1登录成功 如果是从购物车页面拦截过来的 就还跳回到购物车页面
    //如果是直接反问的login。html页面的跳转到个人中心页面
    //2登录失败  提示用户
$('#loginBtn').click(function(){
//    获取用户名和密码
var username=$('#username').val().trim();
    var password=$('#password').val().trim();
    //非空校验
    if(username===""){
        mui.toast("请输入用户名");
        return;
    }
    if(password===""){
        mui.toast("请输入密码");
        return;
    }
    //发送请求
    $.ajax({
        type:"post",
        url:"/user/login",
        data:{
            username: username,
            password: password
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            //登录错误
            if(info.error===403){
                mui.toast("用户名或者密码错误");
            }
        //    登录成功
            // 1登录成功 如果是从购物车页面拦截过来的 就还跳回到购物车页面
            //如果是直接反问的login。html页面的跳转到个人中心页面
            if(info.success){
                if(location.search.indexOf("retUrl")>-1){
                    //    如果地址栏有returl 证明是从其他页面跳转过来的 因为后面带了retUrl
                    //    location.search 出来问号后面的参数
                    //"?retUrl=http://localhost:3000/front/product.html?productId=26"
                    var retUrl=location.search.replace("?retUrl=","");
                    location.href=retUrl;
                }
                else{
                    location.href="user.html";
                }
            }
        }

    })
  })
})