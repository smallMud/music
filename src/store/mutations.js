import {Set_Full_Screen ,Set_Mini_Player,Set_Is_Playing
        ,Set_Mode_Type, Set_List_Player, SET_SONG_DETAIL
        ,SET_SONG_Lyric, SET_DEL_DETAIL, SET_Cut_Index
        ,SET_Cur_Time, SET_Favorite_Song ,SET_Favorite_List
        ,SET_History_List,SET_History_Song} from "./mutations-type"
export default {
  [Set_Full_Screen]: function (state,flag) {
    state.isFullScreen = flag;
  },
  [Set_Mini_Player]:function (state,flag) {
    state.isMiniPlayer = flag;
  },
  [Set_List_Player]:function (state,flag) {
    state.isListPlayer = flag;
  },
  [Set_Is_Playing]:function (state,flag) {
    state.isPlaying = flag;
  },
  [Set_Mode_Type]:function (state,flag) {
  state.modeType = flag;
  },
  [SET_SONG_DETAIL]:function (state,list) {
    state.songs = list;
  },
  [SET_SONG_Lyric]:function (state,lyric) {
    state.currentLyric = lyric;
  },
  [SET_DEL_DETAIL]:function (state,index) {
    if(index !== undefined){
      state.songs.splice(index,1);
    }else{
      state.songs = [];
    }
    if(index < state.currentIndex){
      state.currentIndex -= 1;
    }
    if(state.songs.length === 0 ){
      state.isFullScreen = false;
      state.isMiniPlayer =false;
      state.isListPlayer = false;
    }
  },
  [SET_Cut_Index]:function (state,index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [SET_Cur_Time]:function (state,time) {
    state.curTime = time;
  },
  [SET_Favorite_Song]:function (state,song) {
    let result = state.favoriteList.find(function (value) {
       return value.id === song.id;
    });
    if(result === undefined){
      state.favoriteList.push(song);
    }
  },
  [SET_Favorite_List]:function (state,list) {
    state.favoriteList = list;
  },
  [SET_History_Song]:function (state,song) {
    let result = state.historyList.find(function (value) {
      return value.id === song.id;
    });
    if(result === undefined){
      if(state.historyList.length >= 15){
        state.historyList.splice(0,1);
      }
      state.historyList.push(song);
    }
  },
  [SET_History_List]:function (state,list) {
    state.historyList = list;
  },
}
