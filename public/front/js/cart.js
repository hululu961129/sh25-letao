$(function(){
function render(){
    //1.一进入页面 发送请求获取购物车数据
    //1.用户未登录，后台返回error拦截到登录页
    //2用户已经登录，后台返回购物车数据 进行页面渲染
//    太快了 加一个定时器 5秒之后再执行
setTimeout(function(){
    $.ajax({
        type:"get",
        url:"/cart/queryCart",
        datatype:"json",
        success:function(info){
            console.log(info);
            if(info.error===400){
                //    说明未登录
                location.href="login.html";
                return;
            }
            //登录就可以模板引擎渲染
            var htmlStr=template("cartTpl",{arr:info});
            $('.lt_main .mui-table-view').html(htmlStr);
            //    渲染完成 要关闭下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();


        }

    })
},500)
}
    //2配置下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback :function(){
                    render();
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
//    三
// 1删除功能 给删除按钮注册点击事件 事件委托  同时tap进行注册
//   2 获取在按钮中存储的id
//    3发送请求执行删除操作
//    4 页面重新渲染
//
    $('.lt_main').on("tap",".btn_del",function(){
        var id=$(this).data("id");
        console.log(id);
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{
                id:[id]
            //    后台要求传 的id是数组形式
            },
            dataType:"json",
            success:function (info){
            console.log(info);
                if(info.success){
                    //render();也可以调用一次下拉刷新
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }


        }
        })
    })
});