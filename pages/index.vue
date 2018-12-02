<!-- TODO: Split all this crap into multiple files? -->

<template lang="pug">
    div
        aside.sidebar(:class="{ 'is-expanded': sidebar }")
            .sidebar-background(@click="toggleSidebar")
            .menu
                a(href="https://metastruct.net")
                    img(src="@/assets/logo.png")
                p.menu-label.has-text-primary Sort by
                ul.menu-list
                    a(v-for="(name, k) in sortMethods" @click="pushQuery({ sortBy: k })" :class="{ 'is-active': sortMethod == k }") {{ name }}
                    // hr.navbar-divider
                p.menu-label.has-text-primary Order
                ul.menu-list
                    a(@click="pushQuery({ reverse: false })" :class="{ 'is-active': sortMethodReverse == false }") Ascending
                    a(@click="pushQuery({ reverse: true })" :class="{ 'is-active': sortMethodReverse == true }") Descending
                p.menu-label.has-text-primary Filter by
                p.menu-label.has-text-grey-light(style="margin: 0.5em 0;") ID
                .control
                    input.input(type="text" v-model="filterId" @input="pushQuery({ id: $event.target.value })")
                p.menu-label.has-text-grey-light(style="margin: 0.5em 0;") Author
                input.input(type="text" placeholder="Author" v-model="filterAuthor")
                p.menu-label.has-text-grey-light(style="margin: 0.5em 0;") Status
                .control(v-for="filter in filterStatus")
                    label.checkbox
                        input(type="checkbox" v-model="filter.enabled" style="margin-right: 0.5em;" @change="pushQuery({ [filter.name.toLowerCase()]: filter.enabled })")
                        | {{ filter.name }}
                p.menu-label.has-text-primary Actions
                ul.menu-list
                    a.is-flex(v-if="!$store.state.authed.success" href="https://g2cf.metastruct.net/lsapi/login")
                        i.material-icons person
                        p &nbsp;Login
                    template(v-if="$store.state.authed.success")
                        a.is-flex(@click="submit")
                            i.material-icons add_to_queue
                            p &nbsp;Submit new image
            button.collapse-button(@click="toggleSidebar")
                i.material-icons.md-light(v-if="!sidebar") keyboard_arrow_right
                i.material-icons.md-light(v-else) keyboard_arrow_left

        section.hero.is-small.is-primary.is-bold
            .hero-body
                .container
                    h1.title Metastruct Loading Screen Gallery
        section.hero.is-small
            .hero-body
                .container
                    .content
                        h2 Welcome!
                        p
                            | This is the gallery of screenshots displayed while you are loading into our servers.
                            br
                            a(href="https://g2cf.metastruct.net/lsapi/login") Log in with Steam
                            |
                            | in order to vote for your favorite screenshots, submit your own, and as a <b>developer</b>, manage screenshots submitted by other users by approving or denying them.
                            br
                            | You can use the
                            |
                            a(@click="toggleSidebar") sidebar
                            |
                            | to sort and filter the grid to your convenience.
                        p
                            | If you think your screenshots should be approved, make sure to get a lot of ratings!


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

let statusOrder = {
    [true     ]: 1,
    [null     ]: 2,
    [undefined]: 2,
    [false    ]: 3
}
function defaultSort(a, b) {
    if (a.approval == b.approval) return a.id > b.id ? 1 : -1
    else return statusOrder[a.approval] > statusOrder[b.approval] ? 1 : -1
}

function getUrlParamsString(obj) {
    return new URLSearchParams(obj).toString()
}

export default {
    components: {
        ScreenshotGrid,
        Loading
    },
    data() {
        return {
            sidebar: false,

            screenshots: [],

            sortMethods: [ "ID", "Rating", "Last added", "Author" ],
        }
    },
    methods: {
        pushQuery(query) {
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...query } })
        },
        toggleSidebar() {
            this.sidebar = !this.sidebar
        },
        submit() {
            let url = prompt("Enter the direct URL to the image you want to submit\nSupported hosts: Steam Community, imgur", "")

            if (url) {
                let params = getUrlParamsString({ csrf_token: this.$store.state.authed.csrf_token, url })
                axios.post(`https://g2cf.metastruct.net/lsapi?${params}`)
                    .then(res => {
                        alert("URL submitted for review with ID " + res.data.id + "! Please check back later to see it in the list.\n(you should probably try sorting by last added, descending)")
                    })
                    .catch(err => {
                        if (err.response) {
                            switch (err.response.status) {
                                case 400:
                                    alert(err.response.data.reason)
                                    break
                                case 429:
                                    alert("You have been rate limited!")
                                    break
                                case 409:
                                    alert("URL is already in the database!")
                                    window.location.href = location.origin = "/?id=" + err.response.data.id
                                    break
                            }
                        }

                        console.error(err)
                    })
            }
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
            // Sort by
            let sorted = this.screenshots.slice().sort((a, b) => {
                switch (this.sortMethod) {
                    default:
                    case 0: // ID
                        return defaultSort(a, b)
                    case 1: // Rating
                        let aWilson = wilson(a.up, a.up + a.down).left
                        let bWilson = wilson(b.up, b.up + b.down).left

                        if (aWilson == bWilson) return defaultSort(a, b)
                        else return aWilson > bWilson ? 1 : -1
                    case 2: // Last added
                        if (a.created == b.created) return defaultSort(a, b)
                        else return a.created > b.created ? 1 : -1
                    case 3: // Author
                        let aName = a.name.toLowerCase()
                        let bName = b.name.toLowerCase()

                        if (aName == bName) return defaultSort(a, b)
                        else return aName > bName ? 1 : -1
                }
            })

            if (this.sortMethodReverse) sorted = sorted.reverse()

            // Filter by
            sorted = sorted.filter(val => { // Author
                return val.name.toLowerCase().includes(this.filterAuthor.toLowerCase())
            })
            sorted = sorted.filter(val => { // Status
                return (val.approval == true  && this.filterStatus[0].enabled)
                    || (val.approval == null  && this.filterStatus[1].enabled)
                    || (val.approval == false && this.filterStatus[2].enabled)
            })
            if (this.filterId) {
                sorted = sorted.filter(val => {
                    return val.id == this.filterId
                })
            }

            return sorted
        },
        sortMethod() { return this.$route.query.sortBy == null ? 1 : parseInt(this.$route.query.sortBy) },
        sortMethodReverse() { return this.$route.query.reverse == null ? true : JSON.parse(this.$route.query.reverse) },
        filterAuthor() { return this.$route.query.author || "" },
        filterId() { return this.$route.query.id || "" },
        filterStatus() { return [
            {
                name: "Approved",
                enabled: this.$route.query.approved == null ? true : JSON.parse(this.$route.query.approved)
            },
            {
                name: "Pending",
                enabled: this.$route.query.pending == null ? true : JSON.parse(this.$route.query.pending)
            },
            {
                name: "Denied",
                enabled: this.$route.query.denied == null ? false : JSON.parse(this.$route.query.denied)
            },
        ] }
    },
    watch: {
        filterStatus() {
            this.pushQuery({ pending: this.filterStatus[1].enabled, approved: this.filterStatus[0].enabled, denied: this.filterStatus[2].enabled })
        },
        filterAuthor() {
            this.pushQuery({ author: this.filterAuthor })
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
        max-width: 16.66rem;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    }

    button.collapse-button {
        cursor: pointer;
        pointer-events: all;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $primary;
        height: 3.5rem;
        width: 3.5rem;
        bottom: 1.5rem;
        right: -1.5rem;
        transform: translateX(100%);
        border: none;
        border-radius: 50%;
        color: $dark;
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
