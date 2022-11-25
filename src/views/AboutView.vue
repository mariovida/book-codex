<template>
  <section class="about">
    <div class="wrapper">
      <h1>O nama</h1>

      <swiper 
        :loop="true"
        :autoplay="{
          delay: 3000 
        }"
        :pagination="{
          clickable: true,
        }" 
        :modules="modules" 
        class="mySwiper"
      >
        <swiper-slide><img src="@/assets/about1.jpg" /></swiper-slide>
        <swiper-slide><img src="@/assets/header-img2.jpg" /></swiper-slide>
      </swiper>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
  import { Navigation, Pagination, Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.min.css';
  import 'swiper/swiper.min.css';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'App',
    components: {
      Swiper,
      SwiperSlide,
      Footer,
    },
    setup() {
      return {
        modules: [Navigation, Pagination, Autoplay],
      };
    },
  }
</script>
