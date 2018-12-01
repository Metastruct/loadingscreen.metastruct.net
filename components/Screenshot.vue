<template lang="pug">
    .screenshot(v-observe-visibility="visibilityChanged")
        a(:href="getScreenshotURL(screenshot.url)" target="_blank")
            img(v-if="isVisible" :src="`https://g2cf.metastruct.net/lsapi/i/${screenshot.id}.jpg`" :class="{ blurry: message }")
        .message {{ message }}
        .details
            .votes
                component.upvotes.has-text-success(:is="$store.state.authed ? 'a' : 'div'" @click="vote(screenshot.id, 'up')" :class="{ unvoted: getOwnVote(screenshot.id) == false }")
                    i.material-icons.md-light thumb_up
                    span {{ screenshot.up }}
                component.downvotes.has-text-danger(:is="$store.state.authed ? 'a' : 'div'" @click="vote(screenshot.id, 'down')" :class="{ unvoted: getOwnVote(screenshot.id) == true }")
                    i.material-icons.md-light thumb_down
                    span {{ screenshot.down }}
            a.has-text-primary(v-if="screenshot.accountid != 0" :href="getProfileURL(screenshot.accountid)" target="_blank") {{ screenshot.name }}
            p(v-else) {{ screenshot.name }}
</template>

<script>

import axios from "axios"
import SteamID from "steamid"

function getUrlParamsString(obj) {
    return new URLSearchParams(obj).toString()
}

export default {
    props: [ "screenshot" ],
    data() {
        return {
            isVisible: false,
            message: "",
            timeout: null
        }
    },
    methods: {
        visibilityChanged(isVisible) {
            this.isVisible = isVisible
        },
        getScreenshotURL(url) {
            if (!url.match(/^https?:\/\//i)) url = "http://" + url
            return url
        },
        getProfileURL(accountID) {
            return "https://steamcommunity.com/profiles/" + SteamID.fromIndividualAccountID(accountID).getSteamID64()
        },
        vote(id, dir) {
            let params = getUrlParamsString({ csrf_token: this.$store.state.authed.csrf_token })
            axios.post(`https://g2cf.metastruct.net/lsapi/vote/${id}/${dir}?${params}`)
                .then(res => {
                    if (!res.data.errors) {
                        // Display toast
                        // TODO: Actually change counter?? I can't be assed right now

                        switch (dir) {
                            case "up":
                            case "down":
                                this.message = dir + "voted!"
                                break
                            case "delete":
                                this.message = "vote removed!"
                                break
                        }

                        if (this.timeout) clearTimeout(this.timeout)
                        this.timeout = setTimeout(() => {
                            this.message = ""
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
            if (!this.$store.state.myVotes.success) return null
            let upvoted = this.$store.state.myVotes.up.includes && this.$store.state.myVotes.up.includes(id)
            let downvoted = this.$store.state.myVotes.down.includes && this.$store.state.myVotes.down.includes(id)

            return upvoted || (downvoted ? false : null)
        }
    },
}

</script>

<style lang="scss">

@import "@/assets/variables.scss";

$width: 384px;
$height: 216px;

.screenshot {
    display: block;
    margin: 6px 0;
    text-align: center;
    max-width: $width;
    max-height: $height;
    width: $width;
    height: $height;
    border: 1px solid darken($background, 7.5%);

    & > img {
        display: block;
        width: $width;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }

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
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        position: absolute;
        text-align: left;
        padding: 6px 6px;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);

        transform: translateY(100%);
        transform-origin: center bottom;
        opacity: 0;

        transition: transform 0.25s ease-in, opacity 0.25s ease-in;

        .votes {
            display: flex;
            align-content: center;
            align-items: center;

            .upvotes, .downvotes {
                display: inline-flex;
                align-content: center;
                align-items: center;

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

    @media screen and (max-width: 768px) {
        .details {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    &:hover {
        .details {
            transform: translateY(0%);
            opacity: 1;
        }
    }
}

</style>
