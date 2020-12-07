$(function () {
    var currentPage=1;
    var pageSize=5;
    //一进页面就渲染
    render();
    function render(){
        $.ajax({
            type:"get",
            url:" /category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                //console.log(info);
                //模板引擎渲染
                htmlStr=template("secondTpl",info);
                $('tbody').html(htmlStr);
                //分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage=page;
                        render();
                    }

                })
            }
        })
    }

//点击添加按钮显示模态框

    $('#addBtn').click(function(){
    $('#addModal').modal("show");
//        显示模态框就立即发送ajax请求，请求一级分类的全部数据 渲染下拉列表
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("drapdownTpl",info);
            $('.dropdown-menu').html(htmlStr);
        }

    })
    })
//    给下拉列表的a注册点击事件，让下拉列表可以选择 通过事件委托注册点击事件
    $('.dropdown-menu').on("click","a",function(){
        console.log(this);
        //获取a的文本赋值给
        var txt=$(this).text();
        console.log(txt);
        $('.dropdownText').text(txt);
    //    获取a的一级分类的id
        var id=$(this).data("id");
        $('[name="categoryId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID")
    })
//    调用filupload方式完成文件上传初始化
    $('#fileupload').fileupload({
        dataType:"json",
        done: function (e,data) {
            console.log(data);
            var result=data.result;
            var picUrl=result.picAddr;
            $('#imgBox img').attr("src",picUrl);
        //    设置图片地址给隐藏域用于提交
            $('[name="brandLogo"]').val(picUrl);
            //更新隐藏域的校验状态为成功
            $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
    })
    //表单校验
    // 5. 配置表单校验
    $('#form').bootstrapValidator({

        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });
//    阻止默认的提交利用ajax提交
$('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
        type:"post",
        url:"/category/addSecondCategory",
        data:$('#form').serialize(),
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){
                $('#addModal').modal("hide");
                currentPage=1;
                render();
                //由于下拉框喝图片不是表单元素，需要手动重置

                $('#form').data("bootstrapValidator").resetForm(true);
                $('#dropdownText').text("请选择一级分类");
                $('#imgBox img').attr("src","./images/none.png");
            }
        }

    })

})


})