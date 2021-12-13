<template>
  <transition
    :css="false"
    v-on:enter="enter"
    v-on:leave="leave">
    <div class="list-player" v-show="this.selectListPlayer">
<!--    <div class="list-player">-->
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" ref="mode" @click="isModeType"></div>
            <p>{{ismode}}</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul ref="play">
              <li class="item" v-for="(value , index) in this.selectSongs" :key="value.id" @click="cutIndex(index)">
                <div class="item-left">
                  <div class="play" @click.stop="isplaying" v-show="selectcurrentIndex === index"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click.stop="favorite(value)" :class="{'active': isFavorite(value)}"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="close">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from "../ScrollView";
import Velocity from "velocity-animate";
import 'velocity-animate/velocity.ui'
import {mapActions, mapGetters} from "vuex";
import modeType from "../../store/modeType";
export default {
  name: "ListPlayer",
  components:{
    ScrollView
  },
  data: function (){
    return {
      ismode:'顺序播放'
    }
  },

  methods:{
    close: function (){
      this.setListPlayer(false);
    },
    enter(el,done){
      Velocity(el, 'transition.bounceLeftIn',function () {
        done();
      })
    },
    leave(el,done){
      Velocity(el,'transition.bounceLeftOut',function () {
        done();
      })
    },
      ...mapActions([
        'setIsPlaying',
        'setModeType',
        'setListPlayer',
        "setDeleteMusic",
        'setCutIndex',
        'setFavoriteSong'
      ]),
      isplaying:function () {
        this.setIsPlaying(!this.selectIsPlaying);
      },
    isModeType: function () {
      if (this.selectModeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.selectModeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.selectModeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    del(index){
      this.setDeleteMusic(index);
    },
    delAll(){
      this.setDeleteMusic();
    },
    cutIndex(index){
      this.setCutIndex(index)
    },
    favorite(value){
      // console.log(value);
      this.setFavoriteSong(value);
      // console.log(this.selectFavorite);
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
      'selectListPlayer',
      'selectSongs',
      'selectcurrentIndex',
      'selectFavorite'
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
        this.ismode = "顺序播放"
      }else if(newValue === modeType.one){
        this.$refs.mode.classList.remove('loop');
        this.$refs.mode.classList.add('one');
        this.ismode = "单曲循环"
      }else if(newValue === modeType.random){
        this.$refs.mode.classList.remove('one');
        this.$refs.mode.classList.add('random');
        this.ismode = "随机循环"
      }
    },
    selectListPlayer () {
      this.$refs.scrollView.refresh();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.list-player{
  width: 100%;
  @include bg_sub_color();
  position: fixed;
  left: 0;
  bottom: 0;
  .player-wrapper{
    .player-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 10px;
        .mode{
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop{
            @include bg_img('../../assets/images/small_loop')
          }
          &.one{
            @include bg_img('../../assets/images/small_one')
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle')
          }
        }
        p{
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right{
        .del{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del')
        }
      }
    }
    .player-middle{
      width: 100%;
      height: 700px;
      overflow: hidden;
      ul{
        width: 100%;
        &.active{
          .item{
            .item-left{
              .play{
                @include bg_img('../../assets/images/small_pause');
              }
            }
          }
        }
        .item{
          border-top: 1px solid #ccc;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          .item-left{
            width: 70%;
            display: flex;
            justify-content: left;
            align-items: center;
            .play{
              width: 56px;
              height: 56px;
              margin-right: 20px;
              @include bg_img('../../assets/images/small_play');
            }
            p{
              width: 80%;
              @include font_size($font_medium_s);
              @include font_color();
              @include no-wrap();
            }
          }
          .item-right{
            display: flex;
            justify-content: right;
            align-items: center;
            .item-favorite{
              width: 56px;
              height: 56px;
              @include bg_img('../../assets/images/small_un_favorite');
              &.active{
                @include bg_img('../../assets/images/small_favorite');
              }
            }
            .item-del{
              width: 52px;
              height: 52px;
              margin-left: 20px;
              @include bg_img('../../assets/images/small_close')
            }
          }
        }
      }
    }
    .player-bottom{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      @include bg_color();
      p{
        @include font_size($font_large);
        color: #FFFFFF;
      }
    }
  }
}
</style>
