import React from "react";
import ReactDOM from "react-dom";
import { Router, Echarts } from "../../../components/index";
import "../../../common/css/common.css";
import "./index.css";

const Concenpt = () => {
  return (
    <>
      <div>
        <h5 className="title">介绍</h5>
        <article className="title">
          红点奖，源于<strong>德国</strong>
          的艾森，是一个工业设计大奖，也是世界上知名设计竞赛中最大最有影响的竞赛。
        </article>
      </div>
      <div>
        <h5 className="content">背景</h5>
        <article className="content">
          1955年，欧洲最富声望的著名设计协会(Design Zentrum Nordrhein
          Westfalen)在德国城市埃森(Essen)设立的<strong>红点奖</strong>
          ，多年为无数企业颁发了享有盛誉的设计大奖。
        </article>
        <article className="content">
          以"
          <strong>
            促进<span className="text-green">环境</span>和
            <span className="text-red">人类</span>和谐的设计
          </strong>
          "为理念的红点奖，致力于将获奖的设计概念转化为商品，为获奖创意和商业化合作搭桥牵线。
          而其竞赛项目组成部分分别是：
          <strong>产品设计</strong>、<strong>传播设计</strong>和
          <strong>概念设计</strong>。
        </article>
      </div>
    </>
  );
};

const Index = () => {
  return (
    <div className="main">
      <Concenpt />
      <Echarts />
      <Router />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
