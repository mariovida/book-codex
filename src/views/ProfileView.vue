<template>
    <section class="profile-hero">
        <div class="overlay"></div>
        <div class="profile-hero-info">
            <p>{{$store.state.displayName}}</p>
            <p v-if="$store.state.displayName!='Administrator'">Iskaznica: {{ $store.state.uidValue }}</p>
        </div>
    </section>

    <div class="qr-code" v-if="$store.state.displayName!='Administrator'">
        <p>Vaša digitalna iskaznica s kojom ostvarujete pogodnosti u našoj knjižnici.</p>
        <qrcode-vue :size="size" level="Q" foreground="#C14E2E" background="#FFFFFF" :render-as="svg" :margin=2 id="mycanvas" style="border-radius:8px;"/>
        <p>{{ count }}</p>
    </div>

    <section class="reservations" v-if="$store.state.displayName!='Administrator'">
        <div class="wrapper">
            <div class="reservations-list">
                <h3 v-if="book in books != null">Vaše trenutne rezervacije:</h3>
                <div v-for="(book, count) in books" :key="book.code" class="single-reservation">
                    <div class="reservation-counter">{{ count + 1 }}</div>
                    <div class="reservation-info">
                        <p>{{ book.bookName }}</p>
                    </div>
                    <div class="reservation-delete" @click="deleteAlert(book.bookId, book.id)">X</div>
                </div>
            </div>

            <div class="reservations-status" v-if="$store.state.displayName!='Administrator'">
                <p>Vaša digitalna iskaznica s kojom ostvarujete pogodnosti u našoj knjižnici.</p>
                <qrcode-vue :size="size" level="Q" foreground="#C14E2E" background="#FFFFFF" :render-as="svg" :margin=2 id="mycanvas" style="border-radius:8px;"/>
                <p class="reservations-status-info">Broj rezervacija: {{ this.count }}</p>
            </div>
        </div>
    </section>

    <section class="admin-buttons" v-if="$store.state.displayName=='Administrator'">
        <div class="wrapper">
            <button v-on:click="showFirst = true, showSecond = false, showThird = false">Dodavanje knjige</button>
            <button v-on:click="showFirst = false, showSecond = true, showThird = false">Dodavanje novosti</button>
            <button v-on:click="showFirst = false, showSecond = false, showThird = true">Pregled rezervacija</button>
        </div>
    </section>

    <section v-if="showFirst && $store.state.displayName=='Administrator'" class="add-book">
        <div class="wrapper">
            <h1>Dodavanje knjige</h1>
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
                <input v-on:change="imageUrl" type="file" ref="image" @change="uploadImage" required/>

                <button type="submit" @click="addBook()">Dodaj knjigu</button>
            </form>
        </div>
    </section>

    <section  v-if="showSecond" class="add-news">
        <div class="wrapper">
            <h1>Dodavanje novosti</h1>
            <form data-aos="fade-up" data-aos-duration="800">
                <input v-model="title" type="text" placeholder="Naslov" required />
                <textarea v-model="content" type="textarea" placeholder="Sadržaj" required></textarea>
                <input v-model="url" type="text" placeholder="URL" required />

                <button type="submit" @click="addNews()">Dodaj novost</button>
            </form>
        </div>
    </section>

    <section  v-if="showThird" class="show-reservations">
        <div class="wrapper">
            <h1>Pregled rezervacija</h1>
            <div v-for="(reserve, count) in reservations" :key="reserve.user" class="single-reservation" data-aos="fade-up" data-aos-duration="800">
                <div class="reservation-counter">{{ count + 1 }}</div>
                <div class="reservation-info" style="border-radius:8px">
                    <p><b>NASLOV KNJIGE:</b> {{ reserve.name }}</p>
                    <p><b>ISBN:</b> {{ reserve.isbn }}</p>
                    <p><b>ISKAZNICA:</b> {{ reserve.user }}</p>
                </div>
                <div class="reservation-delete-admin" @click="deleteAlert(reserve.bookId, reserve.id)">X</div>
            </div>
        </div>
    </section>
        
    <Footer></Footer>
</template>
  
<script>
import QrcodeVue from 'qrcode.vue'
import { db } from "@/firebase";
import { doc, query, collection, where, updateDoc, setDoc, getDocs, deleteDoc, serverTimestamp, increment } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/storage';
import Swal from 'sweetalert2';
import Footer from '@/components/Footer.vue';

export default {
    data() {
        return {
            size: 250,
            books: [],
            reservations: [],
            showFirst: true,
            showSecond: false,
            showThird: false,
            options: [
                { value: 'Meki uvez', text: 'Meki uvez' },
                { value: 'Tvrdi uvez', text: 'Tvrdi uvez' }
            ],
            uvez: 'Meki uvez',
            count: 0,
            coverImgUrl: null,
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
        const allReservations = await getDocs(collection(db, "users"));

        let reservations = []
        let allReserve = []

        querySnapshot.forEach((doc) => {
            const item = {
                id: doc.id,
                isbn: doc.data().value,
            }
            allBooks.forEach((doc) => {
                const book = {
                    id: item.id,
                    bookId: doc.id,
                    code: doc.data().isbn,
                    bookName: doc.data().name,
                }
                if(book.code == item.isbn) {
                    reservations.push(book)
                    this.count = this.count + 1;
                }
            })
            this.books = reservations;
        })
        allReservations.forEach((doc) => {
            const reserve = {
                id: doc.id,
                user: doc.data().user,
                isbn: doc.data().value,
            }
            allBooks.forEach((doc) => {
                const book = {
                    id: reserve.id,
                    bookId: doc.id,
                    code: doc.data().isbn,
                    bookName: doc.data().name,
                }
                if(book.code == reserve.isbn) {
                    reserve.name = book.bookName;
                    reserve.bookId = book.bookId;
                }
            })
            allReserve.push(reserve)
        })
        this.reservations = allReserve;
    },
    computed: {
        count() {
            return this.$store.state.user.uid
        }
    },
    methods: {
        async uploadImage(e) {
            const file = this.$refs.image.files[0]
            const storage = getStorage();
            if (file) {
                const storageRef = ref(storage, 'books/' + file.name);
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded!');
                    getDownloadURL(storageRef).then(url => {
                        console.log('Download URL', url)
                        this.coverImgUrl = url
                    })
                });
            }
        },
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
                    cover: "books/"+this.isbn+".jpg",
                    desc: this.desc,
                    id: null,
                    isbn: this.isbn,
                    ocjena: this.ocjena,
                    url: "knjiga/"+this.url,
                    coverImg: this.coverImgUrl,
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
                    url: this.url
                })
            } catch (error) {
                console.error(error)
            }
        },
        deleteAlert(bookId, id) {
            Swal.fire({
                title: 'Jeste li sigurni?',
                text: "Želite li otkazati ovu rezervaciju?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#CF5330',
                cancelButtonColor: '#B3B3B3',
                cancelButtonText: 'Prekid',
                confirmButtonText: 'Da, otkaži!'
            }).then((result) => {
                if (result.value) {
                this.deleteReservation(bookId, id)
                Swal.fire(
                    'Rezervacija je otkazana!',
                    'Stranica će se osvježiti za 5 sekundi.',
                    'success'
                );
                
                }
            })
        },
        async deleteReservation(bookId, id) {
            await updateDoc(doc(db, "books", bookId), {
                stanje: increment(1)
            });

            await deleteDoc(doc(db, "users", id));
            setTimeout(function(){
                window.location.reload();
            }, 4000);
        },
    }
}
</script>