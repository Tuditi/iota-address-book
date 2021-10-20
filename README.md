# IOTA  Wallet

This is an example for an IOTA Wallet based on Svelte, TypeScript and Electron.

Prerequisites: TODO

## Get started

Go to the project directory and install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

You should see your Electron app running. Edit a component file in `src`, save it, and reload the page to see your changes.

If you want to change the Electron app itself and see the changes live, then run:

```bash
npm run nodemon
```

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
