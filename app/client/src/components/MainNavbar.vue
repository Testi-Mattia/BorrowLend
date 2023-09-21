<template>
    <nav class="navbar">
      <div class="navbar-item">
        <input type="text" v-model="searchText" @input="searchBooks" placeholder="Cerca per titolo o ISBN" />
      </div>
      
      <div class="navbar-item">
        <select v-model="selectedCategory" @change="$emit('category-selected', selectedCategory)">
          <option value="">Tutte le categorie</option>
          <option v-for="category in categories" :value="category.categoria" :key="category.categoria">
            <div class="category-wrapper">
              <span class="category-name">{{ category.categoria }}</span>
              <div class="count-box">
                <div class="count">__{{ category.count }}</div>
              </div>
            </div>
          </option>
        </select>
      </div>
    </nav>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchText: '',
        selectedCategory: '',
        categories: []
      };
    },
    methods: {
      fetchCategories() {
        axios
          .get('http://localhost:3000/api/books')
          .then(response => {
            const books = response.data;
            const uniqueCategories = {};
  
            books.forEach(book => {
              if (!uniqueCategories[book.categoria]) {
                uniqueCategories[book.categoria] = 1;
              } else {
                uniqueCategories[book.categoria]++;
              }
            });
  
            this.categories = Object.entries(uniqueCategories).map(([categoria, count]) => ({
              categoria,
              count
            }));
          })
          .catch(error => {
            console.error('Errore durante la richiesta delle categorie:', error);
          });
      },
      searchBooks() {
        const query = this.searchText.toLowerCase();
        this.$emit('search-selected', query);
      }
    },
    mounted() {
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    font-family: 'Courier New', monospace;
    background-color: #313439;
    color: #fff;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  
  .navbar input[type="text"],
  .navbar select {
    background-color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    margin-right: 10px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .navbar input[type="text"]::placeholder {
    color: #999;
  }
  
  .navbar select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 30px;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI6Vyw_3_pIy_pGMx9cGUDLfs6KFUAtq57Q&usqp=CAU");
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }
  
  .navbar select option {
    background-color: #fff;
    color: #333;
  }
  
  .navbar a {
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    font-size: 14px;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  
  .category-wrapper {
    display: flex;
    align-items: center;
  }
  
  .category-name {
    flex-grow: 1;
  }
  
  .count-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-left: 10px;
  }
  
  .count {
    text-align: center;
  }
  
  </style>
  