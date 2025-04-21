// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-18",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      title: "Welcome to Settingly",
      meta: [
        {
          name: "description",
          content: "A platform for server-side utilities and tools.",
        },
        {
          name: "og:title",
          content: "Welcome to Settingly",
        },
        {
          name: "og:description",
          content: "A platform for server-side utilities and tools.",
        },

        { name: "og:type", content: "website" },
        { name: "og:url", content: "https://settingly.dev" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      // script: [
      //   {
      //     defer: true,
      //     src: "https://cloud.umami.is/script.js",
      //     "data-website-id": "e6b9b237-7d41-4c1a-b087-ef35afdc2add",
      //   },
      // ],
    },
  },

  imports: {
    dirs: ["composables/**"],
  },

  modules: [
    "@nuxt/content",
    "@nuxt/test-utils",
    "@nuxtjs/tailwindcss",
    "@clerk/nuxt",
    "@pinia/nuxt",
  ],

  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark-dimmed",
        },
      },
    },
  },
});
