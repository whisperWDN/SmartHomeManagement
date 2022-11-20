<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="开户" name="first">
      <el-form ref="openAccountForm" :model="openAccount" label-width="200px" :rules="rules">

        <el-form-item label="法人股票账户号码">
          <el-input v-model="openAccount.stock_account" ></el-input>
        </el-form-item>
        <el-form-item label="法人注册登记号码" prop="registration">
          <el-input v-model="openAccount.registration"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" prop="business_license">
          <el-input v-model="openAccount.business_license"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="法人姓名" prop="name">
            <el-input v-model="openAccount.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="openAccount.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

        </el-row>
        <el-form-item label="法人家庭住址" prop="address">
          <el-input v-model="openAccount.address" style="width: 600px"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="法人身份证号" prop="license">
            <el-input v-model="openAccount.license"></el-input>
          </el-form-item>
          <el-form-item label="法人联系电话" prop="phone">
            <el-input v-model="openAccount.phone"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="授权人姓名">
            <el-input v-model="openAccount.authorizer_name"></el-input>
          </el-form-item>
          <el-form-item label="授权人身份证号" prop="authorizer_license">
            <el-input v-model="openAccount.authorizer_license"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="授权人家庭住址">
          <el-input v-model="openAccount.authorizer_address" style="width: 600px"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="授权人联系电话" prop="authorizer_phone">
            <el-input v-model="openAccount.authorizer_phone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="openAccount.email" ></el-input>
          </el-form-item>
        </el-row>

        <el-form-item label="密码" prop="password">
          <el-input v-model="openAccount.password" type="password"></el-input>
        </el-form-item>        
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="openAccount.confirm" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="open('openAccountForm')">开户</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="挂失" name="second">
      <el-form ref="lossRegisterForm" :model="lossRegister" label-width="80px" :rules="rules">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="lossRegister.account" ></el-input>
        </el-form-item>  
        <el-form-item label="密码" prop="password">
          <el-input v-model="lossRegister.password" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="lossRegister.license" ></el-input>
        </el-form-item>  
        <el-row>
        <el-form-item>
          <el-button type="primary" @click="loss('lossRegisterForm')">挂失</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reLoss('lossRegisterForm')">取消挂失</el-button>
        </el-form-item>
        </el-row>

      </el-form>
    </el-tab-pane>
    <el-tab-pane label="重新开户" name="third">
      <el-form ref="reOpenForm" :model="reOpen" label-width="80px" :rules="rules" v-if="status">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="reOpen.account"></el-input>
        </el-form-item>  
        <el-form-item label="密码" prop="password">
          <el-input v-model="reOpen.password" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="reOpen.license"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="pre_reopen('reOpenForm')">补办</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="reOpenAccountForm" :model="reOpenAccount" label-width="200px" :rules="rules" v-else>

        <el-form-item label="法人股票账户号码">
          <el-input v-model="reOpenAccount.stock_account"></el-input>
        </el-form-item>
        <el-form-item label="法人注册登记号码">
          <el-input v-model="reOpenAccount.registration"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码">
          <el-input v-model="reOpenAccount.business_license"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="法人姓名" prop="name">
            <el-input v-model="reOpenAccount.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="reOpenAccount.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

        </el-row>
        <el-form-item label="法人家庭住址" >
          <el-input v-model="reOpenAccount.address" style="width: 600px"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="法人身份证号" prop="license">
            <el-input v-model="reOpenAccount.license" readonly=true></el-input>
          </el-form-item>
          <el-form-item label="法人联系电话" prop="phone">
            <el-input v-model="reOpenAccount.phone"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <!-- <el-form-item label="授权人姓名" prop="name">
            <el-input v-model="reOpenAccount.authorizer_name"></el-input>
          </el-form-item> -->
          <el-form-item label="授权人身份证号" prop="authorizer_license">
            <el-input v-model="reOpenAccount.authorizer_license" readonly=true></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="授权人家庭住址" >
          <el-input v-model="reOpenAccount.authorizer_address" style="width: 600px"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="授权人联系电话" prop="authorizer_phone">
            <el-input v-model="reOpenAccount.authorizer_phone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="reOpenAccount.email"></el-input>
          </el-form-item>
        </el-row>

        <el-form-item label="密码" prop="password">
          <el-input v-model="reOpenAccount.password" type="password"></el-input>
        </el-form-item>        
        <el-form-item label="确认密码" prop="reopenconfirm">
          <el-input v-model="reOpenAccount.reopenconfirm" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reopen('reOpenAccountForm')">重新开户</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <el-tab-pane label="销户" name="fourth">
      <el-form ref="closeAccountForm" :model="closeAccount" label-width="80px" :rules="rules">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="closeAccount.account"></el-input>
        </el-form-item>  
        <el-form-item label="密码" prop="password">
          <el-input v-model="closeAccount.password" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="closeAccount.license"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="close('closeAccountForm')">销户</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {validateMobilePhone,validateIDCard,validateEmail,validatePass,validateCAccount,validateRegistration,validateBusinessLicense} from '@/validate'
import  { Encrypt,Decrypt }   from  '@/aes'

export default {
  name:"CorporateAccountView",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.openAccount.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateReOpen = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.reOpenAccount.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'second',
      openAccount: {
        stock_account:'',
        registration:'',
        business_license:'',
        name: '',
        gender: '',
        license: '',
        address: '',
        authorizer_name:'',
        authorizer_license:'',
        authorizer_address:'',
        authorizer_phone:'',
        password:'',
        confirm:'',
        phone:'',
        email:''
      },
      lossRegister:{
        license: '',
        account:'',
        password:'',
        type:''
      },
      closeAccount:{
        license: '',
        account:'',
        password:''
      },
      reOpen:{
        license: '',
        account:'',
        password:''
      },
      reOpenAccount: {
        stock_account:'',
        registration:'',
        business_license:'',
        name: '',
        gender: '',
        license: '',
        address: '',
        authorizer_name:'',
        authorizer_license:'',
        authorizer_address:'',
        authorizer_phone:'',
        password:'',
        reopenconfirm:'',
        phone:'',
        email:''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        license: [
          {required: true, validator: validateIDCard, trigger: 'blur' },
        ],
        authorizer_license: [
          {required: true, validator: validateIDCard, trigger: 'blur' },
        ],
        email: [
          {required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          {required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        authorizer_phone:[
          {required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        password: [
          {required: true,validator: validatePass, trigger: 'blur' }
        ],
        confirm: [
          {required: true,validator: validatePass2, trigger: 'blur' }
        ],
        reopenconfirm: [
          {required: true, validator: validateReOpen, trigger: 'blur' }
        ],
        account: [
          {required: true,validator: validateCAccount, trigger: 'blur' }
        ],
        registration:[
          {required: true,validator: validateRegistration, trigger: 'blur' }
        ],
        business_license:[
          {required: true,validator: validateBusinessLicense, trigger: 'blur' }
        ]
      },
      status:true
    };
  },
  methods: {
    open(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.openAccount.password=Encrypt(this.openAccount.password)
          this.openAccount.confirm=Encrypt(this.openAccount.confirm)          
          this.$http.post('/security/co_register',this.$qs.stringify(this.openAccount))
            .then(response => {
              if(response.data['answer']==='ok'){
               this.$message({
                  showClose: true,
                  message: "开户成功",
                  type:'success'
                });
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
          this.openAccount.password=Decrypt(this.openAccount.password)
          this.openAccount.confirm=Decrypt(this.openAccount.confirm)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    loss(formName){
      this.lossRegister.type = 1
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.lossRegister.password=Encrypt(this.lossRegister.password)
          this.$http.post('/security/co_lost',this.$qs.stringify(this.lossRegister))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "挂失成功",
                  type:'success'
                });
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
          this.lossRegister.password=Decrypt(this.lossRegister.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    reLoss(formName){
      this.lossRegister.type = 0
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.lossRegister.password=Encrypt(this.lossRegister.password)
          this.$http.post('/security/co_lost',this.$qs.stringify(this.lossRegister))
            .then(response => {
              console.log(response.data)
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "取消挂失成功",
                  type:'success'
                });
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
          this.lossRegister.password=Decrypt(this.lossRegister.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    pre_reopen(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.reOpen.password=Encrypt(this.reOpen.password)
          this.$http.post('/security/co_re_register',this.$qs.stringify(this.reOpen))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.status = false
                this.reOpenAccount.name = response.data['infor']['name']
                this.reOpenAccount.gender = response.data['infor']['gender']
                this.reOpenAccount.license = response.data['infor']['license']
                this.reOpenAccount.phone = response.data['infor']['phone']
                this.reOpenAccount.email = response.data['infor']['email']
                this.reOpenAccount.business_license = response.data['infor']['business_license']
                this.reOpenAccount.registration = response.data['infor']['registration']
                this.reOpenAccount.authorizer_license = response.data['infor']['authorizer_license']
                this.reOpenAccount.authorizer_address = response.data['infor']['authorizer_address']
                this.reOpenAccount.authorizer_phone = response.data['infor']['authorizer_phone']
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
          this.reOpen.password=Decrypt(this.reOpen.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    reopen(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.reOpenAccount.password=Encrypt(this.reOpenAccount.password)
          this.reOpenAccount.reopenconfirm=Encrypt(this.reOpenAccount.reopenconfirm)
          this.$http.post('/security/co_re_register2',this.$qs.stringify(this.reOpenAccount))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "开户成功",
                  type:'success'
                });
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
          this.reOpenAccount.password=Decrypt(this.reOpenAccount.password)
          this.reOpenAccount.reopenconfirm=Decrypt(this.reOpenAccount.reopenconfirm)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    close(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.closeAccount.password=Encrypt(this.closeAccount.password)
          this.$http.post('/security/co_delete',this.$qs.stringify(this.closeAccount))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "销户成功",
                  type:'success'
                });
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
          this.closeAccount.password=Decrypt(this.closeAccount.password)
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    }
  }
};
</script>

<style scoped>
.el-input{
    width:200px
}
</style>>