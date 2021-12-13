<template>
  <div class="play-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click="processClick" ref="progressBar">
          <div class="progress-line" ref="progressLine">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="bottom-controll">
        <div class="mode loop" ref="mode" @click="isModeType"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="isplaying" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite(selectSong)" :class="{'active': isFavorite(selectSong)}"></div>
      </div>
  </div>
</template>

<script>
import { mapGetters ,mapActions} from 'vuex'
import modeType from "../../store/modeType";
import { formartTime } from '../../tools/tools'
export default {
  name: "PlayBottom",
  data:function (){
    return{
      a:false
    }
  },
  props:{
    total:{
      type:Number,
      default: 0,
      required: true
    },
    currentTime:{
      type:Number,
      default: 0,
      required: true
    },
  },
  methods:{
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCutIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    isplaying:function () {
      this.setIsPlaying(!this.selectIsPlaying);
    },
    isModeType:function () {
      if(this.selectModeType === modeType.loop){
        this.setModeType(modeType.one);
      }else if(this.selectModeType === modeType.one){
        this.setModeType(modeType.random);
      }else if(this.selectModeType === modeType.random){
        this.setModeType(modeType.loop);
      }
    },
    prev(){
      this.setCutIndex(this.selectcurrentIndex - 1);
    },
    next(){
      this.setCutIndex(this.selectcurrentIndex + 1);
    },
    processClick(e){
      let OffsetL = this.$refs.progressBar.offsetLeft;
      let PageX = e.pageX;
      let clickX = PageX - OffsetL
      let processWidth = this.$refs.progressBar.offsetWidth
      let value = clickX / processWidth
      this.$refs.progressLine.style.width = value * 100 + '%';

      let time = this.total * value;
      // console.log(time);
      this.setCurrentTime(time);
    },
    favorite(song){
      this.setFavoriteSong(song);
    },
    isFavorite (song) {
      let result = this.selectFavorite.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'selectIsPlaying',
      'selectModeType',
      'selectcurrentIndex',
      "selectSong",
      "selectFavorite"
      // ...
    ])
  },
  watch:{
    selectIsPlaying(newValue,oldValue){
      if(newValue){
        this.$refs.play.classList.add("active");
      }else{
        this.$refs.play.classList.remove("active");
      }
    },
    selectModeType(newValue,oldValue){
      if(newValue === modeType.loop){
        this.$refs.mode.classList.remove('random');
        this.$refs.mode.classList.add('loop');
      }else if(newValue === modeType.one){
        this.$refs.mode.classList.remove('loop');
        this.$refs.mode.classList.add('one');
      }else if(newValue === modeType.random){
        this.$refs.mode.classList.remove('one');
        this.$refs.mode.classList.add('random');
      }
    },
    total (newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second;
    },
    currentTime(newValue , oldValue){
      let time =formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second;

      let value = this.currentTime / this.total * 100 ;
      this.$refs.progressLine.style.width = value + '%';
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.play-bottom{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress-bar{
      width: 100%;
      margin: 0 20px;
      height: 10px;
      background: #CCCCCC;
      .progress-line{
        width: 0%;
        height: 100%;
        background-color: #fff;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    span{
      @include font_size($font_samll);
      @include font_color();
    }
  }
  .bottom-controll{
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      &.loop{
        @include bg_img('../../assets/images/loop');
      }
      &.one{
        @include bg_img('../../assets/images/one');
      }
      &.random{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next');
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
