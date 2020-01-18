// It seems Nuxt SPAs don't make use of nuxt.config.js axios parameters so I have to do this...
export default function({ $axios }) {
    $axios.defaults.withCredentials = true;
}
