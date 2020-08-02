<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <!--        native-type表示原生html里面为submit按钮-->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ItemEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      }
    },
    methods: {
      async save() {
        let res;
        //根据id进行判断，有id就修改，没有id就新增
        if(this.id){
          res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/admin_users', this.model);
        }
        if (res.data.code == 200) {
          this.$router.push('/admin_users/list');
          this.$message({
            type: 'success',
            message: res.data.message
          });
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      async fetch(){
        const res=await this.$http.get(`rest/admin_users/${this.id}`);
        if(res.data.code==200){
          this.model=res.data.result[0];
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      }
    },
    created() {
      // this.fetchParents();
      this.id && this.fetch();
    },
    watch:{
      $route(to){
        if(to.path==='/admin_users/create'){
          this.model={};
        }
      }
    }
  }
</script>

<style scoped>
</style>