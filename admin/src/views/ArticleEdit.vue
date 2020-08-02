<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!--      <el-form-item label="所属分类">-->
      <!--        <el-select v-model="model.parentId">-->
      <!--          <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <!--        native-type表示原生html里面为submit按钮-->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //文章富文本编辑器
  import {VueEditor} from 'vue2-editor';

  export default {
    name: "CategoryEdit",
    components: {
      VueEditor
    },
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        //文章分类
        // categories:[]
      }
    },
    methods: {
      async save() {
        let res;
        //根据id进行判断，有id就修改，没有id就新增
        if (this.id) {
          res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        } else {
          res = await this.$http.post('rest/articles', this.model);
        }
        if (res.data.code == 200) {
          this.$router.push('/articles/list');
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
      async fetch() {
        const res = await this.$http.get(`rest/articles/${this.id}`);
        if (res.data.code == 200) {
          this.model = res.data.result[0];
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      // async fetchParents(){
      //   const res=await this.$http.get(`rest/categories`);
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
      //文章图片上传自定义方法
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('/upload', formData);
        console.log(res);
        //在光标处插入一个image标签，src复制为req.url
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      }
    },
    created() {
      // this.fetchParents();
      this.id && this.fetch();
    },

  }
</script>

<style scoped>

</style>