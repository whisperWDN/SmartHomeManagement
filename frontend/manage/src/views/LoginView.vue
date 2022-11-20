<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登录" name="first">
      <el-form ref="LoginForm" :model="Login" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="Login.username" ></el-input>
        </el-form-item>  
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="Login.password" ></el-input>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" @click="login('LoginForm')">登录</el-button>
        </el-form-item> 
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册" name="second">
      <el-form ref="RegisterForm" :model="Register" label-width="80px" :rules="rules">
        <el-row>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="Register.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="Register.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <el-form-item label="身份证号" prop="license">
          <el-input v-model="Register.license"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="Register.address" style="width: 500px"></el-input>
        </el-form-item>

        <el-row>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="Register.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="Register.email"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="Register.password" autocomplete="off"></el-input>
        </el-form-item>        
        <el-form-item label="确认密码"  prop="confirm">
          <el-input type="password" v-model="Register.confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('RegisterForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import  { Encrypt,Decrypt }   from  '@/aes'
import {validateMobilePhone,validateIDCard,validateEmail,validatePass,validateAdministrator} from '@/validate'

export default {
  name:"LoginView",
  data() {
    var validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.Register.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      Register: {
        name: '',
        gender:'',
        license:'',
        address:'',
        phone:'',
        email:'',
        password:'',
        confirm:'',
      },
      Login:{
        username:'',
        password:''
      },
      rules: {
        username: [
          {required: true,validator: validateAdministrator, trigger: 'blur' }
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'change' }
        ],
        license: [
          {required: true,validator: validateIDCard, trigger: 'blur' }
        ],
        email: [
          {required: true,validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          {required: true,validator: validateMobilePhone, trigger: 'blur' }
        ],
        password: [
          {required: true,validator: validatePass, trigger: 'blur' }
        ],
        confirm: [
          {required: true,validator: validateConfirm, trigger: 'blur' }
        ],

      },
    };
  },
  methods: {
    login(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.Login.password=Encrypt(this.Login.password)
          this.$http.post('/login',this.$qs.stringify(this.Login))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$store.commit('changeLogState',true)
                this.$store.commit('setAdministrator',this.Login.username)
                this.$cookies.set("administratorName", this.Login.username, {expires: "7D"});
                this.$cookies.set("LogState", true, {expires: "7D"});
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
          this.Login.password=Decrypt(this.Login.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    register(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.Register.password=Encrypt(this.Register.password)
          this.$http.post('/register',this.$qs.stringify(this.Register))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "注册成功",
                  type:'success'
                });
                this.activeName = "first"
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
          this.Register.password=Decrypt(this.Register.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
     },
    }
};
</script>

<style scoped>
.el-input{
  width:200px
}
</style>>