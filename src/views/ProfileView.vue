<template>
    <component-to-re-render :key="componentKey" />
    <section class="profile">
      <div class="wrapper">
        <h1>Moj profil</h1>
        <div class="profile-card">
            <div class="profile-card__avatar"><img src="https://i.pravatar.cc/200?img=44" /></div>
            <div class="profile-card__details">
                <h3>Ime: {{$store.state.displayName}}</h3>
                <p>Adresa: Ulica Petra Krešimira IV 23</p>
                <p>Grad: Zagreb</p>
                <p>Telefon: +385 (91) 732 4270</p>
            </div>
        </div>
        <div class="qr-code">
            <qrcode-vue v-if="count" :value="count" :size="size" level="Q" foreground="#C14E2E" background="#FFFFFF" :render-as="svg" :margin=2 id="mycanvas" style="border-radius:8px;"/>
            <p>{{ count }}</p>
        </div>
      </div>
    </section>
  </template>
  
<script>
import QrcodeVue from 'qrcode.vue'

export default {
    data() {
        return {
            size: 250,
            componentKey: 0,
        };
    },
    components: {
      QrcodeVue,
    },
    computed: {
        count() {
            return this.$store.state.user.uid
        }
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;  
        },
    }
}
</script>
  