import {Set_Full_Screen ,Set_Mini_Player,Set_Is_Playing
        ,Set_Mode_Type ,Set_List_Player,SET_SONG_DETAIL
        ,SET_DEL_DETAIL, SET_Cut_Index,SET_Cur_Time
        ,SET_Favorite_Song , SET_Favorite_List ,SET_History_List,SET_History_Song} from "./mutations-type"
import {getSongDetail , getSongLyric,getSongURL} from '../api/index'
export default {
  setFullScreen:function ({commit},flag) {
    commit('Set_Full_Screen',flag);
  },
  setMiniPlayer:function ({commit},flag) {
    commit('Set_Mini_Player',flag);
  },
  setListPlayer:function ({commit},flag) {
    commit('Set_List_Player',flag);
  },
  setIsPlaying:function ({commit},flag) {
    commit('Set_Is_Playing',flag);
  },
  setModeType:function ({commit},flag) {
    commit('Set_Mode_Type',flag);
  },
  async setSongDetail ({commit},ids) {
    let result = await getSongDetail({ ids: ids.join(',')});
    let urls = await getSongURL({ id: ids.join(',')});
    // console.log(urls);
    let list = [];
    result.songs.forEach(function (value ,index) {
        let obj = {};
        obj.name = value.name;
        obj.id = value.id;
        obj.picUrl = value.al.picUrl;
        // obj.url = urls.data[index].url
        for(let j=0 ; j < urls.data.length ; j++ ){
          let item = urls.data[j];
          if(value.id === item.id ){
            obj.url = urls.data[j].url;
            break;
          }
        }
        let songer = '';
        value.ar.forEach(function (item,index) {
          if(index === 0 ){
              songer = item.name
          }else{
              songer += '-' + item.name;
          }
        });

      obj.songer = songer
      // console.log(obj);
      list.push(obj)
    });
    commit('SET_SONG_DETAIL',list);
  },
  async setLyric({commit},id) {
    let result = await getSongLyric({ id: id })
    // console.log(result.lrc.lyric)
    let obj = parseLyric(result.lrc.lyric)
    commit('SET_SONG_Lyric',obj);
  },
  setDeleteMusic({commit},index){
    commit('SET_DEL_DETAIL',index);
  },
  setCutIndex({commit},index){
    commit('SET_Cut_Index',index);
  },
  setCurrentTime({commit},index) {
    commit('SET_Cur_Time',index);
  },
  setFavoriteSong({commit},index) {
    commit('SET_Favorite_Song',index);
  },
  setFavoriteList({commit},list) {
    commit('SET_Favorite_List',list);
  },
  setHistorySong({commit},index) {
    commit('SET_History_Song',index);
  },
  setHistoryList({commit},list) {
    commit('SET_History_List',list);
  },
}

// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
