<template>
    <div>
    <input type="file" @change="getFile($event)">
    <button @click="submitForm()">提交</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
              file:""
    }
  },methods:{
    getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
         submitForm(event){
            let formData = new FormData();
            formData.append('file', this.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$http.post('http://127.0.0.1:3000/upload',formData,config).then(function(res){
              if(res.status==200){
              console.log(res)
              }
            })
         }
  }
}
</script>
