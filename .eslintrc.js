module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: ["@nuxtjs", "plugin:nuxt/recommended", "plugin:prettier/recommended", "prettier", "prettier/vue"],
    plugins: ["prettier"],
    // add your custom rules here
    rules: {
        "nuxt/no-cjs-in-config": "off",
        "no-console": "off",
        "max-len": ["off", 120, 4],
        "no-prototype-builtins": "off",
        "no-case-declarations": "off",
        "vue/no-side-effects-in-computed-properties": "off",
        "vue/require-prop-types": "off"
    }
};
