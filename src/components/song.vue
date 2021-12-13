<template>
    <ul class="song-list">
      <li class="item" v-for="value in songs" :key="value.id" @click="showNormalPlay(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <div>
          <h4>{{value.name}}</h4>
          <p>{{value.songer}}</p>
        </div>
      </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "song",
  data:function () {
      return {

      }
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods:{
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setIsPlaying'
    ]),
    showNormalPlay: function (id) {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      this.setSongDetail([id]);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.song-list{
  width: 100%;
.item{
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #CCCCCC;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
img{
  width: 150px;
  height: 150px;
  border-radius: 15px;
}
h3{
  @include font_color();
  @include font_size($font_large);
  font-weight: bold;
  text-align: left;
  margin-top: 10px;
}
p{
  @include font_color();
  @include font_size($font_medium_s);
  @include clamp(1);
  opacity: 0.6;
  padding: 10px 0;
  box-sizing: border-box;
}
}
}
</style>
