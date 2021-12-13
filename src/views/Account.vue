<template>
  <div class="account">
    <AccountHeater @selectNum="selectNum"></AccountHeater>
    <AccountBottom :num = 'num'></AccountBottom>
  </div>
</template>

<script>
import AccountHeater from "../components/Account/AccountHeater";
import AccountBottom from "../components/Account/AccountBottom";
export default {
  name: "Account",
  components:{
    AccountHeater,
    AccountBottom
  },
  methods:{
    selectNum(num){
      this.num = num
    }
  },
  data(){
    return{
      num:0
    }
  }
}
</script>

<style scoped lang="scss">
.account{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: pink;
}
</style>
