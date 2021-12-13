<template>
  <transition
    :css="false"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <div class="mini-player" >
      <div class="player-wrapper">
        <div class="left" @click="showNormalPlay">
          <img class="" ref="image" :src="this.selectSong.picUrl" alt="">
          <div>
            <h3>{{this.selectSong.name}}</h3>
            <p>{{this.selectSong.songer}}</p>
          </div>
        </div>
        <div class="right">
          <div class="play" @click="isplaying" ref="play"></div>
          <div class="list" @click.stop="setListPlayer" ref="list"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions ,mapGetters} from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: "MiniPlayer",
  methods: {
    setListPlayer: function () {
      this.setListPlayer(true);
    },
    enter(el, done) {
      Velocity(el, "transition.fadeIn", {duration: 1000}, function () {
        done();
      })
    },
    leave(el, done) {
      Velocity(el, "transition.fadeOut", {duration: 600}, function () {
        done();
      })
    },
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    isplaying: function () {
      this.setIsPlaying(!this.selectIsPlaying);
    },
    showNormalPlay: function () {
      this.setFullScreen(true);
      this.setMiniPlayer(false)
    },
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'selectIsPlaying',
      'selectSong'
    ])
  },
  watch: {
    selectIsPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
        this.$refs.image.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
        this.$refs.image.classList.remove("active");
      }
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.mini-player{
  width: 100%;
  height: 150px;
  position: fixed;
  left: 0;
  bottom: 0;
  .player-wrapper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      justify-content: left;
      align-items: center;
      img{
        margin-left: 30px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        animation: spin 5s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
     div{
       margin-left: 20px;
       h3{
         margin-bottom: 5px;
         @include font_size($font_medium);
         @include font_color();
       }
       p{
         @include font_size($font_medium_s);
         @include font_color();
       }
     }
    }
    .right{
      display: flex;
      justify-content: right;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
@keyframes spin {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
