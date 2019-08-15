<script>
/* 登陆接口 */
const login="http://106.12.179.113:3000/"
const homeUrl="http://127.0.0.1:3000/"
/* 全局新闻api接口 */
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
    homeUrl
}
</script>