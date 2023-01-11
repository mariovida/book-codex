<template>
    <section class="department">
        <div class="wrapper">
            <p>The ID is: {{ id }}</p>
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'DepartmentView',
    data() {
        return {};
    },
    created() {
        this.id = this.$route.params.id;
    },
    computed: {},
    mounted() {
        if(this.id === "djecji") {
            document.title = "Dječji odjel - Knjižnica Codex";
        } else if(this.id === "odrasli") {
            document.title = "Odjel za odrasle - Knjižnica Codex";
        } else if(this.id === "glazbeni") {
            document.title = "Glazbena zbirka - Knjižnica Codex";
        }
    }
};
</script>