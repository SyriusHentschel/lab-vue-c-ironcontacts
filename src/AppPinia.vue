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
          <td>{{ contact.wonOscar ? '🏆' : '—' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '—' }}</td>
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
/* Global styles */
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 40px 20px;
}

/* Container styling */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #e74c3c, #3498db);
}

/* Header styling */
h1 {
  color: #e74c3c;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #3498db;
}

/* Action buttons */
.actions {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(41, 128, 185, 0.3);
}

button:hover::after {
  left: 100%;
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(41, 128, 185, 0.3);
}

.delete-btn {
  background-color: #e74c3c;
  padding: 8px 15px;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(231, 76, 60, 0.2);
}

.delete-btn:hover {
  background-color: #c0392b;
  box-shadow: 0 6px 12px rgba(192, 57, 43, 0.3);
}

/* Table styling */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 12px;
}

th, td {
  padding: 18px 15px;
  text-align: center;
}

th {
  background-color: #34495e;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  position: relative;
}

th:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}

tr:last-child td {
  border-bottom: none;
}

td {
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover td {
  background-color: #f1f1f1;
}

/* Image styling */
img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  border: 3px solid transparent;
}

img:hover {
  transform: scale(1.15) rotate(5deg);
  border-color: #3498db;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Award icons */
td:nth-child(5), td:nth-child(6) {
  font-size: 1.2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  th, td {
    padding: 12px 8px;
    font-size: 0.9rem;
  }
  
  img {
    width: 60px;
    height: 60px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  button {
    width: 100%;
    max-width: 250px;
  }
}
</style>