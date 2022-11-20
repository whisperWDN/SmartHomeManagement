<template>
  <!-- <el-container> -->
    <!-- <el-header height="100px">
      <TopBar/>
    </el-header> -->
    <el-container>
      <el-aside width="200px">
        <SideBar class='side'/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  <!-- </el-container> -->
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
    TopBar
  },
  data(){
    return{
    }
  },
  method:{

  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
