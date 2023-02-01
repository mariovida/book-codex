<template>
    <section class="department-nav">
        <div class="wrapper">
            <a href="/odjeli">Povratak</a>
            <a>|</a>
            <a href="/odjeli/djecji">Dječji odjel</a>
            <a href="/odjeli/odrasli">Odjel za odrasle</a>
            <a href="/odjeli/glazbeni" class="active">Glazbena zbirka</a>
        </div>
    </section>

    <section class="department">
        <div class="wrapper">
            <h1>Glazbena zbirka</h1>
            <div class="wrapper-text">
                <img src="@/assets/odjel-glazba.jpg" />
                <p>Ovaj odjel s oko 50.000 jedinica audiovizualne i notne građe nudi članovima kompaktne zvučne ploče (CD), DVD, zvučne i videokasete, gramofonske ploče, note, glazbene časopise, knjige i priručnike. AV građa se može posuditi na rok od 10 dana, a note i knjige na 21 dan i/ili koristiti u knjižnici. Zastupljena su sva područja glazbe, od narodne, umjetničke i jazz glazbe do pop i rock, dance glazbe i dr.</p>
                <p>Glazbeni odjel priređuje <b>koncerte ili glazbene promocije</b>.</p>
                <p>Glazbeni odjel ima ulogu matičnog odjela. Aktivno sudjeluje u organiziranju i savjetovanju u razvoju drugih audiovizualnih zbirki, edukaciji djelatnika za rad u takvim zbirkama i odjelima. Na redovitim sastancima koordinira nabavu i obradu audiovizualne građe glazbenog sadržaja ostalim odjelima. Kreira i provodi razne oblike kulturnih, obrazovnih, edukativnih i ostalih aktivnosti (prigodni koncerti, promocije, tematske izložbe, radionice, suradnja s brojnim glazbenim ustanovama, dobrotvornim i profesionalnim udruženjima).</p>
            </div>
        </div>
    </section>

    <Footer></Footer>
</template>
  
<script>
import Footer from '@/components/Footer.vue';

export default {
    name: 'MusicView',
    components: {
        Footer,
    },
    data() {
        return {};
    },
    created() {
        this.id = this.$route.params.id;
    }
};
</script>