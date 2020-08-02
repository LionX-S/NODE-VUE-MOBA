<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="英雄分类">
            <el-select v-model="model.categoryId">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄介绍">
            <el-input type="textarea" v-model="model.introduce"></el-input>
          </el-form-item>
          <el-form-item label="英雄标语">
            <el-input v-model="model.slogan"></el-input>
          </el-form-item>
          <el-form-item label="英雄难度">
            <el-rate style="margin-top: .6rem" :max="3" v-model="model.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="英雄图片">
            <el-upload
                    class="avatar-uploader"
                    :action="upLoadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUploadHero">
              <img v-if="model.avtar" :src="model.avtar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息">
          <el-button type="text" @click="addSkills"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="技能名称">
                <el-input v-model="item.skill_name"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input v-model="item.skill_introduce"></el-input>
              </el-form-item>
              <el-form-item label="技能图片">
                <el-upload
                        class="avatar-uploader"
                        :action="upLoadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res=>item.skill_png=res.url">
                  <img v-if="item.skill_png" :src="item.skill_png" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
          name: '',
          avtar: '',
          slogan: '',
          skills:[],
          // skill1_name: '',
          // skill1_introduce: '',
          // skill1_png: ''
        },
        categories: []
      }
    },
    methods: {
      async save() {
        let res;
        //将skills对象数组转换为字符串，便于存储
        let newArr=[];
        this.model.skills.forEach((item)=>{
          newArr.push(JSON.stringify(item));
        });
        //字符串之间加&,便于展示时分隔
        let stringData=newArr.join('&');
        this.model.skills=[stringData];
        //根据id进行判断，有id就修改，没有id就新增
        if (this.id) {
          res = await this.$http.put(`rest/heros/${this.id}`, this.model);
        } else {
          res = await this.$http.post('rest/heros', this.model);
        }
        if (res.data.code == 200) {
          this.$router.push('/heros/list');
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
        const res = await this.$http.get(`rest/heros/${this.id}`);
        if (res.data.code == 200) {
          //将技能skills转换成对象
          let newArr=[];
          this.model = res.data.result[0];
          if(res.data.result[0].skills){
            res.data.result[0].skills.split('&').forEach((item)=>{
            newArr.push(JSON.parse(item));
          })
          }
          
          this.model.skills=newArr;
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      async fetchParents() {
        const res = await this.$http.get(`rest/categories`);
        if (res.data.code == 200) {
          // this.parents=res.data.result.filter(items=>items.parentId==null);
          this.categories = res.data.result;
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      afterUploadHero(res) {
        // console.log(item);
        // this.$set(this.model,'avtar',res.url);
        this.model.avtar = res.url;
      },
      afterUploadSkill1(res, file) {
        // console.log(item);
        // this.$set(this.model,'avtar',res.url);
        this.model.skills.skill = res.url;
        console.log(file);
      },
      addSkills(){
        this.model.skills.push({
          // skill_name:'',
          // skill_introduce:'',
          // skill_png:''
        })
      }
    },
    created() {
      this.fetchParents();
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
    line-height: 5rem;
    text-align: center;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
    background-color: #cccccc;
  }
</style>