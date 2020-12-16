$(function(){
    //解析地址栏参数获取关键字
    //var key=getSearch("key");
    //console.log(key);
    ////将地址栏参数赋值给input
    //$('.search_input').val(key);
    //render();
    //点击搜索按钮重新发送请求
    //$('.search_btn').click(function(){
    //    render();
    //});
    // 点击排序，切换高亮按钮
    // 获取搜索框的值并且发送请求
    //$('.lt_sort a[data-type]').click(function(){
    //    if($(this).hasClass('current')){
    //        $(this).find('i').toggleClass("fa fa-angle-down").toggleClass("fa fa-angle-up")
    //    }
    //    else{
    //        $(this).addClass("current").siblings().removeClass("current");
    //    }
    //    render();
    //});
    function  render(){
        //$('.lt_product').html('<div class="loading"></div>');
        var paramsObj={};
        paramsObj.proName=$('.search_input').val();
        paramsObj.page=1;
        paramsObj.pageSize=100;
        var $current=$('.lt_sort a.current');
        if($current.length===1){
            console.log("需要排序");
        }
        console.log(paramsObj);
        var sortName=$current.data("type");
        var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
        paramsObj[sortName]=sortValue;
        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:paramsObj,
                dataType:"json",
                success:function(info){
                    console.log(info);
                    var htmlStr=template("productTpl",info);
                    $('.lt_product').html(htmlStr);

                }
            })
        },1000)
    }
});