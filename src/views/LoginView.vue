<template>
  <section class="login" data-aos="fade-right" data-aos-duration="700">
      <h1>Prijava</h1>
      <form class="login_form" @submit.prevent="login">
        <input 
          type="email" 
          placeholder="E-mail adresa"
          v-model="login_form.email" />
        <input 
          type="password" 
          placeholder="Lozinka" 
          v-model="login_form.password" />
        <input 
          type="submit" 
          value="Prijava" />
        </form>
      <p v-if="$store.state.error">{{ $store.state.error }}</p>
  </section>
  <section id="register-image" data-aos="fade-left" data-aos-duration="700"></section>
</template>

<script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    setup () {
        const login_form = ref({});
        const store = useStore();
        const login = () => {
          store.dispatch('login', login_form.value);
        }
        return {
            login_form,
            login
        }
    }
  }
</script>