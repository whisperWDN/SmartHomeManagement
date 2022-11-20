<template>
  <div class="header" >

    <el-col>
      <el-row class="link">
        <router-link style="width:80px;color:purple" @click="routeClick(urlG2)" to="">信息发布</router-link>
        <router-link style="width:80px;color:purple"  to="/login">工作人员</router-link>
        <router-link style="width:100px;color:purple" @click="routeClick(urlG5)" to="">管理员登陆</router-link>
      </el-row>
    </el-col>

    <span class="text">股票交易系统</span>
  </div>
</template>

<script>


export default {
    name:"TopBar",
    data(){
      return {
        urlG2:"http://www.baidu.com",
        urlG1:"http://www.baidu.com",
        urlG5:"http://www.baidu.com"

      }
    },
    methods: {
      routeClick(url){
        window.location.href = url;
      }
    }
}
</script>

<style type="text/css">
.header{
  height:100px;
  background:-webkit-linear-gradient(bottom,#fcaf56,#ffedd8);
  border-radius: 4px;
  /* width:100% */
}
.text{
  color: #250;
  font-size: 25px;
  margin-top:40px;
  height: 80px;
	line-height: 80px;
}
.link{
  float:right;
}
</style>
