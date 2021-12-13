<template>
  <div class="play-middle">
    <swiper ref="mySwiper" class="banner" :options="swiperOption">
      <swiper-slide class="cd">
        <div class="" ref="image">
          <img :src="this.selectSong.picUrl" alt="">
        </div>
        <p>{{this.selectLyric[0]}}</p>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView ref="ScrollView">
          <ul>
            <li v-for="(value,index) in this.selectLyric" :key="index" :class="{'active' : curTime === index}">{{value}}</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import ScrollView from "../ScrollView";
import { mapGetters} from 'vuex'
export default {
  name: "PlayMiddle",
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass : 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      curTime : '0'
    }
  },
  props:{
    currentTime:{
      type:Number,
      default: 0,
      required: true
    },
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'selectIsPlaying',
      'selectSong',
      'selectLyric'
      // ...
    ])
  },
  methods:{
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.curTime
      }
      let result = this.selectLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  watch:{
    selectIsPlaying(newValue,oldValue){
      if(newValue){
        this.$refs.image.classList.add("active");
      }else{
        this.$refs.image.classList.remove("active");
      }
    },
    currentTime(newValue,oldValue){
      let limeTime = Math.floor(newValue);
      this.curTime = this.getActiveLineNum(limeTime);
      if(document.querySelector("li.active") != undefined){
        let OliTop = document.querySelector("li.active").offsetTop;
        let ScrollHeight = this.$refs.ScrollView.$el.offsetHeight;
        if(OliTop > ScrollHeight / 2){
          // console.log('滚');
          this.$refs.ScrollView.scrollTo(0, ScrollHeight / 2 - OliTop , 100);
        }else{
          this.$refs.ScrollView.scrollTo(0, 0 , 100);
        }
      }
    },
    selectLyric(newValue,oldValue){
      for(let key in newValue){
        this.curTime = key ;
        break
      }
      if (newValue) {
        // this.$refs.ScrollView.refresh()
      }
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
@import "../../assets/css/tools";
.play-middle{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .banner{
    width: 100%;
    height: 100%;
    .swiper-pagination{
      position: absolute;
      @include hCenter();
      bottom: 0;
    }
    .cd{
      div{
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #FFFFFF;
        overflow: hidden;
        animation: spin 5s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin-top: 50px;
      }
    }
    .lyric{
      overflow: hidden;
      ul{
        box-sizing: border-box;
        text-align: center;
        li{
          text-align: center;
          @include font_size($font_medium);
          @include font_color();
          margin: 10px 0;
          &:last-of-type{
            padding-bottom: 50%;
          }
          &.active{
            color: greenyellow;
          }
        }
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
<style lang="scss">
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fff;
  margin-left: 20px;
}
.my-bullet-active{
  width: 40px;
  background-color: #d43c33;
}
</style>
