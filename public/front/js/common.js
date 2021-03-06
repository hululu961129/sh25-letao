
//轮播图初始化，
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
});
//区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: true//是否显示滚动条
});
//方法作用，专门用于解析地址栏的参数
//传递地址栏参数的健名，就可以返回对应的值

function getSearch(k){
    var str=location.search;
    str=decodeURI(str);
    str=str.slice(1);
    var arr=str.split("&");
    var obj={};
    arr.forEach(function(v,i){
        var key= v.split("=")[0];
        var value= v.split("=")[1];
        obj[key]=value;
    })
    return obj[k];
}

