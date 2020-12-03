$(function(){
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        //图例
        legend: {
            data:['人数','销量']
        },
        //x轴的数据，y轴不推荐写东西，根据数据自动生成刻度
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        //x轴的整个数据 name是跟图例对应起来的 type bar就表示柱状图
        //line是折线图  pie是饼图

        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 400, 1000, 700,400, 600]
        },{
        name: '销量',
            type: 'bar',
            data: [1500, 700, 400, 550, 400,700]
    }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            //主标题
            text: '热门品牌销售',
            subtext: '2018年12月',//副标题
            left: 'center',//放在中间
            textStyle:{//标题的样式 颜色字体大小
                color:"red",
                fontSize:"25"
            }
        },
        //提示框组件 鼠标悬停的时候会出现内容
        tooltip: {
            trigger: 'item',
            //配置 提示框的内容
            //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        //图例
        legend: {
            //设置对齐方式
            orient: 'vertical',//垂直 horizontal水平
            left: 'left',//居左边
            data: ['耐克', '阿迪', '老北京', '阿迪王', '老奶奶']
        },
        //系列列表
        series: [
            {
                name: '热门品牌',//鼠标移上去会出现的文字
                type: 'pie',//饼图
                radius: '55%',//直径 园的大小
                center: ['50%', '60%'],//圆心位置
                data: [
                    {value: 335, name: '耐克'},
                    {value: 310, name: '阿迪'},
                    {value: 234, name: '老北京'},
                    {value: 135, name: '阿迪王'},
                    {value: 1548, name: '老奶奶'}
                ],
                //控制额外的阴影样式效果
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);
})