<template>
  <div class="account-bottom">
      <div class="all"  @click="selectAllMusic()">
        <span></span>
        <p>全部播放</p>
      </div>
      <div class="list">
        <ScrollView>
          <song :songs = "num === 0 ? selectFavorite : selectHistory"></song>
        </ScrollView>
      </div>
  </div>
</template>

<script>
import ScrollView from "../ScrollView";
import song from "../song";
import {mapGetters , mapActions,mapMutations} from 'vuex'
import {SET_SONG_DETAIL} from "../../store/mutations-type";
export default {
  name: "AccountBottom",
  components:{
    ScrollView,
    song
  },
  props:{
    num:{
      type:Number,
      default: 0,
      required: true
    }
  },
  computed:{
    ...mapGetters([
      'selectHistory',
      'selectFavorite'
    ])
  },
  methods:{
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setCutIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    selectAllMusic(){
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      // this.setCutIndex(0);
      let ids = [];
      if(this.num === 0 ){
        this.SET_SONG_DETAIL(this.selectFavorite)
      }else{
        // ids = this.selectHistory.map(function (item) {
        //   return item.id
        // })
        this.SET_SONG_DETAIL(this.selectHistory)
      }
      // this.setSongDetail(ids);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.account-bottom{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 100px;
  overflow: hidden;
  @include bg_sub_color();
  .all{
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 30px;
    @include border_color();
    span{
      display: inline-block;
      width: 46px;
      height: 46px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    p{
      @include font_color();
      @include font_size($font_medium_s);
    }
  }
  .list{
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 0;
  }
}
</style>
