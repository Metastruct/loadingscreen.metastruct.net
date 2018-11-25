<template lang="pug">
    .justified-grid
        slot
</template>

<style lang="scss">

.justified-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-evenly;
}

</style>

