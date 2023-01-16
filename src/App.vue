<!-- eslint-disable prettier/prettier -->
<!-- v-if="!$store.state.user" -->
<template>
  <nav id="app">
    <router-link to="/" class="nav_logo"><img src="@/assets/logo_v1.svg" /></router-link>
    <router-link to="/">Naslovnica</router-link>
    <router-link to="/o-nama">O nama</router-link>
    <router-link to="/odjeli">Odjeli</router-link>
    <!--<router-link to="/programi">Programi</router-link>-->
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

  <button class="icon" @click="showMenu = !showMenu">
		<span></span>
		<span></span>
		<span></span>
	</button>
  <div v-if="showMenu" class="droper-content">
	  <router-link to="/" @click="showMenu = !showMenu; toggleNav()">NASLOVNICA</router-link>
		<router-link to="/o-nama" @click="showMenu = !showMenu; toggleNav()">O NAMA</router-link>
    <router-link to="/odjeli" @click="showMenu = !showMenu; toggleNav()">ODJELI</router-link>
    <router-link to="/programi" @click="showMenu = !showMenu; toggleNav()">PROGRAMI</router-link>
    <router-link to="/katalog" @click="showMenu = !showMenu; toggleNav()">KATALOG</router-link>
    <router-link v-if="$store.state.user" to="/profil" @click="showMenu = !showMenu; toggleNav()">PROFIL</router-link>
    <a v-if="$store.state.user" @click="$store.dispatch('logout')">ODJAVA</a>
	</div>
</template>

<script>
  import { onBeforeMount } from 'vue'
  import { useStore } from 'vuex'
  import $ from 'jquery'

  export default {
    data() {
      return {
        showMenu: false
      }
    },
    setup() {
      const store = useStore()
      onBeforeMount(() => {
        store.dispatch('fetchUser')
      })
    },
    mounted() {
      $(".icon").click(function() {
        $(".icon").toggleClass("open");
      });
    },
    methods: {
      toggleNav() {
        $(".icon").removeClass("open");
      }
    },
  }
</script>

<style>
  @import "@/style.css";
</style>
