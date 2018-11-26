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
							a.navbar-item(v-for="(name, k) in sortMethods" @click="sortMethod = k" :class="{ 'is-active': sortMethod == k }") {{ name }}
							hr.navbar-divider
							a.navbar-item(@click="sortMethodReverse = false" :class="{ 'is-active': sortMethodReverse == false }") Ascending
							a.navbar-item(@click="sortMethodReverse = true" :class="{ 'is-active': sortMethodReverse == true }") Descending
					.navbar-item
						input.input(type="text" placeholder="Filter by author" v-model="authorSearch")
				.navbar-end
					a.navbar-item(v-if="!authed" href="https://g2cf.metastruct.net/lsapi/login" style="display: flex;")
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
						| Log in to vote, and perform administrative actions (soon)

		section.section
			my-justified-grid(v-if="screenshots.length > 0" ref="grid")
				my-justified-grid-item(v-for="screenshot in sortedScreenshots")
					img(:src="`https://g2cf.metastruct.net/lsapi/i/${screenshot.id}.jpg`" @click="viewScreenshot('http://' + screenshot.url)")
					.details
						.votes
							a.upvotes.has-text-success
								i.material-icons.md-light thumb_up
								span {{ screenshot.up }}
							a.downvotes.has-text-danger
								i.material-icons.md-light thumb_down
								span {{ screenshot.down }}
						a.is-dark(v-if="screenshot.accountid != 0" :href="getProfileURL(screenshot.accountid)" target="_blank") {{ screenshot.name }}
						p(v-else) {{ screenshot.name }}

			.google-loading(v-else)
				Loading
</template>

<script>

import MyJustifiedGrid from "@/components/MyJustifiedGrid.vue"
import MyJustifiedGridItem from "@/components/MyJustifiedGridItem.vue"
import Loading from "@/components/Loading.vue"

import axios from "axios"
import wilson from "wilson-score-interval"
import SteamID from "steamid"

export default {
	components: {
		MyJustifiedGrid,
		MyJustifiedGridItem,
		Loading
	},
	data() {
		return {
			dropdowns: [ false ],
			burger: false,

			screenshots: [],

			sortMethods: [ "ID", "Rating", "Last added", "Author" ],
			sortMethod: 1,
			sortMethodReverse: true,

			authorSearch: "",
			authed: null
		}
	},
	mounted() {
		axios.get("https://g2cf.metastruct.net/lsapi")
			.then(res => {
				this.screenshots = res.data.result

				console.log("Got screenshots", {...res.data.result})
			})

		axios.get("https://g2cf.metastruct.net/lsapi/auth")
			.then(res => {
				this.authed = res.data
			})
	},
	computed: {
		sortedScreenshots() {
			let sorted;

			// I can probably shorten this
			switch (this.sortMethod) {
				case 0: // ID
					sorted = this.screenshots.sort((a, b) => {
						return a.id > b.id
					})
					break
				case 1: // Rating
					sorted = this.screenshots.sort((a, b) => {
						let aWilson = wilson(a.up, a.up + a.down).left
						let bWilson = wilson(b.up, b.up + b.down).left

						if (aWilson == bWilson) return a.id > b.id
						else return aWilson > bWilson
					})
					break
				case 2: // Last added
					sorted = this.screenshots.sort((a, b) => {
						if (a.created == b.created) return a.id > b.id
						else return a.created > b.created
					})
					break
				case 3: // Author
					sorted = this.screenshots.sort((a, b) => {
						let aName = a.name.toLowerCase()
						let bName = b.name.toLowerCase()

						if (aName == bName) return a.id > b.id
						else return aName > bName
					})
					break
			}

			if (sorted) {
				if (this.sortMethodReverse) sorted = sorted.reverse()

				return sorted.filter(val => {
					return val.name.toLowerCase().includes(this.authorSearch.toLowerCase())
				})
			}
		},
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
		}
	},
	methods: {
		toggleDropdown(id) {
			this.$set(this.dropdowns, id, !this.dropdowns[id])
		},
		viewScreenshot(url) {
			window.open(url, "_blank")
		},
		getProfileURL(approver) {
			return "https://steamcommunity.com/profiles/" + SteamID.fromIndividualAccountID(approver).getSteamID64()
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

.grid-item {
	cursor: pointer;
	overflow: hidden;

	.details {
		display: block;
		position: relative;
		text-align: left;
		padding: 4px 8px;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);

		transform: translateY(0%);
		transform-origin: center bottom;
		opacity: 0;

		transition: transform 0.25s ease-in, opacity 0.25s ease-in;

		.votes {
			float: right;

			.upvotes, .downvotes {
				margin: 0 4px;

				display: inline-flex;
				align-content: center;

				span {
					margin: 0 4px;
				}
			}
		}
	}

	&:hover {
		.details {
			transform: translateY(-100%);
			opacity: 1;
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
