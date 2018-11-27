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
						| Log in to vote for your favorite pictures!
						br
						| (soon admins will be able to manage loading screens)

		section.section
			my-justified-grid(v-if="screenshots.length > 0" ref="grid")
				my-justified-grid-item(v-for="screenshot in sortedScreenshots")
					img(:src="`https://g2cf.metastruct.net/lsapi/i/${screenshot.id}.jpg`" @click="viewScreenshot(screenshot.url)" :class="{ 'blurry': notifications[screenshot.id] && notifications[screenshot.id].message }")
					.message {{ notifications[screenshot.id] ? notifications[screenshot.id].message : "" }}
					.details
						.votes
							component(:is="authed ? 'a' : 'div'" @click="vote(screenshot.id, 'up')" :class="{ 'unvoted': getOwnVote(screenshot.id) == false }").upvotes.has-text-success
								i.material-icons.md-light thumb_up
								span {{ screenshot.up }}
							component(:is="authed ? 'a' : 'div'" @click="vote(screenshot.id, 'down')" :class="{ 'unvoted': getOwnVote(screenshot.id) == true }").downvotes.has-text-danger
								i.material-icons.md-light thumb_down
								span {{ screenshot.down }}
						a.has-text-primary(v-if="screenshot.accountid != 0" :href="getProfileURL(screenshot.accountid)" target="_blank") {{ screenshot.name }}
						p(v-else) {{ screenshot.name }}
			.google-loading(v-else)
				Loading
</template>

<script>

import Vue from "vue"
import MyJustifiedGrid from "@/components/MyJustifiedGrid.vue"
import MyJustifiedGridItem from "@/components/MyJustifiedGridItem.vue"
import Loading from "@/components/Loading.vue"

import axios from "axios"
import wilson from "wilson-score-interval"
import SteamID from "steamid"

axios.defaults.withCredentials = true

function getUrlParamsString(obj) {
	return new URLSearchParams(obj).toString()
}

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

			notifications: [],
			screenshots: [],
			myVotes: [],

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
			})

		axios.post("https://g2cf.metastruct.net/lsapi/auth")
			.then(res => {
				if (res.data && res.data.success) {
					this.authed = res.data

					axios.get("https://g2cf.metastruct.net/lsapi/myvotes")
						.then(res => {
							if (res.data && res.data.success) {
								this.myVotes = res.data
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
			if (!url.match(/^https?:\/\//i)) url = "http://" + url
			window.open(url, "_blank")
		},
		getProfileURL(approver) {
			return "https://steamcommunity.com/profiles/" + SteamID.fromIndividualAccountID(approver).getSteamID64()
		},
		vote(id, dir) {
			let params = getUrlParamsString({ csrf_token: this.authed.csrf_token })
			axios.post(`https://g2cf.metastruct.net/lsapi/vote/${id}/${dir}?${params}`)
				.then(res => {
					if (!res.data.errors) {
						// Display toast
						// TODO: Actually change counter?? I can't be assed right now

						let msg
						switch (dir) {
							case "up":
							case "down":
								msg = dir + "voted!"
								break
							case "delete":
								msg = "vote removed!"
								break
						}
						let notify = this.notifications[id] || {}
						Vue.set(this.notifications, id, notify)
						Vue.set(notify, "message", msg)
						if (notify.timeout) clearTimeout(notify.timeout)
						notify.timeout = setTimeout(() => {
							Vue.set(notify, "message", "")
						}, 3000)
					} else throw Error(res.data.errors.join("\n"))
				})
				.catch(err => {
					if (err.response && err.response.status == 304 && dir != "delete") {
						// Already voted, let's delete it
						this.vote(id, "delete")
					} else {
						console.error(err)
					}
				})
		},
		getOwnVote(id) {
			if (!this.myVotes.success) return null

			return this.myVotes.up.includes(id) || (this.myVotes.down.includes(id) ? false : null)
		}
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
	position: relative;

	img {
		transition: filter 0.33s ease-out;
		filter: blur(0px);

		&.blurry { // Had to do this via JS sadly
			filter: blur(4px);
		}
	}

	.message {
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		transition: opacity 0.33s ease-in;
		color: white;
		font-size: 2em;

		&:empty {
			opacity: 0;
		}
	}

	.details {
		display: block;
		position: absolute;
		text-align: left;
		padding: 4px 8px;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);

		transform: translateY(100%);
		transform-origin: center bottom;
		opacity: 0;

		transition: transform 0.25s ease-in, opacity 0.25s ease-in;

		.votes {
			float: right;

			.upvotes, .downvotes {
				display: inline-flex;
				align-content: center;

				margin: 0 4px;

				span {
					margin: 0 4px;
				}

				&.unvoted {
					filter: grayscale(50%) brightness(75%);
				}
			}
		}
	}

	&:hover {
		.details {
			transform: translateY(0%);
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
