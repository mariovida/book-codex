<template>
  <section class="login">
      <div class="wrapper">
          <h1>Prijava</h1>
          <h2></h2>
          <form class="login_form" @submit.prevent="login">
            <input 
              type="email" 
              placeholder="Email address"
              v-model="login_form.email" />
            <input 
              type="password" 
              placeholder="Password" 
              v-model="login_form.password" />
            <input 
              type="submit" 
              value="Login" />
          </form>
      </div>
  </section>
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