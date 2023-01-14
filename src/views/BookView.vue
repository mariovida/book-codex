<template>
  <a href="/katalog" class="book-back">Popis knjiga</a>
  <section class="book-row">
    <div class="wrapper">
      <img v-for="item in filteredItems" :key="item.id" v-bind:src="'/'+item.cover" v-bind:alt="item.name" data-aos="fade-up" data-aos-duration="800" />
      <div class="book-row-info" v-for="item in filteredItems" :key="item.id">
        <p class="book-name">{{item.name}}</p>
        <p class="book-author">{{item.author}}</p>
        <span v-for="n in 5" :key="n" class="fa fa-star stars" :class="{ filled: n <= item.ocjena }"></span>
        <p class="book-desc">{{item.desc}}</p>
      </div>
    </div>
  </section>
  <section class="book">
  </section>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'BookView',
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.id = "knjiga/" + this.$route.params.id;
    axios.get('/books.json').then(response => {
      this.items = response.data;
    });
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.url === this.id);
    }
  },
};
</script>
  