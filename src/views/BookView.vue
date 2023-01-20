<template>
  <div class="book-back">
    <a href="/">Knjižnica Codex</a>
    <a>></a>
    <a href="/katalog">Katalog</a>
    <a>></a>
    <a href="" v-for="item in items">{{ item.name }}</a>
  </div>

  <section class="book-row">
    <div class="wrapper-text">
      <img v-for="item in items" :key="item.id" v-bind:src="this.imageUrl" v-bind:alt="item.name" data-aos="fade-up" data-aos-duration="800" />
      
      <div class="book-row-info" v-for="item in items" :key="item.id">
        <p class="book-name">{{item.name}}</p>
        <p class="book-author">{{item.author}}</p>
        <span v-for="n in 5" :key="n" class="fa fa-star stars" :class="{ filled: n <= item.ocjena }"></span>
        <p class="book-desc">{{item.desc}}</p>
        <button v-if="$store.state.user && this.checked == false && $store.state.displayName != 'Administrator' && this.stanje > 0" @click="showAlert(item.id, item.stanje, item.isbn)">Rezerviraj</button>
        <button v-if="$store.state.user && this.checked == true" class="tooltip" disabled>Rezerviraj<span class="tooltiptext">Već ste rezervirali ovu knjigu.</span></button>
        <button v-if="$store.state.user && this.checked == false && this.stanje == 0" class="tooltip" disabled>Rezerviraj<span class="tooltiptext">Knjiga trenutno nije dostupna.</span></button>
      </div>
    </div>
  </section>

  <section class="inventory wrapper-text" v-for="item in items" :key="item.id">
    <p class="book-desc">Dostupno u knjižnici: {{item.stanje}}</p>
  </section>
  
  <section class="book" v-for="item in items" :key="item.id">
      <h3>Sažetak knjige</h3>
      <p>{{ item.desc }}</p>
      <h3>Detalji proizvoda</h3>
      <table>
        <tr>
          <td>Uvez:</td>
          <td>{{ item.uvez }}</td>
        </tr>
        <tr>
          <td>Izdavač:</td>
          <td>{{ item.izdavac }}</td>
        </tr>
        <tr>
          <td>Jezik:</td>
          <td>{{ item.jezik }}</td>
        </tr>
        <tr>
          <td>ISBN:</td>
          <td>{{ item.isbn }}</td>
        </tr>
      </table>
  </section>

  <div class="more-books-info"><p>Još iz iste kategorije</p><a href="/katalog">Katalog</a></div>
  <section class="more-books">
    <a v-for="more in mores.slice(0, 5)" :key="more.id" v-bind:href="'/'+more.url">
      <img v-if="more.cover" v-bind:src="more.cover" v-bind:alt="more.name" />
      <p>{{ more.name }}</p>
      <p>{{ more.author }}</p>
    </a>
  </section>

  <Footer></Footer>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { db } from "@/firebase";
import { doc, query, collection, where, addDoc, setDoc, getDocs, updateDoc, updateUser } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/storage';
import Footer from '@/components/Footer.vue';

export default {
  name: 'BookView',
  components: {
    Footer,
  },
  data() {
    return {
      items: [],
      reservations: [],
      mores: [],
      cat: null,
      checked: false,
      userId: null,
      bookCode: null,
      bookName: null,
      stanje: null,
      imageUrl: null,
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
        uvez: doc.data().uvez,
        izdavac: doc.data().izdavac,
        jezik: doc.data().jezik,
      }
      fbBooks.push(item)
      this.cat = item.vrsta
      this.bookCode = item.isbn
      this.bookName = item.name
      this.stanje = item.stanje
      const storage = getStorage();
      const storageRef = ref(storage, item.cover);
      getDownloadURL(storageRef).then(url => {
          console.log('Download URL', url)
          this.imageUrl = url
      })
      document.title = this.bookName + " - Knjižnica Codex";
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

    const bookSnap = await getDocs(query(collection(db, "books"), where("vrsta", "==", this.cat)));
    const moreBooks = []
    bookSnap.forEach((doc) => {
      const more = {
        cover: doc.data().coverImg,
        name: doc.data().name,
        author: doc.data().author,
        url: doc.data().url,
        isbn: doc.data().isbn,
      }
      if(more.isbn != this.bookCode) {
        moreBooks.push(more)
      }
    })
    this.mores = moreBooks;
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
          );
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
  },
};
</script>
  