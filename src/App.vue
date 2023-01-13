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
    <div  v-if="$store.state.user" class="dropdown">
      <button class="dropbtn">{{$store.state.displayName.substring(0, 1)}}</button>
      <div class="dropdown-content">
        <router-link v-if="$store.state.user" to="/profil">Profil</router-link>
        <a v-if="$store.state.user" @click="$store.dispatch('logout')">Odjava</a>
      </div>
    </div>
  </nav>
  <router-view/>

  <button onclick="myFunction()" class="icon">
		<span></span>
		<span></span>
		<span></span>
	</button>
  <div class="droper-content">
	  <a href="momcadi/momcadi.php">MOMČADI</a>
		<a href="#">NATJECANJA</a>
		<a href="#">O KLUBU</a>
	</div>
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
      const content = document.querySelector('.droper-content');
      icon.addEventListener('click', () => {
        if(!icon.classList.contains('open')) {
          icon.classList.add('open');
          content.classList.add('show');
        } else {
          icon.classList.remove('open');
          content.classList.remove('show');
        }
      });
    }
  }
</script>

<style>
  @import "@/style.css";
</style>
