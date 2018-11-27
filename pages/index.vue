<!-- TODO: Split all this crap into multiple files? -->

<template lang="pug">
	div
		nav.navbar.is-fixed-top
			.navbar-brand
				a(href="https://metastruct.net")
					img.navbar-item(src="@/assets/logo.png")
				a.navbar-burger.has-text-white(@click="burger = !burger" :class="{ 'is-active': burger }")
					span
					span
					span
			.navbar-menu(:class="{ 'is-active': burger }")
				.navbar-start
					.navbar-item.has-dropdown.is-hoverable
						a.navbar-link Sort by
						.navbar-dropdown
							nuxt-link.navbar-item(v-for="(name, k) in sortMethods" :to="{ path: $route.path, query: { sortBy: k, reverse: sortMethodReverse } }" :class="{ 'is-active': sortMethod == k }") {{ name }}
							hr.navbar-divider
							nuxt-link.navbar-item(:to="{ path: $route.path, query: { sortBy: sortMethod, reverse: false } }" :class="{ 'is-active': sortMethodReverse == false }") Ascending
							nuxt-link.navbar-item(:to="{ path: $route.path, query: { sortBy: sortMethod, reverse: true } }" :class="{ 'is-active': sortMethodReverse == true }") Descending
					.navbar-item
						input.input(type="text" placeholder="Filter by author" v-model="authorSearch")
				.navbar-end
					a.navbar-item(v-if="!$store.state.authed.success" href="https://g2cf.metastruct.net/lsapi/login" style="display: flex;")
						i.material-icons.md-light person
						span &nbsp;Login
					.navbar-item(v-else)
						span Logged in

		section.hero.is-small.is-primary.is-bold
			.hero-body
				.container
					h1.title Loading Screens
					h2.subtitle
						| Click on a picture to view it in full.
						br
						| Log in to vote for your favorite pictures!
						br
						| (soon admins will be able to manage loading screens)

		section.section
			screenshot-grid(v-if="screenshots.length > 0" :screenshots="sortedScreenshots")
			.google-loading(v-else)
				Loading
</template>

<script>

import Vue from "vue"
import ScreenshotGrid from "@/components/ScreenshotGrid.vue"
import Loading from "@/components/Loading.vue"

import wilson from "wilson-score-interval"
import axios from "axios"
import SteamID from "steamid"

axios.defaults.withCredentials = true

export default {
	components: {
		ScreenshotGrid,
		Loading
	},
	data() {
		return {
			dropdowns: [ false ],
			burger: false,

			screenshots: [],

			sortMethods: [ "ID", "Rating", "Last added", "Author" ],
			authorSearch: "",
		}
	},
	mounted() {
		axios.get("https://g2cf.metastruct.net/lsapi")
			.then(res => {
				this.screenshots = res.data.result
			})

		axios.post("https://g2cf.metastruct.net/lsapi/auth")
			.then(res => {
				if (res.data && res.data.success) {
					this.$store.commit("updateAuthed", res.data)

					axios.get("https://g2cf.metastruct.net/lsapi/myvotes")
						.then(res => {
							if (res.data && res.data.success) {
								this.$store.commit("updateMyVotes", res.data)
							}
						})
				}
			})
			.catch((err) => {
				if (!err.response || err.response.status != 401) console.error(err)
			})
	},
	computed: {
		sortedScreenshots() {
			let sorted = this.screenshots.sort((a, b) => {
				switch (this.sortMethod) {
					default:
					case 0: // ID
						return a.id > b.id
					case 1: // Rating
						let aWilson = wilson(a.up, a.up + a.down).left
						let bWilson = wilson(b.up, b.up + b.down).left

						if (aWilson == bWilson) return a.id > b.id
						else return aWilson > bWilson
					case 2: // Last added
						if (a.created == b.created) return a.id > b.id
						else return a.created > b.created
					case 3: // Author
						let aName = a.name.toLowerCase()
						let bName = b.name.toLowerCase()

						if (aName == bName) return a.id > b.id
						else return aName > bName
					}
			})

			if (sorted) {
				if (this.sortMethodReverse) sorted = sorted.reverse()

				return sorted.filter(val => {
					return val.name.toLowerCase().includes(this.authorSearch.toLowerCase())
				})
			}
		},
		sortMethod() {
			return this.$route.query.sortBy == null ? 1 : parseInt(this.$route.query.sortBy)
		},
		sortMethodReverse() {
			return this.$route.query.reverse == null ? true : JSON.parse(this.$route.query.reverse)
		}
	},
	watch: {
		sortMethod() {
			this.$nextTick(() => {
				this.$forceUpdate()
			})
		},
		authorSearch() {
			this.$nextTick(() => {
				this.$forceUpdate()
			})
		},
	},
	methods: {
		toggleDropdown(id) {
			this.$set(this.dropdowns, id, !this.dropdowns[id])
		},
		/* Python exposed the name for us
		getAuthorName(accountID) {

			axios.get("")
		}
		*/
	}
}

</script>

<style lang="scss">

nav.navbar {
	img.navbar-item {
		padding: 0;
		height: 3.25rem;
	}
}

.google-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

</style>
