$(function () {
//   1 历史记录渲染。
//    var arr=["匡威","阿迪","耐克","特步"];
//    var jsonStr=JSON.stringify(arr);
//    localStorage.setItem("search_list",jsonStr);
//    从本地存取取出搜索历史取出来的是字符串 要转为数组，利用模板引擎进行渲染 还要把数组转为对象
//专门用于获取本地历史返回一个数组
    render();
    function getHistory(){
    var jsonStr=localStorage.getItem("search_list")||'[]';
    var arr=JSON.parse(jsonStr);
    return arr;
}
    //读取本地历史 根据数组渲染
    function  render(){
        var arr=getHistory();
        var htmlStr=template("searchTpl",{arr:arr});
        $('.lt_history').html(htmlStr);
    }

//    2.清空所有历史记录
$('.lt_history').on("click",".btn_empty",function(e){
    mui.confirm("你确认要清空历史记录吗？","温馨提示",["取消","确认"],function (e){
        if(e.index===1){
            localStorage.removeItem("search_list");
            render();
        }

    });

});
    //3点击删除单个历史
    $('.lt_history').on("click",".btn_delete",function(e){
        //将外层的this存在t hat中
        var that=this;
        mui.confirm("你确认要进行删除操作吗？","温馨提示",["取消","确认"],function (e){
            console.log(1111);
            if(e.index===1){
                var index=$(that).data('index');
                var arr=getHistory();
                arr.splice(index, 1);
                localStorage.setItem("search_list",JSON.stringify(arr));
                render();
            }
        });

    });

    //4点击搜索添加搜索历史
    $('.search_btn').click(function(){
        var key=$('.search_input').val().trim();
        console.log(key);
        if(key===""){
            mui.toast("请输入关键字");
            return;

        }
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
        render();
        $('.search_input').val("");
        location.href="searchList.html?key="+key;

    })



});