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
        //手动将隐藏域状态给成valid 其他的都可以通过配置图标校验修改

        $('#form').data("bootstrapValidator").updateStatus("brandId","VALID");
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
            $('#imgBox').prepend('<img src="'+picUrl+'" style="width:100px" alt="">');
            if(picArr.length>3){
            picArr.pop();//删除数组的最后一项
                $('#imgBox img:last-of-type').remove();

            }
            if(picArr.length===3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID");
            }
        }
    });
//    5、表单校验初始化
    $('#form').bootstrapValidator({
        excluded:[],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandId: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            //商品库存必须是非零开头的数
            num: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    //正则校验\d表示0到9的数字
                    //    *表示出现0或者多次
                    //+表示出现1或者多次
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    //正则校验\d表示0到9的数字
                    //    *表示出现0或者多次
                    //+表示出现1或者多次
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码要求必须是××-××的格式，××为两位数字'
                    }
                }
            },
            oldPrice: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                  //校验规则
                  validators: {
                      notEmpty: {
                          message: "请上传3张图片"
                      }
                  }
              }



        }
    });
    //6、注册表单校验成功事件，阻止默认的提交，通过ajax提交
    $('#form').on("success.form.bv",function(e){
        e.preventDefault();
        var paramsStr=$('#form').serialize();
        paramsStr+="&picArr="+JSON.stringify(picArr);
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramsStr,
            dataType:"json",
            success: function (info) {
                console.log(info);
                if(info.success){
                    $('#addModal').modal("hide");
                    currentPage=1;
                    render();
                //    重置表单内容和状态
                    $('#form').data("bootstrapValidator").resetForm(true);

                //    下拉按钮文本和图片不是表单元素，需要手动重置
                    $('#dropdownText').text("请选择二级分类");
                    $('#imgBox img').remove();
                    picArr=[];

                }


            }
        })
    })


});
