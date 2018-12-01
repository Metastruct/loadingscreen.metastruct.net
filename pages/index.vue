<!-- TODO: Split all this crap into multiple files? -->

<template lang="pug">
	div
		aside.sidebar(:class="{ 'is-expanded': showSidebar }")
			.sidebar-background(@click="showSidebar = !showSidebar")
			.menu
				a(href="https://metastruct.net")
					img(src="@/assets/logo.png")
				p.menu-label Sort by
				ul.menu-list
					nuxt-link(v-for="(name, k) in sortMethods" :to="{ path: $route.path, query: { sortBy: k, reverse: sortMethodReverse } }" :class="{ 'is-active': sortMethod == k }") {{ name }}
					// hr.navbar-divider
				p.menu-label Order
				ul.menu-list
					nuxt-link(:to="{ path: $route.path, query: { sortBy: sortMethod, reverse: false } }" :class="{ 'is-active': sortMethodReverse == false }") Ascending
					nuxt-link(:to="{ path: $route.path, query: { sortBy: sortMethod, reverse: true } }" :class="{ 'is-active': sortMethodReverse == true }") Descending
				p.menu-label Filtering
				input.input(type="text" placeholder="Author" v-model="authorSearch")
				p.menu-label Actions
				ul.menu-list
					a(v-if="!$store.state.authed.success" href="https://g2cf.metastruct.net/lsapi/login" style="display: flex;")
						i.material-icons.md-light person
						span &nbsp;Login
					span(v-else) Logged in!
			button.collapse-button(@click="showSidebar = !showSidebar")
				i.material-icons.md-light(v-if="!showSidebar") keyboard_arrow_right
				i.material-icons.md-light(v-else) keyboard_arrow_left

		section.hero.is-small.is-primary.is-bold
			.hero-body
				.container
					h1.title Metastruct Loading Screen Gallery
					h2.subtitle
						| Click on a picture to view it in full.
						br
						| Log in with Steam to vote for your favorite pictures!
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
			showSidebar: false,

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
	}
}

</script>

<style lang="scss">

@import "@/assets/variables.scss";

.sidebar {
	position: fixed;
	display: flex;
	align-items: flex-end;
	pointer-events: none;
	z-index: 3;
	height: 100%;
	transform: translateX(-100%);
	transition: transform 0.25s ease-in;

	.sidebar-background {
		position: absolute;
		display: block;
		transition: background-color 0.25s ease-in;
		height: 125vh;
		width: 125vw;
	}

	.menu {
		position: relative;
		overflow: auto;
		padding: 1rem;
		background: lighten($background, 7.5%);
		max-width: 15rem;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
	}

	button.collapse-button {
		pointer-events: all;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background: lighten($background, 7.5%);
		height: 3.5rem;
		width: 3.5rem;
		bottom: 1.5rem;
		right: -1.5rem;
		transform: translateX(100%);
		border: none;
		border-radius: 50%;
		color: $text;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
		transition: filter 0.05s ease-in;

		i {
			font-size: 2rem;
		}

		&:active {
			filter: brightness(87.5%);
			padding: 0;
		}
	}

	&.is-expanded {
		pointer-events: all;
		transform: translateX(0%);

		.sidebar-background {
			background: rgba(0, 0, 0, 0.5);
		}
	}
}

.google-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

</style>
