<template>

<div v-for="book in books" :key="book.id">
    <p>{{ book.name }}</p>
    <p>{{ book.id }}</p>
    <button @click="reserveBook(book.id)">rezerviraj</button>
</div>
<!--<button @click="addTodo">dodaj</button>-->

</template>

<script>
import { db } from "@/firebase";
import { collection, doc, getDocs, addDoc, updateDoc } from "firebase/firestore";

export default {
    data () {
        return {
            books: [],
            count: 0
        }
    },
    async mounted() {
        const querySnapshot = await getDocs(collection(db, "books"));

        let fbBooks = []
        querySnapshot.forEach((doc) => {
        const book = {
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            vrsta: doc.data().vrsta,
            cover: doc.data().cover,
        }
        fbBooks.push(book)
        this.count = this.count + 1
        })
        this.books = fbBooks;
    },
    methods: {
        async addTodo() {
            const docRef = await addDoc(collection(db, "books"), {
                name: "Knjiga 2",
                author: "Neki pisac"
            });
        },
        async reserveBook(id) {
            await updateDoc(doc(db, "books", id), {
                ocjena: 4
            });
        }
    }
}
</script>