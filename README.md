#基于vue脚手架的移动端聚合网站
=====
示例网站:http://106.12.179.113
###目录介绍
===
  1. src项目代码
    * assets-静态文件
    * components-子组件
    * lib-mui
    * Storage-模块(用于每次保存登陆成功账号)
    * data.vue 全局api接口
```
    /* 登陆接口 */
  const login="http://106.12.179.113:3000/"
  //const login="http://127.0.0.1:3000/"
  const key="d171ec3c4755783de7dc5b00fed440ee"
  //游戏
  const Gameurl=`http://api.tianapi.com/ai/?key=${key}&num=10&page=`
  //it
  const Iturl=`http://api.tianapi.com/it/?key=${key}&num=10&page=`
  //汽车
  const Carurl=`http://api.tianapi.com/auto/?key=${key}&num=10&page=`
  //国际
  const Guourl=`http://api.tianapi.com/world/?key=${key}&num=10&page=`
  //新闻详情
  const Titleurl=`http://api.tianapi.com/txapi/htmltext/?key=${key}&url=`
  export default {
    Gameurl,
    Iturl,
    Carurl,
    Guourl,
    Titleurl,
    login,
}
```
###    组件切换动画
```
     .v-enter{
     opacity: 0;
     transform: translateX(100%);
   }
      .v-leave-to{
     opacity: 0;
     transform: translateX(-100%);
     position: absolute;
   }
   .v-enter-active, 
   .v-leave-active{
     transition: all 0.5s ease;
   }
```
```
首页：
## 安装依赖
```
npm install
```
### 运行
```
npm run serve
```
### 打包
```
npm run build
```


