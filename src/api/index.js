import Network from './network'
import network from "./network";

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')//?limit=6
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (id) => Network.get('playlist/detail',id)
export const getAlbum = (id) => Network.get('album',id)
export const getSongDetail = (id) => Network.get('song/detail',id)
export const getSongURL = (data) => Network.get('song/url', data)
export const getSongLyric = (id) => Network.get('lyric',id)
export const getSingerDetail = (id) => Network.get('artists',id)
export const getSearch  = (data) => Network.get('search?type=1 ',data)
export const getSearchHot  = () => Network.get('search/hot')

export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
      let key = ['热'];
      let list = [getHotArtists()];
      for (let i = 65 ; i < 91 ; i++){
        let letter = String.fromCharCode(i);
        key.push(letter);
        list.push(getLetterArtists(letter));
       }
    // console.log(list);
    Network.all(list)
        .then(function (result) {
          let obj = {}
          obj.keys = key
          obj.list = result
          resolve(obj)
        })
        .catch(function (err) {
          reject(err)
        })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
    ])
      .then(function (result) {
      // console.log(result)
      result.forEach(function (item) {
        letterArtists.push(...item.artists)
      })
      // console.log(letterArtists)
      resolve(letterArtists)
    })
      .catch(function (err) {
        reject(err)
      })
  })
}

export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=10')
      .then(function (data) {
        resolve(data.artists)
      })
      .catch(function (err){
        reject(err);
      })
  })
}

export const getTopListDetail = () =>{
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '飙升榜', id: 3 },
        { name: '新歌榜', id: 0 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '云音乐ACG游戏榜', id: 26 },
        { name: '云音乐ACG VOCALOID榜', id: 22 },
        { name: '云音乐古风榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '云音乐日语榜', id: 10 },
        { name: '潜力爆款榜', id: 8 },
        { name: '中国新乡村音乐排行榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '网络热歌榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '越南语榜', id: 30 },
        { name: '俄罗斯top hit流行音乐榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        // console.log(data);
        data.list.forEach(function (obj) {
          let flag = false
        for (let key in category) {
          for (let i = 0; i < category[key].length; i++) {
            if (category[key][i].name === obj.name) {
              // console.log(1);
              category[key][i].rank = obj
              category[key][i].id = obj.id
              // console.log(category[key][i].rank);
              flag = true
              break
            }
          }
          if (flag) {
            break
          }
        }
      })
      resolve(category)
    })
      .catch(function (err) {
        reject(err)
      })
  })
}
