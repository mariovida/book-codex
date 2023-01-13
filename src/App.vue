<!-- eslint-disable prettier/prettier -->
<!-- v-if="!$store.state.user" -->
<template>
  <nav id="app">
    <router-link to="/" class="nav_logo"><img src="@/assets/logo_v1.svg" /></router-link>
    <router-link to="/">Naslovnica</router-link>
    <router-link to="/o-nama">O nama</router-link>
    <router-link to="/odjeli">Odjeli</router-link>
    <router-link to="/programi">Programi</router-link>
    <router-link to="/katalog">Katalog</router-link>
    <router-link v-if="$store.state.user" to="/profil">Profil</router-link>
    <a v-if="$store.state.user" @click="$store.dispatch('logout')">Odjava</a>
  </nav>
  <router-view/>

  <button onclick="myFunction()" class="icon">
		<span></span>
		<span></span>
		<span></span>
	</button>
</template>

<script>
  import { onBeforeMount } from 'vue'
  import { useStore } from 'vuex'
  import $ from 'jquery'

  export default {
    setup() {
      const store = useStore()
      onBeforeMount(() => {
        store.dispatch('fetchUser')
      })
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    },
    mounted() {
      const icon = document.querySelector('.icon');
      icon.addEventListener('click', () => {
        if(!icon.classList.contains('open')) {
          icon.classList.add('open');
        } else {
          icon.classList.remove('open');
        }
      });
    }
  }
</script>

<style>
  @import "@/style.css";
</style>
