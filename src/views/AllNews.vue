<template>
    <section class="all-news">
        <div class="wrapper-text">
            <div class="single-news-nav">
                <a href="/">Knjižnica Codex</a>
                <a>></a>
                <a href="/novosti">Novosti</a>
            </div>

            <h1>Novosti</h1>
            <div class="all-news-grid">
                <a v-bind:href="singleNews.url" v-for="singleNews in news" :key="singleNews.id" class="all-news-single">
                    <img src="/news.jpg" />
                    <div class="all-news-content">
                        <h1>{{ singleNews.title }}</h1>
                        <p class="date">{{ singleNews.date }}</p>
                        <p class="content">{{ singleNews.content }}</p>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <Footer></Footer>
</template>
  
<script>
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Footer from '@/components/Footer.vue';

export default {
    name: 'AllNews',
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
        const checkNews = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
        let allNews = []
        checkNews.forEach((doc) => {
        const singleNews = {
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
            url: "novosti/"+doc.data().url,
        }
        const dater = new Date(singleNews.date.seconds*1000)
        singleNews.date = dater.toLocaleDateString('de-DE')
        singleNews.time = dater.toLocaleTimeString('de-DE')
        allNews.push(singleNews)
        })
        this.news = allNews;
    }
};
</script>