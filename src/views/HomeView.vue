<template>
  <section class="home_hero">
    <div class="overlay"></div>
    <div class="login_window">
      <div class="wrapper">
        <h1>Knjižnica Codex</h1>
        <h2>Kao vaša lokalna i digitalna knjižnica, mi smo ovdje da vam pružimo pristup raznim knjigama, medijima i informacijama.</h2>
        <div v-if="$store.state.user===null" class="login_box">
          <!--<a href="/prijava" class="login-btn">Prijava</a>-->
          <a id="show-modal" class="login-btn" @click="showModal = true">PRIJAVA</a>
          <p>Nemaš račun? <router-link to="/registracija" target="self">Registriraj se</router-link></p>

          <Teleport to="body">
            <modal :show="showModal" @close="showModal = false">
              <template #header>
                <h3>Prijava</h3>
              </template>
            </modal>
          </Teleport>
        
        </div>
      </div>
    </div>
  </section>

  <section class="top-books" data-aos="fade-up" data-aos-duration="700">
    <div class="wrapper">
      <swiper 
        :slidesPerView="1"
        :slidesPerGroup="1"
        :spaceBetween="50"
        :loopFillGroupWithBlank="false"
        :autoplay="{
          delay: 4000 
        }"
        :breakpoints="{
          '960': {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          '1280': {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          '1620': {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween:30,
          },
        }"
        :modules="modules" 
        class="mySwiper"
      >
        <swiper-slide>
          <div class="book-cover">
            <img src="@/assets/book_covers/9780008283391.jpg" />
          </div>
          <div class="book-info">
            <h3>Still Life</h3>
            <p>Sarah Winman</p>
            <a href="knjiga/still-life">SAZNAJ VIŠE</a>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="book-cover">
            <img src="@/assets/book_covers/9781783786947.jpg" />
          </div>
          <div class="book-info">
            <h3>Passage North</h3>
            <p>Anuk Arudpragasam</p>
            <a href="knjiga/passage-north">SAZNAJ VIŠE</a>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="book-cover">
            <img src="@/assets/book_covers/9789531433334.jpg" />
          </div>
          <div class="book-info">
            <h3>Harry Potter i kamen mudraca</h3>
            <p>J.K. Rowling</p>
            <a href="knjiga/harry-potter-i-kamen-mudraca">SAZNAJ VIŠE</a>
          </div>
        </swiper-slide>
        <swiper-slide href="#">
          <div class="book-cover">
            <img src="@/assets/book_covers/9789538326394.jpg" />
          </div>
          <div class="book-info">
            <h3>Glukozna revolucija</h3>
            <p>Jessie Inchauspé</p>
            <a href="knjiga/glukozna-revolucija">SAZNAJ VIŠE</a>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <section class="news">
    <div class="wrapper wrapper-text">
      <h1>Novosti</h1>
      <p>Na stranici Knjižnice Codex se obično objavljuju informacije o novim knjigama koje su stigle u knjižnicu, predstojećim događajima poput predstavljanja knjiga i radionica, te rasporedima rada knjižnice. Također, mogu se naći i preporuke za knjige, informacije o online izdanjima i e-knjigama te razne druge vijesti vezane za knjižnicu.</p>
      <p>Na stranici se mogu pronaći i informacije o izdavačkim kućama, nagradama za knjige, autorskim čitanjima, kao i informacije o knjižničarima i knjižničarskim uslugama. Također, mogu se naći i recenzije knjiga, informacije o književnim klubovima i čitaonicama, kao i informacije o dostupnosti knjiga za iznajmljivanje ili kupnju.</p>
      <div class="news-single" v-for="item in news" :key="item.id">
        <div class="news-image"><img src="news.jpg" /></div>
        <div class="news-info">
          <p class="news-info__time">{{ item.date }} - {{ item.time  }}</p>
          <p class="news-info__title">{{ item.title }}</p>
          <p class="news-info__content">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </section>

  <Footer></Footer>
</template>

<script>
import $ from 'jquery'
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Footer from '@/components/Footer.vue';
import Modal from '@/components/Login.vue'
import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
    Modal,
    Footer,
  },
  data() {
    return {
      showModal: false,
      news: [],
      fullDate: '',
      fullTime: '',
    }
  },
  async created() {
    const newsSnap = await getDocs(collection(db, "news"));
    let allNews = []
    newsSnap.forEach((doc) => {
      const item = {
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
      }
      const dater = new Date(item.date.seconds*1000)
      item.date = dater.toLocaleDateString('de-DE')
      item.time = dater.toLocaleTimeString('de-DE')
      allNews.push(item)
    })
    this.news = allNews;
  },
  mounted() {
    $("#signup").click(function() {
      $(".message").css("transform", "translateX(100%)");
      if ($(".message").hasClass("login")) {
        $(".message").removeClass("login");
      }
      $(".message").addClass("signup");
    });

    // $("#login").click(function() {
    //   $(".message").css("transform", "translateX(0)");
    //   if ($(".message").hasClass("login")) {
    //     $(".message").removeClass("signup");
    //   }
    //   $(".message").addClass("login");
    // });
  },
  setup() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
}
</script>

<style>
  @import "@/style.css";
</style>
