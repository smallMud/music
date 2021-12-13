<template>
  <div class="tabber">
    <router-link class="item" tag="div" to="/recommend">
        <span>推荐</span>
    </router-link>
    <router-link class="item" tag="div" to="/singer">
        <span>歌手</span>
    </router-link>
    <router-link class="item" tag="div" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link class="item" tag="div" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Tabber"
  }
</script>

<style scoped lang="scss">
  @import "./../assets/css/mixin.scss";
  @import "./../assets/css/variable.scss";
.tabber{
  height: 84px;
  width: 100%;
  line-height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  .item{
    span{
      @include font_size($font_medium);
      @include font_color();
      box-sizing: border-box;
    }
    &.router-link-active{
      span{
        @include font_active_color();
      }
      border-bottom: 3px solid #000;
      @include border_color()
    }
  }
}
</style>
