<template>
  <div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="messageId"
      label="ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="infor.license"
      label="申请人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="messageName"
      label="申请类型"
      width="180">
    </el-table-column>

    <el-table-column
      label="操作"
      >
      <template #default="{ row }">
        <el-button @click="handleDetail(row)" type="primary" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    title="详情"
    v-model="drawer"
    :direction="direction"
    destroy-on-close
  >
    <CheckForm :Form = "Form"/>
  </el-drawer>
  </div>
</template>

<script>
import CheckForm from "@/components/CheckForm.vue";

  export default {
    name:'CheckAView',
    data() {
      return {
        tableData: [],
        drawer: false,
      }
    },
    methods: {
       handleDetail(row){
        this.drawer = true
        // alert(row)
        this.Form = row
      }
    },
    components: {
      CheckForm
    },
    mounted(){
      this.$http.get('/security/message')
        .then(response => {
          if(response.data['answer']==='ok'){
            this.tableData = response.data['tableData']

          }else{
            this.$message({
              showClose: true,
              message: response.data['answer'],
              type:'error'
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        }); 
    },
  }
</script>