<template>
  <div>
    <h1>posts</h1>
    <input
      type="text"
      v-model="todoName"
      
      aria-label="Add a new Todo"
      placeholder="Add a new Todo"
    />
    <ul>
        <input type="button" @click="addTodo" value="submit" />
      <li v-for="todo of posts" :key="todo.id">
        {{ todo.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/posts";

export default {
  name: "TodoList",
  data() {
    return {
      posts: [],
      todoName: ""
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.posts = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addTodo() {
      try {
        const res = await axios.post(baseURL, { name: this.todoName });

        this.posts = [...this.posts, res.data];

        this.todoName = "";
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>