<template lang="pug">
    transition-group.screenshot-grid(name="grid", tag="div")
        screenshot(v-for="screenshot in screenshots" :screenshot="screenshot" :key="screenshot.id")
</template>

<script>
import Screenshot from "@/components/Screenshot.vue";

export default {
    components: {
        Screenshot
    },
    props: {
        screenshots: Array
    }
};
</script>

<style lang="scss">
.screenshot-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-evenly;
}
.grid-move {
    transition: transform 1s;
}
</style>
