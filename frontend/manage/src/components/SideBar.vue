<template>
  <div class="side">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#fcaf56"
        text-color="black"
        active-text-color="purple">
        <el-menu-item index="1">
          <span style="width: 60px">用户名</span>
          <div v-if="this.$store.state.logState">
            <span  style="margin-right: 10px;">{{this.$store.state.administrator}}</span>
            <span @click="closeA" style="color: blue">注销</span>
          </div>
          <div v-else>
            <router-link to="/login" style="color: blue">登录/注册</router-link>
          </div>
        </el-menu-item>
        
        <el-sub-menu index="2">
          <template #title>
            <span slot="title">场所</span>
          </template>
          <el-menu-item index="2-1" @click="hrefToSA">普通账户</el-menu-item>

          <el-menu-item index="2-2" @click="hrefToCA">法人账户</el-menu-item>

          <el-menu-item  @click="hrefToCS">
            <span slot="title" >审核</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>设备</template>
          <el-menu-item index="3-1" @click="hrefToAA">账户管理</el-menu-item>

          <el-menu-item index="3-2" @click="hrefToCheckA">审核</el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-col>
  </div>
</template>

<script>


export default {
    name:"SideBar",
    data(){
      return {

      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      closeA(){
        this.$store.commit('changeLogState',false)
        this.$store.commit('setAdministrator','')
        this.$cookies.set("administratorName",'', {expires: "7D"});
        this.$cookies.set("LogState", false, {expires: "7D"});
      },
      hrefToSA(){
        this.$router.push({ path:'/SecuritiesAccount'})
      },
      hrefToCA(){
        this.$router.push({ path:'/CorporateAccount'})
      },
      hrefToAA(){
        this.$router.push({ path:'/AssetAccount'})
      },
      hrefToCS(){
        this.$router.push({ path:'/CheckS'})
      },
      hrefToCheckA(){
        this.$router.push({ path:'/CheckA'})
      }
    },
    mounted(){

    }
}
</script>

<style scoped>
.el-menu{
  height: 700px;
}
.side{
  margin-left: 20px;
  margin-top: 1px;
  border-radius: 4px

}
/* .side{
  background-color:"#545c64";
  text-color:"#fff";
  active-text-color:"#ffd04b"
} */
</style>
