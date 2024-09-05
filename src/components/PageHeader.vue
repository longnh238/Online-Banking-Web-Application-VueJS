<template>
    <div class="banner">
      <h1>Welcome to Online Banking</h1>
      <p>Secure and convenient banking services at your fingertips</p>
    </div>
  </template>
  
  <script>  
  export default ({
    name: 'PageHeader'
  })
  </script>
  
  <style scoped>
  .banner {
    background: linear-gradient(to right, #3498db, #2980b9);
    color: #fff;
    text-align: center;
    padding: 40px 20px;
    margin-bottom: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-basis: 100%;
  }
  </style>
  