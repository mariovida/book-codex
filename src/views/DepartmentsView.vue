<template>
    <section class="departments" data-aos="fade-up" data-aos-duration="700">
      <div class="wrapper">
        <h1>Odjeli</h1>

        <div class="departments-box">
          <a href="odjeli/djecji" class="box">
            <div class="box-1">
              <div class="overlay"></div>
              <p>Dječji odjel</p>
            </div>
          </a>
          <a href="odjeli/odrasli" class="box">
            <div class="box-2">
              <div class="overlay"></div>
              <p>Odjel za odrasle</p>
            </div>
          </a>
          <a href="odjeli/glazbeni" class="box">
            <div class="box-3">
              <div class="overlay"></div>
              <p>Glazbena zbirka</p>
            </div>
          </a>
        </div>

        <div class="wrapper-text">
          <p>Čitaonica je smještena na prvom katu knjižnice. Korisnicima su na raspolaganju <b>12 radnih mjesta i dva računala s pristupom internetu</b>. U prostoru Čitaonice povremeno se održavaju tribine, koncerti i prigodna predavanja.</p>
          <p>Čitaonica novina i časopisa sadrži veliku zbirku periodike u Hrvatskoj, značajnu za nacionalnu povijest, a posebno za povijest grada. U fondu su zastupljeni vrijedni naslovi domaćih i stranih časopisa i novina od 19. stoljeća do danas. Sadržajno, zbirka obuhvaća naslove iz različitih područja znanosti i kulture koji, kao dokumenti vremena, svjedoče o općem gospodarskom i društveno-političkom stanju u pojedinim razdobljima.</p>
          <p>U posjedu zbirke nalazi se <b>1237 naslova s preko 200 000 pojedinačnih brojeva uvezanih u 20 000 svezaka</b>. Fond se sustavno popunjava kupnjom, zakonskim primjerkom, otkupom, darovima i razmjenom. Trenutačno nabavljamo 200 tekućih naslova (146 domaćih časopisa, 27 stranih časopisa i 27 novina).</p>
          <p>Svi naslovi i pripadajući primjerci koji ulaze u fond zbirke obrađuju se u elektroničkom katalogu. Pojedina godišta uvezuju se u sveske, a građa je razvrstana po principu tekućeg broja (numerus currens).</p>
          <p>U fondu Čitaonice zastupljeni su časopisi, novine i tjednici, dok se godišnjaci, zbornici i pojedinačni tematski brojevi nalaze u drugim zbirkama knjižnice.</p>
        </div>
      </div>
    </section>

    <Footer></Footer>
</template>
  
<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'DepartmentsView',
  components: {
    Footer,
  },
}
</script>
  