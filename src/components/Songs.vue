<template>
  <div class="song">
      <div class="song-top">
        <h3>最新歌曲</h3>
      </div>
    <song :songs="songs"></song>
  </div>
</template>

<script>
import song from './song'
export default {
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components:{
    song,
  }

}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.song{
  @include bg_sub_color();
  .song-top {
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  border-left: 5px solid;
  @include border_color();
  border-bottom: 1px solid #CCCCCC !important;
  box-sizing: border-box;
  h3 {
    line-height: 84px;
    @include font_size($font_large);
    @include font_color();
    font-weight: bold;
    padding: 0 20px;
    box-sizing: border-box;
   }
  }

}

</style>
