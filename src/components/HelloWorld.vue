<template>
  <div>


  <div style="clear:both;"></div>
  <div class="choosegrade">
    <!--<span @click="clickJump">fsdfasdfsadfasdf</span>-->

  </div>
  </div>

</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      count:"",//倒计时
    }
  },
  mounted(){
    this.clickJump()
  },
  methods:{
    clickJump(){
      const timejump = 5;
      if(!this.timer){
        this.count = timejump ;
        this.show = false;
        this.timer = setInterval(()=>{
          if(this.count > 0 && this.count <= timejump ){
            this.count--;
          }else{
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            this.$router.push({path: '/jinchuSchool'});
          }
        },100)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../common/css/main.less";
</style>
