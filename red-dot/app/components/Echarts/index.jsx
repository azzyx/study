import React from "react";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import worldJson from "./worldData";

const Echarts = () => {
  echarts.registerMap("world", worldJson);
  function randomData() {
    return Math.round(Math.random() * 300);
  }

  const geoCoordMap = {
    上海: [121.4648, 31.2891],
    尼日利亚: [-4.388361, 11.186148],
    美国洛杉矶: [-118.24311, 34.052713],
    香港邦泰: [114.195466, 22.282751],
    美国芝加哥: [-87.801833, 41.870975],
    加纳库马西: [-4.62829, 7.72415],
    英国曼彻斯特: [-1.657222, 51.886863],
    德国汉堡: [10.01959, 54.38474],
    哈萨克斯坦阿拉木图: [45.326912, 41.101891],
    俄罗斯伊尔库茨克: [89.116876, 67.757906],
    巴西: [-48.678945, -10.493623],
    埃及达米埃塔: [31.815593, 31.418032],
    西班牙巴塞罗纳: [2.175129, 41.385064],
    柬埔寨金边: [104.88659, 11.545469],
    意大利米兰: [9.189948, 45.46623],
    乌拉圭蒙得维的亚: [-56.162231, -34.901113],
    莫桑比克马普托: [32.608571, -25.893473],
    阿尔及利亚阿尔及尔: [3.054275, 36.753027],
    阿联酋迪拜: [55.269441, 25.204514],
    匈牙利布达佩斯: [17.108519, 48.179162],
    澳大利亚悉尼: [150.993137, -33.675509],
    美国加州: [-121.910642, 41.38028],
    澳大利亚墨尔本: [144.999416, -37.781726],
    墨西哥: [-99.094092, 19.365711],
    加拿大温哥华: [-123.023921, 49.311753],
  };
  const geitAwardCity = [
    [
      {
        name: "尼日利亚",
        value: randomData(),
      },
    ],
    [
      {
        name: "美国洛杉矶",
        value: randomData(),
      },
    ],
    [
      {
        name: "香港邦泰",
        value: randomData(),
      },
    ],
    [
      {
        name: "美国芝加哥",
        value: randomData(),
      },
    ],
    [
      {
        name: "加纳库马西",
        value: randomData(),
      },
    ],
    [
      {
        name: "英国曼彻斯特",
        value: randomData(),
      },
    ],
    [
      {
        name: "德国汉堡",
        value: randomData(),
      },
    ],
    [
      {
        name: "哈萨克斯坦阿拉木图",
        value: randomData(),
      },
    ],
    [
      {
        name: "俄罗斯伊尔库茨克",
        value: randomData(),
      },
    ],
    [
      {
        name: "巴西",
        value: randomData(),
      },
    ],
    [
      {
        name: "埃及达米埃塔",
        value: randomData(),
      },
    ],
    [
      {
        name: "西班牙巴塞罗纳",
        value: randomData(),
      },
    ],
    [
      {
        name: "柬埔寨金边",
        value: randomData(),
      },
    ],
    [
      {
        name: "意大利米兰",
        value: randomData(),
      },
    ],
    [
      {
        name: "乌拉圭蒙得维的亚",
        value: randomData(),
      },
    ],
    [
      {
        name: "莫桑比克马普托",
        value: randomData(),
      },
    ],
    [
      {
        name: "阿尔及利亚阿尔及尔",
        value: randomData(),
      },
    ],
    [
      {
        name: "阿联酋迪拜",
        value: randomData(),
      },
    ],
    [
      {
        name: "匈牙利布达佩斯",
        value: randomData(),
      },
    ],
    [
      {
        name: "澳大利亚悉尼",
        value: randomData(),
      },
    ],
    [
      {
        name: "美国加州",
        value: randomData(),
      },
    ],
    [
      {
        name: "澳大利亚墨尔本",
        value: randomData(),
      },
    ],
    [
      {
        name: "墨西哥",
        value: randomData(),
      },
    ],
    [
      {
        name: "加拿大温哥华",
        value: randomData(),
      },
    ],
  ];

  const options = () => {
    return {
      backgroundColor: "#000",
      tooltip: {
        trigger: "item",
        backgroundColor: "#fd4f50",
        borderColor: "#FFFFCC",
        showDelay: 0,
        hideDelay: 2,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: function (params) {
          console.log(params);
          let res = "";
          const { name, value } = params;
          res = `<span style='color:#fff;'>${name}</span><br/><span style='color:#fff;'>数据：${value[2]}</span>`;
          return res;
        },
      },
      visualMap: {
        // 图例值控制
        show: true,
        type: "piecewise",
        textStyle: {
          color: "white",
        },
        pieces: [
          {
            max: 80,
            color: "red",
          },
          {
            min: 80,
            max: 120,
            color: "yellow",
          },
          {
            min: 120,
            color: "green",
          },
        ],
        calculable: true,
      },
      geo: {
        map: "world",
        show: true,
        label: {
          show: false,
          color: '#fff',
          formatter: (params) => {
            // console.log("aaaaaaa", params);
          },
        },
        roam: true, // 是否允许缩放
        layoutCenter: ["50%", "50%"], // 地图位置
        layoutSize: "120%",
        itemStyle: {
          show: "true",
          color: "#04284e", // 地图背景色
          borderColor: "#5bc1c9", // 省市边界线
        },
        emphasis: {
          show: "true",
          color: "rgba(37, 43, 61, .5)",
        },
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            // 涟漪特效
            period: 4, // 动画时间，值越小速度越快
            brushType: "stroke", // 波纹绘制方式 stroke, fill
            scale: 4, // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: "right", // 显示位置
              offset: [5, 0], // 偏移设置
              formatter: "{b}", // 圆环显示文字
            },
            emphasis: {
              show: true,
              color: "#FF6A6A",
            },
          },
          symbol: "circle",
          symbolSize: function (val) {
            return 8 + val[2] / 1000; //圆环大小
          },
          itemStyle: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
              color: "#FF6A6A",
            },
          },
          data: geitAwardCity.map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
            };
          }),
        },
        // 举办红点奖的地点
        {
          type: "scatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: "stroke",
            scale: 4,
          },
          label: {
            normal: {
              show: true,
              color: "red",
              position: "right",
              formatter: "{b}",
            },
            emphasis: {
              show: true,
              color: "#FF6A6A",
            },
          },
          symbol: "pin",
          symbolSize: 30,
          itemStyle: {
            normal: {
              show: true,
              color: "red",
            },
            emphasis: {
              show: true,
              color: "#FF6A6A",
            },
          },
          data: [
            {
              name: "上海",
              value: geoCoordMap["上海"].concat([100]),
              visualMap: false,
            },
          ],
        },
      ],
    };
  };
  return <ReactEcharts option={options()} style={{ height: "600px" }} />;
};

export default Echarts;
