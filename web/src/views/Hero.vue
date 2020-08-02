<template>
  <div class="page-hero" v-if="heroMsg">
    <div class="top bg-primary py-3 text-center fs-xl">
      <i class="iconfont icon-fanhui" @click="back"></i>
      {{heroMsg.name}}
    </div>
    <div class="p-3 fs-xl ">
      <p class="my-2"><span>类型</span>:{{heroMsg.categoryId | type}}</p>
      <p class="my-2"><span>英雄介绍</span>:{{heroMsg.introduce}}</p>
      <p class="my-2"><span>标语</span>:{{heroMsg.slogan}}</p>
      <p><span>操作难度</span>:{{heroMsg.difficult}}颗星</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Hero",
    props: {
      id: {required: true}
    },
    data() {
      return {
        heroMsg: {}
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`/hero/${this.id}`);
        console.log(res);
        if (res.data.code == 200) {
          this.heroMsg = res.data.result;
        }
      },
      back(){
        this.$router.back();
      }
    },
    created() {
      this.fetch();
    },
    filters: {
      type(val) {
        switch (val) {
          case 1:
            return '重装';
          case 2:
            return '输出';
          case 3:
            return '支援';
          default:
            return '未知';
        }
      }
    }
  }
</script>

<style scoped>

</style>