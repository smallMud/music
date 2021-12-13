<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";

export default {
  name: "ScrollView",
  mounted(){
    this.myScroll = new IScroll('.wrapper', {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    });
    //1创建一个观察者对象
    let Observer = new MutationObserver((MUtationList,Observer) => {
      this.myScroll.refresh();
    });
  //  2指定观察的内容
    let config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    };
  //  3高数观察者
    Observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.myScroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.myScroll.refresh()
      }, 500)
    },
    scrollTo (x, y, time) {
      // console.log(111)
      this.myScroll.scrollTo(x, y, time)
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  //z-index: 999;
}
</style>
