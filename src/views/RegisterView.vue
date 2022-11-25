<template>
    <section class="register">
        <div class="wrapper">
            <h1>Registracija</h1>
            <h2>Želiš rezervirati knjige?</h2>
            <form class="register_form" @submit.prevent="register">
                <input 
                    type="text" 
                    placeholder="Name"
                    v-model="register_form.name" />
                <input 
                    type="email" 
                    placeholder="Email address"
                    v-model="register_form.email" />
                <input 
                    type="password" 
                    placeholder="Password" 
                    v-model="register_form.password" />
                <input 
                    type="submit" 
                    value="Register" />
            </form>
        </div>
    </section>
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
        }
    }
</script>
  
<style>
</style>
  