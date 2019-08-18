<template>
    <div>
        <video  controls  :src=tits></video>
    </div>
</template>
<script>
  export default {
      data(){
          return{
              tits:""
          }
      },
      created(){
          this.tits=this.$route.query.tit;
          console.log(tits)
      }
  }
</script>
<style scoped>
    video{
        margin-top:30px;
        width:100%;
    }
</style>