<template>
  <a href="/katalog" class="book-back"><i class="fa-regular fa-left-long"></i> Katalog</a>
  <section ref="myComponent" class="book-row">
    <div class="wrapper-text">
      <img v-for="item in items" :key="item.id" v-bind:src="'/'+item.cover" v-bind:alt="item.name" data-aos="fade-up" data-aos-duration="800" />
      <div class="book-row-info" v-for="item in items" :key="item.id">
        <p class="book-name">{{item.name}}</p>
        <p class="book-author">{{item.author}}</p>
        <span v-for="n in 5" :key="n" class="fa fa-star stars" :class="{ filled: n <= item.ocjena }"></span>
        <p class="book-desc">{{item.desc}}</p>
        <p class="book-desc">{{item.stanje}}</p>

        <button v-if="$store.state.user && this.checked == false" @click="showAlert(item.id, item.stanje, item.isbn)">Rezerviraj</button>
      </div>
    </div>
  </section>
  <section class="book" style="margin-top:60px;">

  </section>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { db } from "@/firebase";
import { doc, query, collection, where, addDoc, setDoc, getDocs, updateDoc, updateUser } from "firebase/firestore";
import { ref } from 'vue';

export default {
  name: 'BookView',
  data() {
    return {
      items: [],
      reservations: [],
      checked: false,
      userId: null,
      bookCode: null,
    };
  },
  async created() {
    this.id = "knjiga/" + this.$route.params.id;
    
    const querySnapshot = await getDocs(query(collection(db, "books"), where("url", "==", this.id)));
    let fbBooks = []
    querySnapshot.forEach((doc) => {
      const item = {
        id: doc.id,
        url: doc.data().url,
        name: doc.data().name,
        author: doc.data().author,
        desc: doc.data().desc,
        vrsta: doc.data().vrsta,
        ocjena: doc.data().ocjena,
        cover: doc.data().cover,
        stanje: doc.data().stanje,
        isbn: doc.data().isbn,
      }
      fbBooks.push(item)
      this.bookCode = item.isbn
    })
    this.items = fbBooks;

    const userId = this.$store.state.uidValue;
    const checkReservation = await getDocs(collection(db, "users"));
    let reservedBooks = []
    checkReservation.forEach((doc) => {
      const book = {
        user: doc.data().user,
        value: doc.data().value,
      }
      if(book.user == userId && book.value == this.bookCode) {
        this.checked = true;
      }
      reservedBooks.push(book)
    })
    this.reservations = reservedBooks;
  },
  methods: {
    showAlert(id, stanje, isbn) {
      Swal.fire({
        title: 'Jeste li sigurni?',
        text: "Želite li rezervirati ovu knjigu?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#CF5330',
        cancelButtonColor: '#B3B3B3',
        cancelButtonText: 'Poništi',
        confirmButtonText: 'Da, rezerviraj!'
      }).then((result) => {
        if (result.value) {
          this.reserveBook(id, stanje, isbn)
          Swal.fire(
            'Rezervirano!',
            'Knjiga je rezervirana.',
            'success'
          ).then(() => {
            reloadComponent()
          });
        
        }
      })
    },
    async reserveBook(id, stanje, isbn) {
      const newStanje = stanje - 1;
      const uid = this.$store.state.uidValue;
      const bookCode = isbn;

      await updateDoc(doc(db, "books", id), {
        stanje: newStanje
      });
      await addDoc(collection(db, "users"), {
        user: uid,
        value: bookCode 
      });
    },
    reloadComponent() {
      this.$refs.myComponent.$forceUpdate()
    }
  },
};
</script>
  