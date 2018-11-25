<template lang="pug">
    .grid-item(v-observe-visibility="visibilityChanged")
        slot(:class="{ 'is-hidden': !isVisible }")
</template>

<script>

export default {
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        visibilityChanged(isVisible) {
            this.isVisible = isVisible
        }
    }
}

</script>


<style lang="scss">

@import "@/assets/variables.scss";

$width: 384px;
$height: 216px;

.grid-item {
    display: block;
    margin: 6px 0;
    text-align: center;
    max-width: $width;
    max-height: $height;
    width: auto;
    height: $height;
    border: 1px solid darken($background, 7.5%);

    & > img {
        width: $width;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }
}

</style>
