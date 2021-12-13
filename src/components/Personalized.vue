<template>
  <div class="personalized">
      <div class="personalized-top">
        <h3>{{title}}</h3>
      </div>
      <div class="personalized-list">
        <div class="item" v-for="value in personalizeds" :key="value.id" @click="selectItem(value.id)">
          <img v-lazy="value.picUrl" alt="">
          <p>{{value.name}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Personalized",
  data: function () {
    return {

    }
  },
  methods: {
    selectItem (id) {
      // console.log(id)
      this.$emit('select', id,this.type)
      // console.log(this.type);
    }
  },
  props: {
    personalizeds: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.personalized{
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 84px;
    @include bg_sub_color();
    border-left: 5px solid;
    @include border_color();
    border-bottom: 1px solid #CCCCCC !important;
    box-sizing: border-box;
    h3{
      line-height: 84px;
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;
    .item{
      width: 200px;
      padding: 20px 0;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 200px;
        border-radius: 20px;
      }
      p{
        @include font_size($font_samll);
        @include font_color();
        @include clamp(2);
        margin-top: 10px;
        text-align: left;
      }
    }
  }
}
</style>
