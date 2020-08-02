<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
<!--      <el-form-item label="上级分类">-->
<!--        <el-select v-model="model.parentId">-->
<!--          <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
                class="avatar-uploader"
                :action="upLoadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
        </el-upload>
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
        model: {
          name:'',
          icon:''
        },
        // //父级分类
        // parents:[]
      }
    },
    methods: {
      async save() {
        let res;
        //根据id进行判断，有id就修改，没有id就新增
        if(this.id){
          res = await this.$http.put(`rest/items/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/items', this.model);
        }
        if (res.data.code == 200) {
          this.$router.push('/items/list');
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
        const res=await this.$http.get(`rest/items/${this.id}`);
        if(res.data.code==200){
          this.model=res.data.result[0];
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      // async fetchParents(){
      //   const res=await this.$http.get(`rest/items`);
      //   if(res.data.code==200){
      //     // this.parents=res.data.result.filter(items=>items.parentId==null);
      //     this.parents=res.data.result;
      //   }else {
      //     this.$message({
      //       type: 'error',
      //       message: res.data.message
      //     });
      //   }
      // },
      afterUpload(res){
        // console.log(res);
        this.$set(this.model,'icon',res.url);
      }
    },
    created() {
      // this.fetchParents();
      this.id && this.fetch();
    },

  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>