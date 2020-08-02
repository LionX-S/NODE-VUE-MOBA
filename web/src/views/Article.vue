<template>
  <div class="page-article" v-if="article">
    <div class="d-flex mt-3 pb-3 border-bottom">
      <div class="iconfont icon-fanhui" @click="back"></div>
      <strong class="flex-1 pl-2">{{article.title}}</strong>
      <div class="text-grey fs-sm">{{article.date | date}}</div>
    </div>
    <div v-html="article.body" class="px-3 body"></div>
    <div class="px-3 py-3 border-top">
      <div class="d-flex ai-center" >
        <i class="iconfont icon-Menu"></i>
        <strong class="pl-2">相关资讯</strong>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from "dayjs";

  export default {
    name: "Article",
    props: {
      id: {required: true},
    },
    data() {
      return {
        article: null
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`/articles/${this.id}`);
        if (res.data.code == 200) {
          this.article = res.data.result[0];
          console.log(this.article);
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
      date(val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<style lang="scss">
  .page-article{
    .body{
      img{
        max-width: 100%;
        height: auto;
      }
    }
  }

</style>