$(function () {
    //一进入页面就发送请求
    var currentPage=1;
    var pageSize=5;
    var currentId;
    var isDelete;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                var htmlStr=template('tpl',info);
                $('tbody').html(htmlStr);

                //    分页
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //size:"large",
                    //    添加页码点击事件
                    onPageClicked: function (a,b,c,page) {
                        console.log(page);
                        currentPage=page;
                        render();
                    }

                })
            }

        })
    }
    //启用禁用按钮点击显示模态框
    $('tbody').on('click','.btn', function () {
        console.log("ehhah");
        $('#userModal').modal('show');
         currentId=$(this).parent().data("id");
        isDelete=$(this).hasClass("btn-danger")?0:1;
        console.log($(this).parent().data("id"));
        console.log(currentId);

    })
    $('#submitBtn').click(function(){
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:"json",
            success: function (info) {
                console.log(info);
                if(info.success){
                    $('#userModal').modal("hide");
                    render();
                }

            }
        })

    })


})