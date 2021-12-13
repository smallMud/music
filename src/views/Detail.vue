<template>
  <transition appear>
    <div class="detail">
      <SubHeader :title="playlist.name" class="header"></SubHeader>
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="srcollview">
          <DetailBottom :playlist="playlist.tracks"></DetailBottom>
        </ScrollView>
      </div>
    </div>
  </transition>
</template>

<script>
import SubHeader from '../components/subHeater'
import DetailTop from '../components/DetailTop'
import DetailBottom from '../components/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getPlayList ,getAlbum ,getSingerDetail} from '../api/index'
export default {
  name: 'Detail',
  data: function () {
    return {
      playlist: {}
    }
  },
  components:{
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created () {
    // console.log(this.$route.params.type)
    if(this.$route.params.type == "personalizeds" || this.$route.params.type == "rank"){
      getPlayList({id: this.$route.params.id})
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    }else if(this.$route.params.type == "albums" ){
      getAlbum({id: this.$route.params.id})
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  else if(this.$route.params.type == "singer"){
      getSingerDetail({id: this.$route.params.id})
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    const defaultHeight = this.$refs.top.$el.offsetHeight;
    this.$refs.srcollview.scrolling((offsetY) => {
      if (offsetY > 0 ){
        let scale = 1 + offsetY/defaultHeight;
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }else{
        let scale = Math.abs(offsetY)/defaultHeight;
        this.$refs.top.changeMask(scale);
      }
    })
  },
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  //background-color: pink;
  .header{
    position: relative;
    z-index: 999;
  }
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
