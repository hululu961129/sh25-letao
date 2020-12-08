$(function(){
    //渲染一级分类
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("leftTpl",info);
            $('.lt_category_left ul').html(htmlStr);
            //调用方法渲染 对应的id的二级分类 默认渲染第一个一级分类对应的二级分类
            renderById(info.rows[0].id);
        }
    });
//    添加一级分类的切换效果 （二级联动）
    $('.lt_category_left ul').on("click","a",function(){
        //切换效果 给自己加上current类 移除其他的
        //$(this).addClass("current").parent().siblings().find("a").removeClass("current");
        $('.lt_category_left ul a').removeClass("current");//排他
        $(this).addClass("current");
        //2、渲染二级分类
        var id=$(this).data("id");
        renderById(id)
    });
//根据一级分类的id 完成二级分类的渲染
    function renderById(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("rightTpl",info);
                $('.lt_category_right ul').html(htmlStr);
            }
        })
    }
//

});