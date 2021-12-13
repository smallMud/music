<template>
  <div id="app">
    <heater></heater>
    <Tabber></Tabber>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
  import heater from './components/Home-Heater'
  import Tabber from './components/Home-Tabber'
  import Player from './views/Player'
  export default {
    name: 'App',
    methods:{

    },
    components: {
      heater,
      Tabber,
      Player
    }
  }
</script>

<style lang="scss">

</style>
