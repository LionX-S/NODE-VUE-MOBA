<template>
  <div class="main">
    <div class=" bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" to="/" tag="div">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/" tag="div">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/" tag="div">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view>

    </router-view>
  </div>

</template>

<script>
  export default {
    name: "Main"
  }
</script>

<style scoped>

</style>