<template>
  <div class="singer">
    <ScrollView ref="ScrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
          <h3>{{keys[index]}}</h3>
          <ul>
            <li class="item" v-for="obj in value" :key="obj.id" @click="datail(obj.id)">
              <img v-lazy="obj.img1v1Url" alt="">
              <p>{{obj.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li v-for="(key , index) in keys " :key="key" @click="to(index)" :class="{'active' : groupIndex === index}">{{key}}</li>
    </ul>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from "../components/ScrollView";
export default {
  name: "Singer",
  data () {
    return {
      keys:[],
      list:[],
      groups:[],
      groupIndex:0
    }
  },
  methods:{
    to(index){
      this.groupIndex = index;
      let offsetY = this.groups[index];
      this.$refs.ScrollView.scrollTo(0,-offsetY,100)
    },
    datail(id){
      this.$router.push({
        path: `/recommend/detail/${id}/singer`
      })
    }
  },
  created() {
    getAllArtists()
      .then((data) => {
        // console.log();
        this.keys = data.keys
        this.list = data.list
      })
      .catch(function (err){
        console.log(err);
      })
  },
  components:{
    ScrollView
  },
  watch:{
    list(){
      this.$nextTick(() => {
        // console.log(this.$refs.group);
        this.$refs.group.forEach((group) => {
          this.groups.push(group.offsetTop)
        })
      })
    }
  },
  mounted() {
    this.$refs.ScrollView.scrolling((y) => {
      if(y > 0){
        this.groupIndex = 0;
        return
      }
      if(-y >= this.groups[this.groups.length - 1]){
        this.groupIndex = this.groups.length -1
        return;
      }
      for( let i = 0 ; i < this.groups.length - 1 ; i++){
        let befTop = this.groups[i];
        let nextTop= this.groups[i + 1];
        if(-y >befTop && -y < nextTop){
          this.groupIndex = i ;
          return;
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 184px;
  overflow: hidden;
  @include bg_sub_color;
  .list-wrapper{
    .list-group{
      h3{
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
      }
      .item{
        display: flex;
        justify-content: flex-start;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p{
          @include font_size($font_medium);
          @include font_color();
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }
  .list-keys{
    position: fixed;
    top: 60%;
    right: 10px;
    transform: translateY(-50%);
    li{
      @include font_color();
      @include font_size($font_medium_s);
      padding: 3px 0;
      &.active{
        background-color: pink;
      }
    }
  }
}
</style>
