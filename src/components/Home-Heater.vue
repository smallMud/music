<template>
  <div id="home_heater" class="clearfix" @click="changeTheme">
    <div class="title fl">
      <div class="title-in">MUD音乐</div>
    </div>
    <div class="left fl"></div>
    <div class="right fl" @click.stop="account"></div>
  </div>
</template>

<script>
  export default {
    name: "Home-heater",
    data:function () {
      return {
        theme:['theme','theme1','theme2'],
        index: 0
      }
    },
    methods:{
      account(){
        this.$router.push('/account');
      },
      changeTheme:function () {
        this.index++;
        if(this.index >= this.theme.length){
          this.index = 0;
        }
        document.documentElement.setAttribute("data-theme",this.theme[this.index]);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./../assets/css/tools";
  @import "./../assets/css/mixin";
  @import "./../assets/css/variable";
#home_heater{
  .left{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    //background-color: pink;
    margin-left: -100%;
    @include bg_img("./../assets/images/logo")
  }
  .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    margin-left: -84px;
    //background-color: pink;
    @include bg_img("./../assets/images/account")
  }
  .title{
    width: 100%;
    height: 100px;
    @include bg_color();
    .title-in{
      margin: 0 84px;
      color: #FFF;
      text-align: center;
      line-height: 100px;
      @include font_size($font_samll);
    }
  }
}
</style>
