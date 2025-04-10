# IronContacts with Pinia

This project has two versions:
1. The original version using Vue's Composition API with local state
2. A version using Pinia for state management

## Running the Original Version

```bash
npm run dev
```

This will run the app with local state management.

## Running the Pinia Version

First, install Pinia:

```bash
npm install pinia
```

Then, to run the Pinia version, you need to modify the `vite.config.js` file to use the Pinia main file:

1. Open `vite.config.js`
2. Change the `resolve.alias` section to point to the Pinia main file:

```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    './main.js': path.resolve(__dirname, './src/mainPinia.js')
  }
}
```

3. Run the development server:

```bash
npm run dev
```

## Switching Between Versions

To switch back to the original version, change the alias in `vite.config.js` back to:

```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

## Implementation Details

### Original Version (App.vue)
- Uses Vue's Composition API with `ref` for reactive state
- State and methods are defined locally in the component

### Pinia Version (AppPinia.vue)
- Uses Pinia for state management
- State and actions are defined in a separate store
- Component imports and uses the store

Both versions have the same functionality:
- Display contacts in a table
- Add random contacts
- Sort contacts by name or popularity
- Delete contacts