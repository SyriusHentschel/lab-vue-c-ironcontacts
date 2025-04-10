# IronContacts with Pinia - Implementation Guide

This guide shows how to implement the IronContacts app using Pinia for state management.

## Step 1: Install Pinia

```bash
npm install pinia
```

## Step 2: Create a Pinia Store

Create a file at `src/stores/contacts.js`:

```javascript
import { defineStore } from 'pinia'
import contactsData from '../contacts.json'

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: contactsData.slice(0, 5),
    remainingContacts: contactsData.slice(5)
  }),
  
  actions: {
    addRandomContact() {
      if (this.remainingContacts.length === 0) {
        alert('No more contacts to add!')
        return
      }
      
      // Get a random index
      const randomIndex = Math.floor(Math.random() * this.remainingContacts.length)
      
      // Get the random contact
      const randomContact = this.remainingContacts[randomIndex]
      
      // Add the contact to the contacts array
      this.contacts.push(randomContact)
      
      // Remove the contact from the remaining contacts
      this.remainingContacts.splice(randomIndex, 1)
    },
    
    sortByName() {
      this.contacts = [...this.contacts].sort((a, b) => a.name.localeCompare(b.name))
    },
    
    sortByPopularity() {
      this.contacts = [...this.contacts].sort((a, b) => b.popularity - a.popularity)
    },
    
    deleteContact(id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
    }
  }
})
```

## Step 3: Update main.js to use Pinia

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

## Step 4: Update App.vue to use the Pinia Store

```vue
<template>
  <div class="container">
    <h1>IronContacts with Pinia</h1>
    <div class="actions">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByName">Sort by Name</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactsStore.contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" :alt="contact.name" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="deleteContact(contact.id)" class="delete-btn">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useContactsStore } from './stores/contacts';

// Use the contacts store
const contactsStore = useContactsStore();

// Alias store methods for template use
const addRandomContact = () => contactsStore.addRandomContact();
const sortByName = () => contactsStore.sortByName();
const sortByPopularity = () => contactsStore.sortByPopularity();
const deleteContact = (id) => contactsStore.deleteContact(id);
</script>
```

## Key Differences from the Original Version

1. **State Management**:
   - Original: Local component state using Vue's ref()
   - Pinia: Centralized state in a Pinia store

2. **Method Implementation**:
   - Original: Methods defined directly in the component
   - Pinia: Methods defined as actions in the store

3. **Data Access**:
   - Original: Using .value to access reactive data (e.g., contacts.value)
   - Pinia: Direct access to store state (e.g., contactsStore.contacts)

## Benefits of Using Pinia

1. **Separation of Concerns**: UI logic (in the component) is separated from state management logic (in the store).

2. **Reusability**: The store can be used by multiple components, making it easier to share state across your application.

3. **Maintainability**: As your app grows, centralized state management makes it easier to track and debug state changes.

4. **DevTools Integration**: Pinia works with Vue DevTools, allowing you to inspect and debug state changes more easily.

5. **Scalability**: This pattern scales better for larger applications with more complex state requirements.

## Comparison with Vuex

Pinia is the new official state management library for Vue, replacing Vuex. Pinia offers several advantages over Vuex:

1. **Simpler API**: No mutations, just actions
2. **TypeScript support**: Better type inference
3. **Modular by design**: No need for namespaced modules
4. **Lighter weight**: Smaller bundle size
5. **DevTools support**: Same great debugging experience

## Conclusion

Using Pinia for state management in the IronContacts app provides a more scalable and maintainable architecture. While the functionality remains the same, the code organization is improved, making it easier to extend the application in the future.