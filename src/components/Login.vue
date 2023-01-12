<template>
    <section class="login">
        <Transition name="modal">
            <div v-if="show" class="modal-mask" ref="modal">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <form class="login-form" @submit.prevent="login">
                                <input 
                                ref="input"
                                type="email" 
                                placeholder="E-mail adresa"
                                v-model="login_form.email"
                                required />
                                <input 
                                type="password" 
                                placeholder="Lozinka" 
                                v-model="login_form.password" 
                                required/>
                                <input 
                                type="submit" 
                                value="Login" />
                            </form>
                        </slot>
                    </div>

                    <button class="modal-default-button" @click="$emit('close')"><img src="@/assets/close.png" /></button>
                     <transition name="fade"><p class="login-error" id="adio" v-if="$store.state.error">{{ $store.state.error }}</p></transition>
                </div>
            </div>
        </Transition>
  </section>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
  
    export default {
        props: {
            show: false
    },
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
    },
    mounted() {
        this.show && this.$refs.input.focus();
    }
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>