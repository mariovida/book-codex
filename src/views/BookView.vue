<template>
    <section class="book">
        <div class="wrapper">
            <p>The ID is: {{ id }}</p>
              <ul>
      <li v-for="item in filteredItems" :key="item.id">
        <p>{{ item.name }}</p>
    <p>{{ item.desc }}</p>     
    </li>
    </ul>
        </div>
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
     this.id = this.$route.params.id;
    axios.get('/test.json')
      .then(response => {
        this.items = response.data;
      });
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.url == this.id);
    }
  },
};
</script>
  