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

      <div class="wrapper-text">
        <div class="about-hours">
          <h2>Radno vrijeme</h2>
          <p>ponedjeljak - petak: 08:00-20:00 sati<br/>subota: 08:00-14:00 sati</p>
        </div>
    
        <p><b>Knjižnica Codex</b> je knjižnica čija je osnovna djelatnost nabava, obrada, čuvanje i pružanje na korištenje sveukupne knjižnične građe.</p>
        <p>Uz osnovnu djelatnost, Knjižnica obilježava značajne datume, priređuje tematske izložbe, predstavljanja knjiga i autora, radionice, educira knjižničare i korisnike, priređuje odgojno-obrazovni rad s najmlađima. Knjižnica surađuje s gradskim ustanovama, privrednicima i udrugama u našem gradu i županiji.</p>
        <p>Knjižnica služi zadovoljavanju kulturnih potreba stanovništva, poticanju cjeloživotnog obrazovanja, stručnog i znanstvenog rada, informiranja, odlučivanja i demokratizacije društva općenito. Knjižnica je središnje mjesto za pružanje brzih i kvalitetnih informacija te gradsko sastajalište koje nudi brojne sadržaje za sve dobne skupine, od beba do umirovljenika. Knjižnica Codex pridonosi razvoju kulturnog, gospodarskog i društvenog života našeg grada i županije.</p>
        <p>Knjižnica usluge pruža svojim članovima. O učlanjenju vidjeti više u rubrici Usluge.</p>
        <p>Korisnik koji nije zadovoljan javnom uslugom može svoje primjedbe i žalbe na rad Knjižnice uputiti pisanim putem: mailom na adresu elektroničke pošte: <a href="mailto:codex@gkcodex.hr">codex@gkcodex.hr</a> ili upisom u Knjigu žalbi i primjedbi koja je dostupna na Informativno-posudbenom pultu Odjela za odrasle.</p>
      </div>
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
