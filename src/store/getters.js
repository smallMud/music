export default {
  selectFullScreen(state){
    return state.isFullScreen;
  },
  selectMiniPlayer(state){
    return state.isMiniPlayer;
  },
  selectListPlayer(state){
    return state.isListPlayer;
  },
  selectIsPlaying(state){
    return state.isPlaying;
  },
  selectModeType(state){
    return state.modeType;
  },
  selectSongs(state){
    return state.songs;
  },
  selectcurrentIndex(state){
    return state.currentIndex;
  },
  selectSong(state){
    let obj= {
      name: '',
      singer: '',
      id: undefined,
      picUrl: null
    }
    if(state.songs.length !== 0){
      obj = state.songs[state.currentIndex];
    }
    state.currentSong = obj;
    return state.currentSong
  },
  selectLyric(state){
    return state.currentLyric;
  },
  selectCurTime(state){
    return state.curTime
  },
  selectFavorite(state){
    return state.favoriteList;
  },
  selectHistory(state){
    return state.historyList;
  }
}
