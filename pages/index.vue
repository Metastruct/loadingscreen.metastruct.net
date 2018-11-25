<template lang="pug">
	div
		nav.navbar.is-fixed-top
			.navbar-brand
				img.navbar-item(src="@/assets/logo.png")
				.navbar-item Loading screens
				.navbar-item.has-dropdown(:class="{ 'is-active': dropdowns[0] }")
					a.navbar-link(@click="toggleDropdown(0)") Sort by
					.navbar-dropdown
						a.navbar-item(v-for="(name, k) in sortMethods" @click="sortMethod = k" :class="{ 'is-active': sortMethod == k }") {{ name }}
						hr.navbar-divider
						a.navbar-item(@click="sortMethodReverse = false" :class="{ 'is-active': sortMethodReverse == false }") Ascending
						a.navbar-item(@click="sortMethodReverse = true" :class="{ 'is-active': sortMethodReverse == true }") Descending

		section.section
			my-justified-grid(v-if="screenshots.length > 0" ref="grid")
				my-justified-grid-item(v-for="screenshot in sortedScreenshots")
					img(:src="`http://g2.metastruct.net:2095/lsapi/i/${screenshot.id}.jpg`")
			.google-loading(v-else)
				Loading
</template>

<script>

import axios from "axios"
import MyJustifiedGrid from "@/components/MyJustifiedGrid.vue"
import MyJustifiedGridItem from "@/components/MyJustifiedGridItem.vue"
import Loading from "@/components/Loading.vue"
import wilson from "wilson-score-interval"

export default {
	components: {
		MyJustifiedGrid,
		MyJustifiedGridItem,
		Loading
	},
	data() {
		return {
			screenshots: [],
			dropdowns: [ false ],
			sortMethods: [ "ID", "Rating", "Last added" ],
			sortMethod: 0,
			sortMethodReverse: false
		}
	},
	mounted() {
		axios.get("https://g2cf.metastruct.net/lsapi")
			.then(res => {
				this.screenshots = res.data.result

				console.log("Got screenshots", {...res.data.result})
			})
	},
	computed: {
		sortedScreenshots() {
			let sorted;

			switch (this.sortMethod) {
				case 0:
					sorted = this.screenshots.sort((a, b) => {
						return a.id > b.id
					})
					break
				case 1:
					sorted = this.screenshots.sort((a, b) => {
						return wilson(a.up, a.up + a.down).left > wilson(b.up, b.up + b.down)
					})
					break
				case 2:
					sorted = this.screenshots.sort((a, b) => {
						return a.created > b.created
					})
					break
			}

			if (sorted) {
				if (this.sortMethodReverse) sorted = sorted.reverse()

				return sorted
			}
		},
	},
	watch: {
		sortMethod() {
			this.$nextTick(() => {
				this.$forceUpdate()
			})
		}
	},
	methods: {
		toggleDropdown(id) {
			this.$set(this.dropdowns, id, !this.dropdowns[id])
		},
	}
}

</script>

<style lang="scss">

nav.navbar {
	img.navbar-item {
		padding: 0;
		height: 64px;
	}
}

.google-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

</style>
