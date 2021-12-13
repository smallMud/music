<template>
  <div class="player">
    <NormalPlay v-show="this.selectFullScreen" :total="total" :currentTime="currentTime"></NormalPlay>
<!--    <NormalPlay v-show="true"></NormalPlay>-->
    <MiniPlayer @ListPlay="ListPlay" v-show="this.selectMiniPlayer"></MiniPlayer>
<!--    <MiniPlayer @ListPlay="ListPlay" v-show="true"></MiniPlayer>-->
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="this.selectSong.url" ref="audio"  @timeupdate="timeupdate" @ended="audioEnd"></audio>
  </div>
</template>

<script>
import NormalPlay from "../components/Play/NormalPlay";
import MiniPlayer from "../components/Play/MiniPlayer";
import ListPlayer from "../components/Play/ListPlayer";
import { mapGetters ,mapActions} from 'vuex'
import modeType from "../store/modeType";
import {getRandomIntInclusive} from '../tools/tools'
export default {
  name: "Player",
 components:{
   NormalPlay,
   MiniPlayer,
   ListPlayer
 },
  methods:{
    ...mapActions([
      "setCutIndex",
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    ListPlay:function (){
      this.$refs.listPlayer.hadder();
    },
    timeupdate(e){
      this.currentTime = e.target.currentTime
    },
    audioEnd(){
      if(this.selectModeType === modeType.loop){
        this.setCutIndex(this.selectcurrentIndex + 1);
      }else if(this.selectModeType === modeType.one){
        this.$refs.audio.play();
      }else if(this.selectModeType === modeType.random){
        let index = getRandomIntInclusive(0, this.selectSongs.length - 1)
        this.setCutIndex(index)
      }
    },

  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'selectFullScreen',
      'selectMiniPlayer',
      "selectSong",
      'selectIsPlaying',
      'selectcurrentIndex',
      'selectCurTime',
      'selectModeType',
      'selectSongs',
      'selectFavorite',
      'selectHistory'
      // ...
    ])
  },
  watch:{
    selectIsPlaying(newValue ,oldValue){
      if(newValue){
        this.setHistorySong(this.selectSong);
        window.localStorage.setItem('history',JSON.stringify(this.selectHistory));
        this.$refs.audio.play();
      }else{
        this.$refs.audio.pause();
      }
    },
    selectcurrentIndex(){
      this.$refs.audio.ondurationchange = () => {
        if(this.selectIsPlaying ){
          this.setHistorySong(this.selectSong);
          window.localStorage.setItem('history',JSON.stringify(this.selectHistory));
          this.$refs.audio.play();
        }else{
          this.$refs.audio.pause();
        }
      }
    },
    selectCurTime(newValue, oldValue){
      this.$refs.audio.currentTime = newValue;
    },
    selectFavorite(newValue, oldValue){
      window.localStorage.setItem("favorite",JSON.stringify(newValue));
    }
  },
  created() {
    let list = JSON.parse(window.localStorage.getItem('favorite'));
    if (list === null) { return}
    this.setFavoriteList(list);

    let historyList = JSON.parse(window.localStorage.getItem('history'));
    if (historyList === null) { return}
    this.setHistoryList(historyList);
    // console.log(this.selectHistory);
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
        this.total = this.$refs.audio.duration
    }
  },
  data(){
    return{
      total:0,
      currentTime: 0
    }
  }
}
</script>

<style scoped lang="scss">
.player{

}
</style>
