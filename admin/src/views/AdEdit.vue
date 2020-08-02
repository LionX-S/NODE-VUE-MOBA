<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" @click="addSkills"><i class="el-icon-plus"></i>添加广告</el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 1rem">
              <el-upload
                      class="avatar-uploader"
                      :action="upLoadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res=>item.image=res.url">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
    name: "CategoryEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          items:[],
        },
        //父级分类
        // parents:[]
      }
    },
    methods: {
      async save() {
        let res;
        //将items对象数组转换为字符串，便于存储
        let newArr=[];
        this.model.items.forEach((item)=>{
          newArr.push(JSON.stringify(item));
        });
        //字符串之间加&,便于展示时分隔
        let stringData=newArr.join('&');
        this.model.items=[stringData];
        //根据id进行判断，有id就修改，没有id就新增
        if(this.id){
          res = await this.$http.put(`rest/ads/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/ads', this.model);
        }
        if (res.data.code == 200) {
          this.$router.push('/ads/list');
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
        const res=await this.$http.get(`rest/ads/${this.id}`);
        if(res.data.code==200){
          //将items转换成对象
          let newArr=[];
          this.model = res.data.result[0];
          res.data.result[0].items.split('&').forEach((item)=>{
            newArr.push(JSON.parse(item));
          })
          this.model.items=newArr;
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      addSkills(){
        this.model.items.push({
          url:'',
          image:''
        })
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
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }

  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
    background-color: #cccccc;
  }
</style>