<template>
  <div class="rink">
    <ScrollView>
      <ul class="">
        <li v-for="(value , key ) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="obj in category[key]" :key="obj.rank.id" @click="datail(obj.rank.id)">
              <div class="rank-left">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <span>{{obj.rank.updateFrequency}}</span>
              </div>
              <div class="rank-right">
                <p v-for="(song ,index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}-{{song.second}}</p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="obj in category[key]" :key="obj.rank.id" @click="datail(obj.rank.id)">
              <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <span>{{obj.rank.updateFrequency}}</span>
              </div>
              <div class="rank-bottom">
                <p>{{obj.rank.name}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
  </div>
</template>

<script>
import {getTopListDetail} from '../api/index'
import ScrollView from "../components/ScrollView";
export default {
  name: "Rink",
  data(){
    return{
      category:{}
    }
  },
  methods:{
    datail(id){
      this.$router.push({
        path: `/recommend/detail/${id}/rank`
      })
    }
  },
  components:{
    ScrollView
  },
  created() {
    getTopListDetail()
    .then( (data) => {
      // console.log(data);
      this.category = data;
    })
    .catch(function (err) {
      console.log(err);
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.rink{
  position: absolute;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  overflow: hidden;
  ul{
    li{
      .group-title{
        padding: 10px 20px;
        box-sizing: border-box;
        @include font_color();
        @include font_size($font_large);
        font-weight: bold;
      }
      .normal-group{
        li{
          display: flex;
          justify-content: left;
          margin: 10px 20px;
          .rank-left{
            position: relative;
            img{
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }
            span{
              display: inline-block;
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }
          .rank-right{
            margin-left: 20px;

            p{
              @include font_color();
              @include font_size($font_medium_s);
              padding: 10px 0;
            }
          }
        }
      }
      .other-group{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          padding: 10px 20px;
          box-sizing: border-box;
          .rank-top{
            position: relative;
            img{
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }
            span{
              display: inline-block;
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }
          .rank-bottom{
            width: 200px;
            @include no-wrap();
            p{
              padding: 10px 0;
              @include font_color();
              @include font_size($font_medium_s);
            }
          }
        }
      }

    }
  }
}
</style>
