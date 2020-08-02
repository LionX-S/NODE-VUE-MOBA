<template>
    <div class="card-herder d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </div>
</template>

<script>
  export default {
    name: "card",
    props:{
      title:{
        type:String,
        default:'',
        required:true
      },
      icon:{
        type:String,
        default: '',
        required:true
      }
    }
  }
</script>

<style scoped>

  .card .card-herder{
    border-bottom: 1px solid #cccccc;
  }
</style>