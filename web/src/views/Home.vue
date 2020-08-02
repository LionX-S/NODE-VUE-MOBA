<template>
  <div class="home">
    <swiper>
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
    </swiper>
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div>英雄</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div>故事</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-shequ"></i>
          <div>社区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-league"></i>
          <div>联赛</div>
        </div>
      </div>
      <!--      <div class="bg-light py-2 fs-sm">-->
      <!--        收起-->
      <!--      </div>-->
    </div>
    <list-card title="新闻资讯" icon="Menu" :categories="categories">
      <template v-slot:default="data">
        <router-link :to="`/articles/${item.id}`" class="py-2 d-flex" tag="div" v-for="(item,i) in data.category.artilces" :key="i">
          <span class="text-info">【新闻】</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipse pr-2">{{item.title}}</span>
          <span class="text-grey fs-sm">{{item.date |date}}</span>
        </router-link>
      </template>
    </list-card>
    <list-card title="英雄列表" icon="card-hero" :categories="hero">
      <template v-slot:default="data">
        <div class="d-flex flex-wrap">
          <router-link :to="`/heroes/${item.id}`" class="p-2 text-center"
               v-for="(item,i) in data.category.heroList"
               :key="i"
               style="width: 20%">
            <a href="">
              <img :src="item.avtar" alt="" class="w-100">
              <p>{{item.name}}</p>
            </a>
          </router-link>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>
  import ListCard from "../components/ListCard";
  import dayjs from 'dayjs'

  export default {
    name: 'carrousel',
    components: {
      ListCard
    },
    data() {
      return {
        // swiperOptions: {
        //   pagination: {
        //     el: '.swiper-pagination'
        //   },
        //   // Some Swiper option/callback...
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   }
        // },
        categories: [
          {
            name: '新闻',
            artilces: []
          }
        ],
        hero: []
      }
    },
    methods: {
      async fetchNews() {
        const res = await this.$http.get('articles/list');
        this.categories[0].artilces = res.data.result;
      },
      async fetchHero() {
        const res = await this.$http.get('heroes/list');
        let obj1 = {
          name: '',
          heroList: []
        };
        let obj2 = {
          name: '',
          heroList: []
        };
        let obj3 = {
          name: '',
          heroList: []
        };
        res.data.result.forEach((item) => {
          if (item.categoryId == 1) {
            obj1.name = '重装';
            obj1.heroList.push({
              id:item.id,
              name: item.name,
              avtar: item.avtar
            })
          } else if (item.categoryId == 2) {
            obj2.name = '输出';
            obj2.heroList.push({
              id:item.id,
              name: item.name,
              avtar: item.avtar
            })
          } else {
            obj3.name = '支援';
            obj3.heroList.push({
              id:item.id,
              name: item.name,
              avtar: item.avtar
            })
          }
        });
        this.hero.push(obj1, obj2, obj3);
      }
    },
    created() {
      this.fetchNews();
      this.fetchHero();
    },
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    }
  }
</script>
<style scoped>
  .nav-icons .nav-item {
    width: 25%;
  }

  .sprite {
    background: url('../assets/img/index.png') no-repeat 0 0;
    background-size: 28.846rem 35rem;
    display: inline-block;
  }

  .sprite-news {
    background-position: 10.408% 27.209%;
    width: 1.538rem;
    height: 1.923rem;
  }

  .sprite-story {
    background-position: 90.057% 41.387%;
    width: 1.769rem;
    height: 1.769rem;
  }

  .sprite-shequ {
    background-position: 36.827% 41.272%;
    width: 1.692rem;
    height: 1.769rem;
  }

  .sprite-league {
    background-position: 63.546% 27.535%;
    width: 1.769rem;
    height: 1.615rem;
  }
</style>