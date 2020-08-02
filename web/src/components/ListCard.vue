<template>
  <div class="card p-3  bg-white mt-3">
    <card :title="title" :icon="icon"></card>
    <div class="nav jc-between mt-3">
      <div class="nav-item"
           :class="{active:active===index}"
           v-for="(item,index) in categories"
           :key="index"
           @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link" @click="active=index">{{item.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" :options="{autoHeight:true}"
              @slide-change="()=>(active=$refs.list.swiper.realIndex)">
        <swiper-slide v-for="(item,index) in categories" :key="index">
          <slot :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import card from "./card";

  export default {
    name: "ListCard",
    components: {
      card
    },
    props: {
      title: {type: String, required: true},
      icon: {type: String, required: true},
      categories: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        active: 0
      }
    }
  }
</script>

<style scoped>
  .card {
    border-bottom: 1px solid #cccccc;
  }
</style>