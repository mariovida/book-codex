<template>
    <section class="profile-hero">
        <div class="overlay"></div>
        <div class="profile-hero-info">
            <p>{{$store.state.displayName}}</p>
            <p v-if="$store.state.displayName!='Administrator'">Iskaznica: {{ $store.state.uidValue }}</p>
        </div>
    </section>

    <div class="qr-code">
        <qrcode-vue v-if="count" :value="count" :size="size" level="Q" foreground="#C14E2E" background="#FFFFFF" :render-as="svg" :margin=2 id="mycanvas" style="border-radius:8px;"/>
        <p>{{ count }}</p>
    </div>

    <section class="reservations" v-if="$store.state.displayName!='Administrator'">
        <div class="wrapper">
            <h3 v-if="book in books != null">Vaše rezervacije:</h3>
            <div v-for="book in books" :key="book.code">
                <p>{{ book.bookName }}</p>
            </div>
        </div>
    </section>

    <section class="admin-buttons" v-if="$store.state.displayName=='Administrator'">
        <div class="wrapper">
            <button v-on:click="showFirst = true">Dodavanje knjige</button>
            <button v-on:click="showFirst = false">Dodavanje novosti</button>
        </div>
    </section>

    <section v-if="showFirst && $store.state.displayName=='Administrator'" class="add-book">
        <div class="wrapper">
            <h1>Dodaj knjigu</h1>
            <form data-aos="fade-up" data-aos-duration="800">
                <input v-model="name" type="text" placeholder="Naziv knjige" required />
                <input v-model="author" type="text" placeholder="Autor" required />
                <input v-model="category" type="text" placeholder="Vrsta" required />

                <select v-model="uvez">
                    <option v-for="option in options" :value="option.value">{{ option.text }}</option>
                </select>
                <input v-model="izdavac" type="text" placeholder="Izdavač" required />
                <input v-model="jezik" type="text" placeholder="Jezik" required />

                <input v-model="stanje" type="number" placeholder="Stanje" required />
                <input v-model="isbn" type="number" placeholder="ISBN" required />
                <input v-model="ocjena" type="number" placeholder="Ocjena" required />

                <input v-model="desc" type="text" placeholder="Sadržaj" required />
                <input v-model="url" type="text" placeholder="URL" required />

                <button type="submit" @click="addBook()">Dodaj knjigu</button>
            </form>
        </div>
    </section>

    <section  v-if="!showFirst" class="add-news">
        <div class="wrapper">
            <h1>Dodaj vijest</h1>
            <form data-aos="fade-up" data-aos-duration="800">
                <input v-model="title" type="text" placeholder="Naslov" required />
                <textarea v-model="content" type="textarea" placeholder="Sadržaj" required></textarea>

                <button type="submit" @click="addNews()">Dodaj knjigu</button>
            </form>
        </div>
    </section>
        
    <Footer></Footer>
</template>
  
<script>
import QrcodeVue from 'qrcode.vue'
import { db } from "@/firebase";
import { doc, query, collection, where, addDoc, setDoc, getDocs, serverTimestamp  } from "firebase/firestore";
import Footer from '@/components/Footer.vue';

export default {
    data() {
        return {
            size: 250,
            books: [],
            showFirst: true,
            options: [
                { value: 'Meki uvez', text: 'Meki uvez' },
                { value: 'Tvrdi uvez', text: 'Tvrdi uvez' }
            ],
            uvez: 'Meki uvez'
        };
    },
    components: {
        QrcodeVue,
        Footer,
    },
    async created() {
        const userId = this.$store.state.uidValue;
        const querySnapshot = await getDocs(query(collection(db, "users"), where("user", "==", userId)));
        const allBooks = await getDocs(collection(db, "books"));

        let reservations = []

        querySnapshot.forEach((doc) => {
            const item = {
                isbn: doc.data().value,
            }
            allBooks.forEach((doc) => {
                const book = {
                    code: doc.data().isbn,
                    bookName: doc.data().name,
                }
                if(book.code == item.isbn) {
                    reservations.push(book)
                }
            })
            this.books = reservations;
        })
    },
    computed: {
        count() {
            return this.$store.state.user.uid
        }
    },
    methods: {
        async addBook() {
            try {
                const docRef = await setDoc(doc(db, "books", this.name), {
                    name: this.name,
                    author: this.author,
                    vrsta: this.category,
                    uvez: this.uvez,
                    category: this.category,
                    izdavac: this.izdavac,
                    jezik: this.jezik,
                    stanje: this.stanje,
                    cover: "/books/"+this.isbn+".jpg",
                    desc: this.desc,
                    id: null,
                    isbn: this.isbn,
                    ocjena: this.ocjena,
                    url: "knjiga/"+this.url,
                })
            } catch (error) {
                console.error(error)
            }
        },
        async addNews() {
            try {
                const docRef = await setDoc(doc(db, "news", this.title), {
                    title: this.title,
                    content: this.content,
                    date: serverTimestamp(),
                })
            } catch (error) {
                console.error(error)
            }
        },
    }
}
</script>