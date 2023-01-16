<template>
    <section class="register" data-aos="fade-right" data-aos-duration="700">
        <h1>Registracija</h1>
        <p class="register-info">Želiš rezervirati knjige?</p>
        <form class="register_form" @submit.prevent="register">
            <input 
                type="text" 
                placeholder="Ime"
                v-model="register_form.name"
                required />
            <input 
                type="email" 
                placeholder="E-mail adresa"
                v-model="register_form.email"
                required />
            <input 
                type="password" 
                placeholder="Lozinka" 
                v-model="register_form.password"
                required />
            <input 
                type="submit" 
                value="Registracija" />
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
        const register_form = ref({});
        const store = useStore();
        const register = () => {
            store.dispatch('register', register_form.value);
        }
        return {
            register_form,
            register
        }
    },
}
</script>
  
<style>
</style>
  