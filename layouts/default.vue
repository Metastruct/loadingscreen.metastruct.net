<template lang="pug">
	nuxt
</template>

<script>

import Vue from "vue"
import VueLazyLoad from "vue-lazyload"
import { ObserveVisibility } from "vue-observe-visibility"

Vue.use(VueLazyLoad)
Vue.directive("observe-visibility", ObserveVisibility)

export default {}

</script>

<style lang="scss">

</style>
