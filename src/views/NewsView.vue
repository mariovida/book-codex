<template>
    <section class="single-news">
        <div class="wrapper-text">
            <div class="single-news-nav">
                <a href="/">Knjižnica Codex</a>
                <a>></a>
                <a href="/novosti">Novosti</a>
                <a>></a>
                <a href="/" v-for="singleNews in news">{{ singleNews.title }}</a>
            </div>

            <div v-for="singleNews in news" :key="singleNews.id" data-aos="fade-up" data-aos-duration="700">
                <h1>{{ singleNews.title }}</h1>
                <p class="date">Objavljeno: {{ singleNews.date }} u {{ singleNews.time }}</p>
                <img src="/news.jpg" />
                <p class="content">{{ singleNews.content }}</p>
            </div>

            <h4>Nedavne novosti</h4>
            <div class="more-news" data-aos="fade-up" data-aos-duration="700">
                <a v-bind:href="recent.url" v-for="recent in moreNews" class="more-news-single">
                    <p class="date">{{ recent.date }}</p>
                    <h3>{{ recent.title }}</h3>
                    <p class="content">{{ recent.content }}</p>
                </a>
            </div>
        </div>
    </section>

    <Footer></Footer>
</template>
  
<script>
import { db } from "@/firebase";
import { doc, query, collection, where, getDocs, limit, orderBy } from "firebase/firestore";
import Footer from '@/components/Footer.vue';

export default {
    name: 'NewsView',
    components: {
        Footer,
    },
    data() {
        return {
            news: [],
            moreNews: [],
        };
    },
    async created() {
        this.id = this.$route.params.id;

        const checkNews = await getDocs(query(collection(db, "news"), where("url", "==", this.id)));
        let allNews = []
        checkNews.forEach((doc) => {
        const singleNews = {
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
        }
        document.title = singleNews.title + " - Knjižnica Codex";
        const dater = new Date(singleNews.date.seconds*1000)
        singleNews.date = dater.toLocaleDateString('de-DE')
        singleNews.time = dater.toLocaleTimeString('de-DE')
        allNews.push(singleNews)
        })
        this.news = allNews;

        const getMoreNews = await getDocs(query(collection(db, "news"), orderBy("date", "desc"), limit(3)));
        let recent = []
        getMoreNews.forEach((doc) => {
            const single = {
                title: doc.data().title,
                content: doc.data().content,
                date: doc.data().date,
                url: doc.data().url,
            }
            const dater = new Date(single.date.seconds*1000)
            single.date = dater.toLocaleDateString('de-DE')
            if(single.url != this.id) {
                recent.push(single)
            }
        })
        this.moreNews = recent;
    }
};
</script>