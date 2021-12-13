<template>
  <transition
    :css="false"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <div class="normal-play">
      <div class="player-wrapper">
        <Header></Header>
        <Middle :currentTime="currentTime"></Middle>
        <Bottom :total="total" :currentTime="currentTime"></Bottom>
      </div>
      <div class="player-bg">
        <img :src="this.selectSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import Header from "./PlayerHeater"
import Middle from "./PlayMiddle"
import Bottom from "./PlayBottom"
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters ,mapActions} from 'vuex'
export default {
  name: "NormalPlay",
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
  components:{
    Header,
    Middle,
    Bottom
  },
  methods:{
    ...mapActions([
      'setLyric'
    ]),
    enter(el,done){
      Velocity(el,"transition.fadeIn", { duration: 1000 },function () {
        done();
      })
    },
    leave(el,done){
      Velocity(el,"transition.fadeOut", { duration: 600 },function () {
        done();
      })
    }
  },
  computed:{
    ...mapGetters([
      'selectSong'
    ])
  },
  watch:{
    selectSong(newValue,oldValue){
      if (newValue.id === undefined) {
        return
      }
      // console.log(newValue.id);
      this.setLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.normal-play{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img{
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      filter: blur(10px);
    }
  }
}
</style>
