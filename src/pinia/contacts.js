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