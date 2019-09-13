<template>
    <div>
        <main>
            <header style="text-align:center;">
              <h6 class="user-count">0</h6>
              <h6>聊天</h6>
            </header>
      
            <section class="chat">
              <p><strong>Pepito</strong>: Hey everyone!</p>
              <p><strong>时日</strong>:撒大苏打</p>
            </section>
      
            <form>
              <input type="text" placeholder="内容" />
              <button @click="clickedButton" ref="add()">发送</button>
            </form>
        </main>    
    </div>
</template>
<script>
export default {
data(){
   return{

   }
},
methods:{
    clickedButton(val){
    }
}
}
</script>
<style scoped>
    * {
    box-sizing: border-box;
    transition: all .3s ease;
    color: black;
  } 

 html, body {
    background: #eee;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  main {
    width: calc(100% - 20px);
    max-width: 500px;
    margin: 10px auto;
    font-family: Helvetica, Arial, Sans, sans-serif;
  }
  
  h6, .user-count {
    margin: 0;
    padding: 7px 0;
    font-size: 22px;
  }
  
  .user-count {
    float: right;
  }
  
  .chat {
    content: '';
    width: 100%;
    height: calc(90vh - 165px);
    background: white;
    padding: 5px 10px;
    overflow: hidden;
    overflow-y:auto;
  }
  
  .chat p {
    margin: 0 0 5px 0;
  }
  
  input, button {
    width: 100%;
    font: inherit;
    background: #fff;
    border: none;
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 15px;
  }
  
  button:hover {
    cursor: pointer;
    background: #ddd;
  }
  
  @media all and (min-width: 500px) {
    .chat {
      height: calc(100vh - 140px);
    }
    input {
      width: calc(100% - 160px);
    }
    button {
      float: right;
      width: 150px;
    }
  }     
</style>
