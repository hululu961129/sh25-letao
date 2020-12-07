$(function() {
    var currentPage = 1;
    var pageSize = 3;
    var picArr=[];
    //1.一进页面进行渲染
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("productTpl", info);
                $('tbody').html(htmlStr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),//向上取整
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    //2、点击添加商品按钮显示模态框
    $('#addBtn').click(function(){
        $('#addModal').modal("show");
        //3.发送ajax请求 获取全部的二级分类 渲染下拉列表
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
        })

});
    //3.给所有的下拉框的a添加点击事件
    $('.dropdown-menu').on("click","a",function(){
        var  txt=$(this).text();
        $('#dropdownText').text(txt);
        var id=$(this).data("id");
        $('[name="brandId"]').val(id);
    });
    //4/进行文件上传初始化
    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            var picObj=data.result;
            picArr.unshift(picObj);//添加在最前面 后面删的时候是删最后面的
            console.log(picArr);
            var picUrl=picObj.picAddr;
            $('#imgBox').prepend('<img src="'+picUrl+'" style="width:100px" alt="">')
            if(picArr.length>3){
            picArr.pop();//删除数组的最后一项
                $('#imgBox img:last-of-type').remove();

            }
        }
    })
});