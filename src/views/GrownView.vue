<template>
    <section class="department-nav">
        <div class="wrapper">
            <a href="/odjeli">Povratak</a>
            <a>|</a>
            <a href="/odjeli/djecji">Dječji odjel</a>
            <a href="/odjeli/odrasli" class="active">Odjel za odrasle</a>
            <a href="/odjeli/glazbeni">Glazbena zbirka</a>
        </div>
    </section>

    <section class="department">
        <div class="wrapper">
            <h1>Odjel za odrasle</h1>
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'GrownView',
    data() {
        return {};
    },
    created() {
        this.id = this.$route.params.id;
    }
};
</script>