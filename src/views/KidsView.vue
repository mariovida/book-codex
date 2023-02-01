<template>
    <section class="department-nav">
        <div class="wrapper">
            <a href="/odjeli">Povratak</a>
            <a>|</a>
            <a href="/odjeli/djecji" class="active">Dječji odjel</a>
            <a href="/odjeli/odrasli">Odjel za odrasle</a>
            <a href="/odjeli/glazbeni">Glazbena zbirka</a>
        </div>
    </section>

    <section class="department">
        <div class="wrapper">
            <h1>Dječji odjel</h1>
            <div class="wrapper-text">
                <img src="@/assets/odjel-djeca.jpg" />
                <p>Odjel za odrasle nalazi se u prizemlju knjižnice i namijenjen je korisnicima starijim od 14 godina, ali vrlo rado primamo i naše najmlađe članove koji koriste usluge <a href="/odjeli/djecji">Dječjeg odjela</a>. Po broju članova, po bogatstvu knjižnog fonda i po veličini prostora Odjel za odrasle je najveći odjel knjižnice Codex.</p>
                <p>U svojem otvorenom prostoru na prvom katu, Odjel za odrasle ima više od 54 000 knjiga, DVD-a, stripova. S obzirom na to da naša Knjižnica, osim uloge narodne knjižnice, ima i stručno-znanstveni karakter, uz mnogobrojnu i raznovrsnu beletrističku literaturu, posjeduje i velik broj znanstvenih i stručnih publikacija te knjiga na stranim jezicima.</p>
                <p>Prostor Odjela za odrasle opremljen je mjestima prikladnima za odmor, instrukcije, individualni ili grupni rad koji ne zahtijeva strogo propisanu tišinu. Također, prostor Odjela korisnicima nudi na raspolaganje tri računala za pisanje i pristup internetu, pisač s mogućnostima kopiranja, printanja i skeniranja, a dostupna je i besplatna Wi-Fi mreža. Korisnici mogu sami ili uz pomoć stručnog osoblja pregledavati i pretraživati bogatu zbirku audiovizualne građe koja uključuje igrane i dokumentarne filmove, serije i koncerte.</p>
                <p>Informacijska služba Odjela za odrasle pronalazi literaturu za referate, seminarske, maturalne i završne radove, pretražuje vlastite baze podataka te izrađuje tematske ispise literature na traženu temu, poučava korisnike samostalnom korištenju kataloga i fonda, savjetuje korisnike pri izboru knjiga, izrađuje biltene prinovljenih knjiga, priređuje tematske izložbe i organizira međuknjižničnu posudbu knjiga.</p>
            </div>
        </div>
    </section>

    <Footer></Footer>
</template>
  
<script>
import Footer from '@/components/Footer.vue';

export default {
    name: 'KidsView',
    components: {
        Footer,
    },
    data() {
        return {};
    },
    created() {
        this.id = this.$route.params.id;
    },
};
</script>