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
import { useContactsStore } from './stores/index.js';

// Use the contacts store
const contactsStore = useContactsStore();
console.log('Using Pinia for state management!');

// Alias store methods for template use
const addRandomContact = () => contactsStore.addRandomContact();
const sortByName = () => contactsStore.sortByName();
const sortByPopularity = () => contactsStore.sortByPopularity();
const deleteContact = (id) => contactsStore.deleteContact(id);
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #e74c3c;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  padding: 5px 10px;
  font-size: 0.9rem;
}

.delete-btn:hover {
  background-color: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 8px;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #34495e;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #f1f1f1;
}

img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

img:hover {
  transform: scale(1.1);
}
</style>