<template>
  <div id="home_heater" class="clearfix">
    <div class="title fl">
      <div class="title-in">
        <h3>{{this.selectSong.name}}</h3>
        <p>{{this.selectSong.songer}}</p>
      </div>
    </div>
    <div class="left fl" @click="hidderNormalPlay"></div>
    <div class="right fl"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "Home-heater",
    data:function () {
      return {
        theme:['theme','theme1','theme2'],
        index: 0
      }
    },
    methods:{
      ...mapActions([
        'setFullScreen',
        'setMiniPlayer'
      ]),
      hidderNormalPlay:function (){
        this.setFullScreen(false);
        this.setMiniPlayer(true);
      }
    },
    computed:{
      ...mapGetters([
        'selectSong'
      ])
    }
    // props: {
    //   title: {
    //     type: String,
    //     default: '',
    //     required: true
    //   }
    // }
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
    @include bg_img("../../assets/images/down")
  }
  .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    margin-left: -84px;
    //background-color: pink;
    //@include bg_img("../../assets/images/more")
  }
  .title{
    width: 100%;
    height: 100px;
    .title-in{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 0 84px;
      padding: 10px 0;
      box-sizing: border-box;
      color: #FFF;
      text-align: center;
      @include font_size($font_medium);
      @include no-wrap();
      p{
        opacity: 0.6;
      }
    }
  }
}
</style>
