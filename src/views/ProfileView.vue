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
      </div>
    </section>
  </template>
  
<script>
export default {
    data() {
        return {
            componentKey: 0,
        };
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;  
        }
    }
}
</script>
  