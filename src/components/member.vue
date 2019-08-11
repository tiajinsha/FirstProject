<template>
    <div>   
	      {{list.content}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },methods:{
    },created(){
        var tits=this.$route.query.tit;
        console.log(this.tits)
        var url=`http://api.tianapi.com/txapi/htmltext/?key=d171ec3c4755783de7dc5b00fed440ee&url=${tits}`
             this.$http.get(url).then(result => {
                this.list=result.body.newslist[0]
                console.log(this.list.title)
             })}
}
</script>
<style scoped>
    img{
        width:100%;
    }
</style>
