<template>
    <section class="profile">
      <div class="wrapper">
        <h1>Moj profil</h1>
        <div class="profile-card">
            <div class="profile-card__avatar"><img src="https://i.pravatar.cc/200?img=44" /></div>
            <div class="profile-card__details">
                <h3>Ime: {{$store.state.displayName}}</h3>
                <p>Adresa: Ulica Petra Krešimira IV 23</p>
                <p>Grad: Zagreb</p>
                <p>Telefon: +385 (91) 732 4270</p>
            </div>
        </div>
        <div class="qr-code">
            <qrcode-vue v-if="count" :value="count" :size="size" level="Q" foreground="#C14E2E" background="#FFFFFF" :render-as="svg" :margin=2 id="mycanvas" style="border-radius:8px;"/>
            <p>{{ count }}</p>
        </div>
         
      </div>
    </section>
    <div v-for="book in books" :key="book.code">
            <p>{{ book.bookName }}</p>
        </div>
</template>
  
<script>
import QrcodeVue from 'qrcode.vue'
import { db } from "@/firebase";
import { doc, query, collection, where, addDoc, setDoc, getDocs, updateDoc, updateUser } from "firebase/firestore";

export default {
    data() {
        return {
            size: 250,
            books: [],
        };
    },
    components: {
      QrcodeVue,
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
}
</script>