import mode from "./modeType";
export default {
  isFullScreen: false,
  isMiniPlayer: false,
  isListPlayer: false,
  isPlaying:false,
  modeType:mode.loop,
  songs:[],
  currentSong: {},
  currentIndex: 0,
  currentLyric:{},
  curTime: 0,
  favoriteList: [],
  historyList:[],
}
