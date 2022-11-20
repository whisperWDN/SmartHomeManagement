<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="开户" name="first">
      <el-form ref="openAccountForm" :model="openAccount" label-width="200px" :rules="rules">
        <el-form-item label="证券账户号" prop="accountS">
          <el-input v-model="openAccount.accountS"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="openAccount.password" autocomplete="off"></el-input>
        </el-form-item>      
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="openAccount.license" ></el-input>
        </el-form-item>

        <el-form-item label="资金账户登录密码" prop="loginPassword">
          <el-input type="password" v-model="openAccount.loginPassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="loginConfirm">
          <el-input type="password" v-model="openAccount.loginConfirm" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="资金账户交易密码" prop="tradePassword">
          <el-input type="password" v-model="openAccount.tradePassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="tradeConfirm">
          <el-input type="password" v-model="openAccount.tradeConfirm" autocomplete="off"></el-input>
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
        <el-form-item label="登录密码" prop="password">
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
          <el-input v-model="reOpen.account" ></el-input>
        </el-form-item>  
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="reOpen.password" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="reOpen.license" ></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="pre_reopen('reOpenForm')">补办</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="reOpenAccountForm" :model="reOpenAccount" label-width="200px" :rules="rules" v-else>

        <el-form-item label="证券账户号" prop="accountS">
          <el-input v-model="reOpenAccount.accountS"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="reOpenAccount.password" autocomplete="off"></el-input>
        </el-form-item>      

        <el-form-item label="身份证号" prop="license">
          <el-input v-model="reOpenAccount.license" ></el-input>
        </el-form-item>

        <el-form-item label="资金账户登录密码" prop="loginPassword">
          <el-input type="password" v-model="reOpenAccount.loginPassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="reopenLoginConfirm">
          <el-input type="password" v-model="reOpenAccount.reopenLoginConfirm" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="资金账户交易密码" prop="tradePassword">
          <el-input type="password" v-model="reOpenAccount.tradePassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="reopenTradeConfirm">
          <el-input type="password" v-model="reOpenAccount.reopenTradeConfirm" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="reopen('reOpenAccountForm')">重新开户</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="销户" name="fourth">
      <el-form ref="closeAccountForm" :model="closeAccount" label-width="80px" :rules="rules">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="closeAccount.account" ></el-input>
        </el-form-item>  
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="closeAccount.password" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="身份证号" prop="license">
          <el-input v-model="closeAccount.license" ></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="close('closeAccountForm')">销户</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane> 
    <el-tab-pane label="修改" name="fifth">
      <el-form ref="modifyForm" :model="modify" label-width="80px" :rules="rules">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="modify.account"></el-input>
        </el-form-item>  
        <el-form-item label="密码类型" prop="type">
          <el-radio-group v-model="modify.type">
          <el-radio label="登录密码"></el-radio>
          <el-radio label="交易密码"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原有密码" prop="oldPassword">
          <el-input v-model="modify.oldPassword" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="新密码" prop="newPassword">
          <el-input  v-model="modify.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="modifyConfirm">
          <el-input  v-model="modify.modifyConfirm" type="password"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="mdf('modifyForm')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="存取款" name="sixth">
      <el-form ref="DepositWithdrawalForm" :model="DepositWithdrawal" label-width="80px" :rules="rules">
        <el-form-item label="账户号" prop="account">
          <el-input v-model="DepositWithdrawal.account" ></el-input>
        </el-form-item>  
        <el-form-item label="登录密码" prop="loginPassword">
          <el-input v-model="DepositWithdrawal.loginPassword" type="password"></el-input>
        </el-form-item>  
        <el-form-item label="交易密码" prop="tradePassword">
          <el-input v-model="DepositWithdrawal.tradePassword" type="password"></el-input>
        </el-form-item> 
        <el-form-item label="操作类型" prop="type">
            <el-radio-group v-model="DepositWithdrawal.type">
            <el-radio label="存款"></el-radio>
            <el-radio label="取款"></el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="交易金额" prop="value">
          <el-input v-model="DepositWithdrawal.value" ></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="deposit('DepositWithdrawalForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {validateMobilePhone,validateIDCard,validateEmail,validatePass,validateAAccount,validateDW} from '@/validate'
import  { Encrypt,Decrypt }   from  '@/aes'

var validateAccount = (rule, value, callback) => {
	if (value === '') {
	  callback(new Error('请输入账户号'));
	} else {
	  if (value !== '') { 
	    var reg=/^[AB]\d{5}$/;
	    if(!reg.test(value)){
	      callback(new Error('请正确填写账户号'));
	    }
	  }
	  callback();
	}
};

export default {
  name:"AssetAccountView",
  data() {
    var validateLoginConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.openAccount.loginPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateTradeConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.openAccount.tradePassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
        }
    };
    var validateReOpenLoginConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.reOpenAccount.loginPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateModifyConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.modify.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    var validateReOpenTradeConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.reOpenAccount.tradePassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      activeName: 'second',
      openAccount: {
        license: '',
        accountS: '',
        password:'',
        loginPassword:'',
        loginConfirm:'',
        tradePassword:'',
        tradeConfirm:'',
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
        license: '',
        accountS: '',
        password:'',
        loginPassword:'',
        reopenLoginConfirm:'',
        tradePassword:'',
        reopenTradeConfirm:'',
      },
      modify:{
        type: '',
        account:'',
        oldPassword:'',
        newPassword:'',
        modifyConfirm:''
      },
      DepositWithdrawal:{
        account:'',
        loginPassword:'',
        tradePassword:'',
        type:'',
        value:''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        value:[
          { required: true, message: '请输入金额', trigger: 'blur' },     
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        license: [
          {required: true, validator: validateIDCard, trigger: 'blur' },
        ],
        email: [
          {required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          {required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        password: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        oldPassword: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        tradePassword: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        loginPassword: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        loginConfirm: [
          {required: true, validator: validateLoginConfirm, trigger: 'blur' }
        ],
        tradeConfirm: [
          {required: true, validator: validateTradeConfirm, trigger: 'blur' }
        ],
        accountS: [
          {required: true, validator: validateAccount, trigger: 'blur' }
        ],
        account:[
          {required: true, validator: validateAAccount, trigger: 'blur' }
        ],
        reopenLoginConfirm: [
          {required: true, validator: validateReOpenLoginConfirm, trigger: 'blur' }
        ],
        reopenTradeConfirm: [
          {required: true, validator: validateReOpenTradeConfirm, trigger: 'blur' }
        ],
        modifyConfirm: [
          {required: true, validator: validateModifyConfirm, trigger: 'blur' }
        ],
        value: [
          {required: true, validator: validateDW, trigger: 'blur' }
        ],
      },
      status:false
    };
  },
  methods: {
    open(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.openAccount.password=Encrypt(this.openAccount.password)
          this.openAccount.loginPassword=Encrypt(this.openAccount.loginPassword)
          this.openAccount.loginConfirm=Encrypt(this.openAccount.loginConfirm)
          this.openAccount.tradePassword=Encrypt(this.openAccount.tradePassword)
          this.openAccount.tradeConfirm=Encrypt(this.openAccount.tradeConfirm)          

          this.$http.post('/fund/register',this.$qs.stringify(this.openAccount))
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
          this.openAccount.loginPassword=Decrypt(this.openAccount.loginPassword)
          this.openAccount.loginConfirm=Decrypt(this.openAccount.loginConfirm)
          this.openAccount.tradePassword=Decrypt(this.openAccount.tradeConfirm)
          this.openAccount.tradeConfirm=Decrypt(this.openAccount.tradeConfirm)   
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
          this.$http.post('/fund/lost',this.$qs.stringify(this.lossRegister))
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
          this.$http.post('/fund/lost',this.$qs.stringify(this.lossRegister))
            .then(response => {
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
          this.$http.post('/fund/re_register',this.$qs.stringify(this.reOpen))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.status = false
                this.reOpenAccount.account = response.data['infor']['account']
                this.reOpenAccount.license = response.data['infor']['license']
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
          this.reOpen.password=Decrypt(this.reOpen.password)
          });

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
          this.reOpenAccount.loginPassword=Encrypt(this.reOpenAccount.loginPassword) 
          this.reOpenAccount.tradePassword=Encrypt(this.reOpenAccount.tradePassword)          
          this.reOpenAccount.reopenLoginConfirm=Encrypt(this.reOpenAccount.reopenLoginConfirm)          
          this.reOpenAccount.reopenTradeConfirm=Encrypt(this.reOpenAccount.reopenTradeConfirm)          

          this.$http.post('/fund/re_register2',this.$qs.stringify(this.reOpenAccount))
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
          this.reOpenAccount.loginPassword=Decrypt(this.reOpenAccount.loginPassword) 
          this.reOpenAccount.tradePassword=Decrypt(this.reOpenAccount.tradePassword)          
          this.reOpenAccount.reopenLoginConfirm=Decrypt(this.reOpenAccount.reopenLoginConfirm)          
          this.reOpenAccount.reopenTradeConfirm=Decrypt(this.reOpenAccount.reopenTradeConfirm)     
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
          this.$http.post('/fund/delete',this.$qs.stringify(this.closeAccount))
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
    },
    mdf(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.modify.oldPassword=Encrypt(this.modify.oldPassword)
          this.modify.newPassword=Encrypt(this.modify.newPassword)
          this.modify.modifyConfirm=Encrypt(this.modify.modifyConfirm)
          this.$http.post('/fund/modify',this.$qs.stringify(this.modify))
            .then(response => {
              if(response.data['answer']==='ok'){
                this.$message({
                  showClose: true,
                  message: "修改成功",
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
          this.modify.oldPassword=Decrypt(this.modify.oldPassword)
          this.modify.newPassword=Decrypt(this.modify.newPassword)
          this.modify.modifyConfirm=Decrypt(this.modify.modifyConfirm) 
        }else{
          this.$message({
            showClose: true,
            message: "表单还未完成",
          });
        }
      })
    },
    deposit(formName){
      this.$refs[formName].validate(valid =>{
        if(valid){
          this.DepositWithdrawal.loginPassword=Encrypt(this.DepositWithdrawal.loginPassword)
          this.DepositWithdrawal.tradePassword=Encrypt(this.DepositWithdrawal.tradePassword)

          this.$http.post('/fund/deposit',this.$qs.stringify(this.DepositWithdrawal))
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
                  type:'error'
                });
              }
            })
            .catch(function (error) {
                console.log(error);
            }); 
          this.DepositWithdrawal.loginPassword=Decrypt(this.DepositWithdrawal.loginPassword)
          this.DepositWithdrawal.tradePassword=Decrypt(this.DepositWithdrawal.tradePassword)
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
    width:180px
}
</style>