<template>
  <div class="page-hero" v-if="heroMsg">
    <div class="top bg-primary py-3 text-center fs-xl">
      <i class="iconfont icon-fanhui" @click="back"></i>
      {{heroMsg.name}}
    </div>
    <div class="m-2 fs-sm d-flex bg-white ai-center">
      <div class="flex-1">
        <img :src="heroMsg.avtar" class="w-100" />
      </div>
      <div class="flex-3 p-2">
        <p class="my-2">
          <strong>类型</strong>
          :{{heroMsg.categoryId | type}}
        </p>
        <p class="my-2">
          <strong>英雄介绍</strong>
          :{{heroMsg.introduce}}
        </p>
        <p class="my-2">
          <strong>标语</strong>
          :{{heroMsg.slogan}}
        </p>
        <p>
          <strong>操作难度</strong>
          :{{heroMsg.difficult}}颗星
        </p>
      </div>
    </div>
    <div class="skills bg-white m-2 p-2">
      <div class="p-2 border-bottom">
        <strong>技能列表</strong>
      </div>
      <!-- 技能图标 -->
      <div class="d-flex jc-around py-3" >
        <div class="skillDiv" 
        v-for="(item,index) in skills" 
        :key="index" 
        :class="{active:currentSkillIndex===index}"
        @click="currentSkillIndex=index">
          <img :src="item.skill_png"/>
        </div>
      </div>
      <!-- 技能详情信息 -->
      <div v-if="currentSkill">
        <div><h3>{{currentSkill.skill_name}}</h3></div>
        <p>{{currentSkill.skill_introduce}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    id: { required: true },
  },
  data() {
    return {
      heroMsg: {},
      skills: [],
      currentSkillIndex:0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`);
      console.log(res);
      if (res.data.code == 200) {
        this.heroMsg = res.data.result;
        // 循环技能字符串，转化为对象
        if (this.heroMsg.skills) {
          var arr = this.heroMsg.skills.split("&");
          arr.forEach((item) => {
            this.skills.push(JSON.parse(item));
          });
        }
      }
    },
    back() {
      this.$router.back();
    },
  },
  computed:{
    currentSkill(){
      return this.skills[this.currentSkillIndex];
    }
  },
  created() {
    this.fetch();
  },
  filters: {
    type(val) {
      switch (val) {
        case 1:
          return "重装";
        case 2:
          return "输出";
        case 3:
          return "支援";
        default:
          return "未知";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.skillDiv {
  position: relative;
  width: 60px;
  height: 60px;
  text-align: center;
  background-color: rgba(64, 82, 117, 0.4);
  border: 2px solid rgba(240, 237, 242, 0.4);
  border-radius: 50%;
  &.active{
    border-color: aqua;
  }
  img{
    position: absolute;
    width: 75%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>