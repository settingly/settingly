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
          content: "Your configuration management tool without the hassle",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
    "nuxt-mongoose",
    "@pinia/nuxt",
  ],

  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  mongoose: {
    options: {
      autoIndex: true,
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
