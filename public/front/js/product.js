$(function(){
//功能1；获取地址栏的id 发送ajax请求 进行商品渲染
var productId=getSearch("productId");
    console.log(productId);
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("productTpl",info);
            $('.lt_main .mui-scroll').html(htmlStr);
        //    手动轮播初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        //    手动初始化数字框
            mui('.mui-numbox').numbox()
        }


    })
    //功能二：让尺码可以选中通过事件委托
    $('.lt_main').on("click",".lt_size span", function () {
        $(this).addClass('current').siblings().removeClass('current');
    });
//    功能三 加入购物车功能
    $('#addCart').click(function(){
        var size=$('.lt_size span.current').text();
        console.log(size);
        //代表是空的
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        var num=$('.mui-numbox-input').val();
        console.log(num);
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                num:num,
                size:size
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                //1.未登录情况
                //加入购物车操作需要登录 等于400证明没登录
                if(info.error===400){
                    //    登录完成之后要返回上一页继续加入购物车
                    location.href="login.html?retUrl="+location.href;
                }

                //2.登录的情况
                    if(info.success){
                        mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                            if(e.index===0){
                            //    说明点击的是去购物车
                                location.href="cart.html";
                            }
                        });
                    }
            }
        })
    })
});
