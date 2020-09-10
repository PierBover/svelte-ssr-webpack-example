# Svelte SSR + hydration example with Webpack

Features:
* Svelte 3
* SSR + hydration
* Isomorphic (use the same components server-side and client-side)
* Hashed JS and CSS filenames for production
* Global SCSS
* Using Fastify but any Node server can be used
* Compression enabled (Brotli, GZip, etc)
* Beware: no component CSS (I just prefer to keep CSS outside of Svelte components)

### Intro

This is my second attempt at configuring an SSR + hydration project with Svelte.

On my [first attempt](https://github.com/PierBover/svelte-ssr-example) I used Rollup instead and it was a bit convoluted. The biggest issue is that the dev experience was far from ideal, probably because I'm not much of a Rollup expert.

I'm much happier with this new attempt. The setup is more streamlined and during development changes can be served almost instantly. You still have to manually add the routes to Fastify though which makes sense since each page/route will still serve different data.

I've committed the `dist` folder so you can get an idea what gets produced at the end of all this.

To start the server for production: `npm run start`

### How to dev?

Simply `npm run dev`.

This will run 3 processes in parallel:

* Webpack in watch mode with 2 configs to produce the bundled server, SCSS styles, and client-side JS scripts for hydration
* Nodemon will watch the `dist/bundle.js` file and run the Fastify server as it gets updated
* Chokidar will watch the `components/pages` directory and create a new entry script for Webpack to bundle for the client-side JS scripts

### Why not Sapper?

Sapper apps respond to the first request by doing SSR but after that it becomes a single-page-application (SPA) with code splitting. This is fancy but the SPA architecture introduces a number of issues which I wanted to avoid, and sadly Sapper does not have a 100% SSR mode.