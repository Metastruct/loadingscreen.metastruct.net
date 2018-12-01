<template lang="pug">
	nuxt
</template>

<script>

import Vue from "vue"
import { ObserveVisibility } from "vue-observe-visibility"
import VueClipboard from "vue-clipboard2"

Vue.directive("observe-visibility", ObserveVisibility)
Vue.use(VueClipboard)

export default {}

</script>

<style lang="scss">

</style>
