<template>
    <section class="catalog-hero">
        <div class="overlay"></div>
        <div class="catalog-hero-info">
            <h1>Katalog</h1>
        </div>
    </section>

    <section class="catalog">
        <div class="wrapper">
            <div class="catalog-cat">
                <button @click="resetFilter">Prikaži sve</button>
                <button v-for="items in filterCategories" :key="items.vrsta" @click="filterByCategory(items.vrsta)">{{ items.vrsta }}</button>
                <input v-model="searchTerm" placeholder="Pretraga po nazivu" />
            </div>
        </div> 
    </section>

    <h2 v-if="selectedCategory=='Knjiga za mlade'" class="category wrapper-text">Knjige za mlade</h2>
    <h2 v-if="selectedCategory!='Knjiga za mlade'" class="category wrapper-text">{{ this.selectedCategory }}</h2>
    <section class="catalog-items wrapper">
        <a v-bind:href="item.url" v-if="selectedCategory && !searchTerm" v-for="item in filteredItems" :key="item.id" class="catalog-item" data-aos="fade-up" data-aos-duration="600"> 
            <img v-bind:src="item.cover" v-bind:alt="item.name">
            <div class="catalog-item-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.author }}</p>
                <span v-for="n in 5" :key="n" class="fa fa-star star" :class="{ filled: n <= item.ocjena }"></span>
                <a v-bind:href="item.url">SAZNAJ VIŠE</a>
            </div>
        </a>

        <a v-bind:href="item.url" v-if="searchTerm" v-for="item in filteredItemsSearch" :key="item.id" class="catalog-item">
            <img v-bind:src="item.cover" v-bind:alt="item.name">
            <div class="catalog-item-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.author }}</p>
                <span v-for="n in 5" :key="n" class="fa fa-star star" :class="{ filled: n <= item.ocjena }"></span>
                <a v-bind:href="item.url">SAZNAJ VIŠE</a>
            </div>
        </a>
        <!--<div v-if="noShow" class="no-books">
            <h3>Nema rezultata</h3>
            <p>Provjerite jeste li upisali točan naziv i pokušajte ponovno.</p>
        </div>-->

        <a v-bind:href="item.url" v-if="!selectedCategory && !searchTerm" v-for="item in filteredItemsAll" class="catalog-item" data-aos="fade-up" data-aos-duration="700">
            <img v-if="item.coverImg" v-bind:src="item.coverImg" v-bind:alt="item.cover">
            <img v-if="!item.cover" src="/books/book-placeholder.png" />
            <div class="catalog-item-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.author }}</p>
                <span v-for="n in 5" :key="n" class="fa fa-star star" :class="{ filled: n <= item.ocjena }"></span>
                <a v-bind:href="item.url">SAZNAJ VIŠE</a>
            </div>
        </a>

        <!-- <button class="load-more" @click="loadMore">Učitaj još</button> -->
    </section>

    <!-- <Footer></Footer> -->
</template>
  
<script>
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/storage';

export default {
    components: {
        Swiper,
        SwiperSlide,
        Footer,
    },
    data() {
        return {
            items: [],
            categories: [],
            selectedCategory: '',
            searchTerm: '',
            noShow: false,
        }
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay],
        };
    },
    async created() { 
        const querySnapshot = await getDocs(collection(db, "books"));
        let fbBooks = []
        querySnapshot.forEach((doc) => {
        const item = {
            id: doc.id,
            url: doc.data().url,
            name: doc.data().name,
            author: doc.data().author,
            vrsta: doc.data().vrsta,
            ocjena: doc.data().ocjena,
            cover: doc.data().cover,
            coverImg: doc.data().coverImg,
        }
        fbBooks.push(item)
        })
        this.items = fbBooks;
    },
    computed: {
        filterCategories() {
            return [...new Set(this.items.map(item => item.vrsta))].map(vrsta => {
                return {vrsta}
            })
        },
        filteredItemsSearch() {
            let search = this.searchTerm.toLowerCase();
            if(this.selectedCategory) {
                return this.items.filter(item => item.name.toLowerCase().includes(search) && item.vrsta === this.selectedCategory)
            } else if(this.items.filter(item => item.name.toLowerCase().includes(search)) != '') {
                this.noShow = false
                return this.items.filter(item => item.name.toLowerCase().includes(search))
            } else {
                return this.noShow = true
            }
        },
        filteredItemsAll() {
            return this.items.sort(() => Math.random() - 0.5);
        },
        filteredItems() {
            return this.items.filter(item => item.vrsta === this.selectedCategory)
        }
    },
    methods: {
        filterByCategory(category) {
            this.selectedCategory = category
        },
        resetFilter() {
            this.selectedCategory = ''
        },
        loadMore() {
            if (this.length > this.items.length) return;
            this.length = this.length + 4;
        },
    }
}
</script>