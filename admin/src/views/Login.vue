<template>
  <div class="login">
    <el-card header="登录"  class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>


export default {
  name: 'login',
  data(){
    return{
      model:{}
    }
  },
  methods:{
    async login(){
      const res=await this.$http.post('/login',this.model);
      sessionStorage.token=res.data;
      this.$router.push('/');
      this.$message.success('登录成功');
      if(res.data.code==400){
        this.$message.error(res.data.message);
        this.model={};
      }
    }
  }
}
</script>
<style scoped>
  .login-card{
    width: 25rem;
    margin: 10rem auto;
  }
</style>