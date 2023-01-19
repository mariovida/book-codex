<template>
    <section class="department-nav">
        <div class="wrapper">
            <a href="/odjeli">Povratak</a>
            <a>|</a>
            <a href="/odjeli/djecji" class="active">Dječji odjel</a>
            <a href="/odjeli/odrasli">Odjel za odrasle</a>
            <a href="/odjeli/glazbeni">Glazbena zbirka</a>
        </div>
    </section>

    <section class="department">
        <div class="wrapper">
            <h1>Dječji odjel</h1>
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'KidsView',
    data() {
        return {};
    },
    created() {
        this.id = this.$route.params.id;
    },
};
</script>