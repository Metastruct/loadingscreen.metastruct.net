<template lang="pug">
.screenshot(v-observe-visibility="visibilityChanged")
  template(v-if="isVisible")
    a(:href="screenshotURL", target="_blank")
      img(
        :src="`https://g2cf.metastruct.net/lsapi/i/${screenshot.id}.jpg`",
        :class="{ blurry: message }"
      )
    .message {{ message }}
    .details
      .votes
        a.upvotes.has-text-success(
          @click="vote(screenshot.id, 'up')",
          :class="{ unvoted: getOwnVote(screenshot.id) == false }",
          title="Upvote"
        )
          i.mdi.mdi-thumb-up.mdi-24px
          p {{ screenshot.up }}
        a.downvotes.has-text-danger(
          @click="vote(screenshot.id, 'down')",
          :class="{ unvoted: getOwnVote(screenshot.id) == true }",
          title="Downvote"
        )
          i.mdi.mdi-thumb-down.mdi-24px
          p {{ screenshot.down }}
      a.has-text-primary(
        v-if="screenshot.accountid != 0",
        :href="profileURL",
        target="_blank",
        title="Author"
      ) {{ screenshot.name }}
      p(v-else, title="Author") {{ screenshot.name }}
    .status(
      :class="{ pending: screenshot.approval == null, denied: screenshot.approval == false, approved: screenshot.approval == true }",
      title="Status"
    )
      p.has-text-light {{ timestamp }}
      p(v-if="screenshot.approval === null") Pending
      p(v-else-if="screenshot.approval === false") Denied
      p(v-else-if="screenshot.approval === true") Approved
      .judge
        template(v-if="$store.state.authed.admin")
          a.has-text-success(title="Approve", @click="setApproved(screenshot.id, 'approve')")
            i.mdi.mdi-check.mdi-24px
          a.has-text-danger(title="Deny", @click="setApproved(screenshot.id, 'deny')")
            i.mdi.mdi-close.mdi-24px
        a.has-text-light(
          v-clipboard:copy="getGalleryURL()",
          v-clipboard:success="onCopyGalleryURL",
          title="Share"
        )
          i.mdi.mdi-share.mdi-24px
</template>

<script>
import SteamID from "steamid";

function getUrlParamsString(obj) {
  return new URLSearchParams(obj).toString();
}

export default {
  props: ["screenshot"],
  data() {
    return {
      isVisible: false,
      message: "",
      timeout: null,
      previous: null
    };
  },
  computed: {
    profileURL() {
      return (
        "https://steamcommunity.com/profiles/" +
        SteamID.fromIndividualAccountID(this.screenshot.accountid).getSteamID64()
      );
    },
    screenshotURL() {
      let url = this.screenshot.url;
      if (!url.match(/^https?:\/\//i)) url = "http://" + url;
      return url;
    },
    timestamp() {
      const date = new Date(this.screenshot.created * 1e3).toISOString().substring(0, 10);
      return date;
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    },
    setMessage(msg) {
      this.message = msg;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.message = "";
      }, 3000);
    },
    onCopyGalleryURL() {
      this.setMessage("copied link to clipboard!");
    },
    getGalleryURL() {
      return location.origin + "/?id=" + this.screenshot.id;
    },
    vote(id, dir) {
      if (!this.$store.state.authed.success) {
        window.location.href = "https://g2cf.metastruct.net/lsapi/login";
        return;
      }

      const params = getUrlParamsString({
        csrf_token: this.$store.state.authed.csrf_token
      });
      this.$axios
        .post(`https://g2cf.metastruct.net/lsapi/vote/${id}/${dir}?${params}`)
        .then(res => {
          if (!res.data.errors) {
            switch (dir) {
              case "up":
              case "down":
                this.setMessage(dir + "voted!");
                this.screenshot[dir]++;
                if (!this.previous && this.getOwnVote() != null) {
                  this.screenshot[this.getOwnVote() ? "up" : "down"]--;
                } else if (this.previous && this.previous !== dir) {
                  this.screenshot[this.previous]--;
                }
                break;
              case "delete":
                this.setMessage("vote removed!");
                break;
            }
            this.previous = dir;
          } else throw new Error(res.data.errors.join("\n"));
        })
        .catch(err => {
          if (err.response && err.response.status === 304 && dir !== "delete") {
            // Already voted, let's delete it
            this.vote(id, "delete");
            if (this.previous !== "delete") this.screenshot[dir]--;
          } else {
            console.error(err);
          }
        });
    },
    setApproved(id, dir) {
      const params = getUrlParamsString({
        csrf_token: this.$store.state.authed.csrf_token
      });
      this.$axios
        .post(`https://g2cf.metastruct.net/lsapi/${dir}/${id}?${params}`)
        .then(res => {
          if (!res.data.errors) {
            switch (dir) {
              case "approve":
                this.setMessage("approved!");
                this.$set(this.screenshot, "approval", true);
                break;
              case "deny":
                this.setMessage("denied!");
                this.$set(this.screenshot, "approval", false);
                break;
            }
          } else throw new Error(res.data.errors.join("\n"));
        })
        .catch(err => console.error(err));
    },
    getOwnVote() {
      if (!this.$store.state.myVotes.success) return null;

      if (this.previous != null) {
        switch (this.previous) {
          case "up":
            return true;
          case "down":
            return false;
          case "delete":
            return null;
        }
      }

      const id = this.screenshot.id;
      const upvoted =
        this.$store.state.myVotes.up.includes && this.$store.state.myVotes.up.includes(id);
      const downvoted =
        this.$store.state.myVotes.down.includes && this.$store.state.myVotes.down.includes(id);

      return upvoted || (downvoted ? false : null);
    }
  }
};
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

    &.blurry {
      // Had to do this via JS sadly
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
    padding: 0 6px;
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

      .upvotes,
      .downvotes {
        display: inline-flex;
        align-content: center;
        align-items: center;

        margin-right: 8px;

        p {
          margin: 0 4px;
        }

        &.unvoted {
          filter: grayscale(50%) brightness(75%);
        }
      }
    }
  }

  .status {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    position: absolute;
    text-align: left;
    padding: 0 6px;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);

    &.denied {
      color: $danger;
    }
    &.approved {
      color: $success;
    }
    &.pending {
      color: $warning;
    }

    transform: translateY(-100%);
    transform-origin: center top;
    opacity: 0;

    transition: transform 0.25s ease-in, opacity 0.25s ease-in;

    p {
      text-transform: uppercase;
    }

    .judge {
      display: flex;
      align-content: center;
      align-items: center;

      a {
        display: inline-flex;
        align-content: center;
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .details,
    .status {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  &:hover {
    .details,
    .status {
      transform: translateY(0%);
      opacity: 1;
    }
  }
}
</style>
