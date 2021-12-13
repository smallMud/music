<template>
    <div class="recommend">
      <div class="recommend-warpper">
        <IScroll>
          <div>
            <Banner :banners="banners"></Banner>
            <Personalized :personalizeds = "personalizeds" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalizeds'"></Personalized>
            <Personalized :personalizeds = "albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
            <Songs :songs="songs"></Songs>
          </div>
        </IScroll>
      </div>
    </div>
</template>

<script>
import { getBanner, getPersonalized ,getNewAlbum,getNewSong} from "../api";
import Banner from "../components/Banner";
import Personalized from "../components/Personalized";
import Songs from "../components/Songs";
import IScroll from "../components/ScrollView"

export default {
  name: "Recommend",
  data: function (){
    return{
      banners:[],
      personalizeds:[],
      albums:[],
      songs:[],
    }
  },
  methods: {
    fatherSelectItem (id,type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  components:{
    Banner,
    Personalized,
    Songs,
    IScroll,
  },
  created() {
      getBanner()
        .then((data) => {
        // console.log(data)
        this.banners = data.banners
        })
        .catch(function (err) {
        console.log(err);
      }),

      getPersonalized()
        .then((data) => {
          this.personalizeds = data.result;
        })
        .catch(function (err) {
          console.log(err);
        }),

      getNewAlbum()
        .then((data) => {
          this.albums = data.albums;
          if(this.albums.length > 6){
            this.albums.splice(0,6);
          }
        })
        .catch(function (err) {
          console.log(err);
        }),

      getNewSong()
        .then((data) => {
          let list = []
          data.result.forEach((value) => {
            let obj = {}
            obj.id = value.id
            obj.name = value.name
            obj.picUrl = value.song.album.picUrl
            let singer = ''
            for (let i = 0; i < value.song['artists'].length; i++) {
              if (i === 0) {
                singer = value.song['artists'][i].name
              } else {
                singer += '-' + value.song['artists'][i].name
              }
            }
            obj.singer = singer
            list.push(obj)
          })
          this.songs = list
        })
        .catch(function (err) {
          console.log(err);
        })
  }
}
</script>

<style scoped>
.recommend-warpper{
  /*display: none;*/
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
