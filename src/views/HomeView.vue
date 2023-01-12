<template>
  <section class="home_hero">
    <div class="overlay"></div>
    <div class="login_window">
      <div class="wrapper">
        <h1>Knjižnica Codex</h1>
        <h2>Dobrodošli na stranicu.</h2>
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
      <h1>The standard Lorem Ipsum</h1>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</p>
      <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
      <p>1914 translation by H. Rackham "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p>
    </div>
    
  </section>

  <!-- <BookView v-bind:product="selectedProduct" /> -->

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
      showModal: false
    }
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
