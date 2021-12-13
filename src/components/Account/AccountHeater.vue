<template>
  <div id="home_heater" class="clearfix" @click="changeTheme">
    <div class="title fl">
      <div class="title-in">
        <ul>
          <li @click.stop="addActive(0)" :class="{'active' : isActive === 0 }">我喜欢的</li>
          <li @click.stop="addActive(1)" :class="{'active' : isActive === 1 }">最近听的</li>
        </ul>
      </div>
    </div>
    <div class="left fl" @click.stop="back"></div>
    <div class="right fl"></div>
  </div>
</template>

<script>
  export default {
    name: "Account-heater",
    data:function () {
      return {
        theme:['theme','theme1','theme2'],
        index: 0,
        isActive: 0
      }
    },
    methods:{
      changeTheme:function () {
        this.index++;
        if(this.index >= this.theme.length){
          this.index = 0;
        }
        document.documentElement.setAttribute("data-theme",this.theme[this.index]);
      },
      back () {
        window.history.back()
      },
      addActive(n){
        this.isActive = n ;
        this.$emit('selectNum' ,n);
      },
    },

  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/tools";
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
#home_heater{
  .left{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    //background-color: pink;
    margin-left: -100%;
    @include bg_img("../../assets/images/back")
  }
  .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    margin-left: -84px;
    //background-color: pink;
    @include bg_img("../../assets/images/more")
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
      @include no-wrap();
      ul{
        display: flex;
        justify-content: center;
        width: 300px;
        margin: 15px auto;
        border: 1px solid #FFFFFF;
        li{
          width: 150px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          @include font_size($font_medium);
          color: #FFFFFF;
          box-sizing: border-box;
          &.active{
            background-color: rgba(255,255,255,0.3);
          }
        }
      }
    }
  }
}
</style>
