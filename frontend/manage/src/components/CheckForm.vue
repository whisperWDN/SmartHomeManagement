<template>
  <el-descriptions title="申请信息" column="1">

    <el-descriptions-item label="ID:">{{Form.messageId}}</el-descriptions-item>
    <el-descriptions-item label="消息类型:">{{Form.messageName}}</el-descriptions-item>
    <el-descriptions-item label="姓名:">{{Form.infor.name}}</el-descriptions-item>
    <el-descriptions-item label="性别:">{{Form.infor.gender}}</el-descriptions-item>
    <el-descriptions-item label="身份证">{{Form.infor.license}}</el-descriptions-item>
    <el-descriptions-item label="住址">{{Form.infor.address}}</el-descriptions-item>
    <el-descriptions-item label="联系电话">{{Form.infor.phone}}</el-descriptions-item>
    <el-descriptions-item label="邮箱">{{Form.infor.email}}</el-descriptions-item>
    <el-descriptions-item >
      <el-button type="primary" @click="agree">通过</el-button>
      <el-button type="primary" @click="disagree">拒绝</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  export default {
    name:'CheckForm',
    data() {
      return {
        result:{
          messageId:'',
          type:''
        }
      }
    },
    props:{
      Form:{
        messageId:'',
        messageName:'',
        infor:{
          name:'',
          gender:'',
          license:'',
          address:'',
          phone:'',
          email:''
        }
      },
    },
    methods: {
      agree(){
        this.result.messageId = this.Form.messageId
        this.result.type = "同意"
          this.$http.post('/message',this.$qs.stringify(this.result))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type:'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: response.data['answer'],
                  type: 'error'
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      disagree(){
        this.result.messageId = this.Form.messageId
        this.result.type = "拒绝"
        this.$http.post('/message',this.$qs.stringify(this.result))
          .then(response => {
            if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type:'success'
                });
            }else{
              this.$message({
                showClose: true,
                message: response.data['answer'],
                type: 'error'
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }

    }
  }
</script>