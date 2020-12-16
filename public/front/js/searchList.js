$(function(){
    var currentPage=1;//当前页
    var pageSize=2;//每页多少条
    //以前的render方法是发送请求 页面渲染 现在是发送请求获取数据
    function  render(callback){
        //根据参数是否有高亮的a进行参数的添加
        //显示加载中的效果
        //$('.lt_product').html('<div class="loading"></div>');
        //三个必传的参数
        var paramsObj={};
        paramsObj.proName=$('.search_input').val();
        paramsObj.page=currentPage;
        paramsObj.pageSize=pageSize;
        //两个可选的参数price num
        // 根据是否有高亮的a决定的 如果有高亮的a传price或者num

        var $current=$('.lt_sort a.current');//获取高亮的a
        if($current.length===1){//如果是1 就证明有高亮的a需要排序
            console.log("需要排序");
        }
        console.log(paramsObj);
        var sortName=$current.data("type");//给后台传的健 从自定义属性中获取 这个可以获取到price
        var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;//给后台传排序的值 根据箭头方向判断 1升序 2 降序
        paramsObj[sortName]=sortValue;//将参数拼接到对象中 会将变量进行解析最后得到price给对象加这个属性

        //发送请求渲染
        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:paramsObj,//传在这里
                dataType:"json",
                success:function(info){
                    console.log(info);
                 callback&&callback(info);
                //如果callback存在就进行调用 真正拿到数据后执行的操作通过callbac函数传递近来了
                }
            })
        },1000)
    }
    //功能1：获取地址栏参数复制给input
    //解析地址栏参数获取关键字
    var key=getSearch("key");
    console.log(key);
//    //将地址栏参数赋值给input
    $('.search_input').val(key);
    //render();
    mui.init({
        //  配置pullRefresh
        pullRefresh : {
            //对哪个区域进行下拉刷新一般会指定区域滚动的容器为下拉刷新的容器
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                //height:50,//可选,默认50.触发下拉刷新拖动距离,超过50 就可以下拉刷新
                auto: true,//可选,一进入页面就自动下拉刷新一次 默认false.首次加载自动下拉刷新一次
                //contentdown : "下拉可以刷新",//可选，是文本  在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                //contentover : "释放立即刷新",//可选，是文本在释放可刷新状态时，下拉刷新控件上显示的标题内容
                //contentrefresh : "正在刷新...",//可选，是文本正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    console.log("发送ajax请求进行页面渲染");
                    //拿到数据需要执行的方法是不一样的 所以通过回调函数的方式进行传进去
                    //加载第一页的数据
                    currentPage=1;
                    render(function(info){
                        var htmlStr=template("productTpl",info);
                        $('.lt_product').html(htmlStr);
                        //ajax回来之后结束下拉刷新让内容回滚顶部
                        // api文档做了更新 mui文档还没更新上
                        // 要使用原型上的这个方法来结束结束转雪花进度条的“正在加载...”过程
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    //    第一页数据被重新加载之后，又有数据可以进行上拉加载了 需要启用上拉加载 这时候字幕显示上拉加载更多
                       mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                    });

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },


            //配置上拉加载
            up : {
                //height:50,//可选.默认50.触发上拉加载拖动距离
                //auto:true,//可选,默认false.自动上拉加载一次
                //contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                //contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    console.log("加载了");
                    //需要加载下页的数据所以要更新当前页
                    //配置下拉刷新和上拉加载注意点：
                    //下拉刷新是对原有数据的覆盖，执行的是html方法
                    //上拉加载是在原有结构的基础上进行追加，追加到后面，执行的是appent方法；
                    currentPage++;
                    console.log(currentPage);
                    render(function (info) {
                            var htmlStr=template("productTpl",info);
                            $('.lt_product').append(htmlStr);
                    //        在原有的基础上进行追加
                    //    当数据回来之后 需要结束上拉加载
                        console.log(1111);
                        if(info.data.length===0){
                            //endPulldownToRefresh()传true会显示没有更多数据提示语句 传false还有更多数据会一直可以加载

                            //没有更多数据了 显示提示语句 会默认自动禁用上拉加载 防止发送无效的ajax
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }
                        else{
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        //还有数据 正常结束上拉加载
                        }

                    });
                }
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 功能2: 点击搜索按钮, 实现搜索功能
    $('.search_btn').click(function(){
        var key=$('.search_input').val().trim();
        console.log(key);
        if(key===""){
            mui.toast("请输入关键字");
            return;


        }
        //搜索功能 执行一次下拉刷新即可，在下拉刷新回调中，会进行页面渲染
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        //获取数组
        var arr=getHistory();
        // 1. 不要有重复项, 如果有, 移除之前的, 将最新的添加到数组最前面
        var index = arr.indexOf( key );
        if ( index > -1 ) {
            // 说明在数组中 key 已存在
            arr.splice( index, 1 );
        }

        if(arr.length>=10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify(arr));
        //render();
        $('.search_input').val("");
        location.href="searchList.html?key="+key;

    })

    //3：添加排序功能
   // 点击排序，切换高亮按钮
   // 获取搜索框的值并且发送请求
   // $('.lt_sort a[data-type]'给是所有拥有data-type属性的按钮添加点击事件 这样其他的就不能点了
    // mui 认为在下拉刷新和上拉加载容器中, 使用 click 会有 300ms延迟的话, 性能方面不足
    // mui禁用了默认的 a 标签的 click 事件, 需要绑定 tap 事件
    // http://ask.dcloud.net.cn/question/8646 文档说明地址
$('.lt_sort a[data-type]').on("tap",function(){
    if($(this).hasClass('current')){
        //有current类 切换箭头切换类名
        $(this).find('i').toggleClass("fa fa-angle-down").toggleClass("fa fa-angle-up")
    }
    else{
        //没有类 就添加上类并且排他
        $(this).addClass("current").siblings().removeClass("current");
    }
   //执行下拉刷新即可
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
 });
    //功能4，点击每个商品实现页面跳转，注册点击事件 通过事件委托注册tap事件
    $('.lt_product').on("tap","a",function(){
        var id=$(this).data("id");
        location.href="product.html?productId="+id;
    });


});