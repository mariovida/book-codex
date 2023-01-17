<template>
  <section class="about-hero">
    <div class="overlay"></div>
    <div class="about-hero-info">
      <h1>O nama</h1>
    </div>
  </section>
  <section class="about" data-aos="fade-up" data-aos-duration="600">
    <div class="wrapper">
      <div class="wrapper-text">
        <div class="about-hours">
          <h2>Radno vrijeme</h2>
          <p>ponedjeljak - petak: 08:00-20:00 sati<br/>subota: 08:00-14:00 sati</p>
        </div>
    
        <p><b>Knjižnica Codex</b> je knjižnica koja se fokusira na digitalizaciju i dostupnost što većeg broja knjiga. Naš katalog obuhvaća knjige iz svih oblasti, od povijesti do znanosti, književnosti, umjetnosti, publicistike i više.</p>
        <p>Uz osnovnu djelatnost, Knjižnica obilježava značajne datume, priređuje tematske izložbe, predstavljanja knjiga i autora, radionice, educira knjižničare i korisnike, priređuje odgojno-obrazovni rad s najmlađima. Knjižnica surađuje s gradskim ustanovama, privrednicima i udrugama u našem gradu i županiji.</p>
        <p>Knjižnica je dostupna svima putem interneta, a korisnici također mogu <b>rezervirati knjige i preuzeti ih na našoj adresi</b>. Također pružamo mogućnost pretraživanja kataloga po različitim kriterijima, kao što su naslov i žanr.</p>
        <p>Knjižnica Codex služi zadovoljavanju kulturnih potreba stanovništva, poticanju cjeloživotnog obrazovanja, stručnog i znanstvenog rada, informiranja, odlučivanja i demokratizacije društva općenito. Također imamo aktivnu zajednicu koja se okuplja oko knjižnice, uključujući članove, donatore i suradnike. Ova zajednica se trudi <b>promovirati čitanje i kulturu knjiga, pridonijeti razvoju kulturnog, gospodarskog i društvenog života, te pružiti podršku knjižnici u njenom cilju očuvanja i dostupnosti knjiga</b>.</p>
        <p>Knjižnica usluge pruža svojim članovima. Više o učlanjenju možete vidjeti u rubrici <a href="#uclanjenje">Učlanjenje</a>.</p>
        <p>Korisnik koji nije zadovoljan javnom uslugom može svoje primjedbe i žalbe na rad Knjižnice uputiti pisanim putem: mailom na adresu elektroničke pošte: <a href="mailto:codex@gkcodex.hr">codex@gkcodex.hr</a> ili upisom u Knjigu žalbi i primjedbi koja je dostupna na Informativno-posudbenom pultu Odjela za odrasle.</p>

        <h2 class="mt-56 mb-1">Naš tim</h2>
        <p>Naš tim čini preko 20 stručnjaka iz različitih područja.</p>
        <p>Glavna urednica je stručnjakinja za knjige, s dugogodišnjim iskustvom u digitalizaciji knjiga i očuvanju rijetkih primjeraka. Ona je odgovorna za kuriranje kataloga knjižnice i osiguravanje da knjige budu visoke kvalitete.</p>
        <p>Naši zaposelnici iz tima za marketing i komunikaciju odgovorni su za promoviranje knjižnice i njene misije, te za stvaranje i održavanje aktivne zajednice oko knjižnice. Oni također razvijaju i implementiraju strategije za privlačenje donatora i suradnika.</p>
        <p>Naš tim za podršku korisnicima odgovoran je za pružanje pomoći korisnicima u korištenju knjižnice i pristupanju knjigama. Oni također rade na rješavanju problema i odgovaraju na pitanja korisnika.</p>
        <div class="team">
          <swiper 
          :slidesPerView="1"
          :slidesPerGroup="1"
          :spaceBetween="50"
          :loopFillGroupWithBlank="true"
          :breakpoints="{
            '768': {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            '960': {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            '1280': {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            '1620': {
              slidesPerView: 4.5,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
          }"
          :modules="modules"
          >
            <swiper-slide>
              <div class="team-single"><img src="/team/emp1.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp2.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp3.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp4.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp5.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp6.jpg" /></div>
            </swiper-slide>
             <swiper-slide>
              <div class="team-single"><img src="/team/emp7.jpg" /></div>
            </swiper-slide>
            <swiper-slide>
              <div class="team-single"><img src="/team/emp8.jpg" /></div>
            </swiper-slide>
          </swiper>
        </div>

        <h2 id="uclanjenje" class="mt-56 mb-1">Učlanjenje</h2>
        <p>Učlanjenje u knjižnicu je <b>besplatno</b>. Kada se registrirate kao član u našoj knjižnici, dobivate pristup svim knjižničnim uslugama i resursima. To uključuje pristup knjigama, časopisima, e-knjigama, audio knjigama, filmovima i drugim medijima koje Vam nudimo.</p>
        <p>Članovi također imaju mogućnost rezerviranja knjiga i drugih medija, kao i pristup knjižničnim računalnim sustavima.</p>
        <p>Za registraciju je dovoljno ispuniti <a href="/registracija">kratku formu</a> čime ćete stvoriti svoj račun s kojim ostvarujete sve navedene pogodnosti.</p>
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
